# 14 · Recursos

Cómo la toma una app y cómo se actualiza, qué frena el test, cómo se cambia la marca y cómo se
regeneran las piezas.

---

## 14.1 Dónde está todo

Qué hay en cada carpeta del repo está en una sola tabla: la del [README](../README.md) de la raíz
(«Qué hay adentro»). El registro de cómo se decidió cada cosa no está en el repo (capítulo 00, 0.2).

---

## 14.2 Cómo lo instala una app

Como dependencia de git, en el `package.json` de la app:

```sh
pnpm add github:Iris-Agents/iris-brand
```

Y en el CSS principal, después de Tailwind:

```css
@import "tailwindcss";
@import "iris-brand/fonts.css";     /* las caras: DM Serif Display itálica, IBM Plex Sans y Plex Mono */
@import "iris-brand/tokens.css";    /* las variables --iris-*, en oscuro y en claro */
@import "iris-brand/tailwind.css";  /* las utilidades: bg-canvas, text-fg, rounded-card… */
@import "iris-brand/signature.css"; /* el sello: .signature-line, .signature-seal y .signature-seal-marketing */
@import "iris-brand/glass.css";     /* sólo si la app tiene una capa que flota (capítulo 06, 6.8) */

html {
  font-synthesis: none;             /* que el navegador no invente negritas */
}
```

- **El repo es público**, así que ninguna máquina ni el CI necesitan un token para instalarlo.
- **Sin versiones.** La marca es lo que está en `main`: pnpm toma su último commit y el lockfile de
  la app lo fija.
- **La app no compila nada.** `dist/` está commiteado y el paquete no tiene script `prepare`: si lo
  tuviera, pnpm instalaría las dependencias de desarrollo y compilaría en cada instalación. No se le
  agrega.
- **Las dependencias de este repo** (Terrazzo y colorjs.io) son de desarrollo. Nunca entran a una
  app ni al Worker.
- **Cada app la adopta en su propia tarea**, cuando y cuanto se decida. El puente con sus
  componentes (por ejemplo, shadcn) queda en la app.
- **Probado con Vite 8 y `@tailwindcss/vite` 4.3:** las rutas de `fonts.css` se reacomodan solas y
  los WOFF2 salen como assets. Con la CLI de Tailwind no se reacomodan.
- **`tailwind.css` pisa `font-sans` y `font-mono` a propósito:** la familia por default de la app
  pasa a ser IBM Plex Sans. No bloquea la paleta de Tailwind ni redefine los nombres de shadcn.
- **`signature.css` hace falta en toda página con un titular de dos líneas:** `.signature-seal` es
  el sello de la app y `.signature-seal-marketing`, el del titular de la landing y sus OG
  (capítulo 05, 5.3).
- **El logo y las fuentes se importan por su ruta:** `import icono from "iris-brand/logo/icon.svg"`,
  `iris-brand/logo/favicon.ico`, `iris-brand/fonts/…`. Nunca se copian a mano a la app.
- **Las plantillas de redes vienen en el paquete**, en `iris-brand/pieces/…`. Cómo se renderiza una
  copia armada en otro proyecto: `pieces/redes/plantillas.md`, sección 6.

### En el markup

Se lee por rol, nunca por gris:

```html
<body class="bg-canvas text-fg text-body">
  <article class="bg-surface border border-line-subtle rounded-card">
    <h2 class="text-section">
      Agentes expertos
      <span class="signature-line text-section-signature font-signature italic"><span class="signature-seal">a cargo de tu e-commerce.</span></span>
    </h2>
    <span class="font-mono text-mono text-fg-tertiary">10:40 · id 4418</span>
  </article>
</body>
```

| Qué | Nombres |
|---|---|
| Colores, con cualquier prefijo (`bg-`, `text-`, `border-`, `fill-`…) | Fondos: `canvas` `surface` `raised` `hover` `selected` · Texto: `fg` `fg-secondary` `fg-tertiary` `fg-placeholder` `fg-disabled` `on-action` · Bordes: `line-subtle` `line` `line-control` · Acción: `action` `action-destructive` `focus` `selection` `backdrop` · El sello: `signature` (el bloque) `on-signature` (la letra); en la landing, `signature-marketing` `on-signature-marketing` · Estados, sólo en el glifo: `status-attention` `status-working` `status-failed` `status-done` `status-idle` · Datos: `data-series` `data-comparison` `data-grid` `link-underline` |
| Radios | `rounded-chip` `rounded-control` `rounded-card` `rounded-panel` `rounded-frame`; las píldoras, `rounded-full` |
| Estilos de texto (tamaño, interlineado, tracking y peso) | `text-hero` `text-hero-signature` `text-section` `text-section-signature` `text-title` `text-lede` `text-body` `text-reading` `text-ui` `text-label` `text-eyebrow` `text-mono` |
| Familias | `font-sans` `font-signature` `font-mono` |

Sin Tailwind van las mismas variables, con el nombre del token: cómo se lee cada nombre, en el
capítulo 00 (0.4).

### Oscuro y claro

- `<html data-theme="dark">` o `data-theme="light"` fija el modo. Sin atributo sigue al sistema, y
  si el sistema no pide claro, va oscuro.
- No hace falta `dark:` para los colores de la marca: la utilidad lleva la variable y el modo la
  resuelve. `tokens.css` también pone `color-scheme`.
- Qué va en cada modo y el `theme-color` de cada página: capítulo 04, al principio.

### Por qué no un submódulo

Los dos fijan un commit, pero el submódulo da problemas todos los días:
- Hay que clonar con `--recursive`, o la carpeta queda vacía, y después de cada `pull` correr
  `git submodule update`.
- Es fácil commitear uno desactualizado sin darse cuenta.
- La app lo importa por la ruta de la carpeta, no por los `exports` del paquete
  (`iris-brand/tokens.css`).

Con la dependencia, el commit queda escrito en el lockfile y un `pnpm install` deja todo listo, en
cualquier máquina y en el CI.

---

## 14.3 Cómo se actualiza

- **Una app:** `pnpm update iris-brand` trae el último commit de `main` y lo fija en el lockfile.
  `pnpm install` respeta el lockfile: ninguna app cambia sola.
- **Quien arma piezas sin instalar el paquete** (quien opera las redes, quien diseña) clona el repo
  y trabaja sobre `main`: `git pull` trae lo último.
- **Lo que rompe se avisa en el commit.** Si un cambio renombra o borra un token, una variable o una
  clase, su mensaje lo dice, y las apps conocidas que lo usaban se cambiaron en el mismo momento
  (14.5).

---

## 14.4 Qué frena el test

Para trabajar en el repo hacen falta Node y pnpm (probado con Node 25 y pnpm 11). Las piezas y los
exportes del logo salen de `pieces/redes/_base/render.sh`, que pide además Chrome e internet
(`pieces/redes/plantillas.md`, sección 6).

```sh
pnpm install   # Terrazzo y colorjs.io
pnpm build     # tz build → dist/tokens.css, y el test
pnpm test      # sólo el test: node --test test/*.test.mjs
```

Hay un solo comando, `pnpm build`: genera `dist/tokens.css` con Terrazzo y corre el test. **Si el
test falla, el comando sale con error y ese `dist/` no se commitea.** `pnpm test` corre sólo el
test, sin red: los esquemas están en `test/schemas/`. Frena cuando:

1. los tokens o el resolver no validan contra los esquemas oficiales de DTCG 2025.10. El validador
   es un draft-07 propio (`test/lib/json-schema.mjs`), para no sumar una dependencia;
2. un alias no resuelve en alguno de los dos modos, un rol apunta a otro rol, los modos no tienen
   los mismos nombres, un rol no es de color, un token no tiene `$type`, un color o un rol no tiene
   `$description`, o alguno lleva `$extensions`;
3. un hex no coincide con su OKLCH, un color cae fuera de sRGB, «resuelto» deja de ser el mismo
   gris que `text.tertiary`, el petróleo lo usa un token que no es `signature.marketing.block`, o
   queda a menos de ΔEOK 0,091 de un estado, de los colores de Claude o de Anthropic, de los de
   Mercado Libre o Mercado Pago, o de un color ya descartado (capítulo 04, 4.9);
4. alguno de los 159 pares de contraste baja de su mínimo sobre cualquier fondo de su modo: WCAG
   2.2 AA, y 7:1 para la firma sobre el sello de marketing (capítulo 04, 4.4, y capítulo 13);
5. no son doce estilos, aparece un peso fuera de 400 y 500, algo baja de 12 px, un estilo no cumple
   la regla de tracking de su familia, o las dos líneas de un titular no comparten tamaño e
   interlineado;
6. la firma, como texto, aparece por debajo de 32 px, fuera del peso 400 o fuera de la segunda línea
   de un titular (el logotipo y la i del ícono son dibujos de `logo/`);
7. un tinte del vidrio deja de ser el neutro que dice su nombre, la barra deja de ser `bg.surface` y
   el panel `bg.raised` con alfa, o el texto permitido no pasa con blanco o negro puro detrás;
8. `css/tailwind.css` choca con los nombres de shadcn o con la paleta de Tailwind, nombra una
   variable que `dist/tokens.css` no tiene o le falta un rol de color (salvo el vidrio, que va por
   `css/glass.css`); `css/glass.css` o
   `css/signature.css` escriben un color propio, o `.signature-seal` y `.signature-seal-marketing`
   leen los colores del otro sello; `css/fonts.css` no declara una familia de los tokens (salvo «DM
   Serif Display», el nombre de afuera de la firma, que las piezas cargan de Google Fonts) o nombra
   un archivo que no existe;
9. `dist/` no es exactamente lo que generan los tokens (un `dist/` viejo o editado a mano no pasa),
   un primitivo sale al CSS, el petróleo aparece en `dist/tokens.css` en otra variable que
   `--iris-color-signature-marketing-block`, o un bloque del claro trae algo más que color;
10. una variable de `pieces/redes/_base/brand.css` no tiene su token o vale otra cosa, le falta el
    sello de marketing (`--signature-marketing-block` y `--signature-marketing-text`), `.sello` no
    los lee, o una de las dos copias del sello (`css/signature.css` y `brand.css`) cambia el relleno
    o el interlineado;
11. un token o una variable de CSS (en `css/` o `pieces/`) se llama como lo descartado: `piece`,
    `cardboard` o cartón (capítulo 04, 4.9).

---

## 14.5 Cómo se cambia la marca

La marca es lo que está en `main`. Un cambio es un commit a `main` con el build pasando:

1. Se cambia el token, el manual, la pieza o el archivo de logo.
2. `pnpm build`. Si el test falla, se corrige; no hay forma de saltearlo.
3. Se mira la diferencia de `dist/`: tiene que ser la esperada. El `dist/` commiteado es la foto
   aprobada.
4. Se regeneran las piezas que usan lo que cambió (14.6).
5. Se commitea todo, `dist/` incluido. Aprueba Franco (capítulo 00, 0.7).

**Un cambio que rompe a quien consume** (renombrar o borrar un token, una variable de CSS o una
clase) cambia a los consumidores conocidos en el mismo momento: las piezas de `pieces/` en el mismo
commit y cada app que lo usa, en su repo. El mensaje del commit dice qué se renombró o se borró y
qué va en su lugar. No hay alias ni período de gracia: el nombre viejo deja de existir en ese
commit.

### Un token

1. Se cambia en `tokens/`, nunca en `dist/` ni en el CSS de una app. Un valor nuevo va en
   `foundation.tokens.json`; a qué valor apunta un rol va en `themes/dark.tokens.json` y
   `themes/light.tokens.json`, que tienen siempre los mismos nombres.
2. Un color se escribe en OKLCH con su `hex` al lado; si no coinciden, el test dice qué hex dan los
   componentes. Un rol apunta a foundation: `"$value": "{color.neutral-dark.9}"`.
3. Un rol de color nuevo suma su línea en `css/tailwind.css`.
4. `pnpm build`, y se mira la diferencia de `dist/`: tiene que ser la esperada.
5. Si el valor también está copiado en `pieces/redes/_base/brand.css`, el test lo marca: se corrige
   ahí y se regeneran las piezas.
6. Se actualiza el capítulo del manual que nombra ese valor.

---

## 14.6 Cómo se regeneran las piezas

**Las de redes y las de LinkedIn** (`pieces/redes/` y `pieces/linkedin/`) salen todas con un
comando:

```sh
pieces/redes/_base/render-all.sh   # desde la raíz de iris-brand
```

Lee `pieces/redes/_base/piezas.tsv`: una línea por PNG, con el HTML (las guías son el mismo HTML con
`?guias`), el ancho, el alto y la salida. Las hojas de control van al final porque muestran las PNG
de arriba. Tarda un par de minutos. Una pieza sola, o una que no está en esa lista, se renderiza
con `render.sh`: el comando está en `pieces/redes/plantillas.md`, sección 6.

- Hoy `pieces/redes/_base/brand.css` repite los valores a mano. Cuando cambia un token, se
  actualiza ahí también, hasta que lea `dist/tokens.css`.
- Cuando cambia la forma de un glifo, además se reemplaza en cada HTML que lo dibuja: la lista está
  en `pieces/redes/README.md`.
- Después de regenerar, se miran las PNG con glifos y se repasa la lista de control de
  `pieces/redes/plantillas.md`.

**El banner de LinkedIn** salió de su canvas en Claude Design y hoy es un HTML más, en
`pieces/linkedin/`. **La OG por defecto** sale de su canvas en Claude Design, armada con lo de
este repo, y el PNG final se guarda en `pieces/`. **El avatar** es la foto de perfil de
`pieces/redes/perfil/`, y se regenera con el resto de las piezas de redes.

**Las OG de la landing** las genera el build de la landing desde una plantilla HTML que lee
`tokens.css`. No viven en este repo.

**El ícono y el favicon** se exportan una sola vez desde los SVG master de `logo/`, y se vuelven a
exportar sólo si cambia el SVG. Cómo, en `logo/README.md` («Exportes»).
