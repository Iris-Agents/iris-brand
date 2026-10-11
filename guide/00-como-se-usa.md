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
| El CSS que usan las apps | `dist/tokens.css` (generado) más `css/fonts.css`, `css/tailwind.css`, `css/glass.css` y `css/signature.css`, escritos a mano y sin valores propios. |
| El logo | `logo/`: los SVG master y sus exportaciones (capítulo 03). |
| Las fuentes | `fonts/`: WOFF2 de las tres familias, con su licencia. |
| Las piezas terminadas | `pieces/`: las de LinkedIn (`pieces/linkedin/`) y las de redes, con la foto de perfil y la portada de Facebook (`pieces/redes/`). |
| Cómo se llegó a cada decisión | En el registro de decisiones, que es privado y no está en este repo. Si dice otra cosa que este manual, manda el manual. |

Fuera del repo va a haber un solo lugar más: **una página /brand pública** con el ícono, el
logotipo, los colores base y las reglas principales, cuando exista la landing nueva.

## 0.3 Manda el token

- Si el manual y los tokens no coinciden, gana el token, y el manual se corrige.
- Si un valor no está en los tokens, no existe. Si cambia, cambia en un solo lugar y se propaga.
- Hay dos excepciones escritas, porque no son valores que se reusen:
  - **La geometría del logo** (proporciones de la i, el resguardo, el lockup) vive en los SVG de
    `logo/` y en el capítulo 03.
  - **Las luces radiales**: la del banner (blanco al 4 %) vive sólo en el banner de LinkedIn y en la
    portada de Facebook, y la de las piezas de redes (blanco hasta el 6 %, sólo detrás del punto
    focal) en los posts y los reels (capítulo 11, 11.13). No son token.

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
- El petróleo (`color.brand.petrol`) es un primitivo más: llega a la landing por su rol,
  `signature.marketing.block` (`bg-signature-marketing` en Tailwind), y a las piezas de redes por el
  `--signature-marketing-block` de `pieces/redes/_base/brand.css` (capítulo 04, 4.9).
- En este manual el valor va con su hex, por ejemplo `text.secondary` (#BFBEB9 en oscuro,
  #4E4D49 en claro). El hex está para leer. En código, nunca.

## 0.5 Cómo lo consume cada uno

**Una app o la landing** lo instala como dependencia de git, no como submódulo (el porqué, en el
capítulo 14, 14.2). Como el repo es público, no hace falta un token en ninguna máquina. `dist/` está
commiteado, así que la app no compila nada.

```sh
pnpm add github:Iris-Agents/iris-brand
```

No hay versiones: la marca es lo que está en `main`. pnpm toma su último commit y el lockfile de la
app lo fija; `pnpm update iris-brand` trae lo último.

En el CSS principal, después de `@import "tailwindcss"`, cuatro líneas y una regla:

```css
@import "iris-brand/fonts.css";     /* DM Serif Display, IBM Plex Sans y Plex Mono */
@import "iris-brand/tokens.css";    /* colores y medidas, oscuro y claro */
@import "iris-brand/tailwind.css";  /* bg-canvas, text-fg, rounded-card… */
@import "iris-brand/signature.css"; /* el sello del titular de dos líneas */

html { font-synthesis: none; }      /* que el navegador no invente negritas */
```

El vidrio, sólo si la app tiene una capa que flota: `@import "iris-brand/glass.css";`.

Para el modo, `tokens.css` responde a `data-theme="dark"` o `data-theme="light"` en el `<html>`.
Sin atributo sigue al sistema, y el oscuro es el default. La landing va siempre en oscuro.

**Claude Design** no instala nada: quien diseña ahí lee este repo.

**Figma, Penpot o un tercero** toman el archivo de tokens o los SVG del logo, del repo o de la
página /brand. Cada color lleva su hex para las herramientas que no leen OKLCH.

## 0.6 Qué cubre

- **Cubre** todo lo que sale de iris: la landing, las piezas, las redes, las OG, el banner, los
  documentos y las propuestas, lo que se diseña en Claude Design y la presencia de iris adentro de
  Claude. También los valores que una app usa cuando adopta la marca.
- **No cubre** el código de las apps ni sus componentes: no hay todavía una librería de componentes
  compartida. Cuando la haya, se construye sobre estos mismos tokens.

## 0.7 Quién aprueba y cómo se cambia

Aprueba Franco. Un cambio sigue siempre el mismo camino:

1. Se cambia el token, el manual o el archivo de logo en el repo `iris-brand`.
2. `pnpm build` genera el CSS y corre el test. **Si el test falla, el comando sale con error y ese
   `dist/` no se commitea.** El test frena, entre otras cosas, un par de colores que baje del
   contraste mínimo y una firma fuera de sus tres usos (capítulo 14).
3. Con el build verde, el cambio entra a `main` en un commit. Si rompe a quien consume (renombra o
   borra un token, una variable o una clase), en el mismo momento se cambian los consumidores
   conocidos, y el mensaje del commit lo dice. No hay alias ni período de gracia.
4. Cada app toma el cambio cuando quiere, con `pnpm update iris-brand`. Ninguna cambia sola.
