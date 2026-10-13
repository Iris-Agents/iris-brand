# 15 · Redes v2: el vidrio

La identidad de iris en redes desde octubre de 2026. Es la misma marca que la app (el nombre, el
logo, las tipografías, el negro y el blanco, el petróleo, los estados y la honestidad con los datos),
dicha de una forma más visual y menos técnica, para un vendedor que scrollea entre otras cien
publicaciones.

**Qué cubre:** las piezas de Instagram, Facebook, TikTok, YouTube Shorts y estados de WhatsApp, y
las de LinkedIn que muestran el producto. **Qué no toca:** la app, la landing, el mail ni ningún
token. Donde este capítulo y el 11 (11.13 y 11.14) dicen distinto para una pieza de redes, manda
este. Lo decidió el encargado de contenido el 2026-10-13; lo aprueba Franco (capítulo 00, 0.7).

Lo que cambia respecto de los tres registros del capítulo 11, en una línea: **el vidrio sobre una
sola luz de color reemplaza al sello, entran el ámbar como color de tema, los pesos 600 y 700, los
íconos, la casilla de mensaje y los personajes.** Lo demás sigue igual.

La hoja de estilos es `pieces/redes/_base/vidrio.css`; las plantillas de ejemplo, en
`pieces/redes/plantillas/vidrio/`.

---

## 15.1 El criterio

Cada pieza muestra lo que hay que comunicar de una forma atractiva y fácil de entender, y presenta
el mundo de la marca de a poco. Antes de dar por terminada una pieza, se pregunta **qué está de
más**: la foto, el vidrio o la cantidad de contenido. Si sobra algo, se saca. Las reglas de abajo
son el punto de partida; la pieza la decide quien la arma (una persona o el agente de contenido)
según la imagen, lo que se demuestra y la red donde se publica.

## 15.2 La familia: cuatro variantes

Base blanco y negro de iris, con un toque del petróleo o del ámbar de la marca. Los pares negro y
blanco son el modo noche y el modo día de la misma pieza.

| Variante | Fondo | Luz | Frase | Para qué |
|---|---|---|---|---|
| **N1a** | negro `#0A0A09` | petróleo `#0B3A44` | petróleo claro `#B9D3D8` | Qué hace iris: casos, preguntas a la cuenta, datos |
| **N1b** | negro `#0A0A09` | ámbar oscuro `#6A4314` | blanco | Lo que te toca: decisiones, aprobaciones, control |
| **N2a** | blanco `#E9E9E6` | petróleo pálido `#BFD8DC` | petróleo `#0B4A57` | Qué hace iris |
| **N2b** | blanco `#ECEBE7` | ámbar pálido `#F2D6AE` | negro | Lo que te toca |

- **Una variante por pieza.** Un carrusel no mezcla variantes entre láminas.
- **El tema decide el color:** petróleo para lo que hace iris, ámbar para lo que te toca. Así el
  ámbar sigue queriendo decir «decidís vos» (capítulo 04, 4.6).
- **En la grilla se alternan negro y blanco:** nunca dos negras ni dos blancas seguidas.
- **El sello no va en redes v2.** La frase se destaca con la cursiva y su color, sin bloque detrás.

## 15.3 La luz

**Una sola luz de color detrás del vidrio**, nunca varias. Es un círculo desenfocado que se puede
mover (`--lx`, `--ly`) y agrandar (`--ls`). En un carrusel la luz se corre de lámina en lámina, así
se siente que avanza.

## 15.4 El vidrio

Cuatro formas. **Cuál va lo decide quien arma la pieza** según la imagen, lo que se muestra y
dónde se publica, con el criterio de 15.1: que no quede sobrecargada.

| Forma | Clase | Cuándo suele ir |
|---|---|---|
| **Panel** | `.vidrio` | Sin foto: el vidrio ocupa la pieza y la luz queda detrás. |
| **Barra** | `.vidrio.barra` | Con foto: el vidrio abajo, a lo ancho; la foto manda. |
| **Tarjeta** | `.vidrio.tarjeta` | Con foto: un vidrio chico en una esquina, como una notificación. Va bien con una pregunta y su cifra. |
| **Plano** | `.vidrio.plano` | LinkedIn corporativo: sin luz ni desenfoque, borde fino (15.8). |

En 9:16 (story, reel, TikTok, Shorts) el vidrio deja libres arriba y abajo, donde la red pone su
barra y sus botones.

## 15.5 Monocromo

Cuando la pieza lleva **una foto, la vocera, la mascota, más de tres filas de datos, más de dos
párrafos o un gráfico**, el color se apaga: clase `.mono`. La luz pasa a gris, la frase va en el
color del texto y los estados quedan neutros. **El ámbar sobrevive sólo en el ● de «Espera tu
OK»**, porque significa algo. En un gráfico, las barras van en el color del texto y sólo la que
importa en petróleo.

## 15.6 Letras

Las mismas tres familias de la marca (capítulo 05). En redes, además, **600 y 700**: los titulares y
las cifras tienen que frenar el scroll.

| Estilo | Familia y peso | Tamaño en 1080 |
|---|---|---|
| Titular | IBM Plex Sans 600 | 78 px |
| Frase (el remate) | DM Serif Display itálica 400 | 84 px |
| Cifra | IBM Plex Sans 700 | 280 px |
| Mensaje de la persona | IBM Plex Sans 500 | 46 px |
| Texto | IBM Plex Sans 400 | 39 px |
| Herramienta | IBM Plex Mono 400 | 27 px |
| Contexto | IBM Plex Sans 500, mayúsculas | 24 px |

## 15.7 Estados, íconos y el mensaje

**Estados.** Los cinco glifos de la marca (capítulo 08, 8.1), como pill, siempre con su palabra:

| Pill | Estado |
|---|---|
| ● Espera tu OK | te toca. La única pill llena. |
| ◐ Leyendo tu cuenta | iris trabajando. Verde sólo en el glifo. |
| ○ Esperando al comprador | esperando a un tercero. |
| ✓ Listo | resuelto, en gris. |
| ✕ No se pudo leer | falló. |

La declaración de IA no es una pill: va como texto al pie («Imagen generada con IA.», «Voz generada
con IA.»), además de la etiqueta de IA de la red.

**Íconos.** Los de lucide, como en la app (capítulo 06, 6.6), de trazo fino y en el color del
texto. Uno por fila, pill o botón; nunca en un titular ni en la cifra; nunca en lugar de un glifo de
estado; ningún ícono de «IA». El set de redes: ventas (`shopping-bag`), stock (`package`), precio
(`tag`), lo que te queda (`banknote`), promos (`badge-percent`), preguntas
(`message-circle-question`), reclamos (`message-square-warning`), envíos (`truck`), publicidad
(`megaphone`), reputación (`star`), equipo y roles (`users`), conectar (`plug`), fechas
(`calendar`), hora (`clock`), métricas (`chart-no-axes-column`), aprobar (`check`), rechazar (`x`),
deslizá (`arrow-right`).

**El mensaje.** Para que se entienda quién dijo qué:

- **Casilla** (`.casilla`): el mensaje por enviar, con el botón de enviar, una flecha hacia arriba
  (`arrow-up`) en un círculo lleno. Vacía, con «Escribí tu pregunta…» y el botón apagado.
- **Burbuja** (`.burbuja`): el mensaje ya enviado, con «Enviado · hora» debajo (`check-check`).
- **La respuesta de iris va sin globo**, sobre el vidrio, como en la app.
- **El mensaje se escribe bien:** con mayúscula al empezar y, si es una pregunta, con los dos
  signos: «¿Qué se queda sin stock este finde?», nunca «qué se queda sin stock este finde». Un
  pedido lleva su punto: «Bajame el precio de la cafetera a 21.900.». Vale también para las
  preguntas de los titulares, las pills y los textos de cada red.

## 15.8 LinkedIn

Dos tipos de contenido:

- **Corporativo** (datos del rubro, guías, novedades de la empresa): `.vidrio.plano`. Blanco o negro,
  sin luz, el petróleo como acento y el ámbar para lo que espera una decisión. Sin cursiva, sin la
  vocera ni la mascota; si hay una cara, es una persona real del equipo. Los datos llevan su fuente.
- **De producto** (casos de uso, lo que hace iris): el vidrio de redes en su versión más sobria,
  clase `.linkedin-producto`: una luz suave, una sola idea, lo mínimo para entenderla, sin cursiva.

Formatos: 1200 × 1200, documento en PDF de 1080 × 1350 y link de 1200 × 627. El tono es
profesional, para el equipo y quien decide en la empresa.

## 15.9 Tono y personajes

**Tono.** De vos y preciso con los números, como dice el capítulo 09. La temperatura cambia por
formato:

- **Base, «colega que sabe»:** cercano, claro, tranquilo. «Domingo, 22 hs. Tenés 7 preguntas sin
  responder y mañana arranca la semana. iris te dice cuáles son y te deja las respuestas listas.»
- **Reels y humor, «canchero»:** situaciones que todo vendedor reconoce. «Domingo a la noche y el
  celu no para: 7 preguntas sin contestar. Y la de la cafetera ya te la hicieron tres veces.»

Siguen valiendo las reglas de copy del 09 (9.2): sin superlativos, sin métricas inventadas, cifras
de ejemplo marcadas, nada de «MCP».

**Personajes.** Entran dos, sólo fuera de LinkedIn corporativo:

- **La vocera**, una persona generada con IA estilo UGC: la cara de iris, que habla de vendedor a
  vendedor. **Es energética, transmite confianza y tiene una voz atractiva**: habla con ganas y
  seguridad, sin gritar ni vender de más. Aparece en lugares luminosos y variados del negocio
  (un centro logístico, un estudio de fotos de producto, un local, una oficina, la calle), nunca
  como alguien que transmite desde su casa ni en luz oscura. **Nunca dice ser clienta ni muestra resultados propios**: sería un testimonio falso.
  Cada pieza lleva la declaración de IA. Siempre la misma persona, y que no se parezca a nadie real.
- **La mascota**, la animación de iris: muestra a iris trabajando.

Con cualquiera de los dos en la pieza, va en monocromo (15.5). El capítulo 01 (1.5) prohíbe
mascotas y personas en la marca de la app; en redes v2, esa regla no aplica.

## 15.10 Para llevar a la app

Nada de esto cambia la app. Si se decide darle a la app la misma identidad, estos son los pasos, y
cada uno toca reglas que hoy frena el test (capítulo 14, 14.4):

1. **Los colores de las luces y las frases** pasan a tokens de los dos modos (por ejemplo,
   `color.social.light.petrol`, `color.social.phrase`), con su `$description`.
2. **Los pesos 600 y 700** entran en la escala tipográfica, o quedan sólo para redes.
3. **El vidrio de las piezas** se suma a `css/glass.css`, que hoy es sólo para la capa que flota.
4. **El sello** sigue en la app o se retira también ahí.
