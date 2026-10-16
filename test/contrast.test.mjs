// La matriz de contraste WCAG 2.2 AA, completa: cada texto y cada gráfico sobre los cinco fondos
// de cada modo (la frase y el acento, que puede ir en el texto chico de una pill, cuentan como texto). Texto 4,5:1; bordes de control, glifos de estado, foco, series, lo que importa de un gráfico y subrayado 3:1; la
// firma sobre el sello de marketing, 7:1 (va sobre el petróleo, que casi no se despega del negro).
// APCA se imprime al lado, como dato: no frena nada.
import assert from "node:assert/strict";
import { test } from "node:test";
import { apca, hexOf, wcag } from "./lib/color.mjs";
import { modes, resolved } from "./lib/tokens.mjs";

const backgrounds = ["bg.canvas", "bg.surface", "bg.raised", "bg.hover", "bg.selected"];
const texts = ["text.primary", "text.secondary", "text.tertiary", "text.placeholder", "signature.phrase", "accent", "status.failed", "action.destructive"];
const graphics = ["border.control", "status.attention", "status.working", "status.done", "status.idle", "focus", "data.series", "data.highlight", "data.comparison", "link.underline"];

const colorOf = (mode, path) => hexOf(resolved[mode].get(`color.${path}`).value);

function buildPairs() {
	const pairs = [];
	for (const mode of modes) {
		const pair = (foreground, background, minimum) => pairs.push({ mode, label: `${foreground} / ${background}`, foreground: colorOf(mode, foreground), background: colorOf(mode, background), minimum });
		for (const background of backgrounds) {
			for (const text of texts) pair(text, background, 4.5);
			for (const graphic of graphics) pair(graphic, background, 3);
		}
		pair("text.on-action", "action.primary", 4.5);
		pair("signature.text", "signature.block", 4.5);
		pair("signature.marketing.text", "signature.marketing.block", 7);
		pair("text.primary", "selection", 4.5);
	}
	const brand = (id) => hexOf(resolved.dark.get(id).value);
	pairs.push({ mode: "logo", label: "brand.white / brand.black", foreground: brand("color.brand.white"), background: brand("color.brand.black"), minimum: 3 });
	return pairs.map((pair) => ({ ...pair, ratio: wcag(pair.foreground, pair.background), lc: apca(pair.foreground, pair.background) }));
}

const pairs = buildPairs();
const formatRatio = (ratio) => ratio.toFixed(2).replace(".", ",");

test("son 189 pares con umbral, y todos llegan a su mínimo", (context) => {
	assert.equal(pairs.length, 189);
	const failing = pairs.filter((pair) => pair.ratio < pair.minimum);
	for (const mode of [...modes, "logo"]) {
		const worstByForeground = new Map();
		for (const pair of pairs.filter((item) => item.mode === mode)) {
			const foreground = pair.label.split(" / ")[0];
			if (!worstByForeground.has(foreground) || pair.ratio < worstByForeground.get(foreground).ratio) worstByForeground.set(foreground, pair);
		}
		for (const pair of worstByForeground.values()) {
			context.diagnostic(`${mode.padEnd(5)} peor ${pair.label.padEnd(36)} ${pair.foreground} sobre ${pair.background}  ${formatRatio(pair.ratio)}:1 (mín. ${formatRatio(pair.minimum)})  APCA Lc ${pair.lc.toFixed(1)}`);
		}
	}
	assert.deepEqual(
		failing.map((pair) => `${pair.mode} ${pair.label}: ${formatRatio(pair.ratio)}:1 < ${formatRatio(pair.minimum)}:1`),
		[],
	);
});

test("text.disabled queda en >= 3:1 aunque WCAG lo exima", () => {
	for (const mode of modes) for (const background of backgrounds) assert.ok(wcag(colorOf(mode, "text.disabled"), colorOf(mode, background)) >= 3, `${mode} ${background}`);
});
