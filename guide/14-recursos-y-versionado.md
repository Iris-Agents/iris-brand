# 14 · Recursos y versionado

Dónde está cada cosa, cómo la toma una app, qué frena el test y cómo sale una versión nueva.

---

## 14.1 Dónde está todo

| Qué | Dónde |
|---|---|
| Los tokens (DTCG 2025.10) | `tokens/`: `foundation.tokens.json`, `themes/` (oscuro y claro) y `iris.resolver.json`, con el oscuro por defecto. |
| El CSS generado | `dist/tokens.css`. Se commitea: quien lo consume no compila nada. |
| La salida para Claude Design | `dist/design-system.json`, en la forma de listas que lee el tipo Design System. |
| El CSS escrito a mano, sin valores propios | `css/fonts.css`, `css/tailwind.css` y `css/glass.css`. |
| Las fuentes | `fonts/`: WOFF2 de DM Serif Display itálica, IBM Plex Sans (400 y 500) e IBM Plex Mono (400), con sus licencias OFL. |
| El logo | `logo/`: los SVG master del ícono, del logotipo y del lockup, y sus exportaciones (capítulo 03). |
| Las piezas terminadas | `pieces/redes/`, con el avatar en `pieces/redes/perfil/`. El banner y la OG por defecto se guardan en `pieces/` cuando salgan de Claude Design (14.7). |
| El manual | `guide/`, un archivo por capítulo. |
| La guarda | `test/`. |
| El registro de cómo se decidió | Es privado y no está en este repo. Si dice otra cosa que el manual, manda el manual. |
| Fuera del repo | El Design System «iris» en claude.ai y la página /brand de la landing, cuando existan. |

---

## 14.2 Cómo lo instala una app

Como dependencia de git, en el `package.json` de la app:

```sh
pnpm add github:Iris-Agents/iris-brand#semver:^1
```

Y en el CSS principal, después de `@import "tailwindcss"`:

```css
@import "iris-brand/fonts.css";
@import "iris-brand/tokens.css";
@import "iris-brand/tailwind.css";
@import "iris-brand/glass.css";   /* sólo si la app tiene una capa que flota */

html { font-synthesis: none; }    /* que el navegador no invente negritas */
```

- **El repo es público**, así que ninguna máquina ni el CI necesitan un token para instalarlo.
- **`#semver:^1`** hace que pnpm elija el tag más nuevo de la versión 1. La versión queda escrita en
  el `package.json` y en el lockfile de la app.
- **La app no compila nada.** `dist/` está commiteado y el paquete no tiene script `prepare`: si lo
  tuviera, pnpm instalaría las dependencias de desarrollo y compilaría en cada instalación.
- **Las dependencias de este repo** (Terrazzo y colorjs.io) son de desarrollo. Nunca entran a una
  app ni al Worker.
- **Cada app la adopta en su propia tarea**, cuando y cuanto se decida. El puente con sus
  componentes (por ejemplo, shadcn) queda en la app.
- **Tomar una versión nueva** es `pnpm update iris-brand` en la app. Ninguna app cambia sola.

### Por qué no un submódulo

Funcionaría, pero da problemas todos los días:
- Hay que clonar con `--recursive`, o la carpeta queda vacía.
- El submódulo apunta a un commit suelto, no a una versión.
- Es fácil commitear uno desactualizado sin darse cuenta.

Con la dependencia, la versión está escrita en el `package.json` y un `pnpm install` deja todo
listo.

### Más adelante, npm

El paquete se puede publicar en npm con un nombre propio (por ejemplo `@iris-agents/brand`, si está
libre) y se instalaría con `pnpm add` de ese nombre. Para empezar no hace falta: el link a GitHub
hace lo mismo sin otra cuenta que mantener.

---

## 14.3 Qué frena el test

Hay un solo comando, `pnpm build`: genera `dist/tokens.css` con Terrazzo, genera
`dist/design-system.json` y corre el test. **Si el test falla, el comando sale con error y ese
`dist/` no se commitea.** `pnpm test` corre sólo el test, sin red: los esquemas están en
`test/schemas/`. Frena cuando:

1. los tokens o el resolver no validan contra los esquemas oficiales de DTCG 2025.10;
2. un alias no resuelve en alguno de los dos modos, un rol apunta a otro rol, los modos no tienen
   los mismos nombres, un token no tiene `$type`, un color o un rol no tiene `$description`, o
   alguno lleva `$extensions`;
3. un hex no coincide con su OKLCH, un color cae fuera de sRGB, o «resuelto» deja de ser el mismo
   gris que `text.tertiary`;
4. alguno de los 155 pares de contraste baja de WCAG 2.2 AA sobre cualquier fondo de su modo
   (capítulo 13);
5. no son doce estilos, aparece un peso fuera de 400 y 500, algo baja de 12 px, un estilo no cumple
   la regla de tracking de su familia, o las dos líneas de un titular no comparten tamaño e
   interlineado;
6. la firma, como texto, aparece por debajo de 32 px, fuera del peso 400 o fuera de la segunda línea
   de un titular (el logotipo y la i del ícono son dibujos de `logo/`);
7. un tinte del vidrio deja de ser el neutro que dice su nombre, o el texto permitido no pasa con
   blanco o negro puro detrás;
8. `css/tailwind.css` choca con los nombres de shadcn o con la paleta de Tailwind, nombra una
   variable que `dist/tokens.css` no tiene o le falta un rol de color; `css/glass.css` escribe un
   color propio; `css/fonts.css` no declara una familia de los tokens o nombra un archivo que no
   existe;
9. `dist/` no es exactamente lo que generan los tokens (un `dist/` viejo, editado a mano o con otra
   versión del paquete adentro no pasa), un primitivo sale al CSS o un bloque del claro trae algo
   más que color;
10. una variable de `pieces/redes/_base/brand.css` no tiene su token o vale otra cosa.

---

## 14.4 Semver

Un número por versión del paquete, con tag de git.

| Cambio | Versión |
|---|---|
| Cambiar el valor de un token | minor: 1.2.0 → 1.3.0 |
| Agregar un token | minor |
| Renombrar o borrar un token | major: 1.x → 2.0.0 |
| Algo que no toca ningún token (el manual, una pieza, un informe) | patch: 1.3.0 → 1.3.1 |

- **Un token que va a desaparecer avisa una versión antes.** En la última minor de la serie se
  marca con `$deprecated`, diciendo qué usar en su lugar:
  ```json
  "muted": {
    "$type": "color",
    "$value": "{color.neutral-dark.10}",
    "$deprecated": "Usar color.text.secondary."
  }
  ```
  En la major siguiente se borra.
- Las apps que están en `^1` no reciben un 2.0 hasta que alguien las actualiza a mano.
- El `version` del resolver es el de la spec DTCG (`2025.10`), no el del paquete.

---

## 14.5 Cómo sale una versión

1. En una rama, se cambia el token, el manual o el archivo de logo, y se sube el `version` del
   `package.json` según la tabla de 14.4. La versión va antes del build:
   `dist/design-system.json` la lleva adentro (`meta.source`) y el test falla si quedó la vieja.
2. `pnpm build`. Si el test falla, se corrige; no hay forma de saltearlo.
3. Se mira la diferencia de `dist/`: tiene que ser la esperada. El `dist/` commiteado es la foto
   aprobada.
4. Se commitea todo, `dist/` incluido. Aprueba Franco (capítulo 00).
5. Se crea el tag con la versión y se sube:
   ```sh
   git tag -a v1.3.0 -m "v1.3.0: qué tokens cambiaron y por qué"
   git push --follow-tags
   ```
   La nota del tag dice qué tokens cambiaron. Un tag publicado no se mueve ni se borra: si salió
   mal, sale otra versión.
6. Se re-sincroniza el Design System de claude.ai (14.6).
7. Se regeneran las piezas que usan lo que cambió (14.7).
8. Cada app toma la versión cuando quiere, con `pnpm update iris-brand`.

---

## 14.6 El Design System de claude.ai

Claude Design no instala nada: lee el Design System «iris» publicado en claude.ai. Hoy no está
publicado; es el paso siguiente.

Cuando exista, en cada versión:
- se actualiza ese Design System con los archivos del tag: `dist/design-system.json`, `guide/`,
  `logo/` y `fonts/`;
- los canvases que lo eligieron (el banner, las OG, las piezas) toman la versión nueva;
- el movimiento no viaja, porque el tipo no lo lee: queda en el manual.

El procedimiento exacto se escribe acá con la primera publicación.

---

## 14.7 Cómo se regeneran las piezas

**Las de redes** (`pieces/redes/`), con Google Chrome en `/Applications` e internet para las
fuentes:

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

**El banner y la OG por defecto** salen de sus canvases en Claude Design, que eligen el Design
System «iris». El PNG final se guarda en `pieces/`. **El avatar** es la foto de perfil de
`pieces/redes/perfil/`, y se regenera con el resto de las piezas de redes.

**Las OG de la landing** las genera el build de la landing desde una plantilla HTML que lee
`tokens.css`. No viven en este repo.

**El ícono y el favicon** se exportan una sola vez desde los SVG master de `logo/`, y se vuelven a
exportar sólo si cambia el SVG.
