# 15 · Redes v2: el vidrio

La identidad de iris en redes desde octubre de 2026. Es la misma marca que la app (el nombre, el
logo, las tipografías, el negro y el blanco, el petróleo, los estados y la honestidad con los datos),
dicha de una forma más visual y menos técnica, para un vendedor que scrollea entre otras cien
publicaciones.

**Qué cubre:** las piezas de Instagram, Facebook, TikTok, YouTube Shorts y estados de WhatsApp, las
de LinkedIn que muestran el producto y la landing, que usa el mismo vidrio y los mismos pesos. **En
lo que es de redes, este capítulo manda sobre cualquier otro capítulo del manual.** Lo decidió el
encargado de contenido el 2026-10-13; lo aprueba Franco (capítulo 00, 0.7).

**Lo que es de toda la marca** (los dos colores y lo que dice cada uno, la luz, la frase en lugar
del sello y el vidrio como material) pasó a los tokens y a los capítulos 04, 05 y 06 el 2026-10-15.
Este capítulo queda con lo propio de redes, que está listado en un solo lugar: 15.10.

Lo que cambia respecto de los tres registros del capítulo 11, en una línea: **el vidrio sobre una
sola luz de color reemplaza al sello, entran el ámbar como color de tema, los pesos 600 y 700, los
íconos, la casilla y la burbuja del mensaje, la vocera y la mascota.** Lo demás sigue
igual.

La hoja de estilos es `pieces/redes/_base/vidrio.css`; las plantillas de ejemplo, en
`pieces/redes/plantillas/vidrio/`.

---

## 15.1 El criterio

Cada pieza muestra lo que hay que comunicar de una forma atractiva y fácil de entender, y presenta
el mundo de la marca de a poco. Antes de dar por terminada una pieza, se pregunta **qué está de
más**: la foto, el vidrio o la cantidad de contenido. Si sobra algo, se saca. Las reglas de abajo
son el punto de partida; la pieza la decide quien la arma (una persona o el agente de contenido)
según la imagen, lo que se demuestra y la red donde se publica.

**Lo que no cambia de una pieza a otra**, para que todas se reconozcan como de iris:
- **el marco:** el vidrio con su margen, sobre el fondo de su variante y con su luz detrás (el plano
  de LinkedIn va sin luz);
- **el contexto**, arriba a la izquierda, en la lámina que abre (15.6; cuándo puede faltar, en el
  capítulo 09, 9.11);
- **el pie:** el lockup a la izquierda y, a la derecha, la nota que corresponda («Datos de
  ejemplo.», «Imagen generada con IA.»);
- **un solo protagonista**, lo que se lee en el primer segundo: la cifra, el titular, la pregunta o
  el OK (capítulo 11, 11.14).

Lo que cambia es la variante, la forma del vidrio y el contenido.

## 15.2 La familia: cuatro variantes

Base blanco y negro de iris, con un toque del petróleo o del ámbar de la marca. Los pares negro y
blanco son el modo noche y el modo día de la misma pieza.

| Variante | Fondo | Luz | Frase | Para qué |
|---|---|---|---|---|
| **N1a** | negro `#0A0A09` | `backlight.iris` del oscuro, #0B3A44 | `signature.phrase` del oscuro, #B9D3D8 | Qué hace iris: casos, preguntas a la cuenta, datos |
| **N1b** | negro `#0A0A09` | `backlight.attention` del oscuro, #6A4314 | blanco | Lo que te toca: una decisión que espera tu OK |
| **N2a** | blanco de día `#E9E9E6` | `backlight.iris` del claro, #BFD8DC | `signature.phrase` del claro, #0B4A57 | Qué hace iris |
| **N2b** | blanco de día `#E9E9E6` | `backlight.attention` del claro, #F2D6AE | negro | Lo que te toca: una decisión que espera tu OK |

El blanco de día (`brand.day-white`, uno solo para las dos variantes blancas) es un poco más gris
que el `bg.canvas` del claro (#FAFAF9): en un feed lleno de blanco, el vidrio necesita un fondo que
no sea papel.

- **El petróleo es el tema de toda pieza:** la luz y la frase. **El ámbar es la excepción:** va
  sólo en la pieza o la lámina que tiene a la vista el ● de «Espera tu OK» (capítulo 04, 4.9).
- **El petróleo también puede ir en un detalle** (`--vp-acento`, el `accent` de su modo), como el
  texto del descuento, en cualquier variante, también en ámbar y en monocromo: es un detalle, no el
  tema. La misma clase de elemento, el mismo color en toda la pieza (capítulo 04, 4.9).
- **Un carrusel no cambia de negro a blanco** entre láminas, y va en petróleo. Sólo la lámina que
  pide el OK pasa a ámbar, con el mismo fondo.
- **En la grilla se alternan negro y blanco:** nunca dos negras ni dos blancas seguidas.
- **El sello no va en redes v2.** La frase se destaca con la cursiva y su color, sin bloque detrás.

## 15.3 La luz

**Una sola luz de color detrás del vidrio**, nunca varias (capítulo 04, 4.9). En las piezas es
`.luz`, un círculo de color que se apaga hacia afuera, que se mueve (`--lx`, `--ly`) y se agranda
(`--ls`). En un carrusel la luz se corre de lámina en lámina, así se siente que avanza.

**La luz ámbar es chica y va detrás de la decisión.** Queda abajo a la izquierda, detrás del ● de
«Espera tu OK» y de los botones, y nunca detrás del titular ni de la frase. Su tamaño no pasa del
62 % del ancho: en las plantillas, `--lx:0%; --ly:60%; --ls:62%` en el 4:5 y
`--lx:0%; --ly:58%; --ls:62%` en la story. Una luz ámbar grande detrás de la itálica tiñe el vidrio
de marfil y la pieza se parece a Claude; chica, el ámbar aparece sólo donde está lo que te toca.

## 15.4 El vidrio

Cuatro formas. **Cuál va lo decide quien arma la pieza** según la imagen, lo que se muestra y
dónde se publica, con el criterio de 15.1: que no quede sobrecargada.

| Forma | Clase | Cuándo suele ir |
|---|---|---|
| **Panel** | `.vidrio` | Sin foto: el vidrio ocupa la pieza y la luz queda detrás. |
| **Barra** | `.vidrio.barra` | Con foto: el vidrio abajo, a lo ancho; la foto manda. |
| **Tarjeta** | `.vidrio.tarjeta` | Con foto: un vidrio chico en una esquina, como una notificación. Va bien con una pregunta y su cifra. |
| **Plano** | `.vidrio.plano` | Los posts corporativos de LinkedIn: sin luz ni desenfoque, borde fino (15.8). |

En 9:16 (story, reel, TikTok, Shorts) el vidrio deja libres arriba y abajo, donde la red pone su
barra y sus botones.

**El vidrio que no envejece.** Lo que hace al vidrio es el borde fino y la línea de luz de 1 px
arriba, por dentro: eso es lo que envejece bien. Lo que lo fecha es la bruma del brillo y la sombra
que lo despega del fondo, así que:
- **el brillo diagonal** del panel es apenas una insinuación: blanco al 8 % arriba a la izquierda y
  al 3 % en la esquina opuesta, nunca más;
- **sin sombra afuera.** El vidrio lleva sólo su línea de luz por dentro, como en la app (capítulo
  06, 6.3).

**Sobre una foto,** el vidrio de las piezas es más transparente que el de la app y no garantiza el
contraste solo: con una foto clara detrás, el texto atenuado, las pills de estado y los glifos de
color no llegan. Ahí van sólo el texto principal, en el color del texto de su variante, y la pill de
«Espera tu OK». Si la pieza necesita más, se refuerza el fundido de la foto debajo del vidrio
(`.foto::after`). Subir el tinte del vidrio hasta tapar la foto es el último recurso, porque le saca
el vidrio. Se revisa a ojo en la PNG, a tamaño de teléfono.

## 15.5 Monocromo

Cuando la pieza lleva **una foto, la vocera, más de tres filas de datos, más de dos párrafos o un
gráfico**, el color se apaga: clase `.mono`. Qué pasa con la luz, la frase y cada glifo, y qué no
cuenta como filas de datos, está en el capítulo 04 (4.9).

## 15.6 Letras

Las mismas tres familias de la marca (capítulo 05). En redes y en la landing, además, **600 y 700**:
los titulares y las cifras tienen que frenar el scroll. Son los únicos lugares de la marca con esos
pesos, y van sólo donde dice esta tabla.

Una pieza de 1080 se ve en el teléfono a unos 390 px, a 0,36 de su tamaño. Los tamaños de abajo
están pensados para esa vista: el contexto se tiene que leer en el primer segundo, y la línea de la
herramienta, que es la prueba de que iris trabaja, no puede quedar en un susurro.

| Estilo | Familia y peso | Tamaño en 1080 | Color |
|---|---|---|---|
| Titular, primera línea | IBM Plex Sans 600 | 78 px | `text.primary` |
| Frase, la segunda línea del titular | DM Serif Display itálica 400 | 84 px (capítulo 05, 5.3) | la de su variante (15.2) |
| Cifra | IBM Plex Sans 700 | 280 px | `text.primary` |
| Mensaje de la persona | IBM Plex Sans 500 | 46 px | el de la casilla o la burbuja (15.7) |
| Texto y la bajada de la cifra | IBM Plex Sans 400 | 39 px | `text.secondary` |
| Herramienta | IBM Plex Mono 400 | 30 px | `text.secondary` |
| Pill de estado | IBM Plex Sans 600 en «Espera tu OK», 500 en las demás | 29 px | `text.primary`; «Listo», en `text.secondary`, y «No se pudo leer», en el rojo de su estado. El resto del color, sólo en el glifo |
| Pill del descuento | IBM Plex Sans 500 | 29 px | `accent`, sobre la pill neutra (15.7) |
| Contexto | IBM Plex Sans 500, mayúsculas | 28 px | `text.primary` |
| Pie | IBM Plex Sans 400 | 26 px | `text.tertiary` |

- **Los textos de apoyo van en su token, no con opacidad** (capítulo 04, 4.5). Un dato suelto, como
  el precio de antes en un cambio, va en `text.tertiary`.
- **Con la luz detrás**, sobre el vidrio se leen `text.primary`, `text.secondary`, la frase, los
  glifos y «Aprobar». `text.tertiary` y el texto rojo de un fallo van sólo donde no hay luz detrás:
  si caen encima de la luz, el gris pasa a `text.secondary`.
- **El contexto va en una pill**, arriba a la izquierda, neutra como las pills de estado: el mismo
  borde y el mismo fondo, sin color. Si nombra a Mercado Libre, la pill no pesa más que el lockup
  (capítulo 12, 12.1). Qué dice y cuándo puede faltar, en el capítulo 09 (9.11).
- **Las medidas de cada formato** (el margen, la zona segura, lo que tapa cada red y el tamaño
  mínimo de la letra) están en `pieces/redes/_base/formatos.json`, que es la guía de medidas.

## 15.7 Estados, íconos y el mensaje

**Estados.** Los cinco glifos de la marca (capítulo 08, 8.1), como pill, siempre con su palabra:

| Pill | Estado |
|---|---|
| ● Espera tu OK | te toca. Neutra como las demás: el ● en ámbar es su único color y la palabra va en 600. |
| ◐ Leyendo tu cuenta | iris trabajando. Verde sólo en el glifo. |
| ○ Esperando al comprador | esperando a un tercero. |
| ✓ Listo | resuelto, en gris. |
| ✕ No se pudo leer | falló. |

- **Lo único lleno de la pieza es «Aprobar».** Ninguna pill va llena, tampoco la del OK.
- **El ● va en el ámbar del modo del fondo de la pill:** el del oscuro (#F7AC4D) sobre una pill
  oscura y el del claro (#AD721C) sobre una clara.
- **Una pieza que dice «ya están listas»** no lleva al lado el ◐ de «Leyendo tu cuenta»: los
  estados de una pieza no se contradicen.

**El descuento** (`.descuento`) es la misma pill neutra que las de estado, con el mismo fondo y el
mismo borde, sin glifo y con el texto en el acento: «38 % menos». Nunca con fondo de color. El
precio de antes va tachado y neutro (`.antes`).

La declaración de IA no es una pill: va como texto al pie («Imagen generada con IA.», «Voz generada
con IA.»), además de la etiqueta de IA de la red.

**Íconos.** Los de lucide, como en la app (capítulo 06, 6.6), de trazo fino y en el color del
texto; como detalle, pueden ir en el acento (`--vp-acento`), y entonces van así todos los de la
pieza que son de la misma clase (todas las filas, todas las pills). El de un botón lleno («Aprobar»,
enviar) va siempre en el color del botón (capítulo 04, 4.9). Uno por fila, pill o botón; nunca en un titular ni en la cifra; nunca en lugar de un glifo de
estado; ningún ícono de «IA». Un control con ícono no es un glifo (capítulo 04, 4.6). El set de
redes: ventas (`shopping-bag`), stock (`package`), precio (`tag`), lo que te queda (`banknote`),
promos (`badge-percent`), preguntas (`message-circle-question`), reclamos
(`message-square-warning`), envíos (`truck`), publicidad (`megaphone`), reputación (`star`), equipo
y roles (`users`), conectar (`plug`), fechas (`calendar`), hora (`clock`), métricas
(`chart-no-axes-column`), aprobar (`check`), rechazar (`x`), deslizá (`arrow-right`).

**El mensaje.** Para que se entienda quién dijo qué:

- **Casilla** (`.casilla`): el mensaje por enviar, con el botón de enviar, una flecha hacia arriba
  (`arrow-up`) en un círculo lleno. Vacía, con «Escribí tu pregunta…» y el botón apagado.
- **Burbuja** (`.burbuja`): el mensaje ya enviado, con «Enviado · hora» debajo (`check-check`). Si
  la pieza ya muestra la respuesta de iris, la pregunta se envió: va en burbuja, no en la casilla.
- **La respuesta de iris va sin globo**, sobre el vidrio, como en la app, y empieza con la línea
  «tool · estado» (capítulo 08, 8.4).

Cómo se escribe el mensaje, la respuesta y el contexto: capítulo 09, 9.11.

## 15.8 LinkedIn

Dos tipos de posts:

- **Corporativos** (datos del rubro, guías, novedades de la empresa): `.vidrio.plano`. Blanco o
  negro, sin luz. El petróleo va en la frase y, en un gráfico, en la barra que importa
  (`data.highlight`, capítulo 07); el ámbar, sólo con el ● de una decisión. Sin la vocera; si hay
  una cara, es una persona real del equipo que lo autorizó (capítulo 11, 11.14). Los datos llevan
  su fuente.
- **De producto** (casos de uso, lo que hace iris): el vidrio de redes en su versión más sobria,
  clase `.linkedin-producto`: una luz suave, una sola idea, lo mínimo para entenderla.

En los posts de LinkedIn la frase va sin cursiva; el banner del perfil y la portada de la página son
la marca y la llevan en itálica (capítulo 05, 5.3).

Formatos: 1200 × 1200, documento en PDF de 1080 × 1350 y link de 1200 × 627. El tono es
profesional, para el equipo y quien decide en la empresa.

## 15.9 Tono y la vocera

**Tono.** De vos y preciso con los números, como dice el capítulo 09. La temperatura cambia por
formato:

- **Base, «colega que sabe»:** cercano, claro, tranquilo. «Domingo, 22 hs. Tenés 7 preguntas sin
  responder y mañana arranca la semana. iris te dice cuáles son y te deja las respuestas listas.»
- **Reels y humor, «canchero»:** situaciones que todo vendedor reconoce. «Domingo a la noche y el
  celu no para: 7 preguntas sin contestar. Y la de la cafetera ya te la hicieron tres veces.»

Siguen valiendo las reglas de copy del 09 (9.2): sin superlativos, sin métricas inventadas, cifras
de ejemplo marcadas, nada de «MCP».

**La vocera.** Una persona generada con IA estilo UGC: la cara de iris, que habla de vendedor a
vendedor. Su receta (quién es, cómo se ve, cómo habla y dónde aparece) vive en la skill de la
sesión de contenido, para que salga siempre igual. La marca fija esto:
- es energética, transmite confianza y tiene una voz atractiva: habla con ganas y seguridad, sin
  gritar ni vender de más;
- aparece en lugares luminosos y variados del negocio (un centro logístico, un estudio de fotos de
  producto, un local, una oficina, la calle), nunca como alguien que transmite desde su casa ni en
  luz oscura;
- **nunca dice ser clienta ni muestra resultados propios**: sería un testimonio falso;
- cada pieza lleva la declaración de IA. Siempre la misma persona, y que no se parezca a nadie real.

Con la vocera en la pieza, va en monocromo (15.5). No va en los posts corporativos de LinkedIn. El
capítulo 01 (1.5) prohíbe personas en la marca de la app; en redes, la vocera es la excepción.

**La mascota** va con su receta de la sesión de contenido, siempre igual. Es un personaje: nunca
reemplaza al logo ni va al lado del lockup (capítulo 03), y la pieza dice que es un personaje
generado con IA.

## 15.10 Lo propio de redes y lo que pasó a la marca

**Lo propio de redes**, la única lista: los pesos 600 y 700 (15.6), el blanco de día (15.2), el
vidrio de las piezas, más transparente que el de la app y con su brillo (15.4), los estados como
pill (15.7), la casilla y la burbuja del mensaje (15.7), y la frase un poco más grande que el
titular (capítulo 05, 5.3). Lo usan las piezas de redes y la landing.

Sus valores son tokens, como los de toda la marca: el blanco de día es `brand.day-white`, y el
vidrio, `glass.marketing.*` (capítulo 06, 6.8). Hay una sola hoja del material, `css/glass.css`,
con la clase `.glass-marketing`; la forma de cada pieza (el marco, el contexto, el pie) la pone su
propia hoja. Los WOFF2 de Plex Sans 600 y 700 están en `fonts/` y los declara `css/fonts.css`.

El 2026-10-15 lo que no es propio de redes pasó a toda la marca:

| Qué | Dónde está ahora |
|---|---|
| Los dos colores y lo que dice cada uno | Capítulo 04, 4.9; tokens `color.tint.*` |
| La luz de cada tema y la del monocromo | `backlight.iris`, `backlight.attention` y `backlight.neutral`; en la app, `.glass-backlight` (capítulo 06) |
| La frase en lugar del sello | `signature.phrase`; capítulo 05, 5.3 |
| El vidrio como material, no sólo la capa que flota | Capítulo 06, 6.8 |

`vidrio.css` toma esos valores de los tokens, como hex con el nombre del token al lado o por su
`var(--iris-…)`, y el test los ata (capítulo 14, 14.4).
