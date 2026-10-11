# 14 · Recursos

Dónde está cada cosa, cómo la toma una app y cómo se actualiza, qué frena el test y cómo se cambia
la marca.

---

## 14.1 Dónde está todo

| Qué | Dónde |
|---|---|
| Los tokens (DTCG 2025.10) | `tokens/`: `foundation.tokens.json`, `themes/` (oscuro y claro) y `iris.resolver.json`, con el oscuro por defecto. El `version` del resolver es el de la spec DTCG (`2025.10`), no uno de la marca. |
| El CSS generado | `dist/tokens.css`. Se commitea: quien lo consume no compila nada. |
| El CSS escrito a mano, sin valores propios | `css/fonts.css`, `css/tailwind.css`, `css/glass.css` y `css/signature.css`. |
| Las fuentes | `fonts/`: WOFF2 de DM Serif Display itálica, IBM Plex Sans (400 y 500) e IBM Plex Mono (400), con sus licencias OFL. |
| El logo | `logo/`: los SVG master del ícono, del logotipo y del lockup, y sus exportaciones (capítulo 03). |
| Las piezas terminadas | `pieces/redes/`, con el avatar en `pieces/redes/perfil/`, y `pieces/linkedin/`: el banner del perfil y la portada y el logo de la página de empresa. La OG por defecto se guarda en `pieces/` cuando salga de Claude Design (14.6). |
| El manual | `guide/`, un archivo por capítulo. |
| La guarda | `test/`. |
| El registro de cómo se decidió | Es privado y no está en este repo. Si dice otra cosa que el manual, manda el manual. |
| Fuera del repo | La página /brand de la landing, cuando exista. |

---

## 14.2 Cómo lo instala una app

Como dependencia de git, en el `package.json` de la app:

```sh
pnpm add github:Iris-Agents/iris-brand
```

Y en el CSS principal, después de `@import "tailwindcss"`:

```css
@import "iris-brand/fonts.css";
@import "iris-brand/tokens.css";
@import "iris-brand/tailwind.css";
@import "iris-brand/signature.css"; /* el sello del titular de dos líneas */
@import "iris-brand/glass.css";   /* sólo si la app tiene una capa que flota */

html { font-synthesis: none; }    /* que el navegador no invente negritas */
```

- **El repo es público**, así que ninguna máquina ni el CI necesitan un token para instalarlo.
- **Sin versiones.** La marca es lo que está en `main`: pnpm toma su último commit y el lockfile de
  la app lo fija.
- **La app no compila nada.** `dist/` está commiteado y el paquete no tiene script `prepare`: si lo
  tuviera, pnpm instalaría las dependencias de desarrollo y compilaría en cada instalación.
- **Las dependencias de este repo** (Terrazzo y colorjs.io) son de desarrollo. Nunca entran a una
  app ni al Worker.
- **Cada app la adopta en su propia tarea**, cuando y cuanto se decida. El puente con sus
  componentes (por ejemplo, shadcn) queda en la app.

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

Hay un solo comando, `pnpm build`: genera `dist/tokens.css` con Terrazzo y corre el test. **Si el
test falla, el comando sale con error y ese `dist/` no se commitea.** `pnpm test` corre sólo el
test, sin red: los esquemas están en `test/schemas/`. Frena cuando:

1. los tokens o el resolver no validan contra los esquemas oficiales de DTCG 2025.10;
2. un alias no resuelve en alguno de los dos modos, un rol apunta a otro rol, los modos no tienen
   los mismos nombres, un token no tiene `$type`, un color o un rol no tiene `$description`, o
   alguno lleva `$extensions`;
3. un hex no coincide con su OKLCH, un color cae fuera de sRGB, «resuelto» deja de ser el mismo
   gris que `text.tertiary`, el petróleo lo usa un token que no es `signature.marketing.block`, o
   queda a menos de ΔEOK 0,091 de un estado, de los colores de Claude o de Anthropic, de los de
   Mercado Libre o Mercado Pago, o de un color ya descartado (capítulo 04, 4.9);
4. alguno de los 159 pares de contraste baja de su mínimo sobre cualquier fondo de su modo: WCAG
   2.2 AA, y 7:1 para la firma sobre el sello de marketing (capítulo 13);
5. no son doce estilos, aparece un peso fuera de 400 y 500, algo baja de 12 px, un estilo no cumple
   la regla de tracking de su familia, o las dos líneas de un titular no comparten tamaño e
   interlineado;
6. la firma, como texto, aparece por debajo de 32 px, fuera del peso 400 o fuera de la segunda línea
   de un titular (el logotipo y la i del ícono son dibujos de `logo/`);
7. un tinte del vidrio deja de ser el neutro que dice su nombre, o el texto permitido no pasa con
   blanco o negro puro detrás;
8. `css/tailwind.css` choca con los nombres de shadcn o con la paleta de Tailwind, nombra una
   variable que `dist/tokens.css` no tiene o le falta un rol de color; `css/glass.css` o
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
5. Se commitea todo, `dist/` incluido. Aprueba Franco (capítulo 00).

**Un cambio que rompe a quien consume** (renombrar o borrar un token, una variable de CSS o una
clase) cambia a los consumidores conocidos en el mismo momento: las piezas de `pieces/` en el mismo
commit y cada app que lo usa, en su repo. El mensaje del commit dice qué se renombró o se borró y
qué va en su lugar. No hay alias ni período de gracia: el nombre viejo deja de existir en ese
commit.

---

## 14.6 Cómo se regeneran las piezas

**Las de redes y las de LinkedIn** (`pieces/redes/` y `pieces/linkedin/`), con Google Chrome en
`/Applications` e internet para las fuentes:

```sh
pieces/redes/_base/render-all.sh
```

Lee `pieces/redes/_base/piezas.tsv`, una línea por PNG, y tarda un par de minutos. Una sola pieza,
con la ruta de salida absoluta:

```sh
pieces/redes/_base/render.sh <pieza.html> <ancho> <alto> <salida.png>
pieces/redes/_base/render.sh "<pieza.html>?guias" <ancho> <alto> <salida-guias.png>
```

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
exportar sólo si cambia el SVG.
