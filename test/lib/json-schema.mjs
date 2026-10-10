// Validador de JSON Schema draft-07 con las palabras clave que usan los esquemas oficiales de
// DTCG 2025.10 (test/schemas/). Una palabra clave que no conoce hace fallar la validación, para que
// un esquema nuevo nunca pase en silencio. `format` es una anotación: no se valida (como en
// draft-07 sin el vocabulario de formatos).
const annotations = new Set(["$schema", "$id", "$comment", "title", "description", "definitions", "format", "default", "examples"]);

const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const typeMatches = {
	object: isObject,
	array: Array.isArray,
	string: (value) => typeof value === "string",
	number: (value) => typeof value === "number",
	integer: Number.isInteger,
	boolean: (value) => typeof value === "boolean",
	null: (value) => value === null,
};

function deepEqual(first, second) {
	if (first === second) return true;
	if (typeof first !== "object" || typeof second !== "object" || first === null || second === null) return false;
	if (Array.isArray(first) !== Array.isArray(second)) return false;
	const firstKeys = Object.keys(first);
	return firstKeys.length === Object.keys(second).length && firstKeys.every((key) => deepEqual(first[key], second[key]));
}

// Registra cada subesquema con $id y la URI base de cada nodo, para resolver $ref relativos.
function indexSchema(root) {
	const byId = new Map();
	const baseOf = new WeakMap();
	const visit = (node, base) => {
		if (!node || typeof node !== "object") return;
		let current = base;
		if (!Array.isArray(node) && typeof node.$id === "string") {
			current = new URL(node.$id, base).href.replace(/#$/, "");
			byId.set(current, node);
		}
		baseOf.set(node, current);
		for (const child of Object.values(node)) visit(child, current);
	};
	visit(root, root.$id);
	return { byId, baseOf };
}

function resolvePointer(document, fragment) {
	if (!fragment) return document;
	return fragment
		.slice(1)
		.split("/")
		.map((part) => decodeURIComponent(part).replaceAll("~1", "/").replaceAll("~0", "~"))
		.reduce((node, key) => node?.[key], document);
}

export function createValidator(rootSchema) {
	const { byId, baseOf } = indexSchema(rootSchema);

	const deref = (ref, base) => {
		const [documentUri, fragment] = new URL(ref, base).href.split("#");
		const target = resolvePointer(byId.get(documentUri), fragment);
		if (target === undefined) throw new Error(`$ref sin destino: ${ref} (base ${base})`);
		return target;
	};

	function check(schema, instance, path) {
		if (schema === true) return [];
		if (schema === false) return [`${path}: no se permite ningún valor`];
		const base = baseOf.get(schema);
		if (typeof schema.$ref === "string") return check(deref(schema.$ref, base), instance, path);
		const errors = [];
		const fail = (message) => errors.push(`${path || "/"}: ${message}`);
		for (const [keyword, value] of Object.entries(schema)) {
			if (annotations.has(keyword)) continue;
			const rule = rules[keyword];
			if (!rule) throw new Error(`palabra clave sin soporte en el validador: ${keyword}`);
			rule(value, instance, { schema, path, fail, errors });
		}
		return errors;
	}

	const rules = {
		type: (types, instance, { fail }) => {
			if (![types].flat().some((type) => typeMatches[type](instance))) fail(`se esperaba ${[types].flat().join(" o ")}`);
		},
		enum: (options, instance, { fail }) => options.some((option) => deepEqual(option, instance)) || fail(`no está en ${JSON.stringify(options)}`),
		const: (expected, instance, { fail }) => deepEqual(expected, instance) || fail(`se esperaba ${JSON.stringify(expected)}`),
		pattern: (pattern, instance, { fail }) => typeof instance !== "string" || new RegExp(pattern, "u").test(instance) || fail(`no cumple ${pattern}`),
		minimum: (limit, instance, { fail }) => typeof instance !== "number" || instance >= limit || fail(`menor que ${limit}`),
		maximum: (limit, instance, { fail }) => typeof instance !== "number" || instance <= limit || fail(`mayor que ${limit}`),
		exclusiveMaximum: (limit, instance, { fail }) => typeof instance !== "number" || instance < limit || fail(`no es menor que ${limit}`),
		minItems: (limit, instance, { fail }) => !Array.isArray(instance) || instance.length >= limit || fail(`menos de ${limit} elementos`),
		maxItems: (limit, instance, { fail }) => !Array.isArray(instance) || instance.length <= limit || fail(`más de ${limit} elementos`),
		minProperties: (limit, instance, { fail }) => !isObject(instance) || Object.keys(instance).length >= limit || fail(`menos de ${limit} claves`),
		required: (keys, instance, { fail }) => {
			if (isObject(instance)) for (const key of keys) if (!(key in instance)) fail(`falta ${key}`);
		},
		properties: (properties, instance, { path, errors }) => {
			if (!isObject(instance)) return;
			for (const [key, schema] of Object.entries(properties)) if (key in instance) errors.push(...check(schema, instance[key], `${path}/${key}`));
		},
		patternProperties: (patterns, instance, { path, errors }) => {
			if (!isObject(instance)) return;
			for (const [pattern, schema] of Object.entries(patterns)) {
				const matcher = new RegExp(pattern, "u");
				for (const key of Object.keys(instance)) if (matcher.test(key)) errors.push(...check(schema, instance[key], `${path}/${key}`));
			}
		},
		additionalProperties: (schema, instance, context) => {
			if (!isObject(instance)) return;
			const declared = Object.keys(context.schema.properties ?? {});
			const patterns = Object.keys(context.schema.patternProperties ?? {}).map((pattern) => new RegExp(pattern, "u"));
			for (const key of Object.keys(instance)) {
				if (declared.includes(key) || patterns.some((matcher) => matcher.test(key))) continue;
				if (schema === false) context.fail(`clave no permitida: ${key}`);
				else context.errors.push(...check(schema, instance[key], `${context.path}/${key}`));
			}
		},
		items: (items, instance, { path, errors }) => {
			if (!Array.isArray(instance)) return;
			instance.forEach((item, index) => {
				const schema = Array.isArray(items) ? items[index] : items;
				if (schema !== undefined) errors.push(...check(schema, item, `${path}/${index}`));
			});
		},
		additionalItems: (schema, instance, context) => {
			if (!Array.isArray(instance) || !Array.isArray(context.schema.items)) return;
			instance.slice(context.schema.items.length).forEach((item, offset) => {
				const index = context.schema.items.length + offset;
				if (schema === false) context.fail(`elemento de más en ${index}`);
				else context.errors.push(...check(schema, item, `${context.path}/${index}`));
			});
		},
		allOf: (schemas, instance, { path, errors }) => {
			for (const schema of schemas) errors.push(...check(schema, instance, path));
		},
		anyOf: (schemas, instance, { path, fail }) => schemas.some((schema) => check(schema, instance, path).length === 0) || fail("no cumple ningún anyOf"),
		oneOf: (schemas, instance, { path, fail }) => {
			const passing = schemas.filter((schema) => check(schema, instance, path).length === 0).length;
			if (passing !== 1) fail(`cumple ${passing} opciones de oneOf (tiene que ser 1)`);
		},
		not: (schema, instance, { path, fail }) => check(schema, instance, path).length > 0 || fail("cumple un not"),
		if: (condition, instance, { schema, path, errors }) => {
			const branch = check(condition, instance, path).length === 0 ? schema.then : schema.else;
			if (branch !== undefined) errors.push(...check(branch, instance, path));
		},
		then: () => {},
		else: () => {},
	};

	return (instance) => check(rootSchema, instance, "");
}
