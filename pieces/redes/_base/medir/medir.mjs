#!/usr/bin/env node
// Mide una pieza de redes con Chrome headless: abre el HTML al tamaño de su formato, le inyecta
// en-la-pagina.js e imprime lo que encontró. No frena: sale con 0 aunque haya observaciones.
// Uso: medir.mjs [--plantilla <carpeta>] <pieza.html> <formato>
// Con --plantilla, como en render.sh, mide una copia con <base href> en esa carpeta, para que las
// rutas relativas de una pieza copiada de una plantilla resuelvan. Chrome sale de CHROME en el
// entorno, o de la ruta de macOS.
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TIMEOUT_MS = 60_000;

const readHere = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const formats = JSON.parse(readHere('../formatos.json'));
const brandCss = readHere('../brand.css');
const moduleSource = readHere('./en-la-pagina.js');

function parseArguments(argv) {
  const [first, second, ...rest] = argv;
  const [templateDir, positional] = first === '--plantilla' ? [second, rest] : [null, [first, second, ...rest].filter(Boolean)];
  const [piece, format] = positional;
  if (!piece || !format || !formats.formats[format]) {
    console.error(`Uso: medir.mjs [--plantilla <carpeta>] <pieza.html> <formato>\nFormatos: ${Object.keys(formats.formats).join(', ')}`);
    process.exit(2);
  }
  // Con pnpm medir, las rutas son las de la carpeta desde donde se llamó (INIT_CWD), no la del paquete.
  const base = process.env.INIT_CWD ?? process.cwd();
  return { piece: resolve(base, piece), format, templateDir: templateDir && resolve(base, templateDir) };
}

// El protocolo de Chrome por pipe: los mensajes van en JSON, separados por un byte cero.
function connect(child) {
  const pending = new Map();
  const listeners = new Set();
  let buffer = '';
  let nextId = 0;
  // Si Chrome se cae, la escritura falla con EPIPE: el error lo informa quien espera la salida.
  child.stdio[3].on('error', () => {});
  child.stdio[4].setEncoding('utf8');
  child.stdio[4].on('data', (chunk) => {
    buffer += chunk;
    for (let end = buffer.indexOf('\0'); end >= 0; end = buffer.indexOf('\0')) {
      const message = JSON.parse(buffer.slice(0, end));
      buffer = buffer.slice(end + 1);
      if (pending.has(message.id)) pending.get(message.id)(message);
      else for (const listener of listeners) listener(message);
    }
  });
  const send = (method, params = {}, sessionId) => new Promise((resolveMessage, reject) => {
    const id = ++nextId;
    pending.set(id, (message) => {
      pending.delete(id);
      if (message.error) reject(new Error(`${method}: ${message.error.message}`));
      else resolveMessage(message.result);
    });
    child.stdio[3].write(`${JSON.stringify({ id, method, params, sessionId })}\0`);
  });
  const once = (method) => new Promise((resolveEvent) => {
    const listener = (message) => {
      if (message.method !== method) return;
      listeners.delete(listener);
      resolveEvent(message.params);
    };
    listeners.add(listener);
  });
  return { send, once };
}

async function measure({ piece, format, templateDir }, workDir) {
  const { width, height } = formats.formats[format];
  if (!existsSync(CHROME)) throw new Error(`no está Chrome en ${CHROME}: poné su ruta en la variable CHROME`);
  let url = pathToFileURL(piece).href;
  if (templateDir) {
    const copy = join(workDir, basename(piece));
    const html = readFileSync(piece, 'utf8');
    if (!html.includes('<head>')) throw new Error(`${piece} no tiene <head>`);
    writeFileSync(copy, html.replace('<head>', `<head><base href="${pathToFileURL(templateDir).href}/">`));
    url = pathToFileURL(copy).href;
  }
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-pipe', `--user-data-dir=${join(workDir, 'perfil')}`, '--hide-scrollbars', '--force-device-scale-factor=1', `--window-size=${width},${height}`, 'about:blank'], { stdio: ['ignore', 'ignore', 'ignore', 'pipe', 'pipe'] });
  const closed = new Promise((resolveExit) => chrome.on('exit', resolveExit).on('error', () => resolveExit(null)));
  const failed = new Promise((_, reject) => {
    chrome.on('error', reject);
    closed.then((code) => reject(new Error(`Chrome terminó antes de medir (código ${code})`)));
  });
  const { send, once } = connect(chrome);
  const run = async () => {
    const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false }, sessionId);
    await send('Page.enable', {}, sessionId);
    const loaded = once('Page.loadEventFired');
    await send('Page.navigate', { url }, sessionId);
    await loaded;
    const expression = `${moduleSource}\n;medirPieza(${JSON.stringify({ formats, format, brandCss })})`;
    const { result, exceptionDetails } = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }, sessionId);
    if (exceptionDetails) throw new Error(exceptionDetails.exception?.description ?? exceptionDetails.text);
    await send('Browser.close').catch(() => {});
    return result.value;
  };
  const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Chrome no respondió en 60 s')), TIMEOUT_MS).unref());
  try {
    return await Promise.race([run(), failed, timeout]);
  } finally {
    chrome.kill();
    await closed;
  }
}

const options = parseArguments(process.argv.slice(2));
const workDir = mkdtempSync(join(tmpdir(), 'medir-'));
try {
  const observations = await measure(options, workDir);
  const { width, height } = formats.formats[options.format];
  console.log(`${basename(options.piece)} · ${options.format} (${width} × ${height})`);
  for (const observation of observations) console.log(`- ${observation.message}`);
  console.log(observations.length ? `${observations.length} ${observations.length === 1 ? 'observación' : 'observaciones'}.` : 'Sin observaciones.');
} catch (error) {
  console.error(`No se pudo medir ${options.piece}: ${error.message}`);
  process.exitCode = 1;
} finally {
  // Los procesos hijos de Chrome pueden seguir escribiendo el perfil un momento después de salir.
  try {
    rmSync(workDir, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
  } catch {}
}
