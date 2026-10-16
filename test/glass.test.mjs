// El vidrio: los tintes son los neutros que dicen ser, y el texto permitido pasa con lo peor que
// puede quedar detrás (blanco puro o negro puro) aunque el desenfoque no se pinte. Compone en sRGB
// codificado, como los navegadores.
import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { composite, hexOf, wcag } from "./lib/color.mjs";
import { foundation, modes, resolved } from "./lib/tokens.mjs";

const worstBackdrops = ["#ffffff", "#000000"];
const allowed = {
	bar: { text: ["text.primary", "text.secondary"], graphic: ["action.primary", "focus"] },
	panel: {
		text: ["text.primary", "text.secondary", "text.tertiary", "text.placeholder", "signature.phrase", "status.failed", "action.destructive"],
		graphic: ["border.control", "status.attention", "status.working", "status.done", "status.idle", "focus", "data.series", "data.highlight", "data.comparison", "link.underline", "action.primary"],
	},
};

const colorOf = (mode, path) => resolved[mode].get(`color.${path}`).value;

describe("los tintes del vidrio", () => {
	test("cada alfa repite los componentes del neutro de su nombre", () => {
		for (const [id, { value }] of foundation) {
			const match = id.match(/^color\.alpha\.(neutral-(?:dark|light))-(\d+)-(\d+)$/);
			if (!match) continue;
			const [, scale, step, percent] = match;
			const neutral = resolved.dark.get(`color.${scale}.${step}`).value;
			assert.deepEqual(value.components, neutral.components, id);
			assert.equal(value.alpha, Number(percent) / 100, id);
		}
	});
	test("blanco y negro con alfa dicen su alfa en el nombre", () => {
		for (const [id, { value }] of foundation) {
			const match = id.match(/^color\.alpha\.(white|black)-(\d+)$/);
			if (!match) continue;
			assert.deepEqual(value.components, match[1] === "white" ? [1, 1, 1] : [0, 0, 0], id);
			assert.equal(value.alpha, Number(match[2]) / 100, id);
		}
	});
	for (const mode of modes) {
		test(`${mode}: la barra es bg.surface y el panel es bg.raised, con alfa`, () => {
			assert.equal(hexOf({ ...colorOf(mode, "glass.bar"), alpha: 1 }), hexOf(colorOf(mode, "bg.surface")));
			assert.equal(hexOf({ ...colorOf(mode, "glass.panel"), alpha: 1 }), hexOf(colorOf(mode, "bg.raised")));
			assert.ok(colorOf(mode, "glass.bar").alpha < 1 && colorOf(mode, "glass.panel").alpha < 1);
		});
	}
});

describe("legibilidad del vidrio con el peor fondo detrás", () => {
	for (const mode of modes) {
		for (const [level, { text, graphic }] of Object.entries(allowed)) {
			test(`${mode}: glass.${level}`, (context) => {
				const failing = [];
				for (const backdrop of worstBackdrops) {
					const surface = composite(hexOf(colorOf(mode, `glass.${level}`)), backdrop);
					const ratios = [...text.map((path) => [path, 4.5]), ...graphic.map((path) => [path, 3])].map(([path, minimum]) => ({ path, minimum, ratio: wcag(hexOf(colorOf(mode, path)), surface) }));
					const worst = ratios.reduce((lowest, item) => (item.ratio / item.minimum < lowest.ratio / lowest.minimum ? item : lowest));
					context.diagnostic(`${mode} glass.${level} sobre ${backdrop} da ${surface}; el más justo: ${worst.path} ${worst.ratio.toFixed(2)}:1`);
					failing.push(...ratios.filter((item) => item.ratio < item.minimum).map((item) => `${item.path} sobre ${surface}: ${item.ratio.toFixed(2)}:1`));
				}
				assert.deepEqual(failing, []);
			});
		}
	}
});

// El vidrio de redes y de la landing (glass.marketing) es más transparente: no pasa con cualquier fondo
// detrás, pasa con los de la marca. El peor punto es el centro de cada luz (el degradé radial ahí da
// el color pleno) y la esquina del brillo; adentro, también sobre el relleno de filas y pills. Lo que
// no tiene luz detrás puede llevar además el gris terciario y el texto rojo. Sin backdrop-filter, el
// tinte de reserva es casi opaco: con cualquier fondo de la marca detrás, pasa todo.
const marketing = {
	withLight: {
		text: ["text.primary", "text.secondary", "signature.phrase"],
		graphic: ["status.attention", "status.working", "status.done", "status.idle", "status.failed", "action.primary", "data.series", "data.highlight", "data.comparison"],
	},
	withoutLight: { text: ["text.tertiary", "status.failed"], graphic: [] },
};
const hexAt = (mode, path) => hexOf(colorOf(mode, path));
const ratiosOn = (mode, surface, { text, graphic }) =>
	[...text.map((path) => [path, 4.5]), ...graphic.map((path) => [path, 3])].map(([path, minimum]) => ({ path, minimum, ratio: wcag(hexAt(mode, path), surface) }));
const insideGlass = (mode, backdrop) => {
	const glass = composite(hexAt(mode, "glass.marketing.tint"), backdrop);
	return { glass, sheen: composite(hexAt(mode, "glass.marketing.sheen-start"), glass), fill: composite(hexAt(mode, "glass.marketing.fill"), glass) };
};

describe("el vidrio de redes y de la landing", () => {
	for (const mode of modes) {
		const canvas = hexAt(mode, "glass.marketing.canvas");
		const lights = ["backlight.iris", "backlight.attention", "backlight.neutral"].map((path) => [path, hexAt(mode, path)]);
		test(`${mode}: con la luz detrás, sobre el vidrio, su brillo y su relleno`, (context) => {
			const failing = [];
			for (const [label, backdrop] of [["glass.marketing.canvas", canvas], ...lights]) {
				for (const [layer, surface] of Object.entries(insideGlass(mode, backdrop))) {
					const ratios = ratiosOn(mode, surface, marketing.withLight);
					const worst = ratios.reduce((lowest, item) => (item.ratio / item.minimum < lowest.ratio / lowest.minimum ? item : lowest));
					context.diagnostic(`${mode} ${layer} sobre ${label} da ${surface}; el más justo: ${worst.path} ${worst.ratio.toFixed(2)}:1`);
					failing.push(...ratios.filter((item) => item.ratio < item.minimum).map((item) => `${item.path} sobre ${layer} (${label}): ${item.ratio.toFixed(2)}:1`));
				}
			}
			assert.deepEqual(failing, []);
		});
		test(`${mode}: sin luz detrás, también el gris terciario y el texto rojo`, () => {
			const failing = Object.entries(insideGlass(mode, canvas)).flatMap(([layer, surface]) =>
				ratiosOn(mode, surface, marketing.withoutLight).filter((item) => item.ratio < item.minimum).map((item) => `${item.path} sobre ${layer}: ${item.ratio.toFixed(2)}:1`),
			);
			assert.deepEqual(failing, []);
		});
		test(`${mode}: sin backdrop-filter, la reserva pasa con todo, con la luz detrás o sin ella`, () => {
			const failing = [];
			for (const backdrop of [canvas, ...lights.map(([, hex]) => hex)]) {
				const surface = composite(hexAt(mode, "glass.marketing.fallback"), backdrop);
				const all = { text: [...marketing.withLight.text, ...marketing.withoutLight.text], graphic: marketing.withLight.graphic };
				failing.push(...ratiosOn(mode, surface, all).filter((item) => item.ratio < item.minimum).map((item) => `${item.path} sobre ${surface}: ${item.ratio.toFixed(2)}:1`));
			}
			assert.deepEqual(failing, []);
		});
		// Una foto no es un fondo de la marca: el tinte no alcanza y lo que va encima lo decide el
		// capítulo 15. El número queda a la vista, también el de la reserva.
		test(`${mode}: sobre una foto, el tinte solo no garantiza nada (dato)`, (context) => {
			for (const backdrop of worstBackdrops) {
				for (const layer of ["tint", "fallback"]) {
					const surface = composite(hexAt(mode, `glass.marketing.${layer}`), backdrop);
					const ratios = ["text.primary", "text.secondary", "status.failed"].map((path) => `${path} ${wcag(hexAt(mode, path), surface).toFixed(2)}:1`);
					context.diagnostic(`${mode} glass.marketing.${layer} sobre una foto ${backdrop} da ${surface}: ${ratios.join(", ")}`);
				}
			}
		});
	}
});
