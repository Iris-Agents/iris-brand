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

Todo vive en el repo `iris-brand`, y este manual es su carpeta `guide/`, un archivo por capítulo.
Qué hay en cada carpeta, y lo que va a vivir fuera del repo, está en el [README](../README.md) de
la raíz («Qué hay adentro»).

Cómo se llegó a cada decisión está en el registro de decisiones, que es privado y no está en este
repo. Si dice otra cosa que este manual, manda el manual.

## 0.3 Manda el token

- Si el manual y los tokens no coinciden, gana el token, y el manual se corrige.
- Si un valor no está en los tokens, no existe. Si cambia, cambia en un solo lugar y se propaga.
- Hay una excepción escrita, porque no son valores que se reusen: **la geometría del logo**
  (proporciones de la i, el resguardo, el lockup), que vive en los SVG de `logo/` y en el capítulo
  03. Lo propio de las piezas de redes también es token (capítulo 15, 15.10).

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
- Los colores de la marca son primitivos como los demás (`color.brand.petrol` y los tonos de
  `color.tint`): llegan a una app por su rol, `accent`, `signature.phrase`, `data.highlight` y
  `backlight.*` (`text-brand-accent` y `text-signature-phrase` en Tailwind; el acento es sólo de
  texto, porque nunca es fondo ni borde; la luz no es un color plano y va con las clases
  `.glass-backlight-*` de `css/glass.css`), y a las piezas de redes por las variables de
  `pieces/redes/_base/vidrio.css` (capítulo 04, 4.9).
- En este manual el valor va con su hex, por ejemplo `text.secondary` (#BFBEB9 en oscuro,
  #4E4D49 en claro). El hex está para leer. En código, nunca.

## 0.5 Cómo lo consume cada uno

- **Una app o la landing** lo instala como dependencia de git, sin versiones: cómo se instala, qué
  se importa y cómo se usa en el markup, en el capítulo 14 (14.2); cómo se actualiza, en 14.3.
- **Quien arma piezas sin instalar el paquete** (quien opera las redes, quien diseña) clona el repo
  (14.3).
- **Claude Design** no instala nada: quien diseña ahí lee este repo (el manual, los tokens, los SVG
  de `logo/` y las plantillas de `pieces/`).
- **Figma, Penpot o cualquier otra herramienta** toman `tokens/` con un importador de DTCG; si no
  lee el resolver, se importa `foundation.tokens.json` más el tema que haga falta. Cada color trae
  su `hex` para las que no leen OKLCH. El logo sale de los SVG de `logo/` y las fuentes, de
  `fonts/`. Cuando exista la página /brand de la landing, lo mismo se baja de ahí.
- Lo que se diseña afuera no define valores: un valor nuevo entra como token acá (0.3).

## 0.6 Qué cubre

- **Cubre** todo lo que sale de iris: la landing, las piezas, las redes, las OG, el banner, los
  documentos y las propuestas, lo que se diseña en Claude Design y la presencia de iris adentro de
  Claude. También los valores que una app usa cuando adopta la marca.
- **No cubre** el código de las apps ni sus componentes: no hay todavía una librería de componentes
  compartida. Cuando la haya, se construye sobre estos mismos tokens.

## 0.7 Quién aprueba y cómo se cambia

Aprueba Franco. El camino de un cambio (el build con el test, el commit a `main` y lo que pasa
cuando rompe a quien consume) está en el capítulo 14 (14.5); qué frena el test, en 14.4, y cómo
toma el cambio cada app, en 14.3.
