# 06 · Forma, espacio y movimiento

**Sin sombras, sin rebotes.** La forma es chica y precisa: radios por rol, bordes de 1 px, niveles
que se separan por luz y borde, y movimiento corto que frena suave.

## 6.1 Radios por rol

| Token | Valor | Dónde |
|---|---|---|
| `radius.chip` | 4 px | Tecla (kbd), badge, controles chicos. |
| `radius.control` | 6 px | Botón e input. |
| `radius.card` | 8 px | Card, popover, burbuja de la persona en la app (en redes no hay burbuja), composer. |
| `radius.panel` | 12 px | Paneles y diálogos; las cards grandes de la landing. |
| `radius.frame` | 16 px | Marcos de captura y de video. |
| `radius.pill` | 9999 px | Píldoras, como «Espera tu OK». |

- **Concéntricos:** el radio de un hijo es el del padre menos el padding, nunca mayor.
- El radio del cuadrado del ícono no es un token: es parte del lockup (0,23 A, capítulo 03).

## 6.2 Bordes

- **1 px** (`border.width.hairline`) en todo: separadores, cards, controles. El color dice el peso:
  `border.subtle`, `border.default` o `border.control` (capítulo 04).
- **En una pieza de redes de 1080 px**, que se ve a un tercio, una línea de 1 px desaparece: los
  bordes y los separadores van a 2 px, y los de una pieza propia crecen con ella (capítulo 08).
- **La regla de la fila activa** es de 2 px (`border.width.rule`), en inset y en `text.primary`, junto
  con `bg.selected`. Es de las listas; nunca es un adorno de card ni un filete de color al costado.
- **El foco** es un outline de 2 px a 2 px de distancia (`border.focus.width`,
  `border.focus.offset`), en `focus`: la tinta. Se ve siempre que se navega con teclado.

## 6.3 Elevación sin sombras

| Nivel | Qué es | Cómo se construye |
|---|---|---|
| 0 | La página | `bg.canvas` |
| 1 | Card, panel, composer | `bg.surface` + `border.subtle` |
| 2 | Popover, menú, diálogo, ⌘K | `bg.raised` + `border.default` |
| 3 | Diálogo modal | Nivel 2 + `backdrop` detrás |
| Flotante | La barra de la landing, ⌘K, popovers, la aprobación cuando flota | Vidrio ahumado (abajo). Sin soporte, vuelve al nivel 2. |

En oscuro cada nivel sube un escalón de luz; en claro todo es el mismo blanco y el nivel lo dice el
borde. Sobre negro una sombra no contrasta, y un borde liso es más fiel al minimalismo: no hay
sombras en ningún modo.

## 6.4 Espaciado y layout

**La base es 4 px.** El nombre del token es el múltiplo, como en Tailwind:

| `space.1` | `space.2` | `space.3` | `space.4` | `space.5` | `space.6` | `space.8` | `space.10` | `space.12` | `space.16` |
|---|---|---|---|---|---|---|---|---|---|
| 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64 |

**La landing** tiene un solo breakpoint, `layout.breakpoint.narrow`, a 600 px. Abajo de ese ancho se
achica el ritmo, no el contenido.

| Token | Normal | Abajo de 600 px |
|---|---|---|
| `layout.container` | 1080 px de ancho máximo | — |
| `layout.gutter` · `layout.gutter-narrow` | 24 px | 16 px |
| `layout.section` · `layout.section-narrow` | 80 px entre secciones | 56 px |
| `layout.hero` · `layout.hero-narrow` | 104 px arriba y abajo del hero | 64 px |

- **Densidad en los datos, aire en el chrome.** Una tabla puede ser apretada; lo que la rodea, no.
- **Alineado a la izquierda**, en una columna. No se centra el contenido, ni la barra flotante: va
  alineada al contenedor de 1080, no como una píldora chica en el medio.
- El largo de línea tiene sus tokens (`layout.measure.*`, capítulo 05).

## 6.5 Controles

| Token | Valor | Dónde |
|---|---|---|
| `size.control.dense` | 28 px | Alto de botón e input en la app. |
| `size.control.comfortable` | 40 px | Alto de botón en la landing y en las piezas. |
| `size.target-min` | 24 px | El lado mínimo de todo lo que se toca o se clickea (WCAG 2.5.8). |

- **El CTA es tinta:** relleno de `action.primary` con `text.on-action` encima, en `label`. Hay uno
  solo por pantalla. En hover baja a opacidad 0,9 (`opacity.hover`).
- **Con un sello a la vista, el CTA va con borde.** El sello ya no va en nada nuevo (capítulo 05,
  5.3): la firma va en color y el CTA, lleno. Donde el sello sigue (el hero de la landing, hasta
  que se rehaga), el botón principal se dibuja con borde de 1 px en `text.primary`, sin relleno
  y con la letra en `text.primary`, para que el sello sea el único bloque lleno de tinta. Del ghost
  lo separa el borde: tinta, no `border.default`. Su hover es `bg.hover`, como el de todo control
  sin relleno.
- **El secundario es ghost:** sin relleno, con borde `border.default` y texto `text.primary`. Su hover
  es `bg.hover`.
- **El destructivo es ghost:** texto y borde en `action.destructive`, nunca relleno. Va con una
  confirmación que repite el objeto: «Borrar 12 publicaciones».
- **Deshabilitado:** el control entero a opacidad 0,4 (`opacity.disabled`).
- **El input** lleva borde `border.control`, placeholder en `text.placeholder` y foco de tinta.
- **Hover y selección no tienen color:** son `bg.hover` y `bg.selected`.
- **El texto del botón dice exactamente qué pasa:** «Aprobar», «Rechazar con motivo».

## 6.6 Íconos de interfaz

- **lucide, de 16 px**, en el color del texto que acompañan.
- Sólo cuando ayudan a operar: nunca decorativos.
- Ningún ícono de «IA»: ni destellos, ni cerebros, ni robots, ni varitas.
- Los glifos de estado no son íconos: son los cinco del capítulo 04, de 10 px (en una pieza de
  redes crecen: capítulo 08, 8.1), y no se reemplazan por un ícono de lucide.

## 6.7 Movimiento

| Token | Valor | Para qué |
|---|---|---|
| `duration.fast` | 120 ms | Color, borde, hover. |
| `duration.base` | 180 ms | Plegar, desplegar, abrir un popover. |
| `duration.slow` | 280 ms | Panel lateral, sheet. |
| `duration.reveal` | 600 ms | La única entrada orquestada de la página. |
| `duration.stagger` | 80 ms | El desfase entre líneas de esa entrada. |
| `easing.out` | cubic-bezier(0.23, 1, 0.32, 1) | El default (ease-out quint): entra rápido y frena suave. |
| `easing.in-out` | cubic-bezier(0.65, 0, 0.35, 1) | Lo que se mueve de un lugar a otro. |

- **Una sola entrada orquestada por página:** el titular entra línea por línea, con `opacity` y
  `translateY`, a 600 ms y con 80 ms de desfase. El resto aparece sin coreografía.
- **Se animan** `transform`, `opacity` y colores. **Nunca** `transition: all`, `filter` ni el blur
  del vidrio.
- **Sin rebotes** ni resortes.
- **El ◐ de «iris trabajando»** late suave en opacidad dos veces al entrar al estado (1,2 s cada
  latido, hasta 0,45 y de vuelta) y queda quieto. Son 2,4 s, debajo de los 5 s que WCAG permite sin
  control para pausar. Nunca gira.
- **Con `prefers-reduced-motion`** todo queda quieto y visible.

### Movimiento en piezas de video

Un reel cuenta una conversación en el tiempo, sobre el vidrio del capítulo 15. Lo que se anima es
el trabajo de iris, nunca un adorno.

- **La secuencia** es siempre la misma, una entrada por tiempo: la pregunta que se tipea → la línea
  «tool · estado» con el ◐ de trabajando → la respuesta, con la cifra → el OK, con el ● y su
  palabra. Cuando la tool termina, la línea pasa de ◐ a ✓.
- **La secuencia va sin titular:** el titular va en el cuadro de cierre del reel, con el lockup.
- **El cursor titila** en tinta (`text.primary`, #EDEDEA), prendido y apagado, y sólo cuando el
  tipeo para: mientras se tipea, va fijo al final del texto.
- **El ◐ late** como en la app: en opacidad hasta `opacity.pulse` (0,45) y de vuelta, con
  `duration.pulse` (1200 ms) por latido y `easing.in-out`, una o dos veces, y queda quieto. Nunca
  gira.
- **Las duraciones son las de los tokens.** Cada tiempo entra con `opacity` y `translateY`, en
  `duration.reveal` (600 ms) y `easing.out`; lo que entra junto (las filas debajo de la cifra) va
  con `duration.stagger` (80 ms) de desfase; un cambio de estado, como ◐ → ✓, es un fundido de
  `duration.base` (180 ms); lo que se va, se va en `duration.slow` (280 ms); lo que cambia de lugar
  usa `easing.in-out`.
- **Sin rebotes ni resortes.** Nada gira y nada queda en loop, salvo el cursor mientras espera. Se
  anima sólo `transform`, `opacity` y color.
- **Con `prefers-reduced-motion`**, quieto: el HTML del que sale el video muestra el cuadro final,
  con todo visible.
- El formato es vertical, 1080 × 1920 a 30 fps (capítulo 11, 11.8).

## 6.8 El vidrio

**Vidrio ahumado sobre una luz de color.** En la app es la capa que flota; en las piezas de redes,
el panel o la tarjeta de la pieza (capítulo 15). Es la única excepción a «sin blur» del sistema.

### La regla

En la app, el vidrio es la capa que flota sobre contenido que se mueve. Nunca va en el contenido,
nunca vidrio sobre vidrio y nunca más de dos a la vez. En las piezas de redes es el soporte de la
pieza, con su propia hoja (`pieces/redes/_base/vidrio.css`) y sus reglas (capítulo 15). **El contraste lo garantiza el
tinte, no el blur:** con el peor fondo detrás y aunque el desenfoque no se pinte, el texto permitido
pasa.

### El material

| Token | Oscuro | Claro |
|---|---|---|
| `glass.blur` | 24 px | 24 px |
| `glass.saturate` | 1,4 | 1,4 |
| `glass.bar`: el tinte de la barra | `bg.surface` (#111110) al 80 % | `bg.surface` (#FAFAF9) al 82 % |
| `glass.panel`: el tinte del panel | `bg.raised` (#181816) al 94 % | `bg.raised` (#FAFAF9) al 94 % |
| `glass.rim`: el borde de 1 px | blanco al 14 % | `text.primary` (#1A1917) al 20 % |
| `glass.specular`: la línea de luz inset de 1 px arriba | blanco al 10 % | blanco al 70 % |

En CSS son `--iris-color-glass-bar`, `--iris-color-glass-panel`, `--iris-color-glass-rim`,
`--iris-color-glass-specular`, `--iris-glass-blur` y `--iris-glass-saturate`.

- Sin lente ni refracción: la refracción sólo la dibuja Chrome y no hay forma honesta de detectarla.
  La versión transparente, sin tinte, es ilegible (1,1:1).
- Sin ruido, sin tinte de color y sin sombra. La línea de luz es luz, no sombra.
- Con 24 px no se lee nada de lo que pasa por abajo, ni un titular de 64. La saturación le devuelve el
  tono a las fotos de producto que el tinte apaga; sobre neutros no hace nada.

### Dos niveles, por rol

- **La barra** (`.glass-bar`) es la nav flotante de la landing. Lleva sólo `text.primary`,
  `text.secondary`, el CTA de tinta sólido (con el sello del hero a la vista, con borde: 6.5) y el
  foco. Ni `text.tertiary`, ni placeholder, ni texto
  rojo, ni `border.control`, ni glifos de estado: con blanco puro detrás la barra da #414140 y el
  terciario baja a 3,63:1. Si hace falta algo de eso, es un panel.
- **El panel** (`.glass-panel`) es lo que flota con contenido: ⌘K, popovers y menús, la aprobación
  cuando flota. En oscuro, con blanco puro detrás, da exactamente `bg.selected` (#262624); en claro,
  con negro puro detrás, da #EBEBEA, apenas más claro que su `bg.selected` (#EAE9E8): todo lo que
  pasa sobre `bg.selected` pasa acá por construcción, glifos de estado incluidos.

### Dónde sí y dónde no

| Sí | No |
|---|---|
| La barra flotante de la landing. | El contenido: feed, cards, tablas, chat, documentos, formularios. |
| La paleta ⌘K, **sin cortina detrás**: con el `backdrop` el vidrio desaparece, así que va uno de los dos. | Las piezas estáticas de la app y la landing (OG, banner, logo): sin movimiento detrás, el vidrio es un dibujo de vidrio. Las de redes lo usan a propósito, con su hoja (capítulo 15). |
| Popovers y menús. | La tarjeta de aprobación adentro del feed: ahí es contenido. |
| La tarjeta de aprobación cuando flota sobre el contenido. Adentro todo es sólido: el CTA de tinta y el ghost. | Vidrio sobre vidrio, o más de dos vidrios a la vez. Nada a pantalla completa. |

- El vidrio aparece y se va con `opacity` en el mismo elemento que lleva el vidrio. Si un padre anima
  `filter` u `opacity`, el hijo deja de difuminar.
- Sobre el negro casi plano de la app el vidrio apenas se distingue de la superficie lisa: donde se
  luce es en la barra de la landing y sobre fotos.

### La luz de fondo

Detrás del vidrio puede ir una luz de color, una sola por pantalla: `.glass-backlight` con su color,
`.glass-backlight-iris` (petróleo, lo que hace iris), `.glass-backlight-attention` (ámbar, sólo con
una decisión pendiente) o `.glass-backlight-neutral` (monocromo). Qué dice cada color y dónde va,
en el capítulo 04 (4.9).

- **Es un degradé radial, no un blur:** un círculo de `backlight.*` que se apaga hacia afuera. No
  cuesta pintarlo y se ve igual en todos los navegadores. Va con `aria-hidden="true"`.
- **El lugar y el tamaño los pone la pantalla** (`top`, `left`, `width`): la clase trae la forma y
  el color. Se corre para no quedar detrás de lo que se lee.
- **No se anima ni sigue al mouse.** Es luz de ambiente, no un efecto.
- **Nada se lee sobre ella sin vidrio encima:** es decorativa y no tiene umbral de contraste.

```html
<div class="relative isolate overflow-hidden">
  <span class="glass-backlight glass-backlight-iris" style="top: -20%; left: 30%; width: 70%" aria-hidden="true"></span>
  <div class="glass-panel relative rounded-panel">…</div>
</div>
```

### Accesibilidad

- **La luz de fondo** se apaga con `prefers-reduced-transparency: reduce`, `prefers-contrast: more`
  y `forced-colors: active`.
- **Sin soporte de `backdrop-filter`** el elemento es la superficie lisa del nivel 2: `bg.raised` con
  `border.default`. Es el mismo nivel que el vidrio, así que nada cambia de lugar.
- **Con `prefers-reduced-transparency: reduce` o `prefers-contrast: more`** vuelve a la superficie
  lisa.
- **Con `forced-colors: active`** usa `Canvas` y `CanvasText`, sin blur.
- Safari no le avisa a la web de «Reducir transparencia»: por eso el tinte garantiza el contraste
  solo.
- Se verificó en Chrome. En Safari y Firefox se midieron el estilo y el fallback, no que pinten el
  desenfoque.

### La receta

Vive en `css/glass.css` y se importa después de `tokens.css`. Lo esencial:

```css
.glass-bar, .glass-panel {               /* sin soporte: el nivel 2 liso */
  background-color: var(--iris-color-bg-raised);
  border: 1px solid var(--iris-color-border-default);
}
@supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
  .glass-bar, .glass-panel {
    border-color: var(--iris-color-glass-rim);
    box-shadow: inset 0 1px 0 var(--iris-color-glass-specular);   /* luz, no sombra */
    -webkit-backdrop-filter: blur(var(--iris-glass-blur)) saturate(var(--iris-glass-saturate));
    backdrop-filter: blur(var(--iris-glass-blur)) saturate(var(--iris-glass-saturate));
  }
  .glass-bar { background-color: var(--iris-color-glass-bar); }
  .glass-panel { background-color: var(--iris-color-glass-panel); }
}
@media (prefers-reduced-transparency: reduce), (prefers-contrast: more) {
  .glass-bar, .glass-panel {
    background-color: var(--iris-color-bg-raised);
    border-color: var(--iris-color-border-default);
    box-shadow: none; -webkit-backdrop-filter: none; backdrop-filter: none;
  }
}
@media (forced-colors: active) {
  .glass-bar, .glass-panel {
    background-color: Canvas; border-color: CanvasText;
    box-shadow: none; -webkit-backdrop-filter: none; backdrop-filter: none;
  }
}
```

Se midió contra el peor fondo posible detrás, en Chromium, WebKit y Firefox. La verificación
final corrigió el panel: de
`bg.surface` al 92 % pasó a `bg.raised` al 94 %, y el borde de blanco al 8 % pasó al 14 %.
