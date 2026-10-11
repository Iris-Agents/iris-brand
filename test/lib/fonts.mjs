// Las familias que cargan las piezas de redes desde Google Fonts: las del @import de brand.css. Es
// el lado de afuera de la firma, que ahí se llama "DM Serif Display" y no "DM Serif Display Italic".
import { readText } from "./tokens.mjs";

export const googleFamilies = new Set(
	[...readText("pieces/redes/_base/brand.css").matchAll(/[?&]family=([^:&']+)/g)].map(([, family]) => family.replaceAll("+", " ")),
);
