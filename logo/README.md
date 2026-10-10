# Logo

El logo de iris en vectores y sus exportes. Todo está en contornos: ningún archivo depende de una
fuente instalada. El dibujo sale de DM Serif Display itálica (SIL OFL 1.1).

Los SVG son la fuente de verdad. El logo nunca se tipea: si hay SVG, se usa el SVG. Donde no se
puede usar SVG, va un PNG de `png/`.

## Los archivos

| Archivo | Qué es | Cuándo va |
|---|---|---|
| `icon.svg` | El ícono: la i en `brand.white` (#FAFAF9) sobre un cuadrado `brand.black` (#0A0A09), a sangre. La i mide 0,64 del lado. | Todo espacio cuadrado de 24 px para arriba: ícono de app, avatar cuadrado (página de empresa, conector de Claude, panel de developers), fuente de los PNG. |
| `icon-small.svg` | El master chico: la misma i, ajustada a la grilla de 32 px. Mide 0,75 del lado. | De 16 a 23 px: el favicon SVG, la pestaña del navegador. |
| `icon-profile.svg` | El ícono para fotos de perfil que se recortan en círculo: la i a 0,775 del lado, entera dentro del círculo del 80 %. | Instagram, Facebook, WhatsApp. Es el mismo dibujo que `pieces/redes/perfil/perfil.html`. |
| `wordmark.svg` | El logotipo «iris agents», con `fill="currentColor"`. | SVG en línea o como máscara CSS: toma el color del texto que lo rodea. |
| `wordmark-white.svg` | El logotipo en `brand.white`. | Sobre fondo oscuro, cuando va como `<img>` o en una herramienta que no hereda color. |
| `wordmark-black.svg` | El logotipo en `brand.black`. | Sobre fondo claro, en las mismas condiciones. |
| `lockup.svg` | Ícono y logotipo en una pieza, para fondo oscuro. El cuadrado lleva el borde `border.default` (#3A3937) para no perderse contra el negro. | El logo principal: web, firma de mail, documentos, banner. |
| `lockup-on-light.svg` | El mismo lockup para fondo claro: palabra en `brand.black`, cuadrado sin borde. | Lo mismo, sobre claro. |
| `favicon.ico` | 16 y 32 px, desde `icon-small.svg`. | El favicon de respaldo para lo que no lee SVG. |
| `apple-touch-icon.png` | 180 px, desde `icon.svg`. | Ícono de iOS al guardar la web en la pantalla de inicio. iOS le pone su máscara. |
| `icon-192.png`, `icon-512.png` | Desde `icon.svg`. | Los íconos del manifest de la web. |
| `icon-1024.png` | Desde `icon.svg`. | Donde piden un PNG grande: tiendas, directorios de apps, el panel de developers de Mercado Libre. |
| `icon-maskable-512.png` | El mismo dibujo que `icon-512.png`: la i a 0,64 ya entra en el círculo seguro de radio 0,4 (su píxel más lejano cae a 0,33 del centro). | El ícono del manifest con `purpose: "maskable"`: Android le pone su máscara (círculo, squircle). |
| `png/` | El logotipo y el lockup con fondo transparente, y el ícono en más tamaños. | Canva, Google Docs y Slides, Keynote, Notion, la firma de mail: lo que no lee SVG. La tabla está en «Los PNG, para lo que no lee SVG». |
| `preview.png` | La hoja de contacto: cada PNG de `png/` sobre #0A0A09 y sobre #FAFAF9, con su nombre abajo. | Para elegir cuál bajar. |

Ningún archivo del ícono trae esquinas redondeadas ni transparencia: va cuadrado y a sangre, y cada
plataforma pone su máscara. El radio existe sólo en el lockup y cuando una pieza dibuja el ícono
como tile.

No hay versiones a color, con degradé ni en gris.

## Tamaños mínimos

| Pieza | Mínimo |
|---|---|
| Ícono (`icon.svg`) | 24 px de lado. |
| Ícono chico (`icon-small.svg`) | 16 px de lado. Entre 16 y 23 px va siempre el master chico. |
| Logotipo | 20 px de cuerpo. El SVG mide 0,936 del cuerpo de alto: 18,7 × 85 px. Más chico, va el ícono. |
| Lockup | 26 px de alto (el lado del ícono), para que su palabra no baje de 20 px de cuerpo. |

## Área de resguardo

En esa franja no entra nada: ni texto, ni otro logo, ni el borde de la pieza.

Son las del capítulo 03 del manual.

- **Ícono y lockup:** A/2 en cada borde, con A el lado del ícono. En uno de 64 px son 32 px. En el
  lockup cubre también el 1 x de la palabra, que es 0,38 A.
- **Logotipo:** 1 x en cada borde, con x = el alto de la x itálica dibujada, 0,496 del cuerpo (el 0,481
  que declara la fuente es el de la recta). En `wordmark.svg` son 496 unidades del viewBox, el
  0,53 de su alto: a 40 px de cuerpo, 20 px.
- No aplica al ícono como archivo a sangre (foto de perfil, favicon, ícono de app): ahí el ícono es
  todo el espacio.

## Fondos

- **Oscuro** (los neutros del modo oscuro): `wordmark-white.svg`, `lockup.svg`. El ícono suelto se ve
  como la i sola; si hace falta ver el cuadrado, la pieza lo dibuja con su borde `border.default`.
- **Claro** (#FAFAF9 y los neutros del modo claro): `wordmark-black.svg`, `lockup-on-light.svg`. El
  ícono va con su cuadrado negro, siempre.
- **Nunca** sobre una foto movida, un color de estado, un degradé, el amarillo de Mercado Libre o el
  cian de Mercado Pago.

## Cómo está construido

Las medidas de la fuente van en unidades de la fuente (1/1000 em). La i ocupa x 53…296 e y −15…700,
con un avance de 285.

**Centrado óptico del ícono.** Centrada por su avance, como la centra una caja de texto, la itálica
queda 32 u corrida a la derecha: el dibujo sobresale de su caja y la caña se inclina hacia allá. Se
centra el dibujo y no la caja, y después se corre 10 u más a la izquierda, porque el ojo lee la i
por la cabeza (punto y remate), que está a la derecha del eje inclinado. En total son 42 u (0,042
em) a la izquierda del centrado por avance: en `icon.svg` es 0,038 del lado, 19 px en el de 512. De
esos, 4,6 px son el ajuste a ojo y el resto es centrar el dibujo. En vertical va centrada por su
caja: el mismo aire sobre el punto que bajo el pie (0,18 del lado). Con el punto contado 1,5 veces,
porque chico y aislado pesa más que su área, el centro de masa (173; 343) cae sobre el de la caja
(174,5; 342,5). Es la misma regla de `perfil.html`.

**El master chico.** El punto y la caña se llevan a la grilla de 32 px por separado. Todos los
bordes caen en filas y columnas pares, así que también quedan enteros a 16 px:

| | A 32 px | A 16 px |
|---|---|---|
| Punto | columnas 14–20, filas 4–10 (6 px; el natural mide 4,8) | 3 px |
| Aire entre el punto y la caña | filas 10–12 | 1 px |
| Caña, del remate al pie | filas 12–28 | 8 px |

Mide 0,75 del lado y no 0,72: con 23 px el aire a 16 px cae en medio píxel y el punto se pega a la
caña.

**El logotipo.** «iris agents» con el kerning de la fuente (g-e −21, n-t −2, t-s −6), un tracking de
−0,01 em (el mismo `letter-spacing` de las piezas) y tres ajustes a mano: r-i −8, i-s −8 y t-s −12.
Se midió el blanco medio entre letras en la banda de la x, con la itálica enderezada 12°: r-i, i-s y
t-s daban 156, 152 y 173 u contra un promedio de 150; quedan en 148, 144 y 161. La r-i no se cierra
más porque la bola de la r y el remate de la i quedarían a menos de 11 u. El viewBox es la caja de
la tinta, en unidades de la fuente: 4264 × 936.

**El lockup.** A es el lado del ícono. Radio 0,23 A. La i del cuadrado tiene 0,81 A de cuerpo
(mide 0,58 A) y se centra en el alto que deja un aire de 0,077 A abajo, que la sube al centro
óptico. La palabra tiene 0,77 A de cuerpo y su caja de interlineado 1 se centra en el alto del
ícono. La separación es 0,27 A, del borde del cuadrado al origen de la palabra. El borde de la
versión oscura mide 1/52 A: 1 px a 52 px. El lockup completo mide 4,594 A de ancho. Medido
contra el `.lockup` de `pieces/redes/plantillas/_comun/plantilla.css` a 208 px, la palabra y el alto
de la i coinciden al píxel. Difiere en dos cosas: la i del cuadrado va 0,034 A más a la izquierda,
con el centrado óptico del ícono (el CSS la centra por avance), y la palabra termina 0,02 A antes
por los ajustes de kerning.

## En una web

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon-small.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

```json
"icons": [
  { "src": "/icon-192.png", "type": "image/png", "sizes": "192x192" },
  { "src": "/icon-512.png", "type": "image/png", "sizes": "512x512" },
  { "src": "/icon-maskable-512.png", "type": "image/png", "sizes": "512x512", "purpose": "maskable" }
]
```

## Los PNG, para lo que no lee SVG

En `png/`, para Canva, Google Docs y Slides, Keynote, Notion y la firma de mail. Si la herramienta
acepta SVG, va el SVG.

- **Qué tamaño:** el que mida por lo menos el doble del ancho al que se va a ver, porque las
  pantallas de alta densidad muestran dos píxeles por cada uno. El de 512 alcanza hasta 256 px en
  pantalla; el de 1024, hasta 512; el de 2048, hasta 1024.
- **El logotipo y el lockup** vienen con fondo transparente y recortados a la tinta, como el SVG: el
  área de resguardo la deja quien lo pone. El ancho es exacto; el alto es el de la proporción,
  redondeado para arriba.
- **El ícono** viene lleno: el cuadrado negro a sangre, sin transparencia. Como el SVG, sobre claro
  se ve el cuadrado y sobre oscuro, la i sola. Para una foto de perfil que se recorta en círculo no
  va este: va `icon-profile.svg` o `pieces/redes/perfil/perfil-1080.png`.
- **Los mínimos de arriba valen igual:** el lockup no baja de 26 px de alto en pantalla, ni el
  logotipo de 18,7 px.

| Archivo | Tamaño (px) | Fondo | Para qué |
|---|---|---|---|
| `png/lockup-512.png` | 512 × 112 | Transparente, para oscuro | La firma de mail o un documento con fondo oscuro. |
| `png/lockup-1024.png` | 1024 × 223 | Transparente, para oscuro | Google Slides o Keynote con fondo oscuro → éste. |
| `png/lockup-2048.png` | 2048 × 446 | Transparente, para oscuro | Canva sobre oscuro, o una diapositiva oscura donde el logo va grande. |
| `png/lockup-on-light-512.png` | 512 × 112 | Transparente, para claro | La firma de mail sobre fondo blanco → éste. |
| `png/lockup-on-light-1024.png` | 1024 × 223 | Transparente, para claro | Google Slides sobre fondo blanco → éste. También Google Docs, Notion y Keynote sobre claro. |
| `png/lockup-on-light-2048.png` | 2048 × 446 | Transparente, para claro | Canva sobre claro, o la portada de un documento. |
| `png/wordmark-white-512.png` | 512 × 113 | Transparente, para oscuro | La marca sola, cuando el ícono ya se ve cerca (capítulo 03, 3.1), sobre oscuro: un pie de diapositiva, un encabezado. |
| `png/wordmark-white-1024.png` | 1024 × 225 | Transparente, para oscuro | Lo mismo, hasta 512 px en pantalla. |
| `png/wordmark-white-2048.png` | 2048 × 450 | Transparente, para oscuro | Lo mismo, en Canva o en grande. |
| `png/wordmark-black-512.png` | 512 × 113 | Transparente, para claro | La marca sola sobre claro: el encabezado de un Google Docs o de una página de Notion. |
| `png/wordmark-black-1024.png` | 1024 × 225 | Transparente, para claro | Lo mismo, hasta 512 px en pantalla. |
| `png/wordmark-black-2048.png` | 2048 × 450 | Transparente, para claro | Lo mismo, en Canva o en grande. |
| `png/icon-64.png` | 64 × 64 | Opaco: el cuadrado negro | El ícono hasta 32 px en pantalla: una lista, la fila de un documento. |
| `png/icon-128.png` | 128 × 128 | Opaco: el cuadrado negro | Hasta 64 px: el ícono de una página o de una diapositiva. |
| `png/icon-256.png` | 256 × 256 | Opaco: el cuadrado negro | Hasta 128 px: el ícono como tile en un documento o una diapositiva. |
| `png/icon-2048.png` | 2048 × 2048 | Opaco: el cuadrado negro | Canva o una pieza grande; de éste se reduce cualquier tamaño que no esté. |

Los íconos de 180, 192, 512 y 1024 px son los de arriba: `apple-touch-icon.png`, `icon-192.png`,
`icon-512.png` e `icon-1024.png`.

## Exportes

Los PNG y el `.ico` salen de los SVG con Chrome headless (`pieces/redes/_base/render.sh`), con una
página que muestra cada SVG a su tamaño exacto. El `.ico` lleva los renders de 16 y 32 px tal cual,
sin reescalar. Si cambia un SVG, se vuelven a exportar todos.

Los de `png/` salen igual, con el SVG en línea a ese ancho y `preserveAspectRatio="xMinYMin meet"`:
la fracción de píxel que sobra del alto queda abajo y transparente. Los transparentes se capturan
con `--default-background-color=00000000` y la página sin fondo; los íconos, con la página en
blanco, para que se note si el cuadrado no llegara al borde. Cada uno se controla así: el ancho
exacto, las esquinas en alfa 0, la tinta de borde a borde, el área y el centroide contra los
trazados del SVG, los píxeles opacos en el color exacto y el PNG compuesto sobre #0A0A09 y sobre
#FAFAF9 contra Chrome pintando el SVG sobre ese fondo (máximo 3 niveles de 255). Halo no hay: con
alfa bajo, el color se aparta del de destino hacia el lado contrario (la blanca, más clara; la
negra, más oscura), por guardarse sin premultiplicar en 8 bits, y al componerlo sobre cualquier
fondo corre el resultado 1,2 niveles como mucho. `preview.png` se arma con los tokens y las
fuentes del repo, después de exportar.
