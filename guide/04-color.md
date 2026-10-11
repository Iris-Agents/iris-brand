# 04 · Color

**Monocromo. La jerarquía sale de la luz y la tinta es el acento.** Más claro es más importante en
oscuro, más oscuro en claro. Fuera de los neutros sólo existen los colores de estado, que viven en
su glifo, y un solo acento de color: el petróleo, que va en el sello de la firma de marketing y en
ningún otro lugar (4.9).

- **El oscuro es la identidad** y el default: landing, piezas, OG, banner, redes y el resolver de
  tokens.
- **El claro existe para la app**, para quien la usa de día. Comparte los roles del oscuro, no es el
  oscuro invertido.
- El `meta theme-color` de cada página es el `bg.canvas` de su modo: #0A0A09 o #FAFAF9.

## 4.1 Paleta

### Negro, blanco y petróleo de marca

| Token | Hex | OKLCH | Qué es |
|---|---|---|---|
| `color.brand.black` | #0A0A09 | 0.145 0.002 95 | El fondo del ícono y el piso del oscuro en todo. Un negro neutro: hoy conviven tres (#0A0A0B en el ícono, #070708 en la landing y el banner, #121211 en la app) y queda éste. |
| `color.brand.white` | #FAFAF9 | 0.985 0.0013 95 | La i del ícono, el logotipo sobre oscuro y el piso del claro. No es el color del texto: el texto del oscuro es `text.primary`. |
| `color.brand.petrol` | #03313C | 0.29 0.05 219 | El petróleo, el único acento de color: el bloque del sello de la firma en marketing (4.9). Nada más. |

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

Con el petróleo de arriba, los únicos colores fuera de los neutros. Cada señal tiene su versión para
oscuro y para claro.

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
| `action.primary` | #EDEDEA | #1A1917 | El CTA: relleno de tinta con `text.on-action` encima. Con el sello a la vista, el botón principal va con borde (4.3). |
| `action.destructive` | #E66E68 | #BC3732 | Texto y borde del botón que borra o revierte. Ghost, nunca relleno. |
| `signature.block` | #EDEDEA | #1A1917 | El sello de la app: el bloque de tinta detrás de la segunda línea del titular (capítulo 05, 5.3). Es el valor de `text.primary`. |
| `signature.text` | #0A0A09 | #FAFAF9 | La firma calada en el sello de la app: el color del fondo, sólo sobre `signature.block`. Es el valor de `text.on-action`. |
| `signature.marketing.block` | #03313C | #03313C | El sello de marketing: el bloque petróleo detrás de la segunda línea del titular en las piezas de redes, los banners, las portadas y la landing (4.9). Es `brand.petrol`, el mismo en los dos modos. |
| `signature.marketing.text` | #EDEDEA | #EDEDEA | La firma en tinta sobre el sello de marketing, sólo sobre `signature.marketing.block`. Es `neutral-dark.11` en los dos modos: el bloque es oscuro siempre. |
| `focus` | #EDEDEA | #1A1917 | El anillo de foco: 2 px a 2 px de distancia. |
| `selection` | #3A3937 | #DBDBD8 | El fondo de la selección de texto. |
| `backdrop` | negro al 60 % | negro al 30 % | La cortina detrás de un diálogo. |
| `status.*` | ver «Los cinco estados» | | |
| `data.series` · `data.comparison` · `data.grid` | #EDEDEA · #9B9A96 · #2C2B29 | #1A1917 · #686764 · #E3E3E1 | Gráficos (capítulo 07). |
| `link.underline` | #72716E | #868581 | El subrayado de un link en texto corrido (capítulo 05). |

## 4.3 Por qué no hay color

El acento es la tinta: el valor de `text.primary` es también el relleno del CTA, el anillo de foco y
el bloque del sello de la app. Como casi todo comparte tinta, lo que grita no puede ser el color:
grita la forma. Un solo bloque lleno de tinta por pantalla y el ● de «te toca».

**Con el sello a la vista, el botón principal va con borde.** Si junto al titular con sello
(capítulo 05, 5.3) hay un botón principal (el «Aprobar» de la tarjeta de aprobación en una pieza, el
botón principal del hero de la landing), se dibuja con borde de 1 px en `text.primary`, sin relleno
y con la letra en `text.primary` (capítulo 06, 6.5):
- **en marketing, con el sello petróleo**, porque el foco es la firma y lo que dice la pieza. Lleno,
  el botón es lo más claro de la pieza: en las piezas viejas lo que más se veía era «Aprobar», y eso
  era un defecto;
- **en la app, con el sello de tinta**, porque el sello es el único bloque lleno de tinta.

Sin sello a la vista (casi toda la app, un formulario), el CTA de tinta lleno sigue como siempre.

**Un acento, en un lugar.** La interfaz no tiene color de marca ni un azul para «novedad»: se probó,
queda a ΔE 0,091 del cian de Mercado Pago y, al lado del ámbar, arma la pareja de colores de Mercado
Libre. Ningún estado lo necesita. El único color fuera de los neutros y de los estados es el
petróleo, y va sólo en el bloque del sello de marketing (4.9), que casi no se despega del negro.

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
- **La firma sobre el sello de marketing** tiene un mínimo más alto, 7:1, porque el bloque casi no
  se despega del negro (1,42:1, a propósito, y sin umbral): lo que separa el sello es la letra
  (4.9).

## 4.5 Reglas por tamaño

- **`text.primary`** en todo lo que se lee de corrido: el hilo del agente, los documentos, el cuerpo.
- **`text.secondary`** en el apoyo de 13 px para arriba: bajadas y ayudas. La segunda línea del
  titular no va en gris: va en el sello (capítulo 05, 5.3).
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

- Cualquier violeta, en ningún tono (el viejo #4C1D95, sus filetes y su raya), tampoco en el cursor
  de una pieza: el cursor va en tinta.
- El amarillo de Mercado Libre (#FFE600) y parecidos, su azul (#3483FA) y el cian de Mercado Pago
  (#00BCFF), tampoco en redes. El naranja y el marfil de Claude.
- Un color que no esté en los tokens, o un hex suelto en código.
- El petróleo fuera del bloque del sello de marketing (4.9): de fondo, en una franja, como texto,
  borde, botón, ícono, glifo o estado, en el logo o en el sello de la app.
- Gradientes llamativos y glow. Las únicas excepciones son dos luces radiales blancas, que no son
  token: la del banner de LinkedIn y la portada de Facebook (al 4 %) y la de las piezas de redes, de
  hasta el 6 % y sólo detrás del punto focal (capítulo 11, 11.13). Nunca a pantalla completa ni de
  color.
- Sombras, o blur fuera del vidrio de la capa flotante.
- Un color de estado fuera de su glifo, o el color como única señal.
- Atenuar con opacidad un texto que significa algo.

## 4.9 El petróleo: el acento de la firma de marketing

iris sigue monocroma, con un solo acento de color: el petróleo, `color.brand.petrol` (#03313C, OKLCH
0.29 0.05 219). Va en un solo lugar: el bloque del sello de la firma en marketing. Lo decidió Franco
el 2026-10-10: el color, de forma sutil y cuando realmente se necesita.

**Qué es.** El mismo sello de 5.3, con otros colores. La firma (DM Serif Display itálica 400, la
segunda línea de un titular de dos líneas) va en tinta, `signature.marketing.text` (#EDEDEA), sobre
un bloque petróleo, `signature.marketing.block` (#03313C), y todo sobre el negro de siempre
(#0A0A09). Las medidas no cambian (capítulo 05, 5.3). Los dos roles valen lo mismo en oscuro y en
claro: el bloque es oscuro siempre.

**Dónde va.** En todo lo de marketing: los posts, las stories, los reels, los carruseles, los
banners, las portadas de LinkedIn y Facebook, el titular de la landing y sus OG.
- En los tres registros de redes es el mismo sello (capítulo 11, 11.13).
- En la landing es la clase `.signature-seal-marketing` de `css/signature.css` (con Tailwind,
  `bg-signature-marketing` y `text-on-signature-marketing`).
- En las piezas de redes es el `.sello` de `pieces/redes/_base/brand.css`, que ya lleva estos
  valores.

**La app sigue con el sello de tinta:** el bloque en `signature.block` (#EDEDEA) y la firma calada
en `signature.text` (#0A0A09) en oscuro; en claro, invertido (#1A1917 y #FAFAF9). Es la clase
`.signature-seal`.

**Dónde no.** El petróleo nunca va:
- de fondo, ni de una pieza entera ni de un panel, ni en una franja;
- como texto, borde, botón, ícono, glifo o estado;
- en el logo;
- en el sello de la app.

El verde de estado (◐ trabajando, #50A064) es otra cosa y no cambia.

**Contraste.** La firma sobre el bloque da 11,87:1 (APCA Lc 91,4), y el test la frena con un mínimo
de 7:1, más alto que el del texto. El bloque contra el negro da 1,42:1, y es a propósito: el sello
casi no se despega del fondo y lo que se lee es la firma. Es un acento sutil, no un par con umbral.

**Por qué éste.** Medido en OKLab, queda lejos de lo que tiene que esquivar: a ΔEOK 0,37 del verde
de «trabajando» del oscuro, 0,37 del azul de Mercado Libre, 0,47 del cian de Mercado Pago y 0,42 del
naranja de Claude. Lo más cerca son el violeta viejo y el verde de «trabajando» del claro, los dos a
0,19. El test frena cualquier valor a menos de 0,091, la distancia por la que se descartó el azul de
«novedad» (4.3).

**El botón principal, con borde.** Con el sello petróleo a la vista, el «Aprobar» de la tarjeta va
con borde de tinta de 1 px y sin relleno: el foco es la firma y lo que dice la pieza (4.3; capítulo
06, 6.5).

**Hay un acento y un lugar.** Un segundo color, o el mismo color en otro lugar, deja de ser una
firma. Un color nuevo entra como token, con su lugar escrito acá, o no existe.

### Descartados

Se probaron y no van (2026-10-10):
- **El cartón**: ni de sello, ni como textura de cinta, ni como token.
- **El fondo petróleo** de una pieza entera: el petróleo es el bloque del sello, nunca el fondo.
- **El verde claro** (aguamarina) para el sello, y los verdes más verdes, que caen en la menta.
- **El rosa**, en la firma o en el sello.
- **El violeta**, en cualquier tono, también en el cursor de una pieza: el cursor va en tinta.
- **Los colores de Mercado Libre** y el cian de Mercado Pago, también en redes (capítulo 12).
