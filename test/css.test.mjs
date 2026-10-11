// Lo que sale y lo que se escribe a mano: dist/ es la foto aprobada del build, tokens.css trae sólo
// semánticos con los valores que resuelve el modelo propio, y tailwind.css, glass.css y
// signature.css sólo nombran variables que existen, sin un valor propio.
import assert from "node:assert/strict";
import { existsSync, readdirSync } from "node:fs";
import { describe, test } from "node:test";
import { buildTokensCSS } from "../scripts/terrazzo.mjs";
import { hexOf } from "./lib/color.mjs";
import { googleFamilies } from "./lib/fonts.mjs";
import { foundation, modes, readText, repoUrl, resolved, semantics } from "./lib/tokens.mjs";

const tokensCSS = readText("dist/tokens.css");
const declarationPattern = /^\s*(--[\w-]+):\s*([^;]+);/gm;
const declarationsOf = (block) => new Map([...block.matchAll(declarationPattern)].map(([, name, value]) => [name, value.trim()]));
const blockAfter = (opening, closing) => {
	const start = tokensCSS.indexOf(opening);
	assert.notEqual(start, -1, `falta el bloque ${opening}`);
	return tokensCSS.slice(start, tokensCSS.indexOf(closing, start));
};
const blocks = {
	dark: blockAfter(':root,\n[data-theme="dark"] {\n  color-scheme: dark;', "\n}"),
	light: blockAfter('[data-theme="light"] {\n  color-scheme: light;', "\n}"),
	system: blockAfter('@media (prefers-color-scheme: light) {\n  :root:not([data-theme]) {\n    color-scheme: light;', "\n  }"),
};
const rootVariables = declarationsOf(blocks.dark);
const cssName = (id) => `--iris-${id.replaceAll(".", "-")}`;

describe("dist/ es lo que genera el build", () => {
	test("dist/tokens.css coincide con el build en memoria", async () => assert.equal(tokensCSS, await buildTokensCSS()));
});

describe("dist/tokens.css", () => {
	test("ningún primitivo sale al CSS", () => {
		assert.deepEqual([...tokensCSS.matchAll(/--iris-color-(brand|neutral-dark|neutral-light|signal|alpha)-[\w-]+/g)].map(([name]) => name), []);
	});
	test("todo lo que no es un primitivo de color está en :root", () => {
		const expected = [...foundation.keys()].filter((id) => !id.startsWith("color.")).map(cssName);
		assert.deepEqual(expected.filter((name) => !rootVariables.has(name)), []);
	});
	const expectations = { dark: ["dark"], light: ["light", "system"] };
	for (const mode of modes) {
		test(`los semánticos de ${mode} valen lo que resuelve el modelo propio`, () => {
			for (const blockName of expectations[mode]) {
				const declared = declarationsOf(blocks[blockName]);
				for (const id of semantics[mode].keys()) assert.equal(declared.get(cssName(id)), hexOf(resolved[mode].get(id).value), `${blockName} ${id}`);
			}
		});
	}
	test("los bloques claros no traen nada más que color", () => {
		for (const blockName of ["light", "system"]) assert.deepEqual([...declarationsOf(blocks[blockName]).keys()].filter((name) => !name.startsWith("--iris-color-")), []);
	});
});

// El petróleo es el único acento, en un solo lugar: sale al CSS sólo como el sello de marketing.
describe("el acento de color", () => {
	const petrol = hexOf(foundation.get("color.brand.petrol").value);
	test("dist/tokens.css trae el sello de marketing en los tres bloques, y ninguna otra variable con el petróleo", () => {
		assert.deepEqual([...tokensCSS.matchAll(/--[\w-]*petrol[\w-]*/g)].map(([name]) => name), []);
		for (const [blockName, block] of Object.entries(blocks)) {
			const declared = [...declarationsOf(block)];
			assert.deepEqual(declared.filter(([name]) => name.includes("marketing")).map(([name]) => name), ["--iris-color-signature-marketing-block", "--iris-color-signature-marketing-text"], blockName);
			assert.deepEqual(declared.filter(([, value]) => value.toLowerCase() === petrol).map(([name]) => name), ["--iris-color-signature-marketing-block"], blockName);
		}
	});
	// Lo que quedó afuera (el cartón y los colores de pieza) no vuelve como token: ni un id, ni una
	// variable de CSS declarada o leída, en las piezas tampoco.
	test("ningún token se llama piece, cardboard ni cartón, en ningún archivo", () => {
		const outlawed = /piece|cardboard|cart[oó]n/i;
		const filesUnder = (folder, extensions) =>
			readdirSync(new URL(folder, repoUrl), { recursive: true })
				.filter((name) => extensions.some((extension) => name.endsWith(extension)))
				.map((name) => `${folder}${name}`);
		const withoutComments = (source) => source.replaceAll(/\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->/g, "");
		const cssFiles = ["dist/tokens.css", ...filesUnder("css/", [".css"]), ...filesUnder("pieces/", [".css", ".html"])];
		const names = [
			...[foundation, ...modes.map((mode) => semantics[mode])].flatMap((tokens) => [...tokens.keys()].map((id) => `tokens/: ${id}`)),
			...cssFiles.flatMap((path) => [...withoutComments(readText(path)).matchAll(/--[\w-]+/g)].map(([name]) => `${path}: ${name}`)),
		];
		assert.deepEqual(names.filter((entry) => outlawed.test(entry.slice(entry.indexOf(": ") + 2))), []);
	});
});

// Nombres que ya usan shadcn o Tailwind: un nombre nuestro no puede pisarlos.
const shadcnColors = ["background", "foreground", "card", "card-foreground", "popover", "popover-foreground", "primary", "primary-foreground", "secondary", "secondary-foreground", "muted", "muted-foreground", "accent", "accent-foreground", "destructive", "destructive-foreground", "border", "input", "ring", "chart-1", "chart-2", "chart-3", "chart-4", "chart-5", "sidebar", "sidebar-foreground", "sidebar-primary", "sidebar-primary-foreground", "sidebar-accent", "sidebar-accent-foreground", "sidebar-border", "sidebar-ring"];
const tailwindHues = ["red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose", "slate", "gray", "zinc", "neutral", "stone", "taupe", "mauve", "mist", "olive"];
const tailwindColorKeywords = ["black", "white", "inherit", "current", "transparent"];
const reservedByNamespace = {
	radius: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "none", "full"],
	text: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"],
	font: ["serif"],
};
// Pisados a propósito: con Plex, la familia es la misma que la app ya usa.
const intendedOverrides = ["--font-sans", "--font-mono"];

describe("css/tailwind.css", () => {
	const source = readText("css/tailwind.css");
	const theme = declarationsOf(source.slice(source.indexOf("@theme inline {")));
	const namesIn = (namespace) => [...theme.keys()].filter((name) => name.startsWith(`--${namespace}-`) && !name.includes("--", 2)).map((name) => name.slice(namespace.length + 3));

	test("es un @theme inline sin un solo valor: cada nombre es un var() de tokens.css que existe", () => {
		assert.ok(theme.size > 0);
		for (const [name, value] of theme) {
			const reference = value.match(/^var\((--iris-[\w-]+)\)$/)?.[1];
			assert.ok(reference, `${name}: ${value} no es var(--iris-…)`);
			assert.ok(rootVariables.has(reference), `${name} apunta a ${reference}, que tokens.css no tiene`);
		}
	});
	test("ningún color choca con shadcn ni con la paleta de Tailwind", () => {
		const colors = namesIn("color");
		assert.deepEqual(colors.filter((name) => shadcnColors.includes(name) || tailwindColorKeywords.includes(name) || tailwindHues.some((hue) => name === hue || name.startsWith(`${hue}-`))), []);
	});
	test("radios, estilos de texto y familias no pisan los de Tailwind ni los de shadcn", () => {
		for (const [namespace, reserved] of Object.entries(reservedByNamespace)) assert.deepEqual(namesIn(namespace).filter((name) => reserved.includes(name)), [], namespace);
		const sharedWithTailwind = [...theme.keys()].filter((name) => /^--font-(sans|mono)$/.test(name));
		assert.deepEqual(sharedWithTailwind, intendedOverrides);
	});
	test("un estilo de texto no se llama como un color (los dos son text-*)", () => {
		const colors = namesIn("color");
		assert.deepEqual(namesIn("text").filter((name) => colors.includes(name)), []);
	});
	test("están todos los semánticos de color salvo el vidrio, que va por glass.css", () => {
		const mapped = new Set([...theme.values()]);
		const missing = [...semantics.dark.keys()].filter((id) => !id.startsWith("color.glass.")).filter((id) => !mapped.has(`var(${cssName(id)})`));
		assert.deepEqual(missing, []);
	});
});

describe("css/fonts.css", () => {
	const source = readText("css/fonts.css");
	const declared = new Set([...source.matchAll(/font-family:\s*"([^"]+)"/g)].map(([, family]) => family));
	const systemFamilies = ["serif", "sans-serif", "monospace", "ui-monospace", "system-ui", "SFMono-Regular", "Menlo"];
	// La pila empieza por la familia de este archivo. La firma trae además su nombre de afuera, el de
	// Google Fonts ("DM Serif Display"): es la única que puede faltar acá, y sólo si brand.css la carga.
	test("la primera familia de cada pila y las demás que no son del sistema ni de Google Fonts están declaradas con @font-face", () => {
		const stacks = [...foundation].filter(([id]) => id.startsWith("font.family.")).map(([, token]) => token.value);
		assert.deepEqual(stacks.map((families) => families[0]).filter((family) => !declared.has(family)), [], "primeras sin @font-face");
		const rest = stacks.flatMap((families) => families.slice(1));
		assert.deepEqual(rest.filter((family) => !systemFamilies.includes(family) && !declared.has(family) && !googleFamilies.has(family)), []);
	});
	test("cada archivo que nombra existe", () => {
		const files = [...source.matchAll(/url\("\.\.\/(fonts\/[^"]+)"\)/g)].map(([, path]) => path);
		assert.ok(files.length > 0);
		assert.deepEqual(files.filter((path) => !existsSync(new URL(path, repoUrl))), []);
	});
});

describe("css/signature.css", () => {
	const source = readText("css/signature.css").replaceAll(/\/\*[\s\S]*?\*\//g, "");
	test("sólo lee variables que tokens.css tiene", () => {
		const references = [...source.matchAll(/var\((--[\w-]+)\)/g)].map(([, name]) => name);
		assert.ok(references.length > 0);
		assert.deepEqual(references.filter((name) => !rootVariables.has(name)), []);
	});
	test("no escribe ningún color propio", () => {
		assert.deepEqual([...source.matchAll(/#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(|oklch\(/gi)].map(([match]) => match), []);
	});
	// Si se cruzan, el petróleo entra a la app.
	test("cada sello lee los colores de su lugar: .signature-seal los de la app, .signature-seal-marketing los de marketing", () => {
		const colorsOf = (className) =>
			[...source.matchAll(/([^{}]+)\{([^}]*)\}/g)]
				.filter(([, selectors]) => selectors.split(",").map((selector) => selector.trim()).includes(`.${className}`))
				.flatMap(([, , body]) => [...body.matchAll(/(background-color|color):\s*var\((--[\w-]+)\)/g)].map(([, property, name]) => `${property}: ${name}`));
		assert.deepEqual(colorsOf("signature-seal"), ["background-color: --iris-color-signature-block", "color: --iris-color-signature-text"]);
		assert.deepEqual(colorsOf("signature-seal-marketing"), ["background-color: --iris-color-signature-marketing-block", "color: --iris-color-signature-marketing-text"]);
	});
});

describe("css/glass.css", () => {
	const source = readText("css/glass.css").replaceAll(/\/\*[\s\S]*?\*\//g, "");
	test("sólo lee variables que tokens.css tiene", () => {
		const references = [...source.matchAll(/var\((--[\w-]+)\)/g)].map(([, name]) => name);
		assert.ok(references.length > 0);
		assert.deepEqual(references.filter((name) => !rootVariables.has(name)), []);
	});
	test("no escribe ningún color propio (sólo los del sistema en forced-colors)", () => {
		assert.deepEqual([...source.matchAll(/#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(|oklch\(/gi)].map(([match]) => match), []);
	});
});
