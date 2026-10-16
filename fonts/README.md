# Fuentes

Las tres familias de iris, autoalojadas en WOFF2, en los subconjuntos latin y latin-ext. Las
declara `css/fonts.css`; ninguna app las baja de un CDN. IBM Plex Sans 600 y 700 van sólo en redes
y en la landing (titulares y cifras, capítulo 15); la app usa 400 y 500.

| Archivo | Familia | Estilo | Peso | Subconjunto | Bytes | SHA-256 |
|---|---|---|---|---|---|---|
| `dm-serif-display-latin-400-italic.woff2` | DM Serif Display | itálica | 400 | latin | 24572 | `ed8b291611e32fa2d2900488dd48fc95faf0957b2ef7ddf1527e8d21dd9cf2df` |
| `dm-serif-display-latin-ext-400-italic.woff2` | DM Serif Display | itálica | 400 | latin-ext | 11124 | `e026521e59b7b3e5d3257cc76069916111683b97c24e75f0c7a9f07621aa9460` |
| `ibm-plex-sans-latin-400-normal.woff2` | IBM Plex Sans | normal | 400 | latin | 22588 | `3b646991d30055a93a4ecc499713d4347953a74a947ecab435ab72070cbdab0e` |
| `ibm-plex-sans-latin-ext-400-normal.woff2` | IBM Plex Sans | normal | 400 | latin-ext | 15980 | `c93d2a12aaa280f68b9ab7b726ff8dfedda67c99ef9abed047c1847a1cc6d583` |
| `ibm-plex-sans-latin-500-normal.woff2` | IBM Plex Sans | normal | 500 | latin | 24184 | `0717336fb31fcdcde4b8deb3675bb4a0f7f6d484864afcd6751ac29975962203` |
| `ibm-plex-sans-latin-ext-500-normal.woff2` | IBM Plex Sans | normal | 500 | latin-ext | 16456 | `2846035d85100f84c79393f80f1442d4ee720129ab8b3ffa8969aae281db8c6c` |
| `ibm-plex-sans-latin-600-normal.woff2` | IBM Plex Sans | normal | 600 | latin | 24252 | `8960851d691c054ed38e259bdcf1a6190d157b4203ed5bb32c632a863fb8ec2f` |
| `ibm-plex-sans-latin-ext-600-normal.woff2` | IBM Plex Sans | normal | 600 | latin-ext | 16448 | `b25dfd4f979e442ae1e25cd0894463434cf01ba21ac1a35d39f4a82bd4cc060e` |
| `ibm-plex-sans-latin-700-normal.woff2` | IBM Plex Sans | normal | 700 | latin | 22832 | `42e7b0c143c19df9d99fd896e76b48f846edf0902d200bc29796b34d12c33aa7` |
| `ibm-plex-sans-latin-ext-700-normal.woff2` | IBM Plex Sans | normal | 700 | latin-ext | 16188 | `92f0392bd74fa3955bfa92f6ec747e7246d3567b6f46b32ddbaf271104836ab8` |
| `ibm-plex-mono-latin-400-normal.woff2` | IBM Plex Mono | normal | 400 | latin | 14708 | `08949f728dc52d528e69b1667d15c89a5686a4ee9a296ff90983985f99c380f7` |
| `ibm-plex-mono-latin-ext-400-normal.woff2` | IBM Plex Mono | normal | 400 | latin-ext | 13348 | `6bc0f226a5b7884a8170e3f62c63d7675609d4631bdc5931b5cdab81821f00eb` |

## De dónde salió cada archivo

Sin modificar, de los paquetes de [Fontsource](https://fontsource.org) en npm, que se arman desde
el repositorio de Google Fonts (`github.com/google/fonts`). Se conserva el nombre de archivo del
paquete (`files/<nombre>`).

| Paquete | Versión | shasum del tarball | Familia en Google Fonts | Versión de la fuente |
|---|---|---|---|---|
| `@fontsource/dm-serif-display` | 5.3.0 | `e70483ece6c0e3d93bf367ca7537eb1e373345d3` | v17 (2025-09-11) | 5.200 |
| `@fontsource/ibm-plex-sans` | 5.3.0 | `8099950b404e625f65e7bd833bcb84ffe6bcd40c` | v23 (2025-09-08) | 3.201 |
| `@fontsource/ibm-plex-mono` | 5.3.0 | `1879699d104602d5331e28e103f33c3b1b766b17` | v20 (2025-09-16) | 2.3 |

Por qué Fontsource y no los archivos de `fonts.gstatic.com` (comparados con fontTools el
2026-10-10): son la misma versión y cubren exactamente los mismos caracteres, pero

- Google sirve a cada navegador un archivo distinto, y al de Mac le saca el hinting. Los de
  Fontsource lo conservan (ttfautohint), y Windows lo usa.
- Google sirve IBM Plex Sans como fuente variable (peso 100 a 700 y ancho). Acá van cortes
  estáticos: 400 y 500 para todo, y 600 y 700 para redes y la landing. Un peso que no está (300,
  800) cae en el más cercano y, con `font-synthesis: none`, no se inventa una negrita.

Los 600 y 700 se sumaron el 2026-10-16, del mismo tarball (`@fontsource/ibm-plex-sans` 5.3.0, el
mismo shasum): los 400 y 500 que ya estaban dan la misma suma que los del tarball, y los cuatro
nuevos cubren los mismos caracteres (232 en latin, 208 en latin-ext).

Verificado con fontTools en cada archivo: nombre de familia (ID 1 y 16), subfamilia (ID 2 y 17),
`usWeightClass`, los bits de itálica de `OS/2` y `head`, `italicAngle` (−12 en la firma, 0 en el
resto) y que ninguno tenga tabla `fvar`.

Lo que no está en latin: las flechas (→, U+2192) y ⌘ (U+2318). Salen de la fuente del sistema.
Los glifos de estado (● ◐ ✕ ✓ ○) no son caracteres: son SVG.

## Licencias

Las tres familias son SIL Open Font License 1.1. Los textos son los `OFL.txt` del repositorio de
Google Fonts:

- `OFL-DMSerifDisplay.txt`: `ofl/dmserifdisplay/OFL.txt`. Nombre reservado: "Source" (Adobe).
- `OFL-IBMPlex.txt`: `ofl/ibmplexsans/OFL.txt`, idéntico a `ofl/ibmplexmono/OFL.txt`. Nombre
  reservado: "Plex" (IBM).

## Fallbacks con métricas ajustadas

Mientras la fuente web no llegó (`font-display: swap`), el texto se dibuja con una fuente local
ajustada para que ocupe el mismo lugar. Así el cambio no corre nada.

| Familia del fallback | Local | size-adjust | ascent | descent | line-gap |
|---|---|---|---|---|---|
| DM Serif Display Italic Fallback | Georgia Italic | 95.76 % | 108.19 % | 34.98 % | 0 % |
| IBM Plex Sans Fallback (400) | Arial | 100.04 % | 102.46 % | 27.49 % | 0 % |
| IBM Plex Sans Fallback (500) | Arial | 102.06 % | 100.43 % | 26.95 % | 0 % |

Para 600 y 700 no hay fallback ajustado todavía: mientras la fuente no llegó, el navegador usa el
de 500. Las piezas no lo necesitan (se renderizan con la fuente cargada); la landing, sí.

Cómo se calcularon, con fontTools contra Georgia Italic 5.00x-4 y Arial 5.01.2x de macOS:

- `size-adjust` = ancho medio de la fuente web ÷ ancho medio del fallback, sobre un texto en
  castellano de la marca (avances de `hmtx` en unidades por em, sin kerning).
- `ascent-override`, `descent-override` y `line-gap-override` = la métrica de la fuente web ÷
  unidades por em ÷ size-adjust (el navegador también escala estos valores con size-adjust). Se
  toma la métrica que lee el navegador: `typo` si la fuente tiene `USE_TYPO_METRICS` (Plex), si no
  `hhea` (DM Serif Display, donde `hhea`, `typo` y `win` coinciden).

Medido en Chrome sobre un párrafo, contra la fuente web:

| Caso | Ancho ajustado | Ancho sin ajustar | Alto: web / ajustado / sin ajustar |
|---|---|---|---|
| Firma vs Georgia Italic | +0,40 % | +4,85 % | 162 / 162 / 184 px |
| Plex 400 vs Arial | −0,15 % | −0,15 % | 80 / 80 / 72 px |
| Plex 500 vs Arial | −0,25 % | −2,21 % | 80 / 80 / 72 px |

Si se actualiza una fuente, se recalculan estos valores.

## Cómo actualizar

1. `npm pack @fontsource/<familia>` y descomprimir.
2. Copiar los `files/*-latin-*` y `files/*-latin-ext-*` del estilo y peso que corresponde.
3. Verificar familia, estilo, peso y que no sean variables con fontTools.
4. Recalcular los fallbacks y actualizar esta página (versiones, tamaños y sumas).
