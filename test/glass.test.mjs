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
		graphic: ["border.control", "status.attention", "status.working", "status.done", "status.idle", "focus", "data.series", "data.comparison", "link.underline", "action.primary"],
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
