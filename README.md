<img src="logo/icon.svg" width="64" height="64" alt="iris">

# iris-brand

El sistema de marca de iris: los design tokens, el CSS que sale de ellos, las fuentes, el logo, el
manual y las piezas. Es la única fuente: si un valor no está en los tokens, no existe; si cambia,
cambia acá y cada app lo toma cuando quiere. Este repo no modifica ninguna app.

## Por dónde empezar

### Para armar una pieza de redes

Una persona o un agente, con plantilla o sin ella.

1. **Las reglas de los posts, carruseles, stories y reels:** el vidrio, las cuatro variantes, la
   luz, el mensaje y la vocera, en el [capítulo 15](guide/15-redes.md), que manda en lo que es de
   redes.
2. **Qué hace buena una pieza, qué no va y qué hacer ante la duda:** el
   [capítulo 11](guide/11-aplicaciones.md), 11.14.
3. **Las reglas de cada cosa**, en el [manual](guide/README.md): el logo (03), el color, el
   petróleo y el ámbar (04), la tipografía y la frase (05), las piezas propias (08), la voz (09) y
   Mercado Libre (12).
4. **Cómo están hechas las piezas** (`vidrio.css`, `brand.css` y las plantillas de vidrio) y cómo se
   renderiza una: [`pieces/redes/plantillas.md`](pieces/redes/plantillas.md).
5. **La guía de medidas de cada formato** (el lienzo, el margen, lo que tapa cada red y el tamaño
   mínimo de la letra): [`pieces/redes/_base/formatos.json`](pieces/redes/_base/formatos.json).
6. **La PNG terminada se revisa** con la sección 7 de `plantillas.md`.

### Para lo demás

| Si vas a… | Está en |
|---|---|
| Saber qué es iris y cuál es su alma | [01 · Esencia](guide/01-esencia.md) |
| Escribir un texto que sale de iris | [09 · Voz y tono](guide/09-voz-y-tono.md), [02 · Nombre](guide/02-nombre.md) y [12 · Mercado Libre](guide/12-mercado-libre.md) |
| Diseñar en Claude Design, Figma u otra herramienta | [00 · Cómo se usa](guide/00-como-se-usa.md), 0.5 |
| Usar la marca en una app o en la landing | [14 · Recursos](guide/14-recursos.md): instalar, importar y el markup en 14.2; actualizar en 14.3 |
| Cambiar un token o la marca, o regenerar las piezas | [14 · Recursos](guide/14-recursos.md), 14.4 a 14.6; quién aprueba, en 00 (0.7) |
| Elegir un archivo del logo o exportarlo | [`logo/README.md`](logo/README.md) |

## Qué hay adentro

| Carpeta | Qué tiene |
|---|---|
| [`tokens/`](tokens/) | La fuente de todo, en DTCG 2025.10: `foundation.tokens.json` (primitivos, con los tonos de la marca, tipografía, espacio, forma, vidrio y movimiento), `themes/dark.tokens.json` y `themes/light.tokens.json` (los roles de color de cada modo) e `iris.resolver.json` (los dos modos, con el oscuro por default). El `version` del resolver es el de la spec DTCG (`2025.10`), no uno de la marca. |
| [`css/`](css/) | Escrito a mano y sin un valor propio: `fonts.css` (las caras), `tailwind.css` (el puente a Tailwind v4), `glass.css` (el vidrio de la app, el de redes y la landing, y la luz de fondo) y `signature.css` (el sello, sólo donde sigue). |
| [`dist/`](dist/) | Generado y commiteado: `tokens.css`, las variables `--iris-*` de los dos modos. No se edita a mano. |
| [`fonts/`](fonts/) | Los WOFF2 de DM Serif Display itálica, IBM Plex Sans 400 y 500 (y 600 y 700, para redes y la landing) e IBM Plex Mono 400, con sus licencias OFL. Procedencia y sumas en `fonts/README.md`. |
| [`logo/`](logo/) | El ícono, el logotipo y el lockup en SVG (contornos, sin fuentes), más el favicon y los PNG, también para lo que no lee SVG (`logo/png/`). Qué va dónde: `logo/README.md`. |
| [`guide/`](guide/README.md) | El manual, en 16 capítulos, con su índice en `guide/README.md`. |
| [`pieces/`](pieces/) | Las piezas terminadas, en HTML con su PNG. En `pieces/redes/`, la foto de perfil, la portada de Facebook, las destacadas de Instagram y las plantillas de posts, con su especificación (`plantillas.md`) y la guía de medidas de cada formato (`_base/formatos.json`); en `pieces/linkedin/`, el banner del perfil y la portada y el logo de la página de empresa. |
| [`scripts/`](scripts/) | `terrazzo.mjs`: el parseo de `tz build`, en memoria, con el que el test compara `dist/tokens.css`. La config de Terrazzo es `terrazzo.config.mjs`, en la raíz. |
| [`test/`](test/) | La guarda que corre con cada build, con los esquemas oficiales de DTCG en `test/schemas/`. Qué frena: capítulo 14, 14.4. |
| Fuera del repo | Una página /brand pública con el ícono, el logotipo, los colores base y las reglas principales, cuando exista la landing nueva. |

## Licencias

- **El código y los tokens:** MIT ([`LICENSE`](LICENSE)).
- **Las fuentes** (`fonts/`): SIL Open Font License 1.1, cada una con su archivo
  (`fonts/OFL-DMSerifDisplay.txt` y `fonts/OFL-IBMPlex.txt`).
- **El nombre, el logo y el ícono** (`logo/`): son marca de Iris Agents. La licencia MIT no los
  cubre: no se usan para otra cosa que iris, ni de una forma que sugiera respaldo o relación con
  iris.
