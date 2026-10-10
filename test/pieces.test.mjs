// pieces/redes/_base/brand.css copia a mano valores de la marca (las piezas son HTML sueltos que se
// renderizan sin build). Este test las ata a los tokens: cada variable de su :root tiene acá su
// token equivalente, y si una no está en el mapa, el test falla también.
import assert from "node:assert/strict";
import { test } from "node:test";
import { hexOf } from "./lib/color.mjs";
import { readText, resolved } from "./lib/tokens.mjs";

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
	"--signature-block": "color.signature.block",
	"--signature-text": "color.signature.text",
	"--status-attention": "color.status.attention",
	"--status-working": "color.status.working",
	"--status-done": "color.status.done",
	"--status-failed": "color.status.failed",
	"--status-idle": "color.status.idle",
};
// Familia: se compara la primera de la lista. Las piezas cargan la firma de Google Fonts, que la
// llama "DM Serif Display" (itálica por font-style); fonts.css la declara como familia propia.
const fontTokens = {
	"--font-sans": { id: "font.family.sans", family: (families) => families[0] },
	"--font-mono": { id: "font.family.mono", family: (families) => families[0] },
	"--font-signature": { id: "font.family.signature", family: (families) => families[0].replace(/ Italic$/, "") },
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

test("las familias de brand.css son las de los tokens", () => {
	for (const [name, { id, family }] of Object.entries(fontTokens)) {
		if (!pieceVariables.has(name)) continue;
		const pieceFamily = pieceVariables.get(name).split(",")[0].trim().replaceAll(/["']/g, "");
		assert.equal(pieceFamily, family(resolved.dark.get(id).value), name);
	}
});
