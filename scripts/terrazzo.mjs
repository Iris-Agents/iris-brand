import { readFileSync } from "node:fs";
import { build, parse } from "@terrazzo/parser";
import config from "../terrazzo.config.mjs";

export const themes = ["dark", "light"];

// El mismo parseo que corre `tz build`, con la misma config.
export async function parseTokens() {
	const inputs = config.tokens.map((filename) => ({ filename, src: readFileSync(filename, "utf8") }));
	return parse(inputs, { config });
}

// Los tokens resueltos de cada modo: { dark: { "color.bg.canvas": token, … }, light: { … } }.
export async function resolveThemes() {
	const { resolver } = await parseTokens();
	return Object.fromEntries(themes.map((theme) => [theme, resolver.apply({ theme })]));
}

// dist/tokens.css tal como lo escribiría `tz build`, pero en memoria.
export async function buildTokensCSS() {
	const { tokens, resolver, sources } = await parseTokens();
	const { outputFiles } = await build(tokens, { resolver, sources, config });
	return outputFiles.find((file) => file.filename === "tokens.css").contents;
}
