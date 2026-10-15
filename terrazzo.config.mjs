import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";
import Color from "colorjs.io";

// Los primitivos no salen al CSS: un componente sólo lee semánticos, tipografía, forma y movimiento.
const primitiveColors = ["color.brand.**", "color.tint.**", "color.neutral-dark.**", "color.neutral-light.**", "color.signal.**", "color.alpha.**"];

export const cssVariableName = (tokenId) => `--iris-${tokenId.replaceAll(".", "-")}`;

// Un semántico apunta a un primitivo que no sale al CSS: se escribe con su valor (hex), no con var().
function colorToHex({ colorSpace, components, alpha = 1 }) {
	return new Color(colorSpace, components, alpha).to("srgb").toString({ format: "hex", collapse: false });
}

const inlineColor = (token) => (token.$type === "color" ? colorToHex(token.$value) : undefined);

export default defineConfig({
	tokens: ["./tokens/iris.resolver.json"],
	outDir: "./dist/",
	plugins: [
		css({
			filename: "tokens.css",
			legacyHex: true,
			exclude: primitiveColors,
			variableName: (token) => cssVariableName(token.id),
			transform: inlineColor,
			permutations: [
				{
					input: { theme: "dark" },
					prepare: (contents) => `:root,\n[data-theme="dark"] {\n  color-scheme: dark;\n  ${contents}\n}`,
				},
				{
					input: { theme: "light" },
					include: ["color.**"],
					prepare: (contents) => `[data-theme="light"] {\n  color-scheme: light;\n  ${contents}\n}`,
				},
				{
					input: { theme: "light" },
					include: ["color.**"],
					prepare: (contents) =>
						`@media (prefers-color-scheme: light) {\n  :root:not([data-theme]) {\n    color-scheme: light;\n    ${contents}\n  }\n}`,
				},
			],
		}),
	],
});
