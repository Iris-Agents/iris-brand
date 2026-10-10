// Escribe los archivos generados del Design System «iris» de claude.ai, en design-system/:
// tokens.json (los valores de dist/design-system.json con los textos de design-system/tokens.notes.json)
// y fonts/ (los archivos de fonts/ que nombra type.fonts). Lo demás de design-system/ se escribe a mano.
import { copyFileSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const pathOf = (path) => fileURLToPath(new URL(`../${path}`, import.meta.url));
const read = (path) => JSON.parse(readFileSync(pathOf(path), "utf8"));

const withUsage = (tokens, notes) => tokens.map((token) => ({ ...token, usage: notes.tokens[token.name] ?? token.usage }));
const withFamilyNote = (family, key, notes) => ({
	...(notes.families[key] ? { note: notes.families[key] } : {}),
	...family,
	tokens: withUsage(family.tokens, notes),
});

// La firma es itálica siempre: el tipo lo lee del estilo, no de la familia.
const styleWithNotes = (style, family, notes) => ({
	...style,
	...(family === "signature" ? { fontStyle: "italic" } : {}),
	...notes.typeStyles[style.name],
});

export function buildClaudeTokens(designSystem, notes, version) {
	const { color, type, spacing, radius } = designSystem;
	return {
		name: designSystem.name,
		version: designSystem.version,
		meta: {
			source: "github",
			repo: "Iris-Agents/iris-brand",
			ref: `v${version}`,
			paths: { tokens: ["tokens/"], fonts: ["fonts/"], assets: ["logo/"], docs: ["README.md", "guide/"] },
		},
		color: { ...withFamilyNote(color, "color", notes), themes: color.themes },
		type: {
			...type,
			groups: type.groups.map((group) => ({
				...(notes.typeGroups[group.name] ? { note: notes.typeGroups[group.name] } : {}),
				...group,
				styles: group.styles.map((style) => styleWithNotes(style, group.family, notes)),
			})),
		},
		spacing: withFamilyNote(spacing, "spacing", notes),
		radius: withFamilyNote(radius, "radius", notes),
	};
}

function copyFonts(fonts) {
	const target = pathOf("design-system/fonts");
	rmSync(target, { recursive: true, force: true });
	mkdirSync(target, { recursive: true });
	for (const { file } of fonts) copyFileSync(pathOf(file), pathOf(`design-system/${file}`));
	return readdirSync(target).length;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	const { version } = read("package.json");
	const tokens = buildClaudeTokens(read("dist/design-system.json"), read("design-system/tokens.notes.json"), version);
	writeFileSync(pathOf("design-system/tokens.json"), `${JSON.stringify(tokens, null, 2)}\n`);
	const fontCount = copyFonts(tokens.type.fonts);
	console.log(`design-system/tokens.json y ${fontCount} fuentes en design-system/fonts/`);
}
