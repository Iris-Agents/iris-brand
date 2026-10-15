// pieces/redes/_base/brand.css copia a mano valores de la marca (las piezas son HTML sueltos que se
// renderizan sin build). Este test las ata a los tokens: cada variable de su :root tiene acá su
// token equivalente, y si una no está en el mapa, el test falla también.
import assert from "node:assert/strict";
import { test } from "node:test";
import { hexOf } from "./lib/color.mjs";
import { readText, resolved } from "./lib/tokens.mjs";

// Variable de brand.css → token. Las piezas son de la marca, así que leen el modo oscuro. El sello
// de las piezas es el de marketing (el bloque petróleo con la firma en tinta), no el de la app.
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
	"--signature-marketing-block": "color.signature.marketing.block",
	"--signature-marketing-text": "color.signature.marketing.text",
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

// El test de arriba compara sólo lo que brand.css declara: sin estas dos, la clase .sello se quedaría
// sin color y nadie se enteraría.
test("brand.css trae el sello de marketing: --signature-marketing-block y --signature-marketing-text", () => {
	for (const [name, id] of [["--signature-marketing-block", "color.signature.marketing.block"], ["--signature-marketing-text", "color.signature.marketing.text"]]) {
		assert.equal(pieceVariables.get(name)?.toLowerCase(), hexOf(resolved.dark.get(id).value), name);
	}
});

test("las familias de brand.css son las de los tokens", () => {
	for (const [name, { id, family }] of Object.entries(fontTokens)) {
		if (!pieceVariables.has(name)) continue;
		const pieceFamily = pieceVariables.get(name).split(",")[0].trim().replaceAll(/["']/g, "");
		assert.equal(pieceFamily, family(resolved.dark.get(id).value), name);
	}
});

// El sello se escribe en dos lugares: css/signature.css (la app y la landing) y brand.css (las
// piezas). La geometría es una sola: si una copia cambia el relleno o el interlineado, las letras que
// bajan (p, g, y, f) se salen del bloque en esa copia.
const declarationsOf = (css, selector) => {
	const withoutComments = css.replaceAll(/\/\*[\s\S]*?\*\//g, "");
	const rule = [...withoutComments.matchAll(/([^{}]+)\{([^}]*)\}/g)].find(([, selectors]) => selectors.split(",").map((name) => name.trim()).includes(selector));
	assert.ok(rule, `no hay una regla para ${selector}`);
	return Object.fromEntries([...rule[2].matchAll(/([\w-]+)\s*:\s*([^;]+);?/g)].map(([, property, value]) => [property, value.trim()]));
};
const sealGeometry = (declarations) => ({ padding: declarations.padding, "line-height": declarations["line-height"] });

test("los sellos tienen la misma geometría en signature.css y brand.css", () => {
	const appSeal = sealGeometry(declarationsOf(readText("css/signature.css"), ".signature-seal"));
	const marketingSeal = sealGeometry(declarationsOf(readText("css/signature.css"), ".signature-seal-marketing"));
	const pieceSeal = sealGeometry(declarationsOf(readText("pieces/redes/_base/brand.css"), ".sello"));
	assert.deepEqual(marketingSeal, appSeal);
	assert.deepEqual(pieceSeal, appSeal);
});

test(".sello lee el sello de marketing: --signature-marketing-block y --signature-marketing-text", () => {
	const seal = declarationsOf(readText("pieces/redes/_base/brand.css"), ".sello");
	assert.deepEqual([seal.background, seal.color], ["var(--signature-marketing-block)", "var(--signature-marketing-text)"]);
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
