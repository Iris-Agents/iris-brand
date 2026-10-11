# Piezas de redes de iris

Las piezas de redes de iris para el Instagram **@iris_agents** y la página de Facebook
**«Iris Agents»**: la foto de perfil, la portada, las destacadas y las plantillas de los posts.
Cada pieza es un HTML editable; la PNG sale de renderizarlo.

La especificación (color, tipografía, logo, Mercado Libre, y de cada plantilla el formato, las
zonas seguras, los slots con sus largos y cómo se renderiza) es [`plantillas.md`](plantillas.md).
Cómo se escribe y se publica un post no está en este repo.

## Qué hay en cada carpeta

| Carpeta | Qué tiene | Para qué red |
|---|---|---|
| `_base/` | `brand.css` (tokens de color, fuentes de Google y las clases `.signature` y `.sello`, el sello petróleo de la segunda línea del titular), `render.sh` (una PNG), `render-all.sh` y `piezas.tsv` (todas las PNG). | Todas |
| `perfil/` | La foto de perfil: la i del ícono a sangre sobre negro. `perfil-preview.html` es una hoja de control con la foto en chico. | Instagram, Facebook y WhatsApp: la misma foto en las tres |
| `facebook/` | La portada de la página, en una sola versión: `portada.html`, con el titular «Agentes expertos / a cargo de tu e-commerce.». Mercado Libre no va en el titular: se nombra como un hecho en el «Acerca de» y en la bio (capítulo 12 del manual). | Facebook |
| `instagram/destacadas/` | Las portadas de las historias destacadas: Demo, Casos, Precios y Ayuda, más tres propuestas (Cómo funciona, Novedades, Permisos). `destacadas-preview.html` las muestra juntas en chico. | Instagram |
| `plantillas/` | Los posts: `feed-4x5/`, `cuadrado/`, `story/` (también portada de reel) y `carrusel/`, con los estilos comunes en `_comun/`. Y las de los registros: `intercambio/` (el intercambio, en feed y story) y `trastienda/` (la foto, en feed y portada de carrusel). | Instagram y Facebook |

Junto a cada HTML está su PNG limpia y su `-guias.png`, que es la misma pieza con las zonas seguras
dibujadas en magenta. La de guías es para revisar: **nunca se publica**.

## El sello y los tres registros

La marca es monocroma, con un solo acento de color: el **petróleo** (#03313C) del sello, el bloque
detrás de la segunda línea del titular, con la firma en tinta (#EDEDEA) encima, a 11,87:1. Va en
todas las piezas de redes, sale de `.sello` en `_base/brand.css`, con sus colores en
`--signature-marketing-block` y `--signature-marketing-text`, y no va en ningún otro lugar: ni de
fondo, ni en una franja, un texto, un borde o un botón. «Aprobar» va con borde de tinta y sin relleno.

El logo va siempre como el SVG de `logo/` en línea, nunca tipeado: el lockup en los posts, el
carrusel y las portadas; la marca sola en la portada de la página de LinkedIn; la i de
`logo/icon-profile.svg` en la foto de perfil. Cómo se copia, en la sección 3 de
[`plantillas.md`](plantillas.md).

Cada post usa uno solo de tres registros: **Pregunta y cifra** (la base: el intercambio, con la
pregunta con su cursor, la línea «tool · estado» y la cifra grande, y las plantillas de siempre),
**En vivo** (los reels: la secuencia del intercambio en video vertical) y **La trastienda** (campañas
y fechas: una foto oscura y quieta del mundo del vendedor, con el mismo sello). El intercambio va
sin titular: si el post lo lleva, va en otra lámina, y el reel cierra con un cuadro aparte con el
titular, el sello y el lockup. Qué lleva cada uno está en la sección 5 de [`plantillas.md`](plantillas.md).

## Cómo regenerar

Todas las PNG de la carpeta, con un comando (Google Chrome en `/Applications` e internet para las
fuentes; tarda alrededor de un minuto):

```sh
pieces/redes/_base/render-all.sh   # desde la raíz de iris-brand
```

Lee `_base/piezas.tsv`: una línea por PNG, con el HTML (las guías son el mismo HTML con `?guias`),
el ancho, el alto y la salida. Las hojas de control van al final porque muestran las PNG de arriba.
Una pieza sola:

```sh
_base/render.sh plantillas/feed-4x5/feed-4x5-titular.html 1080 1350 "$PWD/plantillas/feed-4x5/feed-4x5-titular.png"
_base/render.sh "plantillas/feed-4x5/feed-4x5-titular.html?guias" 1080 1350 "$PWD/plantillas/feed-4x5/feed-4x5-titular-guias.png"
```

Un post nuevo que se arme copiando una plantilla no está en `piezas.tsv`: se renderiza así, a mano.
Si vive fuera de la carpeta de su plantilla, como en un proyecto que instaló el paquete, se
renderiza con `--plantilla`: el comando está en la sección 6 de [`plantillas.md`](plantillas.md).

## Los colores de estado

Los glifos de estado (te toca, falló, trabajando, resuelto, esperando) toman su color sólo de las
variables `--status-*` de `_base/brand.css`; ninguna plantilla tiene un hex de estado suelto. La
paleta se verificó el 2026-10-10 (contraste, daltonismo y distancia al amarillo de Mercado Libre),
y ese mismo día Franco fijó las formas: el único ● lleno es «te toca» (ámbar), el único ○ hueco es
«esperando» (blanco), el ◐ medio círculo verde (contorno entero y la mitad derecha llena) es
«trabajando» y «resuelto» es una ✓ gris. La tabla está en la sección 1 de [`plantillas.md`](plantillas.md).

Cuando cambie un color: se edita `brand.css`, se corre `render-all.sh` y se miran las PNG que
tienen glifos (la portada de Facebook, el banner de LinkedIn, `cuadrado-pieza`, `story-pieza`, las
dos del intercambio y el feed alternativo del carrusel, que está en un `<template>` y no tiene PNG
propia). Cuando cambie una forma, además se reemplaza el glifo en cada HTML que lo dibuja: el
`<symbol>` de la ✓ en la portada de Facebook y en `../linkedin/banner-perfil.html` (es el único glifo
que usan), los `<symbol>` de `cuadrado-pieza`, `story-pieza`, `intercambio-feed` e
`intercambio-story` (la ✓ y el ●), y los `<svg>` sueltos del `<template>` del carrusel interior.
El pictograma de la destacada «Cómo funciona» (de ○ a ✓) usa el mismo vocabulario.
