// La matemática de color del test, toda con colorjs.io.
import Color from "colorjs.io";

export const toColor = ({ colorSpace, components, alpha = 1 }) => new Color(colorSpace, components, alpha);

// El hex que se escribe en el CSS: 6 dígitos, u 8 si hay alfa.
export const hexOf = (value) => toColor(value).to("srgb").toString({ format: "hex", collapse: false });

export const inSRGB = (value) => toColor(value).inGamut("srgb");

// Distancia en OKLab entre el color declarado y su hex: el redondeo a 8 bits da < 0,005.
export const hexDrift = (value) => toColor(value).deltaE(new Color(value.hex), "OK");

export const wcag = (foregroundHex, backgroundHex) => new Color(foregroundHex).contrast(new Color(backgroundHex), "WCAG21");

// APCA no es simétrico: el fondo va primero.
export const apca = (foregroundHex, backgroundHex) => new Color(backgroundHex).contrast(new Color(foregroundHex), "APCA");

// Un color con alfa sobre un fondo opaco, compuesto en sRGB codificado (lo que hacen los navegadores).
export function composite(topHex, bottomHex) {
	const top = new Color(topHex).to("srgb");
	const bottom = new Color(bottomHex).to("srgb");
	const alpha = top.alpha.valueOf();
	const coords = top.coords.map((channel, index) => channel * alpha + bottom.coords[index] * (1 - alpha));
	return new Color("srgb", coords).toString({ format: "hex", collapse: false });
}
