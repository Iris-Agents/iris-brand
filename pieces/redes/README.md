# Piezas de redes de iris

Las piezas de redes de iris para el Instagram **@iris_agents** y la página de Facebook
**«Iris Agents»**: la foto de perfil, la portada, las destacadas y las plantillas de vidrio de los
posts.
Cada pieza es un HTML editable; la PNG sale de renderizarlo.

Las reglas de las piezas están en el manual: los posts, carruseles, stories y reels, en el capítulo
15, y cómo se arma una pieza sin plantilla, en el 11 (11.14). Cómo están hechas las piezas (las dos
hojas, las plantillas, cómo se renderiza y cómo se revisa) es [`plantillas.md`](plantillas.md);
las medidas de cada formato, [`_base/formatos.json`](_base/formatos.json), y cómo se mide una pieza
terminada, [`_base/medir/`](_base/medir/README.md). Cómo se escribe y se publica un post no está en
este repo.

## Qué hay en cada carpeta

| Carpeta | Qué tiene | Para qué red |
|---|---|---|
| `_base/` | `vidrio.css` (la hoja de los posts de redes v2), `brand.css` (la de las piezas fijas de la marca: tokens de color, fuentes de Google y las clases `.signature`, `.frase` y `.flecha`, la «→» en SVG), `render.sh` (una PNG), `render-all.sh` y `piezas.tsv` (todas las PNG), `formatos.json` (las medidas de cada formato) y `medir/` (la medición de una pieza terminada). | Todas |
| `perfil/` | La foto de perfil: la i del ícono a sangre sobre negro. `perfil-preview.html` es una hoja de control con la foto en chico. | Instagram, Facebook y WhatsApp: la misma foto en las tres |
| `facebook/` | La portada de la página, en una sola versión: `portada.html`, con el titular «Agentes expertos / a cargo de tu e-commerce.» y el panel de vidrio. Cómo se arma, en el capítulo 11 del manual (11.6). | Facebook |
| `instagram/destacadas/` | Las portadas de las historias destacadas: Demo, Casos, Precios y Ayuda, más tres propuestas (Cómo funciona, Novedades, Permisos). `destacadas-preview.html` las muestra juntas en chico. | Instagram |
| `plantillas/vidrio/` | Tres plantillas de ejemplo con el vidrio (`vidrio-dato`, `vidrio-decision`, `vidrio-story`), sobre `_base/vidrio.css`. Las reglas, en el capítulo 15 del manual. | Todas, y LinkedIn cuando muestra el producto |

Junto a cada HTML está su PNG limpia y su `-guias.png`, que es la misma pieza con las zonas seguras
dibujadas en magenta. La de guías es para revisar: **nunca se publica**.

## Las reglas y los comandos

- **Los dos colores, la luz y la frase:** capítulo 04 (4.9) y capítulo 05 (5.3). En `brand.css` son
  `--signature-phrase` y `--backlight-iris`; en `vidrio.css`, las variables `--vp-*` de cada variante.
- **El logo, siempre el SVG de `logo/`:** capítulo 03 (3.10). Cómo se copia, en la sección 3 de
  [`plantillas.md`](plantillas.md).
- **Cómo se regeneran todas las PNG:** `guide/14-recursos.md`, 14.6. **Una pieza sola**, o una copia
  que vive fuera de la carpeta de su plantilla, con `--plantilla`: la sección 6 de
  [`plantillas.md`](plantillas.md).

## Los colores de estado

Los glifos de estado (te toca, falló, trabajando, resuelto, esperando) toman su color sólo de las
variables de estado: `--status-*` en `_base/brand.css` y `--vp-toca`, `--vp-trabajando`,
`--vp-esperando`, `--vp-listo` y `--vp-fallo` en `_base/vidrio.css`. Ninguna pieza tiene un hex de
estado suelto, y el test ata las dos hojas a los tokens. Sus formas, sus colores y cómo se
verificaron están en el manual, capítulo 04 (4.6), y su SVG, en el 08 (8.1).

Cuando cambie un color: se edita el token, se corrige la hoja que lo copia (el test dice cuál), se
corre `render-all.sh` y se miran las PNG que tienen glifos (la portada de Facebook, el banner de
LinkedIn y las tres plantillas de vidrio). Cuando cambie una forma, además se reemplaza el glifo en
cada HTML que lo dibuja: el `<symbol>` de la ✓ en la portada de Facebook y en
`../linkedin/banner-perfil.html`, y los `<svg>` de los estados en las plantillas de vidrio. Los
pictogramas de las destacadas «Casos» (tres filas con su ✓) y «Cómo funciona» (de ○ a ✓) usan el
mismo vocabulario.
