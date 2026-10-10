// Escribe dist/design-system.json: los tokens resueltos de los dos modos en la forma de LISTAS que
// lee el tipo Design System de claude.ai. Nombres aplanados y sin "/", oscuro primero (un token sin
// valor en un tema hereda el del primero), alfa como hex de 8 dígitos y usage desde $description.
// El movimiento queda afuera: el tipo no lo lee.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { colorToHex, primitiveColors } from "../terrazzo.config.mjs";
import { resolveThemes } from "./terrazzo.mjs";

const readText = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const read = (path) => JSON.parse(readText(path));

// Las caras de css/fonts.css que tienen archivo (los fallbacks son local() y no viajan).
const fontFiles = (fontsCSS) =>
	[...fontsCSS.matchAll(/@font-face\s*\{([^}]*)\}/g)]
		.map(([, body]) => Object.fromEntries([...body.matchAll(/([\w-]+):\s*([^;]+);/g)].map(([, property, value]) => [property, value.trim()])))
		.flatMap((face) => {
			const file = face.src?.match(/url\("\.\.\/(fonts\/[^"]+)"\)/)?.[1];
			return file ? [{ family: face["font-family"].replaceAll('"', ""), file, weight: face["font-weight"], style: face["font-style"] }] : [];
		});

// Los ids en el orden en que están escritos, que es el orden de lectura (canvas, surface, raised…).
const idsOf = (node, path = []) =>
	Object.entries(node).flatMap(([key, child]) => (key.startsWith("$") ? [] : "$value" in child ? [[...path, key].join(".")] : idsOf(child, [...path, key])));

const isPrimitive = (id) => primitiveColors.some((pattern) => id.startsWith(pattern.replace("**", "")));
const flatName = (id) => id.replace(/^(color|typography)\./, "").replaceAll(".", "-");
const px = ({ value, unit }) => `${value}${unit}`;
const fontStack = (families) => families.map((family) => (family.includes(" ") ? `"${family}"` : family)).join(", ");
// La descripción del oscuro, más las oraciones que sólo dice el claro ("En claro es…").
const sentences = (text) => text.split(/(?<=\.)\s+/);
const usageOf = (dark, light) => {
	const darkSentences = sentences(dark.$description);
	const lightOnly = light ? sentences(light.$description).filter((sentence) => !darkSentences.includes(sentence)) : [];
	return [...darkSentences, ...lightOnly].join(" ");
};
const listOf = (ids, tokens) => ids.map((id) => ({ name: flatName(id), value: px(tokens[id].$value), usage: tokens[id].$description }));

const familyGroups = [
	{ key: "sans", name: "Sans" },
	{ key: "signature", name: "Firma" },
	{ key: "mono", name: "Mono" },
];

export function buildDesignSystem({ dark, light }, order, version, fonts) {
	const colorIds = [...order.theme.filter((id) => id.startsWith("color.")), ...order.foundation.filter((id) => id.startsWith("color.brand."))];
	const colors = colorIds.map((id) => ({
		name: flatName(id),
		value: isPrimitive(id) ? colorToHex(dark[id].$value) : { dark: colorToHex(dark[id].$value), light: colorToHex(light[id].$value) },
		usage: usageOf(dark[id], light[id]),
	}));
	const styles = order.foundation.filter((id) => id.startsWith("typography."));
	const styleOf = (id) => {
		const { fontSize, lineHeight, fontWeight, letterSpacing } = dark[id].$value;
		return { name: flatName(id), fontSize: px(fontSize), lineHeight, fontWeight, letterSpacing: px(letterSpacing), usage: dark[id].$description };
	};
	return {
		name: "iris",
		version: 1,
		meta: { source: `iris-brand@${version}` },
		color: { themes: [{ id: "dark", name: "Oscuro" }, { id: "light", name: "Claro" }], tokens: colors },
		type: {
			fonts,
			families: Object.fromEntries(familyGroups.map(({ key }) => [key, fontStack(dark[`font.family.${key}`].$value)])),
			groups: familyGroups.map(({ key, name }) => ({
				name,
				family: key,
				styles: styles.filter((id) => dark[id].partialAliasOf?.fontFamily === `font.family.${key}`).map(styleOf),
			})),
		},
		spacing: { tokens: listOf(order.foundation.filter((id) => /^(space|layout|size)\./.test(id) && dark[id].$type === "dimension"), dark) },
		radius: { tokens: listOf(order.foundation.filter((id) => id.startsWith("radius.")), dark) },
	};
}

// dist/design-system.json tal como lo escribe el build, en memoria (el test lo compara con dist/).
export async function renderDesignSystem() {
	const order = { foundation: idsOf(read("tokens/foundation.tokens.json")), theme: idsOf(read("tokens/themes/dark.tokens.json")) };
	const designSystem = buildDesignSystem(await resolveThemes(), order, read("package.json").version, fontFiles(readText("css/fonts.css")));
	return `${JSON.stringify(designSystem, null, 2)}\n`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	writeFileSync(new URL("../dist/design-system.json", import.meta.url), await renderDesignSystem());
}
