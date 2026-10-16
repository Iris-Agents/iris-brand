// pieces/redes/_base/brand.css copia a mano valores de la marca (las piezas son HTML sueltos que se
// renderizan sin build). Este test las ata a los tokens: cada variable de su :root tiene acá su
// token equivalente, y si una no está en el mapa, el test falla también.
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { test } from "node:test";
import { hexOf } from "./lib/color.mjs";
import { readText, repoUrl, resolved } from "./lib/tokens.mjs";

// Variable de brand.css → token. Las piezas son de la marca, así que leen el modo oscuro.
const colorTokens = {
	"--brand-black": "color.brand.black",
	"--brand-white": "color.brand.white",
	"--bg-canvas": "color.bg.canvas",
	"--bg-surface": "color.bg.surface",
	"--bg-raised": "color.bg.raised",
	"--bg-hover": "color.bg.hover",
	"--bg-selected": "color.bg.selected",
	"--border-subtle": "color.border.subtle",
	"--border-default": "color.border.default",
	"--border-control": "color.border.control",
	"--text-tertiary": "color.text.tertiary",
	"--text-secondary": "color.text.secondary",
	"--text-primary": "color.text.primary",
	"--signature-phrase": "color.signature.phrase",
	"--backlight-iris": "color.backlight.iris",
	"--status-attention": "color.status.attention",
	"--status-working": "color.status.working",
	"--status-done": "color.status.done",
	"--status-failed": "color.status.failed",
	"--status-idle": "color.status.idle",
};
// Familia: la primera de brand.css contra la de la pila del token que carga afuera. Las piezas traen
// la firma de Google Fonts, que la llama "DM Serif Display" (itálica por font-style): es el segundo
// nombre de la pila; el primero es la familia propia de fonts.css.
const fontTokens = {
	"--font-sans": { id: "font.family.sans", family: (families) => families[0] },
	"--font-mono": { id: "font.family.mono", family: (families) => families[0] },
	"--font-signature": { id: "font.family.signature", family: (families) => families[1] },
};

const brandCSS = readText("pieces/redes/_base/brand.css").replaceAll(/\/\*[\s\S]*?\*\//g, "");
const rootBlock = brandCSS.slice(brandCSS.indexOf(":root {"), brandCSS.indexOf("}", brandCSS.indexOf(":root {")));
const pieceVariables = new Map([...rootBlock.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()]));

test("cada variable de brand.css tiene su token en el mapa", () => {
	const mapped = [...Object.keys(colorTokens), ...Object.keys(fontTokens)];
	assert.deepEqual([...pieceVariables.keys()].filter((name) => !mapped.includes(name)), []);
});

test("los colores de brand.css son los del oscuro", () => {
	const differing = Object.entries(colorTokens)
		.filter(([name]) => pieceVariables.has(name))
		.map(([name, id]) => [name, pieceVariables.get(name).toLowerCase(), hexOf(resolved.dark.get(id).value)])
		.filter(([, pieceValue, tokenValue]) => pieceValue !== tokenValue)
		.map(([name, pieceValue, tokenValue]) => `${name}: ${pieceValue}, el token da ${tokenValue}`);
	assert.deepEqual(differing, []);
});

// La frase y la luz de las piezas que se rehicieron (la portada de Facebook y LinkedIn): sin estas dos,
// .frase y .luz se quedarían sin color y nadie se enteraría.
test("brand.css trae la frase y la luz: --signature-phrase y --backlight-iris", () => {
	for (const [name, id] of [["--signature-phrase", "color.signature.phrase"], ["--backlight-iris", "color.backlight.iris"]]) {
		assert.equal(pieceVariables.get(name)?.toLowerCase(), hexOf(resolved.dark.get(id).value), name);
	}
});

// Ninguna pieza lleva el sello: salió de las piezas el 2026-10-15 (guide/05-tipografia.md, 5.3).
test("ninguna pieza usa el sello", () => {
	const files = readdirSync(new URL("pieces/", repoUrl), { recursive: true }).filter((name) => /\.(html|css)$/.test(name));
	const withSeal = files.filter((name) => /class="[^"]*\bsello\b|\.sello\b|signature-seal|--signature-marketing/.test(readText(`pieces/${name}`).replaceAll(/\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->/g, "")));
	assert.deepEqual(withSeal, []);
});

test("las familias de brand.css son las de los tokens", () => {
	for (const [name, { id, family }] of Object.entries(fontTokens)) {
		if (!pieceVariables.has(name)) continue;
		const pieceFamily = pieceVariables.get(name).split(",")[0].trim().replaceAll(/["']/g, "");
		assert.equal(pieceFamily, family(resolved.dark.get(id).value), name);
	}
});

// pieces/redes/_base/vidrio.css (redes v2, capítulo 15) también copia colores de la marca: el negro y el
// blanco, los estados, las luces y la frase. Cada variante lee los de su modo: n1a y n1b son el
// oscuro; n2a y n2b, el claro. Lo propio de redes (el fondo de día, el vidrio, la pill del OK) no
// tiene token y no está en este mapa.
const vidrioRules = new Map(
	[...readText("pieces/redes/_base/vidrio.css").replaceAll(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{([^}]*)\}/g)].map(([, selectors, body]) => [
		selectors.split(";").at(-1).trim().replaceAll(/\s+/g, " "),
		new Map([...body.matchAll(/(--vp-[\w-]+):\s*([^;]+);?/g)].map(([, name, value]) => [name, value.trim().toLowerCase()])),
	]),
);
const vidrioTokens = {
	".vp.n1a, .vp.n1b": { mode: "dark", tokens: { "--vp-bg": "color.brand.black", "--vp-fg": "color.brand.white", "--vp-toca": "color.status.attention", "--vp-trabajando": "color.status.working", "--vp-esperando": "color.status.idle", "--vp-listo": "color.status.done", "--vp-fallo": "color.status.failed" } },
	".vp.n2a, .vp.n2b": { mode: "light", tokens: { "--vp-fg": "color.brand.black", "--vp-toca": "color.status.attention", "--vp-trabajando": "color.status.working", "--vp-esperando": "color.status.idle", "--vp-listo": "color.status.done", "--vp-fallo": "color.status.failed" } },
	".vp.n1a": { mode: "dark", tokens: { "--vp-luz": "color.backlight.iris", "--vp-frase": "color.signature.phrase" } },
	".vp.n1b": { mode: "dark", tokens: { "--vp-luz": "color.backlight.attention" } },
	".vp.n2a": { mode: "light", tokens: { "--vp-luz": "color.backlight.iris", "--vp-frase": "color.signature.phrase" } },
	".vp.n2b": { mode: "light", tokens: { "--vp-luz": "color.backlight.attention" } },
	".vp.mono.n1a, .vp.mono.n1b": { mode: "dark", tokens: { "--vp-luz": "color.backlight.neutral" } },
	".vp.mono.n2a, .vp.mono.n2b": { mode: "light", tokens: { "--vp-luz": "color.backlight.neutral" } },
};

test("los colores de la marca en vidrio.css son los de los tokens, cada variante en su modo", () => {
	const differing = [];
	for (const [selector, { mode, tokens }] of Object.entries(vidrioTokens)) {
		const declared = vidrioRules.get(selector);
		assert.ok(declared, `vidrio.css no tiene la regla ${selector}`);
		for (const [name, id] of Object.entries(tokens)) {
			const expected = hexOf(resolved[mode].get(id).value);
			if (declared.get(name) !== expected) differing.push(`${selector} ${name}: ${declared.get(name)}, ${id} (${mode}) da ${expected}`);
		}
	}
	assert.deepEqual(differing, []);
});
