# Medir una pieza

Mide una pieza de redes terminada y dice en palabras lo que el ojo de un modelo no ve. No frena,
no puntúa y no tiene ids: cada observación dice qué midió, dónde, cuánto dio, contra qué y la
sección del manual que lo explica. Qué se hace con eso lo decide quien arma la pieza.

Mide cinco cosas, y nada más:

- **Zonas:** texto fuera de la zona segura del formato o sobre lo que tapa la red (el contador
  de Instagram, la foto de perfil de Facebook, los botones del reel). Las medidas son las de
  `../formatos.json`.
- **Tamaños:** texto bajo el piso del formato (22 px a 1080) y titular bajo el suyo (64 px). El
  tamaño es el que se ve, con el zoom y los `transform` de la pieza.
- **Fuentes:** una cara que no cargó, un texto en una familia que no es de la marca, un peso o
  una itálica que la marca no carga, y cada carácter que la fuente no trae y sale con otra, como
  la «→» o un emoji.
- **Colores:** el texto, el fondo, el borde, el relleno de un SVG y los degradés que no están en la
  paleta de `../brand.css`, o que llevan transparencia, también en un `::before` o un `::after` (el
  brillo del vidrio es uno). Pasa la luz radial blanca de hasta el 6 % y el fundido hacia el negro. La foto (`img`,
  `video`) no se mide, ni el texto que un recorte de 1 × 1 px deja sólo para lectores de pantalla.
- **Desborde:** texto que se sale de una caja que se ve (con fondo o borde) o que lo recorta.

Mide contra `brand.css`. En una pieza de vidrio (redes v2) avisa por la luz, la frase, el vidrio y
los pesos 600 y 700, que son de `vidrio.css`: esos avisos son esperables (capítulo 15).

## El comando

Para medir un HTML a mano. Abre la pieza en Chrome headless al tamaño del formato, mide e imprime;
sale con 0 aunque haya observaciones.

```sh
pnpm medir <pieza.html> <formato>
pnpm medir --plantilla <carpeta-de-la-plantilla> <pieza.html> <formato>
```

- Los formatos son los de `../formatos.json`: `perfil`, `portada-facebook`, `feed-4x5`,
  `cuadrado`, `carrusel`, `story`, `reel` y `destacada`. Una story que también va de portada de
  reel se mide dos veces, como `story` y como `reel`.
- `--plantilla`, como en `render.sh`, mide una copia con `<base href>` en esa carpeta: así resuelven
  las rutas relativas de una pieza copiada de una plantilla.
- Chrome sale de la variable `CHROME`, o de la ruta de macOS
  (`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`). Hace falta internet para las
  fuentes de Google, igual que para renderizar.
- Sin pnpm: `node pieces/redes/_base/medir/medir.mjs <pieza.html> <formato>`.

## En la página del operador

`en-la-pagina.js` no importa nada: se inyecta en la página ya cargada y define
`medirPieza({ formats, format, brandCss })`, que devuelve una promesa con la lista de
observaciones. `formats` es el contenido de `../formatos.json`; `format`, el nombre del formato, y
`brandCss`, el texto de `../brand.css`, de donde sale la paleta. Con Playwright, en Node:

```js
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const base = 'iris-brand/pieces/redes/_base';
await page.setViewportSize({ width: 1080, height: 1350 });
await page.goto(pathToFileURL('pieza.html').href);
await page.addScriptTag({ path: `${base}/medir/en-la-pagina.js` });
const observations = await page.evaluate((input) => medirPieza(input), {
  formats: JSON.parse(readFileSync(`${base}/formatos.json`, 'utf8')),
  format: 'feed-4x5',
  brandCss: readFileSync(`${base}/brand.css`, 'utf8'),
});
for (const observation of observations) console.log(observation.message);
```

En Python es lo mismo con `page.add_script_tag(path=…)` y
`page.evaluate("input => medirPieza(input)", {...})`. El tamaño de la página tiene que ser el del
formato, y se mide el cuadro que se va a capturar. En una pieza animada, cada cuadro quieto que
importa: en un reel, el intercambio completo, al final de la secuencia, y el cuadro de cierre.

Cada observación trae:

| Campo | Qué es |
|---|---|
| `check` | Qué midió: `zone`, `size`, `font`, `color` u `overflow`. |
| `where` | Dónde: el texto entre comillas y su elemento, o el elemento y su propiedad. |
| `box` | La caja en px de la pieza, cuando la hay. |
| `measured` | Cuánto dio. |
| `against` | Contra qué, con el porqué. |
| `manual` | La sección del manual o el archivo que lo explica. |
| `message` | Todo eso en una oración. |

## Lo que no mide

Lo que no se puede medir bien desde la página: el rol de cada texto (por eso el piso es el de los
rótulos y sólo el titular tiene el suyo), dónde caen el logo y los dibujos (las zonas se miden sólo
en el texto), el contraste sobre la foto, el texto de los
pseudoelementos (`::before`, `::after`), una imagen que no sea la foto, los filtros y los modos de
mezcla. Eso sigue en la revisión de la PNG (`../../plantillas.md`, 7).
