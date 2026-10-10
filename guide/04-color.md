# 04 · Color

**Monocromo. La jerarquía sale de la luz y la tinta es el acento.** Más claro es más importante en
oscuro, más oscuro en claro. Fuera de los neutros sólo existen los colores de estado, y viven en su
glifo.

- **El oscuro es la identidad** y el default: landing, piezas, OG, banner, redes y el resolver de
  tokens.
- **El claro existe para la app**, para quien la usa de día. Comparte los roles del oscuro, no es el
  oscuro invertido.
- El `meta theme-color` de cada página es el `bg.canvas` de su modo: #0A0A09 o #FAFAF9.

## 4.1 Paleta

### Negro y blanco de marca

| Token | Hex | OKLCH | Qué es |
|---|---|---|---|
| `color.brand.black` | #0A0A09 | 0.145 0.002 95 | El fondo del ícono y el piso del oscuro en todo. Un negro neutro: hoy conviven tres (#0A0A0B en el ícono, #070708 en la landing y el banner, #121211 en la app) y queda éste. |
| `color.brand.white` | #FAFAF9 | 0.985 0.0013 95 | La i del ícono, el logotipo sobre oscuro y el piso del claro. No es el color del texto: el texto del oscuro es `text.primary`. |

La escala va en tono 95 con croma de 0,002 a 0,006: el leve tinte cálido se percibe recién en los
grises medios. En oscuro, cada nivel de fondo sube 3,1 puntos de luz (0,031 de L en OKLCH): es el
escalón que la landing había calibrado, porque menos no se veía y más se leía gris.

### Neutros del oscuro: `color.neutral-dark`

| Paso | Hex | OKLCH | Roles |
|---|---|---|---|
| 1 | #0A0A09 | = `brand.black` | `bg.canvas` · `text.on-action` |
| 2 | #111110 | 0.176 0.0022 95 | `bg.surface` |
| 3 | #181816 | 0.207 0.0025 95 | `bg.raised` |
| 4 | #201F1E | 0.240 0.0028 95 | `bg.hover` |
| 5 | #262624 | 0.268 0.003 95 | `bg.selected` |
| 6 | #2C2B29 | 0.290 0.0035 95 | `border.subtle` · `data.grid` |
| 7 | #3A3937 | 0.345 0.004 95 | `border.default` · `selection` |
| 8 | #72716E | 0.550 0.005 95 | `border.control` · `text.disabled` · `link.underline` |
| 9 | #9B9A96 | 0.685 0.006 95 | `text.tertiary` · `text.placeholder` · `status.done` · `data.comparison` |
| 10 | #BFBEB9 | 0.800 0.006 95 | `text.secondary` |
| 11 | #EDEDEA | 0.945 0.004 95 | `text.primary` · `action.primary` · `focus` · `status.idle` · `data.series` |

### Neutros del claro: `color.neutral-light`

| Paso | Hex | OKLCH | Roles |
|---|---|---|---|
| 1 | #FAFAF9 | = `brand.white` | `bg.canvas` · `bg.surface` · `bg.raised` · `text.on-action` |
| 2 | #F0F0EF | 0.955 0.002 95 | `bg.hover` |
| 3 | #EAE9E8 | 0.935 0.0025 95 | `bg.selected` |
| 4 | #E3E3E1 | 0.915 0.003 95 | `border.subtle` · `data.grid` |
| 5 | #DBDBD8 | 0.890 0.0035 95 | `selection` |
| 6 | #CECECB | 0.850 0.004 95 | `border.default` |
| 7 | #868581 | 0.615 0.0055 95 | `border.control` · `text.disabled` · `link.underline` |
| 8 | #686764 | 0.515 0.006 95 | `text.tertiary` · `text.placeholder` · `status.done` · `data.comparison` |
| 9 | #4E4D49 | 0.420 0.006 95 | `text.secondary` · `status.idle` |
| 10 | #1A1917 | 0.215 0.004 95 | `text.primary` · `action.primary` · `focus` · `data.series` |

### Señal: `color.signal`

Los únicos colores fuera de los neutros. Cada uno tiene su versión para oscuro y para claro.

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
| `text.secondary` | #BFBEB9 | #4E4D49 | Texto de apoyo de 13 px para arriba: bajadas, ayudas, la segunda línea del titular. |
| `text.tertiary` | #9B9A96 | #686764 | Datos sueltos: hora, id, contador, eyebrow, meta de fila, leyenda. Nunca una oración. |
| `text.placeholder` | #9B9A96 | #686764 | El placeholder de un input. Es el valor del terciario para que pase AA sobre cualquier fondo. |
| `text.disabled` | #72716E | #868581 | Etiqueta deshabilitada. |
| `text.on-action` | #0A0A09 | #FAFAF9 | El texto sobre el CTA de tinta. |
| `border.subtle` | #2C2B29 | #E3E3E1 | El hairline dominante: separadores y cards. |
| `border.default` | #3A3937 | #CECECB | Línea fuerte: popovers, diálogos, botón secundario, el borde del ícono sobre negro. |
| `border.control` | #72716E | #868581 | Borde de input y de todo control sin otra señal; el borde de la píldora. |
| `action.primary` | #EDEDEA | #1A1917 | El CTA: relleno de tinta con `text.on-action` encima. |
| `action.destructive` | #E66E68 | #BC3732 | Texto y borde del botón que borra o revierte. Ghost, nunca relleno. |
| `focus` | #EDEDEA | #1A1917 | El anillo de foco: 2 px a 2 px de distancia. |
| `selection` | #3A3937 | #DBDBD8 | El fondo de la selección de texto. |
| `backdrop` | negro al 60 % | negro al 30 % | La cortina detrás de un diálogo. |
| `status.*` | ver «Los cinco estados» | | |
| `data.series` · `data.comparison` · `data.grid` | #EDEDEA · #9B9A96 · #2C2B29 | #1A1917 · #686764 · #E3E3E1 | Gráficos (capítulo 07). |
| `link.underline` | #72716E | #868581 | El subrayado de un link en texto corrido (capítulo 05). |

## 4.3 Por qué no hay color

El acento es la tinta: el valor de `text.primary` es también el relleno del CTA y el anillo de foco.
Como casi todo comparte tinta, lo que grita no puede ser el color: grita la forma. Un solo CTA lleno
por pantalla y el ● de «te toca».

No hay color de marca ni un azul para «novedad»: se probó, queda a ΔE 0,091 del cian de Mercado Pago
y, al lado del ámbar, arma la pareja de colores de Mercado Libre. Ningún estado lo necesita.

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
| ● `status.attention` | 3 | 10,34 | 7,91 | 3,87 | **3,33** |
| ◐ `status.working` | 3 | 6,18 | 4,73 | 6,52 | 5,62 |
| ✓ `status.done` | 3 | 7,03 | 5,38 | 5,42 | 4,66 |
| ○ `status.idle` | 3 | 16,89 | 12,92 | 8,10 | 6,98 |
| `border.control` · `link.underline` | 3 | 4,06 | **3,11** | 3,54 | **3,05** |
| `focus` · `data.series` | 3 | 16,89 | 12,92 | 16,82 | 14,49 |
| `data.comparison` | 3 | 7,03 | 5,38 | 5,42 | 4,66 |

- **Los pares más justos** son el borde de control (3,11 y 3,05), el ámbar de «te toca» en claro
  (3,33), el rojo como texto (4,91 y 4,64) y el terciario en claro (4,66). Cualquier cambio de valor
  que los toque pasa primero por el test.
- **APCA, como dato** (Lc sobre canvas / sobre selected): `text.primary` 95,8 / 92,9 en oscuro y
  101,4 / 91,5 en claro; `text.secondary` 67,2 / 64,3 y 86,1 / 76,2; `text.tertiary` 47,5 / 44,6 y
  75,3 / 65,4. Por eso el terciario del oscuro queda para datos que se leen de un vistazo.
- **Exentos:** `text.disabled` (WCAG exime lo deshabilitado; igual queda en 3:1 o más),
  `border.subtle`, `border.default` y `data.grid`, que son decorativos (1,40 y 1,72:1 sobre el canvas
  oscuro). El logotipo en `brand.white` sobre `brand.black` da 18,96:1.

## 4.5 Reglas por tamaño

- **`text.primary`** en todo lo que se lee de corrido: el hilo del agente, los documentos, el cuerpo.
- **`text.secondary`** en el apoyo de 13 px para arriba: bajadas, ayudas y la segunda línea del
  titular.
- **`text.tertiary`** sólo en datos sueltos que se leen de un vistazo: «10:40 · id 4418 · 27
  ventas». Nunca en una oración.
- **No se atenúa con opacidad** un texto que significa algo: se elige el token.
- **El ámbar del claro va sólo como relleno** (el ●): nunca como texto ni en un trazo fino, porque
  apenas pasa 3:1.

## 4.6 Los cinco estados

Cada estado tiene un glifo de 10 px, un color y una palabra. **Ninguna forma se repite**, y **el
color nunca va solo**: siempre va glifo más palabra, o glifo más una leyenda.

| Glifo | Estado | Token | Oscuro | Claro | Qué significa |
|---|---|---|---|---|---|
| ● | **Te toca** | `status.attention` | #F7AC4D | #AD721C | El dueño tiene que decidir. Es el único ● del set. |
| ◐ | **iris trabajando** | `status.working` | #50A064 | #266739 | iris lo está haciendo ahora. El verde es movimiento. |
| ✕ | **Falló** | `status.failed` | #E66E68 | #BC3732 | Una acción que no se pudo hacer. |
| ✓ | **Resuelto** | `status.done` = `text.tertiary` | #9B9A96 | #686764 | Hecho. Va en silencio. |
| ○ | **Esperando o sin declarar** | `status.idle` | #EDEDEA | #4E4D49 | Espera a un tercero (un comprador, Mercado Libre) o nadie lo configuró. |

Los glifos, con `viewBox` de 10 y el color por `currentColor`:

```html
<symbol id="te-toca" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.25" fill="currentColor"/></symbol>
<symbol id="trabajando" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 1a4 4 0 0 1 0 8z" fill="currentColor"/></symbol>
<symbol id="fallo" viewBox="0 0 10 10"><path d="M1.8 1.8 8.2 8.2M8.2 1.8 1.8 8.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" fill="none"/></symbol>
<symbol id="resuelto" viewBox="0 0 10 10"><path d="M1.6 5.4 4 7.8 8.6 2.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/></symbol>
<symbol id="esperando" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/></symbol>
```

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
- **Resuelto (✓).** Es el gris de los datos sueltos, y la fila también baja a gris. Va abajo de la
  lista. No se usa para festejar un logro. La única excepción es una pieza pública de sólo
  resultados, como el banner, donde el resultado es el mensaje (capítulo 08).
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
- Ningún otro elemento se dibuja como un punto lleno, un círculo hueco o un medio círculo, ni
  siquiera en otro color.
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

- Cualquier violeta, en ningún tono (el viejo #4C1D95, sus filetes y su raya).
- El amarillo de Mercado Libre (#FFE600) y parecidos, su azul (#3483FA) y el cian de Mercado Pago
  (#00BCFF). El naranja y el marfil de Claude.
- Un color que no esté en los tokens, o un hex suelto en código.
- Gradientes llamativos y glow. La única excepción es el degradé radial muy sutil (blanco al 4 %) del
  banner de LinkedIn y de la portada de Facebook, que no es token y no va en ninguna otra pieza.
- Sombras, o blur fuera del vidrio de la capa flotante.
- Un color de estado fuera de su glifo, o el color como única señal.
- Atenuar con opacidad un texto que significa algo.
