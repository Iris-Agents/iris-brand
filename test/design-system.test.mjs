// design-system/ es la fuente del Design System «iris» de claude.ai. Este test ata sus archivos al
// repo: los valores salen de los tokens, cada token tiene su nota, ninguna nota sobra, y los previews
// usan sólo variables que el sistema compila.
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { buildClaudeTokens } from "../scripts/design-system-claude.mjs";

const pathOf = (path) => fileURLToPath(new URL(`../${path}`, import.meta.url));
const readText = (path) => readFileSync(pathOf(path), "utf8");
const read = (path) => JSON.parse(readText(path));

const designSystem = read("dist/design-system.json");
const notes = read("design-system/tokens.notes.json");
const tokenNames = ["color", "spacing", "radius"].flatMap((family) => designSystem[family].tokens.map((token) => token.name));
const styleNames = designSystem.type.groups.flatMap((group) => group.styles.map((style) => style.name));

test("design-system/tokens.json es lo que genera el build", () => {
	const expected = buildClaudeTokens(designSystem, notes, read("package.json").version);
	assert.deepEqual(read("design-system/tokens.json"), expected, "corré pnpm build");
});

test("cada token y cada estilo tiene su nota, y ninguna nota sobra", () => {
	assert.deepEqual(tokenNames.filter((name) => !notes.tokens[name]), [], "tokens sin nota");
	assert.deepEqual(Object.keys(notes.tokens).filter((name) => !tokenNames.includes(name)), [], "notas de tokens que ya no existen");
	assert.deepEqual(Object.keys(notes.typeStyles).filter((name) => !styleNames.includes(name)), [], "notas de estilos que ya no existen");
});

test("los previews usan sólo variables que el sistema compila", () => {
	const families = Object.keys(designSystem.type.families).map((key) => `font-${key}`);
	const known = new Set([...tokenNames, ...families]);
	const previews = readdirSync(pathOf("design-system/components")).map((name) => `design-system/components/${name}/preview.html`);
	const unknown = previews.flatMap((path) =>
		[...readText(path).matchAll(/var\(--([\w.-]+)/g)].map(([, name]) => name).filter((name) => !known.has(name)).map((name) => `${path}: --${name}`),
	);
	assert.deepEqual(unknown, []);
});
