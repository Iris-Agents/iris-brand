// La guarda de los tokens: esquemas oficiales, alias, color y tipografía. El contraste, el CSS, el
// vidrio y las piezas tienen su archivo hermano en esta carpeta.
import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { deltaEOK, hexDrift, hexOf, inSRGB } from "./lib/color.mjs";
import { createValidator } from "./lib/json-schema.mjs";
import { aliasesIn, documents, foundation, modes, readJSON, resolutions, resolved, semantics } from "./lib/tokens.mjs";

const tokenFiles = { foundation: "tokens/foundation.tokens.json", dark: "tokens/themes/dark.tokens.json", light: "tokens/themes/light.tokens.json" };

describe("esquemas oficiales DTCG 2025.10", () => {
	const validateFormat = createValidator(readJSON("test/schemas/format.json"));
	const validateResolver = createValidator(readJSON("test/schemas/resolver.json"));
	for (const [name, path] of Object.entries(tokenFiles)) {
		test(`${path} valida contra format.json`, () => assert.deepEqual(validateFormat(documents[name]), []));
	}
	test("tokens/iris.resolver.json valida contra resolver.json", () => assert.deepEqual(validateResolver(documents.resolver), []));
	test("el resolver apunta a los tres archivos, con oscuro por default", () => {
		const { sets, modifiers, resolutionOrder } = documents.resolver;
		assert.deepEqual(sets.foundation.sources, [{ $ref: "foundation.tokens.json" }]);
		assert.deepEqual(modifiers.theme.contexts, { dark: [{ $ref: "themes/dark.tokens.json" }], light: [{ $ref: "themes/light.tokens.json" }] });
		assert.equal(modifiers.theme.default, "dark");
		assert.deepEqual(resolutionOrder, [{ $ref: "#/sets/foundation" }, { $ref: "#/modifiers/theme" }]);
	});
});

describe("alias y modos", () => {
	for (const mode of modes) {
		test(`todos los alias resuelven en ${mode}`, () => assert.deepEqual(resolutions[mode].problems, []));
		test(`los semánticos de ${mode} apuntan sólo a foundation y no la pisan`, () => {
			const wrong = [...semantics[mode]].flatMap(([id, token]) => aliasesIn(token.value).filter((target) => !foundation.has(target)).map((target) => `${id} → ${target}`));
			assert.deepEqual(wrong, []);
			assert.deepEqual([...semantics[mode].keys()].filter((id) => foundation.has(id)), []);
		});
	}
	test("oscuro y claro tienen exactamente los mismos semánticos", () => {
		assert.deepEqual([...semantics.dark.keys()].sort(), [...semantics.light.keys()].sort());
	});
	test("los semánticos son sólo de color, y foundation no tiene semánticos", () => {
		for (const mode of modes) for (const [id, token] of semantics[mode]) assert.equal(token.type, "color", id);
		const semanticGroups = Object.keys(documents.dark.color);
		assert.deepEqual(Object.keys(documents.foundation.color).filter((group) => semanticGroups.includes(group) && !group.startsWith("$")), []);
	});
	test("ningún token lleva $extensions (el build no los lee)", () => {
		const withExtensions = [foundation, ...modes.map((mode) => semantics[mode])].flatMap((tokens) => [...tokens].filter(([, token]) => token.node.$extensions).map(([id]) => id));
		assert.deepEqual(withExtensions, []);
		for (const document of Object.values(documents)) assert.equal(document.$extensions, undefined);
	});
	test("todo token tiene $type, y todo semántico y todo color, su $description", () => {
		for (const [id, token] of foundation) assert.ok(token.type, `${id} sin $type`);
		const described = [...foundation].filter(([, token]) => token.type === "color").concat(...modes.map((mode) => [...semantics[mode]]));
		assert.deepEqual(described.filter(([, token]) => !token.description).map(([id]) => id), []);
	});
});

describe("color", () => {
	const declaredColors = [...foundation].filter(([, token]) => token.type === "color" && typeof token.value === "object");
	test("el hex declarado coincide con sus componentes, ida y vuelta", () => {
		for (const [id, { value }] of declaredColors) {
			assert.equal(hexOf({ ...value, alpha: 1 }), value.hex, `${id}: hex ${value.hex} pero los componentes dan ${hexOf({ ...value, alpha: 1 })}`);
			assert.ok(hexDrift(value) < 0.005, `${id}: el hex queda a ΔEOK ${hexDrift(value).toFixed(4)} de los componentes`);
		}
	});
	test("todos los colores caen adentro de sRGB", () => {
		assert.deepEqual(declaredColors.filter(([, { value }]) => !inSRGB(value)).map(([id]) => id), []);
	});
	test("cada semántico resuelve a un color en los dos modos", () => {
		for (const mode of modes) for (const id of semantics[mode].keys()) assert.match(hexOf(resolved[mode].get(id).value), /^#[0-9a-f]{6}([0-9a-f]{2})?$/, `${mode} ${id}`);
	});
	test("resuelto va en silencio: el mismo gris que text.tertiary en los dos modos", () => {
		for (const mode of modes) assert.equal(hexOf(resolved[mode].get("color.status.done").value), hexOf(resolved[mode].get("color.text.tertiary").value), mode);
	});
});

// El petróleo es el único acento de color, y va en un solo lugar: el sello de marketing.
describe("el petróleo", () => {
	test("sólo lo usa signature.marketing.block, en los dos modos", () => {
		const usersIn = (tokens) => [...tokens].filter(([, token]) => aliasesIn(token.value).includes("color.brand.petrol")).map(([id]) => id);
		assert.deepEqual(usersIn(foundation), [], "foundation");
		for (const mode of modes) assert.deepEqual(usersIn(semantics[mode]), ["color.signature.marketing.block"], mode);
	});
	test("el sello de marketing es igual en los dos modos: el bloque petróleo y la letra en la tinta del oscuro", () => {
		for (const [part, expected] of [["block", "color.brand.petrol"], ["text", "color.neutral-dark.11"]]) {
			for (const mode of modes) assert.equal(hexOf(resolved[mode].get(`color.signature.marketing.${part}`).value), hexOf(foundation.get(expected).value), `${mode} ${part}`);
		}
	});
	// Lo que tiene que esquivar. El mínimo es la distancia del azul de «novedad» que se descartó por
	// pegado al cian de Mercado Pago (ΔEOK 0,091): el petróleo tiene que quedar más lejos que eso. Los
	// estados van en los dos modos: el del claro es más oscuro y queda más cerca.
	const statuses = modes.flatMap((mode) => ["attention", "working", "failed"].map((path) => [`status.${path} (${mode})`, hexOf(resolved[mode].get(`color.status.${path}`).value)]));
	const avoided = {
		...Object.fromEntries(statuses),
		"clay de Claude": "#d97757",
		"marfil de Claude": "#f0efea",
		"marfil claro de Claude": "#faf9f5",
		"verde de Anthropic": "#788c5d",
		"azul de Anthropic": "#6a9bcc",
		"amarillo de Mercado Libre": "#ffe600",
		"azul de Mercado Libre": "#3483fa",
		"cian de Mercado Pago": "#00bcff",
		"violeta 500": "#8b5cf6",
		"violeta 400": "#a78bfa",
		"violeta 300": "#c4b5fd",
		"violeta 900": "#4c1d95",
		"menta descartada": "#a8e6cf",
		"lima descartada": "#d4f27a",
		"aguamarina descartada": "#7fbfbc",
	};
	test("queda a ΔEOK 0,091 o más de los estados, de Claude, de Anthropic, de Mercado Libre, de Mercado Pago y de los verdes y violetas descartados", (context) => {
		const petrol = hexOf(foundation.get("color.brand.petrol").value);
		const distances = Object.entries(avoided).map(([label, hex]) => ({ label, hex, distance: deltaEOK(petrol, hex) }));
		for (const { label, hex, distance } of distances.toSorted((first, second) => first.distance - second.distance)) {
			context.diagnostic(`petróleo ${petrol} contra ${label.padEnd(28)} ${hex}  ΔEOK ${distance.toFixed(3).replace(".", ",")}`);
		}
		assert.deepEqual(distances.filter(({ distance }) => distance < 0.091).map(({ label, distance }) => `${label}: ΔEOK ${distance.toFixed(3)}`), []);
	});
});

describe("tipografía", () => {
	const styles = [...resolved.dark].filter(([, token]) => token.type === "typography");
	const signatureFamily = foundation.get("font.family.signature").value[0];
	const trackingEm = (id, family, size) => {
		if (id === "typography.eyebrow") return 0.08;
		if (family === signatureFamily) return -0.01;
		if (family.includes("Mono")) return 0;
		if (size <= 12) return 0;
		if (size <= 24) return -0.01;
		if (size <= 40) return -0.015;
		return -0.02;
	};
	test("son doce estilos, con sólo los pesos 400 y 500", () => {
		assert.equal(styles.length, 12);
		for (const [id, { value }] of styles) assert.ok([400, 500].includes(value.fontWeight), `${id}: peso ${value.fontWeight}`);
		assert.deepEqual([...foundation.keys()].filter((id) => id.startsWith("font.weight.")), ["font.weight.regular", "font.weight.medium"]);
	});
	test("cada estilo cumple la regla de tracking de su familia", () => {
		for (const [id, { value }] of styles) {
			const expected = trackingEm(id, value.fontFamily[0], value.fontSize.value) * value.fontSize.value;
			assert.ok(Math.abs(expected - value.letterSpacing.value) < 0.005, `${id}: letterSpacing ${value.letterSpacing.value}px, la regla da ${expected.toFixed(2)}px`);
		}
	});
	test("nada baja de 12px", () => {
		for (const [id, { value }] of styles) assert.ok(value.fontSize.value >= 12, id);
	});
	test("la firma: sólo en la segunda línea de un titular, de 32px para arriba y en 400", () => {
		assert.equal(signatureFamily, "DM Serif Display Italic");
		for (const [id, { value }] of styles) {
			if (value.fontFamily[0] !== signatureFamily) continue;
			assert.match(id, /^typography\.headline\.[a-z]+\.second$/);
			assert.ok(value.fontSize.value >= 32, `${id}: ${value.fontSize.value}px`);
			assert.equal(value.fontWeight, 400, id);
		}
		const users = [...foundation].filter(([, token]) => aliasesIn(token.value).includes("font.family.signature")).map(([id]) => id);
		assert.deepEqual(users, ["typography.headline.hero.second", "typography.headline.section.second"]);
	});
	test("las dos líneas de cada titular comparten tamaño e interlineado", () => {
		for (const size of ["hero", "section"]) {
			const first = resolved.dark.get(`typography.headline.${size}.first`).value;
			const second = resolved.dark.get(`typography.headline.${size}.second`).value;
			assert.deepEqual([first.fontSize, first.lineHeight], [second.fontSize, second.lineHeight], size);
			assert.equal(first.fontFamily[0], foundation.get("font.family.sans").value[0], size);
		}
	});
});
