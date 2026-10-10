// Un modelo de los tokens que no usa Terrazzo: lee los JSON y resuelve los alias por su cuenta,
// para que el test controle al build y no se controle a sí mismo.
import { readFileSync } from "node:fs";

export const repoUrl = new URL("../../", import.meta.url);
export const readText = (path) => readFileSync(new URL(path, repoUrl), "utf8");
export const readJSON = (path) => JSON.parse(readText(path));

export const modes = ["dark", "light"];
export const documents = {
	foundation: readJSON("tokens/foundation.tokens.json"),
	dark: readJSON("tokens/themes/dark.tokens.json"),
	light: readJSON("tokens/themes/light.tokens.json"),
	resolver: readJSON("tokens/iris.resolver.json"),
};

// id → { type, value, description, node }, con el $type heredado del grupo si lo hubiera.
export function flatten(document, path = [], inheritedType = undefined) {
	const tokens = new Map();
	const groupType = document.$type ?? inheritedType;
	for (const [key, child] of Object.entries(document)) {
		if (key.startsWith("$")) continue;
		const id = [...path, key].join(".");
		if ("$value" in child) tokens.set(id, { type: child.$type ?? groupType, value: child.$value, description: child.$description, node: child });
		else for (const [childId, token] of flatten(child, [...path, key], groupType)) tokens.set(childId, token);
	}
	return tokens;
}

export const foundation = flatten(documents.foundation);
export const semantics = Object.fromEntries(modes.map((mode) => [mode, flatten(documents[mode])]));

const aliasPattern = /^\{([^{}]+)\}$/;
export const aliasTarget = (value) => (typeof value === "string" ? value.match(aliasPattern)?.[1] : undefined);

// Todos los alias que aparecen adentro de un valor (también los de un typography).
export function aliasesIn(value) {
	const target = aliasTarget(value);
	if (target) return [target];
	if (value && typeof value === "object") return Object.values(value).flatMap(aliasesIn);
	return [];
}

// Lo que arma el resolver para un modo: foundation y, encima, el contexto del modo. Un alias roto o
// un ciclo no corta: queda anotado en `problems` y el valor, undefined.
export function resolveMode(mode) {
	const tokens = new Map([...foundation, ...semantics[mode]]);
	const problems = [];
	const resolveValue = (id, value, seen) => {
		const target = aliasTarget(value);
		if (target) {
			if (seen.has(target)) return void problems.push(`${mode}: ${id} tiene un ciclo en {${target}}`);
			if (!tokens.has(target)) return void problems.push(`${mode}: ${id} apunta a {${target}}, que no existe`);
			return resolveValue(id, tokens.get(target).value, new Set([...seen, target]));
		}
		if (Array.isArray(value)) return value.map((item) => resolveValue(id, item, seen));
		if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, resolveValue(id, item, seen)]));
		return value;
	};
	const resolvedTokens = new Map([...tokens].map(([id, token]) => [id, { ...token, value: resolveValue(id, token.value, new Set([id])) }]));
	return { tokens: resolvedTokens, problems };
}

export const resolutions = Object.fromEntries(modes.map((mode) => [mode, resolveMode(mode)]));
export const resolved = Object.fromEntries(modes.map((mode) => [mode, resolutions[mode].tokens]));
