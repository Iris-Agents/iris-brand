# 08 · Piezas propias

Un negro, un blanco, una sans y una serif itálica son la plantilla de las landings de IA de estos
años. Lo que no tiene nadie es lo que hace iris, y por eso esas piezas son la imagen de la marca:
el centro de la landing, el motivo de las OG, el corazón del banner y de los posts. No son un
adorno: muestran el producto, que es la forma más directa de «hechos, no adjetivos».

Son ocho: el glifo de estado, el feed «Hoy en tu cuenta», la tarjeta de aprobación, la línea
«tool · estado», la grilla segmentada, el error con lo destructivo, la censura con chip y el
intercambio, que es la conversación con iris como pieza (8.9).

Los valores salen de los tokens: el capítulo 04 para color, el 05 para tipografía y el 06 para
forma. Este capítulo dice cómo se arma cada pieza y qué no se le cambia. Las plantillas de
`pieces/redes/plantillas/` traen el markup del glifo, del feed y de la tarjeta de aprobación.

---

## 8.1 El glifo de estado

Cinco estados, cinco formas, y ninguna se repite. El color va sólo en el glifo y refuerza a la
forma: nunca la reemplaza.

| Glifo | Estado | Token | Oscuro · claro | Cuándo |
|---|---|---|---|---|
| ● lleno | te toca | `status.attention` | #F7AC4D · #AD721C | El dueño tiene que decidir. Es el único ● del set. |
| ✕ | falló | `status.failed` | #E66E68 · #BC3732 | Algo no se pudo hacer. |
| ◐ medio círculo | iris trabajando | `status.working` | #50A064 · #266739 | Algo está en curso ahora. |
| ○ hueco | esperando o sin declarar | `status.idle` | #EDEDEA · #4E4D49 | Espera a un tercero (un comprador, el canal) o nadie lo configuró. |
| ✓ | resuelto | `status.done` | #9B9A96 · #686764 | Terminó. Va en silencio: es el gris de los datos sueltos. |

Los glifos, para copiar. El cuadro es de 10 × 10, el color sale de `currentColor` y se dibujan a
10 px:

```html
<symbol id="te-toca" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.25" fill="currentColor"/></symbol>
<symbol id="fallo" viewBox="0 0 10 10"><path d="M1.8 1.8 8.2 8.2M8.2 1.8 1.8 8.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" fill="none"/></symbol>
<symbol id="trabajando" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 1a4 4 0 0 1 0 8z" fill="currentColor"/></symbol>
<symbol id="esperando" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/></symbol>
<symbol id="resuelto" viewBox="0 0 10 10"><path d="M1.6 5.4 4 7.8 8.6 2.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/></symbol>
```

Reglas:
- **Siempre glifo + palabra, o glifo + leyenda.** La leyenda va al pie del listado, nombra sólo
  los estados que aparecen y en el orden de las filas.
- **Cada sección usa su palabra.** En un hilo de preguntas, lo resuelto se dice «respondida»; en la
  línea de una tool, «listo». La forma y el color no cambian.
- **El verde es movimiento.** Marca sólo lo que está en curso; nunca «bien», «éxito» ni algo
  terminado. El ◐ va entero en verde, contorno y mitad.
- **El ◐ no gira.** En lo animado late suave en opacidad dos veces al entrar al estado (dos ciclos
  de 1,2 s que bajan a 0,45 en la mitad) y queda quieto. En lo estático, quieto siempre.
- **Falló es el único estado que puede ir como texto**: el mensaje de un error de campo, el botón
  destructivo (8.6) y la línea de una tool que falló (8.4). Los demás colores de estado nunca
  pintan texto, fondos, bordes ni titulares.
- **En claro, el ámbar va sólo relleno**: el ● entero, nunca como texto ni en un trazo fino (pasa
  3:1 como glifo y no llega a 4,5:1).
- **En una pieza de redes**, el ● y el ◐ pueden ir como objeto, de hasta 48 px, siempre con su
  palabra al lado: «● ¿La bajo? Espera tu OK.». Adentro de la línea «tool · estado», el glifo va al
  tamaño de la línea. Los demás glifos no crecen, y ninguno pinta un texto, un fondo ni un borde.

No existe un sexto color. Se probó un azul para «novedad» y quedó pegado al cian de Mercado Pago;
ningún estado lo necesita.

---

## 8.2 El feed «Hoy en tu cuenta»

Es la lista de lo que pasó en la cuenta hoy. Lo que necesita al dueño va arriba; lo que iris
resolvió va abajo y en silencio.

**Construcción.**
- Panel en `bg.surface` con `border.subtle` y `radius.panel`.
- Arriba, el eyebrow «Hoy en tu cuenta». En el HTML se escribe en minúscula normal y el CSS lo pasa
  a mayúsculas; por eso el eyebrow nunca lleva «iris» (saldría «IRIS»).
- Cada fila: glifo · acción · dato a la derecha, separadas por `border.subtle`.
- La acción es verbo + objeto. El verbo va en `text.secondary` y el objeto en `text.primary` 500:
  «Contestó **40 preguntas**», «Reponer **Mochila urbana 22 L**».
- A la derecha va una sola cosa:
  - la píldora «Espera tu OK» (borde `border.control`, `radius.pill`), sólo en te toca;
  - «en curso», en la sans, sólo en trabajando;
  - la hora HH:MM, en la mono de 12 px y `text.tertiary`, en el resto.
- Al pie, la leyenda.

**Orden:** te toca, falló, trabajando, esperando, resuelto. Lo resuelto baja a gris: la acción a
`text.tertiary` y el objeto a `text.secondary`.

```
HOY EN TU CUENTA
●  Reponer Mochila urbana 22 L              [Espera tu OK]
✕  No pudo activar una promoción                     11:30
◐  Revisa el precio del ganador                   en curso
○  Espera la respuesta de un comprador               12:20
✓  Resolvió 3 reclamos                               13:05
✓  Contestó 40 preguntas                             09:12
● te toca · ✕ falló · ◐ trabajando · ○ esperando · ✓ resuelto
```

**En la app y en lo público.**
- **En la app** la fila puede llevar el nombre del agente como etiqueta gris antes de un punto
  medio: «Producto · recuperó el Buy Box». Sin ícono ni color propio, y sólo Cliente, Producto o
  Vendedor.
- **En lo público** (banner, redes, landing, OG) la fila dice qué logró iris, sin el nombre del
  agente: quien ve la pieza todavía no usó la app. Los cinco resultados de referencia son
  «Contestó 40 preguntas», «Resolvió 3 reclamos», «Generó 3 ventas adicionales», «Adhirió a una
  promoción» y «Mejoró la reputación».
- **Una pieza de sólo resultados** (el banner) lleva todas las filas con ✓ y no las baja a gris: el
  resultado es el mensaje. El verbo en pasado ya dice que terminó, así que la leyenda puede faltar.
  Si en la pieza hay estados mezclados, la leyenda va.
- Las cifras de una pieza pública son de ejemplo y se marcan como tales (capítulo 11).

---

## 8.3 La tarjeta de aprobación

Es lo que iris quiere hacer y todavía no hizo. Es la pieza que mejor dice la promesa: trabaja
solo donde vos lo dejás; si no decidiste, te espera.

**Construcción.**
- Panel en `bg.raised` con `border.default` y `radius.panel`: un nivel arriba del feed.
- Arriba a la izquierda, el antetítulo **«Propuesta»** (eyebrow). Arriba a la derecha, la píldora
  «Espera tu OK».
- El título (`typography.title`, 18/500) es la acción: verbo + objeto, «Reponer Mochila urbana
  22 L».
- Debajo, lo que va a hacer, en filas concepto / cifra. El concepto va en `text.secondary`; la
  cifra en `text.primary`, tabular:
  - el cambio, como antes → después: «Stock publicado 3 → 43»;
  - la evidencia: «Vendió en 7 días 27»;
  - cuándo se leyó el dato: «Leído hoy · 10:40», con la hora en mono.
- Dos botones, y sus textos no se cambian:
  - **«Aprobar»**: el CTA de tinta (`action.primary` con `text.on-action`). Es el único botón
    lleno de la pantalla.
  - **En una pieza con sello** (un post, una OG, un carrusel: la segunda línea del titular va en
    el sello petróleo, capítulo 05, 5.3), «Aprobar» va con borde de 1 px en `text.primary`, sin
    relleno y con la letra en `text.primary` (capítulo 06, 6.5): el foco es la firma y lo que dice
    la pieza. En las piezas viejas, «Aprobar» lleno era lo que más se veía, y eso era un defecto.
    Sigue siendo el principal: el borde de tinta lo separa del ghost. En la app pasa lo mismo con
    el sello de tinta a la vista.
  - **«Rechazar con motivo»**: ghost, con `border.default`.

**En la app** la tarjeta además dice cuánto arriesga (en mono) y deja abrir lo que va a mandar
(«Lo que va a hacer»). Rechazar abre un campo para el motivo, que le vuelve al agente para
corregir; el botón pasa a «Confirmar rechazo».

**Cuando flota** sobre el feed o sobre fotos, la tarjeta es vidrio: la clase `.glass-panel` de
`css/glass.css`, con el tinte de `bg.raised` al 94 % (capítulo 06). Adentro todo es sólido: el
botón de tinta y el ghost. Dentro del hilo o del feed, y en cualquier pieza estática, va lisa.

**No se hace:** cambiar los textos de los botones, poner dos botones llenos, dejar «Aprobar» lleno
al lado del sello, sacar la fecha de lectura, mostrar una cifra sin antes → después, o usar el ámbar fuera de la píldora y el glifo.

---

## 8.4 La línea «tool · estado»

Es el trabajo de iris a la vista, plegado en una línea. Muestra qué se llamó y cómo terminó; la
entrada y la salida quedan a un clic.

- Glifo de estado + `nombre_de_la_tool · estado`, en la mono de 12 px y `text.tertiary`. Si
  falló, la línea va en `status.failed`.
- Las palabras del estado: «preparando», «en curso», «espera aprobación», «listo», «falló»,
  «rechazada», «cortada» (la llamada quedó sin terminar porque el turno se cortó).
- El trabajo entre dos textos del agente se pliega en una sola línea de resumen. Está abierto
  mientras trabaja o si adentro algo espera a la persona; plegado cuando terminó.
- Al abrirla, los bloques se rotulan «Entrada», «Salida» o «Error».

En una pieza (una OG, un video, un post) la línea puede llevar la hora: `price_update · listo ·
10:40`. Es la prueba de que iris trabaja con herramientas reales, no una animación. En una pieza
de 1080 px va a 26–30 px, en la mono y `text.tertiary`: la mono de 12 px es la de la app.

---

## 8.5 La grilla segmentada

Para cifras y reconciliaciones: una tabla, no N tarjetas.

- Las celdas se separan con un hairline de 1 px en `border.subtle` (una grilla con `gap: 1px`
  sobre el color del borde), con borde exterior y `radius.panel`. Cada celda va en `bg.surface`.
- En cada celda: la cifra (sans 500, tabular), el nombre (`typography.label`) y, si hace falta, una
  oración en `text.secondary`. `text.tertiary` sólo para un dato suelto, nunca para la oración.
- Toda cifra lleva su unidad: «27 por día», no «27». El cero se muestra. El signo («+») va más
  chico y apagado: el número es el dato.
- Sin barra de color a la izquierda de ninguna celda: la regla inset de 2 px es de la fila activa
  de una lista, nunca un adorno de card.

---

## 8.6 Error y destructivo

- **Una fila que falló** lleva el ✕ y dice qué no pudo hacer: «No pudo activar una promoción».
  Al abrirla, una oración dice por qué y qué hacer.
- **Un error de campo**: el borde y el mensaje en `status.failed`, con el ✕ y una oración
  que dice qué pasó y cómo se arregla. «El precio tiene que ser mayor que 0.» Nunca «Error» solo,
  ni «Algo salió mal».
- **Una acción destructiva** (borrar, revertir, reemplazar): botón ghost con texto y borde en
  `action.destructive`, nunca lleno. Pide confirmación, y la confirmación repite el objeto:
  «Borrar 12 publicaciones», no «¿Estás seguro?».
- El rojo no se usa para nada más: ni para alertar sin un fallo, ni como acento.

---

## 8.7 La censura con chip

Cuando una captura o un video real muestran algo de una persona o de una cuenta (un nombre, un
teléfono, una dirección, un id), se tapa con un chip:

- `radius.chip`, fondo `bg.selected` y la palabra «oculto» en la sans de 12 px y `text.tertiary`.
  Si ayuda a leer el caso, dice qué se tapó: «nombre oculto».
- Va a la altura de la línea, para que la lectura siga.
- **Nunca** barras negras ████, desenfoque ni pixelado: sobre negro se comen la atención, y el
  desenfoque es del vidrio (capítulo 06).

La censura es para una captura real que se muestra, como una demo o un video. En una pieza
pública, antes que censurar se usan datos de ejemplo: un cliente, su tienda o sus cifras no se
publican, ni siquiera tapados. La única excepción es un testimonio con consentimiento escrito (8.8).

## 8.8 El testimonio

La pieza para un usuario real que firmó su consentimiento (las condiciones, en 9.10).

- **La cita**, textual, en la sans: `copy.lede` en `text.primary`. No va en la firma: la DM Serif
  queda para sus tres usos.
- **Quién la dice:** el nombre en `label` y `text.primary`; debajo, el rubro y la fecha en
  `eyebrow` o `copy.ui` en `text.tertiary`. El nombre de la tienda sólo si lo autorizó.
- **Las cifras que aprobó**, en la sans con cifras tabulares, cada una con su fecha y contra qué se
  midió. Si suman, se pueden mostrar como filas del feed (8.2), con ✓ y la cifra en `<b>`.
- **Nada más:** sin foto de stock, sin logo de la tienda salvo autorización escrita, sin comillas
  decorativas gigantes, y sin «Datos de ejemplo.» en la misma pieza.

---

## 8.9 El intercambio

La conversación con iris, como pieza: el dueño pregunta, iris lee la cuenta y contesta con una
cifra, y lo que cambia algo espera el OK. Muestra, sin explicarlo, que del otro lado hay una IA que
trabaja sobre tu cuenta. Es la imagen del registro Pregunta y cifra y la secuencia de En vivo
(capítulo 11, 11.13).

**Anatomía**, de arriba abajo:

1. **La pregunta, con cursor.** Lo que escribe el dueño, en sus palabras y como se tipea en el
   teléfono: minúscula inicial, de vos. Va en Plex Sans 500 y `text.primary`, al tamaño de un
   titular (64 px o más en una pieza de 1080), con `text-wrap: balance`. Termina en el cursor: una
   barra fina y vertical en tinta (`text.primary`), del alto de una mayúscula. El cursor dice «esto
   lo escribió una persona».
2. **La línea «tool · estado»** (8.4), con la que empieza la respuesta: el glifo y
   `nombre_de_la_tool · estado · hora`, en la mono y `text.tertiary`, a 26–30 px. Dice «esto lo
   contestó iris, leyendo tu cuenta». Los nombres de las tools son los reales, y se verifican contra
   las que existen el día que se publica.
3. **La cifra grande.** La respuesta, en Plex Sans 500 con cifras tabulares y `text.primary`: es lo
   más grande de la pieza. Al lado, su unidad en la sans 400: «**6.100** por venta.». Debajo, si
   hace falta, dos o tres filas concepto / cifra como las de la tarjeta (el concepto en
   `text.secondary`, la cifra en `text.primary` 500), separadas por `border.subtle`.
4. **El OK**, sólo si la respuesta propone un cambio: el ● de te toca, de hasta 48 px, y al lado su
   palabra en Plex Sans 500 y `text.primary`: «¿La bajo? Espera tu OK.».

```
si bajo 15 % la mochila, ¿cuánto me queda?|
✓ listing_prices_scan · listo · 10:40
6.100 por venta.
Hoy te quedan                         9.200
Tu mínimo                             5.000
● ¿La bajo? Espera tu OK.
```

**Reglas.**
- **Sin burbuja.** Las dos voces se separan por el cursor y por la línea de la tool: sin globos, sin
  columnas por turno, sin avatar, sin caja de input ni botón de enviar, sin los tres puntitos de
  «escribiendo» (capítulo 09, 9.11). En la app la persona sigue en burbuja.
- **La respuesta va en la sans**, nunca en la firma: la firma no lleva números y queda para el
  titular.
- **Sin titular.** El sello nunca comparte la imagen con la pregunta y la cifra: si el post lleva
  titular, va en otra lámina, y el reel lo lleva en su cuadro de cierre (capítulo 11, 11.13).
- **El ● es el único color de estado** mientras la pieza espera el OK. En la línea, el glifo dice
  cómo terminó la tool: ✓ en gris; el ◐ verde sólo en video, mientras trabaja.
- **La cifra es de ejemplo** y se marca (capítulo 11), con su unidad; el cero también se muestra.
- **En video**, los cuatro tiempos entran de a uno, con la secuencia de «Movimiento en piezas de
  video» (capítulo 06, 6.7).

**No se hace:** la burbuja, la respuesta en serif, una pantalla de celular con la conversación
adentro, la pregunta pulida como un titular de agencia (con mayúscula y sin cursor), una cifra sin
unidad, el fondo marfil o el naranja de Claude.
