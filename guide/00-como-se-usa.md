# 00 · Cómo se usa este manual

## 0.1 Qué es iris-brand

`iris-brand` es el sistema de marca de iris en un solo repo: los design tokens, este manual, el
logo, las fuentes y las piezas terminadas. Es público, porque todo lo que tiene es público por
naturaleza (un logo, colores, fuentes con licencia OFL).

Son dos partes que se leen juntas:

- **Los tokens** escriben cada decisión visual como un dato con nombre («el fondo», «el texto de
  apoyo», «el radio de una card») en el formato estándar DTCG 2025.10. Las apps, la landing y las
  piezas leen el mismo archivo, y nadie copia un hex a mano.
- **El manual** dice cuándo y cómo se usa cada token, qué no se hace y por qué.

El repo no modifica ninguna app. Cada app lo adopta después, en su propia tarea, cuando y cuanto
se decida. Hasta entonces, nada de este manual le exige un cambio.

## 0.2 Dónde vive

| Qué | Dónde |
|---|---|
| La fuente del manual | `iris-brand/guide/`, un archivo por capítulo. |
| Los tokens | `tokens/`: `foundation`, `themes/dark`, `themes/light` y el resolver de modos. |
| El CSS que usan las apps | `dist/tokens.css` (generado) más `css/fonts.css`, `css/tailwind.css` y `css/glass.css`, escritos a mano y sin valores propios. |
| El logo | `logo/`: los SVG master y sus exportaciones (capítulo 03). |
| Las fuentes | `fonts/`: WOFF2 de las tres familias, con su licencia. |
| Las piezas terminadas | `pieces/`: banner, OG por defecto, avatar y las piezas de redes. |
| Cómo se llegó a cada decisión | En el registro de decisiones, que es privado y no está en este repo. Si dice otra cosa que este manual, manda el manual. |

Además, el manual se publica en dos lugares que no son código:

- **El Design System «iris» de claude.ai**, que es lo que leen Claude Design y quien diseña ahí. Se
  re-sincroniza desde el repo en cada versión. Es un paso futuro: hoy no está publicado.
- **Una página /brand pública** con el ícono, el logotipo, los colores base y las reglas
  principales, cuando exista la landing nueva.

## 0.3 Manda el token

- Si el manual y los tokens no coinciden, gana el token, y el manual se corrige.
- Si un valor no está en los tokens, no existe. Si cambia, cambia en un solo lugar y se propaga.
- Hay dos excepciones escritas, porque no son valores que se reusen:
  - **La geometría del logo** (proporciones de la i, el resguardo, el lockup) vive en los SVG de
    `logo/` y en el capítulo 03.
  - **El degradé radial del banner** (blanco al 4 %) vive sólo en el banner de LinkedIn y en la
    portada de Facebook. No es token y no se usa en ninguna otra pieza.

## 0.4 Cómo se lee un nombre de token

Hay dos capas. Los **primitivos** son la paleta cruda; los **semánticos** dicen el rol y son lo
único que consume un componente. Un semántico tiene un valor por modo.

| Capa | En el archivo de tokens | En CSS | En Tailwind | En este manual |
|---|---|---|---|---|
| Semántico | `color.text.secondary` | `var(--iris-color-text-secondary)` | `text-fg-secondary` | `text.secondary` |
| Semántico | `color.bg.canvas` | `var(--iris-color-bg-canvas)` | `bg-canvas` | `bg.canvas` |
| Forma | `radius.card` | `var(--iris-radius-card)` | `rounded-card` | `radius.card` |
| Primitivo | `color.neutral-dark.10` | no se expone | no se expone | `color.neutral-dark.10` |

- En el markup se lee por rol: `bg-canvas text-fg border-line-subtle`, `bg-action text-on-action`,
  `rounded-card`, `font-signature italic`. Un mal uso se nota a simple vista: `text-line-subtle`
  o `bg-fg-tertiary` no tienen sentido.
- Un primitivo en el CSS de una app es un error: se usa siempre el semántico.
- En este manual el valor va con su hex, por ejemplo `text.secondary` (#BFBEB9 en oscuro,
  #4E4D49 en claro). El hex está para leer. En código, nunca.

## 0.5 Cómo lo consume cada uno

**Una app o la landing** lo instala como dependencia de git, no como submódulo. Como el repo es
público, no hace falta un token en ninguna máquina. `dist/` está commiteado, así que la app no
compila nada.

```sh
pnpm add github:Iris-Agents/iris-brand#semver:^1
```

En el CSS principal, después de `@import "tailwindcss"`, tres líneas y una regla:

```css
@import "iris-brand/fonts.css";     /* DM Serif Display, IBM Plex Sans y Plex Mono */
@import "iris-brand/tokens.css";    /* colores y medidas, oscuro y claro */
@import "iris-brand/tailwind.css";  /* bg-canvas, text-fg, rounded-card… */

html { font-synthesis: none; }      /* que el navegador no invente negritas */
```

El vidrio, sólo si la app tiene una capa que flota: `@import "iris-brand/glass.css";`.

Para el modo, `tokens.css` responde a `data-theme="dark"` o `data-theme="light"` en el `<html>`.
Sin atributo sigue al sistema, y el oscuro es el default. La landing va siempre en oscuro.

**Claude Design** no instala nada: lee el Design System «iris» publicado en claude.ai. Los canvases
del banner, de las OG y de las piezas lo eligen como design system.

**Figma, Penpot o un tercero** toman el archivo de tokens o los SVG del logo, del repo o de la
página /brand. Cada color lleva su hex para las herramientas que no leen OKLCH.

Más adelante el paquete se puede publicar en npm con nombre propio (por ejemplo
`@iris-agents/brand`, si está libre). Para empezar no hace falta: el link a GitHub hace lo mismo.

## 0.6 Qué cubre

- **Cubre** todo lo que sale de iris: la landing, las piezas, las redes, las OG, el banner, los
  documentos y las propuestas, lo que se diseña en Claude Design y la presencia de iris adentro de
  Claude. También los valores que una app usa cuando adopta la marca.
- **No cubre** el código de las apps ni sus componentes: no hay todavía una librería de componentes
  compartida. Cuando la haya, se construye sobre estos mismos tokens.

## 0.7 Quién aprueba y cómo se cambia

Aprueba Franco. Un cambio sigue siempre el mismo camino:

1. Un PR al repo `iris-brand` que cambia el token, el manual o el archivo de logo.
2. `pnpm build` genera el CSS y la salida para Claude Design, y corre el test. **Si el test falla,
   el comando sale con error y ese `dist/` no se commitea.** El test frena, entre otras cosas, un
   par de colores que baje del contraste mínimo y una firma fuera de sus tres usos (capítulo 14).
3. Con el build verde se publica una versión nueva con su tag de git.
4. Se re-sincroniza el Design System «iris» de claude.ai.
5. Cada app toma la versión cuando quiere, con `pnpm update iris-brand`. Ninguna cambia sola.

## 0.8 Cómo se versiona

Semver, por tag de git.

| Cambio | Versión | Ejemplo |
|---|---|---|
| Cambiar el valor de un token | minor | El texto de apoyo pasa de un gris a otro: 1.2.0 → 1.3.0. |
| Agregar un token | minor | Un radio nuevo con su rol. |
| Renombrar o borrar un token | major | `text.muted` deja de existir: 1.x → 2.0.0. |
| Algo que no toca ningún token: el manual, una pieza, un informe | patch | Se corrige un ejemplo del manual: 1.3.0 → 1.3.1. |

- Un token que va a desaparecer se marca con `$deprecated` una versión antes, diciendo qué usar en
  su lugar (por ejemplo `"$deprecated": "usar color.text.secondary"`).
- Las apps que están en `^1` no reciben un 2.0 hasta que alguien las actualiza a mano.
- El `version` del resolver es el de la spec DTCG (`2025.10`), no el del paquete.
