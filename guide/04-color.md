# 04 · Color

**Blanco y negro, con dos colores.** La jerarquía sale de la luz y de la tinta: más claro es más
importante en oscuro, más oscuro en claro. Fuera de los neutros están los colores de estado, que
viven en su glifo, y los dos colores de la marca: **el petróleo es el color secundario, el de los
detalles; el ámbar es la excepción, y aparece sólo con un ● a la vista.** Ninguno va de relleno
(4.9).

- **El oscuro es la noche y el claro es el día** de la misma marca. El oscuro es el default: landing,
  OG, banner y el resolver de tokens. El claro es para quien usa la app de día, y en redes se
  alterna con el oscuro en la grilla (capítulo 15). Comparte los roles del oscuro, no es el oscuro
  invertido.
- El `meta theme-color` de cada página es el `bg.canvas` de su modo: #0A0A09 o #FAFAF9.

## 4.1 Paleta

### Negro, blanco y petróleo de marca

| Token | Hex | OKLCH | Qué es |
|---|---|---|---|
| `color.brand.black` | #0A0A09 | 0.145 0.002 95 | El fondo del ícono y el piso del oscuro en todo. Un negro neutro: hoy conviven tres (#0A0A0B en el ícono, #070708 en la landing y el banner, #121211 en la app) y queda éste. |
| `color.brand.white` | #FAFAF9 | 0.985 0.0013 95 | La i del ícono, el logotipo sobre oscuro y el piso del claro. No es el color del texto: el texto del oscuro es `text.primary`. |
| `color.brand.day-white` | #E9E9E6 | 0.933 0.004 95 | El blanco de día: el piso del claro en las piezas de redes y en la landing, debajo de la luz y el vidrio (capítulo 15, 15.2). Es `glass.marketing.canvas` del claro. |
| `color.brand.petrol` | #03313C | 0.29 0.05 219 | El petróleo en su tono más hondo: el bloque del sello de marketing, que queda sólo en el titular de la landing y sus OG hasta que se rehagan (4.9). Lo nuevo usa sus tonos, abajo. |

### Los tonos de la marca: `color.tint`

El petróleo y el ámbar, cada uno con un tono para el oscuro y otro para el claro. El ámbar es el
mismo tono 70 del ● de «te toca», más hondo o más pálido: dice lo mismo.

| Token | Hex | OKLCH | Lo usa |
|---|---|---|---|
| `color.tint.petrol-deep` | #0B3A44 | 0.323 0.0511 215.4 | `backlight.iris` en oscuro |
| `color.tint.petrol-pale` | #BFD8DC | 0.865 0.0273 208.3 | `backlight.iris` en claro |
| `color.tint.petrol-mist` | #B9D3D8 | 0.8491 0.0287 210.5 | `accent`, `signature.phrase` y `data.highlight` en oscuro |
| `color.tint.petrol-ink` | #0B4A57 | 0.3784 0.0626 215.8 | `accent`, `signature.phrase` y `data.highlight` en claro |
| `color.tint.amber-deep` | #6A4314 | 0.4193 0.0808 66.7 | `backlight.attention` en oscuro |
| `color.tint.amber-pale` | #F2D6AE | 0.8895 0.061 76.6 | `backlight.attention` en claro |

La escala va en tono 95 con croma de 0,002 a 0,006: el leve tinte cálido se percibe recién en los
grises medios. En oscuro, cada nivel de fondo sube 3,1 puntos de luz (0,031 de L en OKLCH): es el
escalón que la landing había calibrado, porque menos no se veía y más se leía gris.

### Neutros del oscuro: `color.neutral-dark`

| Paso | Hex | OKLCH | Roles |
|---|---|---|---|
| 1 | #0A0A09 | = `brand.black` | `bg.canvas` · `text.on-action` · `signature.text` |
| 2 | #111110 | 0.176 0.0022 95 | `bg.surface` |
| 3 | #181816 | 0.207 0.0025 95 | `bg.raised` |
| 4 | #201F1E | 0.240 0.0028 95 | `bg.hover` |
| 5 | #262624 | 0.268 0.003 95 | `bg.selected` |
| 6 | #2C2B29 | 0.290 0.0035 95 | `border.subtle` · `data.grid` |
| 7 | #3A3937 | 0.345 0.004 95 | `border.default` · `selection` |
| 8 | #72716E | 0.550 0.005 95 | `border.control` · `text.disabled` · `link.underline` |
| 9 | #9B9A96 | 0.685 0.006 95 | `text.tertiary` · `text.placeholder` · `status.done` · `data.comparison` |
| 10 | #BFBEB9 | 0.800 0.006 95 | `text.secondary` |
| 11 | #EDEDEA | 0.945 0.004 95 | `text.primary` · `action.primary` · `focus` · `status.idle` · `data.series` · `signature.block` · `signature.marketing.text` |

### Neutros del claro: `color.neutral-light`

| Paso | Hex | OKLCH | Roles |
|---|---|---|---|
| 1 | #FAFAF9 | = `brand.white` | `bg.canvas` · `bg.surface` · `bg.raised` · `text.on-action` · `signature.text` |
| 2 | #F0F0EF | 0.955 0.002 95 | `bg.hover` |
| 3 | #EAE9E8 | 0.935 0.0025 95 | `bg.selected` |
| 4 | #E3E3E1 | 0.915 0.003 95 | `border.subtle` · `data.grid` |
| 5 | #DBDBD8 | 0.890 0.0035 95 | `selection` |
| 6 | #CECECB | 0.850 0.004 95 | `border.default` |
| 7 | #868581 | 0.615 0.0055 95 | `border.control` · `text.disabled` · `link.underline` |
| 8 | #686764 | 0.515 0.006 95 | `text.tertiary` · `text.placeholder` · `status.done` · `data.comparison` |
| 9 | #4E4D49 | 0.420 0.006 95 | `text.secondary` · `status.idle` |
| 10 | #1A1917 | 0.215 0.004 95 | `text.primary` · `action.primary` · `focus` · `data.series` · `signature.block` |

### Señal: `color.signal`

Con el petróleo y los tonos de arriba, los únicos colores fuera de los neutros. Cada señal tiene su
versión para oscuro y para claro.

| Token | Hex | OKLCH | Lo usa |
|---|---|---|---|
| `color.signal.amber-on-dark` | #F7AC4D | 0.80 0.14 70 | `status.attention` |
| `color.signal.amber-on-light` | #AD721C | 0.60 0.12 70 | `status.attention` |
| `color.signal.green-on-dark` | #50A064 | 0.64 0.12 150 | `status.working` |
| `color.signal.green-on-light` | #266739 | 0.46 0.10 150 | `status.working` |
| `color.signal.red-on-dark` | #E66E68 | 0.68 0.15 25 | `status.failed` · `action.destructive` |
| `color.signal.red-on-light` | #BC3732 | 0.535 0.17 27 | `status.failed` · `action.destructive` |

Con alfa hay dos más: `color.alpha.black-60` (negro al 60 %) y `color.alpha.black-30` (al 30 %),
para el `backdrop`. Los del vidrio están en el capítulo 06.

## 4.2 Roles por modo

Un componente usa sólo estos nombres. Cambian de valor con el modo; el rol es el mismo.

| Token | Oscuro | Claro | Para qué |
|---|---|---|---|
| `bg.canvas` | #0A0A09 | #FAFAF9 | El piso de la página (nivel 0). |
| `bg.surface` | #111110 | #FAFAF9 | Card, panel, composer (nivel 1). |
| `bg.raised` | #181816 | #FAFAF9 | Popover, menú, diálogo, ⌘K (nivel 2). |
| `bg.hover` | #201F1E | #F0F0EF | Hover de fila, ítem o botón secundario, sobre cualquier nivel. |
| `bg.selected` | #262624 | #EAE9E8 | Fila o ítem seleccionado, con la regla inset de 2 px en `text.primary`. |
| `text.primary` | #EDEDEA | #1A1917 | Titulares, nombres, el hilo del agente, todo lo que se lee de corrido. |
| `text.secondary` | #BFBEB9 | #4E4D49 | Texto de apoyo de 13 px para arriba: bajadas, ayudas, el verbo de una fila. |
| `text.tertiary` | #9B9A96 | #686764 | Datos sueltos: hora, id, contador, eyebrow, meta de fila, leyenda. Nunca una oración. |
| `text.placeholder` | #9B9A96 | #686764 | El placeholder de un input. Es el valor del terciario para que pase AA sobre cualquier fondo. |
| `text.disabled` | #72716E | #868581 | Etiqueta deshabilitada. |
| `text.on-action` | #0A0A09 | #FAFAF9 | El texto sobre el CTA de tinta. |
| `border.subtle` | #2C2B29 | #E3E3E1 | El hairline dominante: separadores y cards. |
| `border.default` | #3A3937 | #CECECB | Línea fuerte: popovers, diálogos, botón secundario, el borde del ícono sobre negro. |
| `border.control` | #72716E | #868581 | Borde de input y de todo control sin otra señal; el borde de la píldora. |
| `action.primary` | #EDEDEA | #1A1917 | El CTA: relleno de tinta con `text.on-action` encima. Con el sello a la vista, el botón principal va con borde (capítulo 06, 6.5). |
| `action.destructive` | #E66E68 | #BC3732 | Texto y borde del botón que borra o revierte. Ghost, nunca relleno. |
| `accent` | #B9D3D8 | #0B4A57 | El acento: el petróleo para detalles, opcional. El trazo de un ícono, el texto de una pill (el descuento), un subrayado o un dato puntual, con la misma clase de elemento en el mismo color (4.9). Es el valor de `signature.phrase`. En Tailwind, `text-brand-accent`, sólo de texto. |
| `signature.phrase` | #B9D3D8 | #0B4A57 | La frase: la firma en color, sin bloque, en la segunda línea del titular (capítulo 05, 5.3). En petróleo; en lo que te toca, la firma va en `text.primary`. |
| `backlight.iris` | #0B3A44 | #BFD8DC | La luz petróleo, la de siempre, detrás del vidrio (4.9 y capítulo 06). Decorativa. |
| `backlight.attention` | #6A4314 | #F2D6AE | La luz de lo que te toca: sólo con una decisión pendiente. Decorativa. |
| `backlight.neutral` | #3A3937 | #CECECB | La luz en monocromo, con foto, persona, gráfico o mucho contenido. Es el valor de `border.default`. |
| `signature.block` | #EDEDEA | #1A1917 | El sello de la app: el bloque de tinta detrás de la segunda línea del titular. Es el valor de `text.primary`. Sólo donde ya está (4.9). |
| `signature.text` | #0A0A09 | #FAFAF9 | La firma calada en el sello de la app: el color del fondo, sólo sobre `signature.block`. Es el valor de `text.on-action`. |
| `signature.marketing.block` | #03313C | #03313C | El sello de marketing: el bloque petróleo detrás de la segunda línea del titular de la landing y sus OG, hasta que se rehagan (4.9). Es `brand.petrol`, el mismo en los dos modos. |
| `signature.marketing.text` | #EDEDEA | #EDEDEA | La firma en tinta sobre el sello de marketing, sólo sobre `signature.marketing.block`. Es `neutral-dark.11` en los dos modos: el bloque es oscuro siempre. |
| `focus` | #EDEDEA | #1A1917 | El anillo de foco: 2 px a 2 px de distancia. |
| `selection` | #3A3937 | #DBDBD8 | El fondo de la selección de texto. |
| `backdrop` | negro al 60 % | negro al 30 % | La cortina detrás de un diálogo. |
| `status.*` | ver «Los cinco estados» | | |
| `data.series` · `data.comparison` · `data.grid` | #EDEDEA · #9B9A96 · #2C2B29 | #1A1917 · #686764 · #E3E3E1 | Gráficos (capítulo 07). |
| `data.highlight` | #B9D3D8 | #0B4A57 | Lo que importa en un gráfico, uno por gráfico, en el petróleo de la frase (capítulo 07, 7.2). |
| `link.underline` | #72716E | #868581 | El subrayado de un link en texto corrido (capítulo 05). |

## 4.3 Por qué casi no hay color

La jerarquía es de la tinta: el valor de `text.primary` es también el relleno del CTA y el anillo
de foco. Como casi todo comparte tinta, lo que grita no puede ser el color: grita la forma. Un solo
bloque lleno de tinta por pantalla y el ● de «te toca».

**El color, en lo chico.** La interfaz no tiene un color de marca para pintar botones ni un azul
para «novedad»: se probó, queda a ΔE 0,091 del cian de Mercado Pago y, al lado del ámbar, arma la
pareja de colores de Mercado Libre. El petróleo es el color secundario: va en la frase, la luz y lo
que importa de un gráfico, y se puede usar en un detalle, siempre igual dentro de la pieza. El ámbar
dice que te toca. Ninguno va en un botón, un borde ni un fondo plano (4.9).

## 4.4 Contraste

**La regla es WCAG 2.2 AA sobre todos los fondos de cada modo:** 4,5:1 para texto; 3:1 para bordes
de control, glifos, foco, series de un gráfico y subrayados. La frena el test: si un par baja, no hay
build. APCA se mide y se publica al lado como dato, sin umbral propio.

Cada par, sobre el canvas y sobre su peor fondo (en los dos modos el peor es `bg.selected`),
redondeado a dos decimales. El test compara el valor sin redondear.

| Par | Mínimo | Oscuro · canvas | Oscuro · peor | Claro · canvas | Claro · peor |
|---|---|---|---|---|---|
| `text.primary` | 4,5 | 16,89 | 12,92 | 16,82 | 14,49 |
| `text.secondary` | 4,5 | 10,64 | 8,14 | 8,10 | 6,98 |
| `text.tertiary` · `text.placeholder` | 4,5 | 7,03 | 5,38 | 5,42 | 4,66 |
| `status.failed` · `action.destructive` como texto | 4,5 | 6,41 | 4,91 | 5,39 | 4,64 |
| `text.on-action` sobre `action.primary` | 4,5 | 16,89 | — | 16,82 | — |
| `signature.text` sobre `signature.block` | 4,5 | 16,89 | — | 16,82 | — |
| `signature.marketing.text` sobre `signature.marketing.block` | **7** | 11,87 | — | 11,87 | — |
| `signature.phrase` · `accent` | 4,5 | 12,61 | 9,65 | 9,43 | 8,13 |
| ● `status.attention` | 3 | 10,34 | 7,92 | 3,87 | **3,33** |
| ◐ `status.working` | 3 | 6,18 | 4,73 | 6,53 | 5,62 |
| ✓ `status.done` | 3 | 7,03 | 5,38 | 5,42 | 4,66 |
| ○ `status.idle` | 3 | 16,89 | 12,92 | 8,10 | 6,98 |
| `border.control` · `link.underline` | 3 | 4,06 | **3,11** | 3,54 | **3,05** |
| `focus` · `data.series` | 3 | 16,89 | 12,92 | 16,82 | 14,49 |
| `data.comparison` | 3 | 7,03 | 5,38 | 5,42 | 4,66 |
| `data.highlight` | 3 | 12,61 | 9,65 | 9,43 | 8,13 |

- **Los pares más justos** son el borde de control (3,11 y 3,05), el ámbar de «te toca» en claro
  (3,33), el rojo como texto (4,91 y 4,64) y el terciario en claro (4,66). Cualquier cambio de valor
  que los toque pasa primero por el test.
- **APCA, como dato** (Lc sobre canvas / sobre selected): `text.primary` 95,8 / 92,9 en oscuro y
  101,4 / 91,5 en claro; `text.secondary` 67,2 / 64,3 y 86,1 / 76,2; `text.tertiary` 47,5 / 44,6 y
  75,3 / 65,4. Por eso el terciario del oscuro queda para datos que se leen de un vistazo.
- **Exentos:** `text.disabled` (WCAG exime lo deshabilitado; igual queda en 3:1 o más),
  las tres luces de `backlight.*`, que nunca llevan nada encima sin un vidrio de por medio, y
  `border.subtle`, `border.default` y `data.grid`, que son decorativos (1,40 y 1,72:1 sobre el canvas
  oscuro). El logotipo en `brand.white` sobre `brand.black` da 18,96:1.
- **El acento sobre el vidrio de redes y de la landing**, con cualquier luz detrás y también sobre
  el relleno de una pill, no baja de 6,39:1 en oscuro (con la luz ámbar) ni de 7,96:1 en claro:
  pasa como texto chico, como el de una pill.
- **La firma sobre el sello de marketing** tiene un mínimo más alto, 7:1, porque el bloque casi no
  se despega del negro (1,42:1, a propósito, y sin umbral): lo que separa el sello es la letra
  (4.9).

## 4.5 Reglas por tamaño

- **`text.primary`** en todo lo que se lee de corrido: el hilo del agente, los documentos, el cuerpo.
- **`text.secondary`** en el apoyo de 13 px para arriba: bajadas y ayudas. La segunda línea del
  titular no va en gris: va en la frase, `signature.phrase` (capítulo 05, 5.3).
- **`text.tertiary`** sólo en datos sueltos que se leen de un vistazo: «10:40 · id 4418 · 27
  ventas». Nunca en una oración. Una nota fija y corta que marca la pieza («Datos de ejemplo.»,
  «Imagen generada con IA.», «Para vendedores de Mercado Libre.») se lee como un rótulo aunque
  lleve punto, y va en terciario. Lo que hay que leer para entender la pieza, no.
- **No se atenúa con opacidad** un texto que significa algo: se elige el token.
- **El ámbar del claro va sólo como relleno** (el ●): nunca como texto ni en un trazo fino, porque
  apenas pasa 3:1.

## 4.6 Los cinco estados

Cada estado tiene un glifo (de 10 px en la app; en una pieza de redes, capítulo 08), un color y una
palabra. **Ninguna forma se repite**, y **el color nunca va solo**: siempre va glifo más palabra, o
glifo más una leyenda.

| Glifo | Estado | Token | Oscuro | Claro | Qué significa |
|---|---|---|---|---|---|
| ● | **Te toca** | `status.attention` | #F7AC4D | #AD721C | El dueño tiene que decidir. Es el único ● del set. |
| ◐ | **iris trabajando** | `status.working` | #50A064 | #266739 | iris lo está haciendo ahora. El verde es movimiento. |
| ✕ | **Falló** | `status.failed` | #E66E68 | #BC3732 | Una acción que no se pudo hacer. |
| ✓ | **Resuelto** | `status.done` = `text.tertiary` | #9B9A96 | #686764 | Hecho. Va en silencio. |
| ○ | **Esperando o sin declarar** | `status.idle` | #EDEDEA | #4E4D49 | Espera a un tercero (un comprador, Mercado Libre) o nadie lo configuró. |

El SVG de cada glifo, con `viewBox` de 10 y el color por `currentColor`, está en el capítulo 08
(8.1).

**Reglas de cada uno**

- **Te toca (●).** Va arriba de todo, agrupado: con el CTA, es lo único que grita. En el feed lleva
  la píldora «Espera tu OK». No se usa para llamar la atención si no hay una decisión pendiente.
- **iris trabajando (◐).** Contorno de radio 4 con trazo de 1,5 y la mitad derecha llena, todo en
  verde. A la derecha de la fila va «en curso». En lo animado late suave en opacidad dos veces al
  entrar al estado y queda quieto (capítulo 06); nunca gira. En una pieza quieta, no se mueve. El
  verde nunca quiere decir «bien», «éxito» ni «crecimiento», y el ◐ no es un «cargando» genérico.
- **Falló (✕).** Es el único estado que también puede ir como texto: en un botón destructivo y en el
  error de un campo, siempre con una oración que dice qué pasó y cómo se arregla. Nunca como acento
  ni como alarma decorativa.
- **Resuelto (✓).** Es el gris de los datos sueltos. Va abajo de la lista y no se usa para
  festejar un logro. En la app la fila también baja a gris; en una pieza pública, no (capítulo 08,
  8.2).
- **Esperando o sin declarar (○).** En oscuro es el blanco del sistema; en claro baja a
  `text.secondary` para no pesar más que «te toca». Nunca como viñeta de una lista.

**Reglas de todos**

- El orden en una lista es el de la urgencia: te toca, falló, trabajando, esperando, resuelto.
- Cada listado con estados mezclados lleva al pie su leyenda, con sólo los estados que aparecen y
  en el mismo orden:
  «● te toca · ✕ falló · ◐ trabajando · ○ esperando · ✓ resuelto».
- La leyenda usa la palabra de su sección: en un hilo de preguntas, lo resuelto se dice
  «respondida».
- El color va sólo en el glifo. La palabra va en los tokens de texto; nunca se pintan de estado un
  texto (salvo el rojo, arriba), un fondo, un borde, un titular ni el logotipo.
- La luz ámbar (`backlight.attention`, 4.9) no es un estado: acompaña al ● de «te toca» en la
  pantalla o la pieza, y nunca lo reemplaza.
- Ningún otro elemento se dibuja como un punto lleno, un círculo hueco o un medio círculo, ni
  siquiera en otro color. La excepción son los pictogramas de las historias destacadas
  (`pieces/redes/instagram/destacadas/`): dibujos de trazo en blanco, sin texto ni estados, donde un
  punto, un círculo o una ✓ es parte del dibujo, también como viñeta.
- **Un control con ícono no es un glifo.** El botón de enviar de las piezas de redes es un círculo
  lleno con su flecha, y «Aprobar» y «Rechazar con motivo» llevan el ✓ y la ✕ de lucide: se leen
  como controles porque tienen forma de botón y su ícono o su palabra, y nunca van en el color de un
  estado.
- **Con daltonismo** (protanopía y deuteranopía simuladas), el ámbar se separa por luz del verde y del
  rojo. El verde y el rojo tienen casi la misma luz en oscuro: los separa la forma, ◐ contra ✕.

**Por qué estos colores.** Se midieron contra los que usa Claude en Claude Code y en claude.ai:
apagados, terrosos y con el ámbar más claro que el resto. El ámbar queda a ΔE 0,012 de un ámbar de
anthropic.com y a 0,036 del warning del panel de Claude Code, y lejos del amarillo de Mercado Libre
(0,156) y del naranja de Claude (0,146). El verde es el de los cambios agregados en Claude Code
(ΔE 0,025). El rojo es el que ya estaba aprobado. Las mediciones se hicieron con scripts el 2026-10-10:
contraste WCAG en los dos modos, daltonismo simulado y distancia en OKLab.

## 4.7 Elevación

No hay sombras en ningún modo.

| Nivel | Qué es | Oscuro | Claro |
|---|---|---|---|
| 0 | La página | `bg.canvas` | `bg.canvas` |
| 1 | Card, panel, composer | `bg.surface` + `border.subtle` | el mismo blanco + `border.subtle` |
| 2 | Popover, menú, diálogo, ⌘K | `bg.raised` + `border.default` | el mismo blanco + `border.default` |
| 3 | Diálogo modal | nivel 2 + `backdrop` | nivel 2 + `backdrop` |
| Flotante | La barra de la landing, ⌘K, popovers, la aprobación cuando flota | vidrio ahumado (capítulo 06), que sin soporte vuelve al nivel 2 | igual |

En oscuro cada nivel sube un escalón de luz (3,1 puntos de L: 1,05:1 de canvas a surface, 1,11:1 a
raised) y el borde, un paso. En claro todo es el mismo blanco y el nivel lo dice el borde.

## 4.8 Prohibido

- Cualquier violeta, en ningún tono (el viejo #4C1D95, sus filetes y su raya), tampoco en el cursor
  de una pieza: el cursor va en tinta.
- El amarillo de Mercado Libre (#FFE600) y parecidos, su azul (#3483FA) y el cian de Mercado Pago
  (#00BCFF), tampoco en redes. El naranja y el marfil de Claude.
- Un color que no esté en los tokens, o un hex suelto en código.
- El petróleo de fondo plano, en una franja, como borde, en un botón lleno o su ícono, en un
  estado o un glifo de estado, en texto largo (un párrafo, una oración de cuerpo, un titular entero)
  o en el logo. Va sólo en los detalles, la frase, la luz, `data.highlight` y el sello que ya existe
  (4.9).
- Mezclar el petróleo con otro color en la misma clase de elemento: si un ícono de una lista o
  una grilla va en petróleo, van todos los de esa lista (4.9).
- Una pill con fondo de color: la pill es neutra, y el petróleo va, si va, sólo en su texto.
- El ámbar fuera de la luz y del ● de «te toca». El ámbar como luz sin un ● a la vista.
- Más de una luz de color por pantalla o pieza, o una luz con texto encima sin vidrio.
- Gradientes llamativos y glow. Las únicas excepciones son tres:
  - la luz de fondo (`backlight.*`, 4.9): un círculo de color que se apaga hacia afuera, detrás
    del vidrio;
  - el brillo del vidrio de las piezas de redes, un degradé blanco muy bajo en diagonal (capítulo
    15, 15.4);
  - el fundido de una foto con el negro, que la apaga hacia el fondo sin otro color, donde lleva
    texto encima.
- Sombras, también en el vidrio de las piezas de redes, o blur fuera del vidrio.
- Un color de estado fuera de su glifo, o el color como única señal.
- Atenuar con opacidad un texto que significa algo.

## 4.9 Los dos colores de la marca: el petróleo y el ámbar

iris es blanco y negro, con dos colores. **El petróleo es el color secundario: el de los detalles.
El ámbar es la excepción: aparece sólo con un ● a la vista.** El ámbar y la luz los decidió el
encargado de contenido para redes el 2026-10-13 y pasaron a toda la marca el 2026-10-15. El
petróleo como color secundario lo decidió Franco el 2026-10-16 (capítulo 00, 0.7): se puede usar
en los detalles, a criterio de quien diseña, con una sola condición, **la misma clase de elemento,
el mismo color.**

### El petróleo, para detalles

Es un solo tono por modo, #B9D3D8 en oscuro y #0B4A57 en claro: `accent`, `signature.phrase` y
`data.highlight` valen lo mismo. La luz tiene su tono propio.

| Dónde | Token | Cómo |
|---|---|---|
| **Un detalle, si quien diseña lo elige** | `accent` | El trazo de un ícono, el texto de una pill, un subrayado o un dato puntual. No es obligatorio en ningún detalle: la landing, por ejemplo, lleva los íconos en el color del texto y sólo el descuento en petróleo («38 % menos», dentro de la pill neutra; el precio de antes, tachado y neutro). |
| **La frase** | `signature.phrase` | La segunda línea del titular. En lo que te toca va en `text.primary`. |
| **La luz** | `backlight.iris` | La luz de siempre, detrás del vidrio. En lo que te toca la reemplaza la ámbar. |
| **Un gráfico** | `data.highlight` | Lo que importa, uno por gráfico (capítulo 07, 7.2). |

**La condición: coherencia dentro de la pieza o pantalla.** La misma clase de elemento lleva el
mismo color: si un ícono de una lista o una grilla va en petróleo, van todos los de esa lista; no se
mezclan.

**Nunca en petróleo:** un fondo plano grande (una franja, una card, una pieza entera), un botón
lleno ni su ícono (el CTA va en tinta), un borde, el fondo de una pill (la pill es neutra; el color
va sólo en su texto), un estado o un glifo de estado, texto largo (un párrafo, una oración de
cuerpo, un titular entero) ni el logo.

### El ámbar, lo que te toca

| Color | Qué dice | La luz | La frase |
|---|---|---|---|
| **Ámbar** | Lo que te toca: una decisión, una aprobación, un OK. Es el color del ● de `status.attention`. | `backlight.attention` | `text.primary`: la firma no se pinta de ámbar |

- **Una luz y una frase por pantalla o pieza.** La luz y la frase van en petróleo: el ingreso,
  el estado vacío o una portada son de iris aunque iris no esté haciendo nada. El ámbar entra sólo
  donde se ve el ● de «te toca», y entonces reemplaza al petróleo en la luz y la frase pasa a
  `text.primary`. Los detalles en petróleo, si la pieza los lleva, no cambian: son detalles, no el
  tema.

### Monocromo

Cuando la imagen ya trae color o hay mucho que leer (una foto, una persona, un gráfico, más de tres
filas de datos o más de dos párrafos), el color de la marca se apaga. Un panel de resultados del
feed, de una línea por fila, como el de la portada de Facebook o el banner de LinkedIn, no cuenta
como filas de datos. Glifo por glifo:

| Qué | En monocromo |
|---|---|
| La luz | `backlight.neutral` |
| La frase | `text.primary` |
| ● te toca | Sigue en ámbar, el del modo de su fondo: es el único ámbar de la pieza, porque significa algo. |
| ◐ trabajando | Pierde el verde: va en el gris del texto de apoyo. |
| ✕ falló | Sigue en rojo: un fallo no es decoración. |
| ✓ resuelto y ○ esperando | Igual que siempre: ya son neutros. |
| La barra que importa en un gráfico | Sigue en `data.highlight` (capítulo 07, 7.2). |
| Los detalles en petróleo | Si la pieza los lleva, siguen en `accent`: son detalles. Sobre una foto, lo que va encima del vidrio lo dice el capítulo 15 (15.4). |

### La luz

Una sola luz de color por pantalla o pieza: un círculo que se apaga hacia afuera, detrás del
vidrio. En la app y la landing es `.glass-backlight` de `css/glass.css` con su color
(`-iris`, `-attention` o `-neutral`); en las piezas de redes, `.luz` de
`pieces/redes/_base/vidrio.css`. Es decorativa: nada se lee sobre ella sin un vidrio encima, y
nunca es un fondo plano. Con `prefers-reduced-transparency` o `forced-colors` se apaga. En las
piezas de redes, dónde va cada luz está en el capítulo 15 (15.3).

**En la app**, dónde va la decide quien diseña la pantalla, con un criterio: la luz va donde la
pantalla respira (el ingreso, el inicio, el estado vacío, la tarjeta de «te toca» cuando flota), no
detrás de una tabla, un formulario o el hilo del agente, que son para trabajar.

### La frase

La segunda línea de un titular de dos líneas, en la firma, va en color y sin bloque:
`signature.phrase` (#B9D3D8 en oscuro, #0B4A57 en claro), 9,65:1 y 8,13:1 en el peor fondo. En lo
que te toca va en `text.primary`. Reemplaza al sello (capítulo 05, 5.3).

### El sello, de salida

El sello (el bloque detrás de la firma) ya no va en nada nuevo. Las piezas de este repo ya no lo
llevan: la portada de Facebook y las de LinkedIn se rehicieron con la frase y las plantillas de los
tres registros se borraron el 2026-10-15. Queda, con sus tokens y `css/signature.css`, sólo en el
titular de la landing y sus OG (`.signature-seal-marketing`), y nada nuevo lo usa. Se borra cuando
la landing pase a la frase, en la sesión de la landing: sus tokens, `css/signature.css`, sus clases
y la regla del botón con borde (capítulo 06, 6.5), todo junto. Sin alias ni período de gracia
(capítulo 14, 14.5). El petróleo hondo de `brand.petrol` es el de ese bloque, y el test frena que
lo use otro rol.

### Por qué estos

**El petróleo** queda a ΔEOK 0,19 o más de los estados, del naranja y el marfil de Claude, de los
colores de Mercado Libre y Mercado Pago y de los violetas viejos, y sus tonos se quedan a 12° o menos
de su tono. **El ámbar** es el del ● de «te toca» (tono 70): así la luz y el glifo dicen lo mismo, y
queda lejos del amarillo de Mercado Libre (0,156).

Tres tonos pálidos quedan más cerca que 0,091 de un color claro que la marca esquiva, y el test los
tiene anotados con la distancia que no pueden bajar: el petróleo pálido y la frase del oscuro, a
0,053 y 0,059 de la menta descartada (los separa el tono, 208 y 210 contra 167), y el ámbar pálido,
a 0,083 del marfil de Claude (los separa el croma, 0,061 contra 0,005, y va sólo como luz detrás
del vidrio).

### Descartados

Se probaron y no van (2026-10-10):
- **El cartón**: ni de sello, ni como textura de cinta, ni como token.
- **El fondo petróleo** de una pieza entera: el petróleo va en los detalles, la luz y la frase,
  nunca de fondo plano.
- **El petróleo sólo en los íconos de lo que hace iris**, con el resto neutros, y **la pill del
  descuento con fondo petróleo** (2026-10-16): unos íconos con color y otros sin él no era
  coherente, y el fondo de color quedaba feo en el descuento.
- **Todos los íconos en petróleo, por regla** (2026-10-16): era demasiado limitado. El petróleo se
  puede usar en los detalles; no es obligatorio en ninguno.
- **El verde claro** (aguamarina) para el sello, y los verdes más verdes, que caen en la menta.
- **El rosa**, en la firma o en el sello.
- **El violeta**, en cualquier tono, también en el cursor de una pieza: el cursor va en tinta.
- **Los colores de Mercado Libre** y el cian de Mercado Pago, también en redes (capítulo 12).
