# 11 · Aplicaciones

Cómo se arma cada pieza que sale de iris. Todas usan lo mismo: el negro de marca, el ícono o el
lockup, el titular de dos líneas con la frase y las piezas propias del capítulo 08. Lo que cambia
es el tamaño y lo que la plataforma tapa. Los posts, carruseles, stories y reels siguen el capítulo
15.

Reglas que valen para todas:
- **Oscuro.** El fondo es `color.brand.black` (#0A0A09). Las piezas de este capítulo no usan el
  claro, salvo el email (11.10); en redes, el blanco alterna con el negro (capítulo 15).
- **Sin efectos de adorno.** Sin glow ni gradientes llamativos. Lo que sí va es una sola luz de
  color detrás del vidrio y el fundido de una foto con el negro (capítulo 04, 4.8 y 4.9).
- **El titular de dos líneas, con la frase.** La segunda línea va en la firma y en color, sin
  bloque detrás (capítulo 05, 5.3). En LinkedIn va sin cursiva (capítulo 15, 15.8). El sello que
  llevaban estas piezas salió el 2026-10-15; el titular de la landing y sus OG todavía lo usan hasta
  que se rehagan (capítulo 04, 4.9).
- **En lo público, el resultado.** Las filas dicen qué logró iris, sin el nombre del agente
  (capítulo 09).
- **Las cifras de una pieza son de ejemplo**, y se marcan: «Datos de ejemplo.» en la pieza cuando
  tiene lugar para una nota (en `text.tertiary`: capítulo 04, 4.5), y siempre en el HTML. Un dato
  real de un cliente no va nunca, salvo en un testimonio con consentimiento escrito (9.10).
- **Mercado Libre se nombra como un hecho**, chico y en texto, nunca en un titular, en pauta ni con
  su logo o sus colores. En una pieza orgánica de redes puede ir arriba, en la línea de contexto, en
  `text.primary`; en los banners y las portadas de LinkedIn y Facebook, no (capítulo 12, 12.1).

---

## 11.1 Favicon

Seis archivos, desde los SVG de `logo/`:

| Archivo | Medida | Para qué |
|---|---|---|
| `favicon.ico` | 32, con 16 adentro | Navegadores viejos y lectores de feeds. |
| `icon.svg` | vectorial | Navegadores actuales. |
| `apple-touch-icon.png` | 180 | iOS, al agregar a la pantalla de inicio. |
| `icon-192.png` y `icon-512.png` | 192 y 512 | El manifiesto web. |
| `icon-maskable-512.png` | 512 | Android, que recorta con su máscara. |

- A 16 y 32 px va el master chico (`icon-small`), con la i ajustada al píxel.
- En el maskable, la i entra en el círculo seguro: radio de 0,4 del lado, centrado.
- El ícono trae su propio fondo negro, así que el mismo archivo sirve sobre la pestaña clara y la
  oscura.
- `theme-color` es el `bg.canvas` de cada modo: #0A0A09 en oscuro y #FAFAF9 en claro.

## 11.2 App icon y conector de Claude

- **Apple:** 1024 × 1024, en capas (el fondo negro y la i por separado), para que el sistema arme
  sus variantes.
- **El directorio de conectores:** el SVG o un PNG de 512. Lo que pide exactamente se verifica
  antes de cada envío (capítulo 10).
- **Prueba obligatoria:** mirarlo a 16, 24 y 32 px, sobre claro y sobre oscuro, antes de subirlo.
- **Siempre full-bleed**: cuadrado, sin esquinas horneadas ni alfa. La máscara la pone la
  plataforma.

## 11.3 Foto de perfil

Va el ícono a sangre: la i blanca sobre el cuadrado negro, sin borde.

- Es la misma foto en Instagram, Facebook, WhatsApp, X, GitHub y Google Workspace. El logo de la
  página de empresa de LinkedIn tiene su propio archivo (11.5).
- El archivo es `pieces/redes/perfil/perfil-1080.png` (1080 × 1080). Se sube cuadrado y cada red lo
  recorta en círculo: la i entra en el círculo de radio 432 (el 80 %), así que el recorte no la toca.
- `pieces/redes/perfil/perfil.html` no se edita: la medida y la posición de la i están medidas.

## 11.4 Banner del perfil de LinkedIn (1584 × 396)

- El archivo es `pieces/linkedin/banner-perfil.html` → `banner-perfil.png`, y va como foto de
  fondo del perfil personal. Las zonas medidas y sus fuentes están en `pieces/linkedin/README.md`.
- **Fondo** `color.brand.black`, con una luz petróleo suave (`backlight.iris`) detrás del panel.
- **La zona de la foto, libre:** LinkedIn pone la foto encima, en x 33–373 en la computadora y en
  x 67–702 en el celular. El contenido empieza en x 718.
- **Después de esa zona:** el lockup (el ícono y «iris agents») y, debajo, el titular de dos
  líneas a 38 px, «Agentes expertos / a cargo de tu e-commerce.». La primera línea en la sans 500 y
  `text.primary`; la segunda, la frase, en la sans 500 y `signature.phrase`, sin cursiva (capítulo
  15, 15.8). Sin Mercado Libre en el titular.
- **A la derecha:** el feed «Hoy en tu cuenta» en un panel de vidrio de 340 px, con los cinco resultados:
  «Mejoró la reputación», «Contestó 40 preguntas», «Resolvió 3 reclamos», «Generó 3 ventas
  adicionales» y «Adhirió a una promoción». Cada fila con ✓, el verbo en `text.secondary` y el
  objeto en `text.primary` 500 (capítulo 08, sección 8.2).
- **Mercado Libre** no va en el banner, tampoco arriba como en un post: va en el «Acerca de» del
  perfil, como un hecho: «para vendedores de Mercado Libre».
- **Antes de darlo por bueno,** mirarlo subido en la computadora y en un celular: cuánto recorta
  la app del celular a los costados no está medido.
- El diseño salió del canvas del banner en Claude Design y se rehízo con la marca nueva el
  2026-10-15; lo que se edita es el HTML.

## 11.5 Portada y logo de la página de empresa en LinkedIn

- **La portada** es `pieces/linkedin/portada-empresa.html` → `portada-empresa.png`, de 1512 × 256
  (verificada en la ayuda de LinkedIn el 2026-10-10). El logo de la página ya está al lado, así que
  va la **marca sola** («iris agents», sin el ícono) y el titular, «Agentes expertos / a cargo de tu
  e-commerce.», con la frase en color y sin cursiva, a la derecha de donde cae el logo. Es lo
  corporativo: plano, sin feed, porque no entra, y sin luz.
- **El logo** es `pieces/linkedin/logo-empresa-400.png`, de 400 × 400: el ícono a sangre de
  `logo/icon.svg`, cuadrado y sin transparencia. Sale de `logo-empresa.html`, y
  `logo-empresa-preview.png` lo muestra en chico, cuadrado y en círculo.
- Las zonas medidas y sus fuentes están en `pieces/linkedin/README.md`.

## 11.6 Portada de la página de Facebook (1640 × 624)

- El archivo es `pieces/redes/facebook/portada.html` → `portada.png`, y es la única versión. Lleva
  el mismo titular que el banner, «Agentes expertos / a cargo de tu e-commerce.», con la frase en
  la firma y en color, y el panel «Hoy en tu cuenta» de vidrio sobre la luz petróleo: es redes v2
  completo (capítulo 15).
- **Mercado Libre** no va en la portada, ni en el titular ni arriba: va en el «Acerca de» de la
  página, como un hecho.
- La foto de perfil tapa la esquina de abajo a la izquierda y el celular recorta los costados: las
  zonas seguras están en `pieces/redes/_base/formatos.json` («portada-facebook») y los largos de
  cada texto, en `pieces/redes/plantillas.md`, y hay que mirarla subida en la computadora y en un
  celular.
- Sus filas siguen la regla de lo público: resultados, sin el nombre del agente.

## 11.7 OG (1200 × 630)

- **La medida** es 1200 × 630 (1,91:1), de hasta 8 MB. La página declara `og:image:width`,
  `og:image:height` y un `og:image:alt` que describe la imagen, no que repite el título. Para
  `twitter:card` va `summary_large_image` con la misma imagen.
- **La composición:**
  - el lockup arriba a la izquierda y un eyebrow de contexto arriba a la derecha;
  - el titular de dos líneas a 64 px, con la frase (capítulo 05, 5.3). La de la landing todavía
    lleva el sello, hasta que se rehaga;
  - la tarjeta de aprobación o unas filas del feed, como imagen del producto;
  - abajo a la izquierda, una línea de hechos con su fuente; abajo a la derecha, el dominio en la
    mono.
- **Se genera desde la página**: una plantilla HTML que lee `tokens.css` y se pasa a PNG en el
  build, con el mismo texto que dibuja la página. Nunca un PNG fijo con cifras que envejecen.
- La OG por defecto (la de una página sin la suya) vive en `pieces/`.
- Puede llevar la luz de la marca detrás de la imagen del producto (capítulo 04, 4.9).

## 11.8 Video y demos

- **Las demos:** 1920 × 1080 a 30 fps, fondo `color.brand.black`.
- **Los reels y las stories de video:** vertical, 1080 × 1920 a 30 fps. Lo esencial va dentro de la
  zona segura del reel (`pieces/redes/_base/formatos.json`, «reel»), porque la interfaz de la red
  tapa arriba y abajo. Va con el vidrio del capítulo 15 y el movimiento del capítulo 06
  («Movimiento en piezas de video»).
- Clips de 15 a 25 s donde se vean las llamadas, con la línea «tool · estado» (capítulo 08,
  sección 8.4).
- Si la demo está acelerada, se dice cuánto. Lo que es de una cuenta real va con la censura con
  chip; mejor todavía, con datos de ejemplo.
- En la web: un poster, `preload="none"`, y la conversación del video también como texto en la
  página. Si el video tiene voz, lleva subtítulos.

## 11.9 Propuestas y one-pagers

- Se leen en pantalla, así que van en oscuro, con los tokens: el lockup, el titular de dos líneas,
  las piezas propias y la grilla segmentada para las cifras.
- Una pieza reutilizable no lleva el nombre de ningún cliente. La propuesta para un cliente puede
  nombrarlo sólo a él, y no se reutiliza.
- Lo impreso no está decidido: se fija con la primera prueba física.

## 11.10 Email y notificaciones

Hoy no hay un canal de email de producto; cuando exista:

- Fondo claro, porque los clientes de correo invierten o ignoran el oscuro. El ícono conserva su
  cuadrado negro.
- El texto primero. El nombre va escrito («iris»); el ícono, si va, es una imagen con
  `alt="iris"`, porque muchos clientes bloquean las imágenes.
- Un solo CTA de tinta, que dice qué pasa al tocarlo.
- La firma de mail de una persona lleva el lockup (ícono y «iris agents»), como imagen al doble de
  resolución.

## 11.11 Material para Mercado Libre

Lo que se le muestra a Mercado Libre (el listado de la app en su panel de developers, una
postulación a su programa de partners, una demo):

- La app se llama **«iris»**, nunca «iris para Mercado Libre». El ícono es el de este manual: la
  versión violeta que sigue cargada en el panel de developers se reemplaza.
- Se muestra el producto: casos y resultados, cada número con su caso y su contexto. No se muestra
  cómo está hecho por dentro.
- No se presenta como socio ni se propone una relación: se muestra lo que hace.
- El programa de partners pide logo, video y capturas; hoy no toma postulaciones (aviso del cuarto
  trimestre de 2026). Ver el capítulo 12.

---

## 11.12 Las piezas de redes

Viven en `pieces/redes/`. Cada pieza es un HTML editable; la PNG que se sube sale de renderizarlo.
Al lado de cada HTML está su PNG limpia y su `-guias.png`, la misma pieza con las zonas seguras en
magenta, que **nunca se publica**.

- **Qué hay en cada carpeta:** `pieces/redes/README.md`.
- **Las reglas de los posts, carruseles, stories y reels:** capítulo 15. **Cómo están hechas las
  piezas** (las dos hojas, las plantillas de vidrio, cómo se renderiza y la lista de control):
  `pieces/redes/plantillas.md`. **Las medidas de cada formato**:
  `pieces/redes/_base/formatos.json`. En Instagram va el 4:5; el cuadrado queda para Facebook.
- **LinkedIn** va aparte, en `pieces/linkedin/` (11.4 y 11.5).
- **Los datos fijos** (el usuario de Instagram, la página de Facebook, la web), en el capítulo 02
  (2.3).
- **La bio** puede decir «tu cuenta de Mercado Libre», sin logo ni colores. El nombre de la cuenta
  nunca lleva Mercado Libre.

Cómo se regeneran las PNG: capítulo 14.

## 11.13 Los registros anteriores

Hasta octubre de 2026 los posts se armaban en tres registros (Pregunta y cifra, En vivo y La
trastienda), con el sello y la luz radial blanca. Los reemplazó el vidrio del capítulo 15, y sus
plantillas se borraron el 2026-10-15; están en el historial de git. Lo que sigue valiendo de ellos
quedó en el capítulo 15 y en este:

- **Una foto en una pieza** es del mundo del vendedor: sin logos ni marcas, sin el packaging de
  Mercado Libre y sin productos de clientes reales. Si es generada con IA, lo dice («Imagen generada
  con IA.»). El texto que cae sobre la foto pasa 4,5:1 contra lo que tiene detrás, medido en la PNG
  (`pieces/redes/plantillas.md`, sección 7), y el logo nunca va sobre la foto (capítulo 03, 3.8).
- **Un reel** cierra con el lockup, entero dentro de la zona segura del formato
  (`pieces/redes/_base/formatos.json`, «reel»).
- **La línea «tool · estado»** usa el nombre real de la tool, verificado el día que se publica
  (capítulo 08, 8.4).

## 11.14 Una pieza sin plantilla

Las plantillas de `pieces/redes/plantillas/vidrio/` son ejemplos, no el límite. Un post nuevo
carga `pieces/redes/_base/vidrio.css` y se arma con el capítulo 15; una pieza fija de la marca,
con `pieces/redes/_base/brand.css`, que trae los colores, las fuentes, la frase y la flecha. Las dos
se arman con las medidas de su formato: los márgenes, las zonas seguras y los tamaños mínimos están
en `pieces/redes/_base/formatos.json` y valen igual sin plantilla. Cómo se renderiza, se mide y se revisa la pieza terminada: `pieces/redes/plantillas.md`,
secciones 6 y 7.

**Qué hace buena una pieza.**
- **Tiene vida.** La calma es de la voz, no quietud visual. Las primeras piezas, armadas con las
  plantillas de entonces tal cual, salieron correctas y muertas: se rechazaron por «sin vida,
  demasiado sobrias». Entre dos opciones correctas va la que tiene más contraste, más escala o más
  movimiento.
- **Un solo foco.** Una cosa se lee en el primer segundo (la cifra, el titular, la pregunta) y todo
  lo demás la acompaña.
- **Una cifra protagonista por lámina.** Las demás van chicas, en filas: dos cifras grandes compiten
  y ninguna gana.
- **Aire parejo.** Los bloques que van juntos van a la misma distancia. Lo que sobra se junta en un
  solo vacío a propósito (el `.aire` del vidrio), y no en huecos sueltos. Los bloques de texto se separan con aire, no con un fondo: `bg.raised` es el
  nivel de la tarjeta de aprobación.
- **Movimiento donde hay trabajo.** En un reel se mueve lo que hace iris: el tipeo, la tool, la
  cifra que llega. Nada se anima de adorno (capítulo 06, 6.7).

**Lo que sale por costumbre y en iris no va.** Son reflejos de un modelo que diseña, y cada uno
tiene su reemplazo:
- palabras en itálica para acentuar un titular: la itálica es sólo la firma, en la frase
  (capítulo 05, 5.2), y lo que remarca un titular es su segunda línea (capítulo 09, 9.8);
- rótulos en mono de adorno: la mono es sólo para datos, como horas, tools e ids (capítulo 05,
  5.1);
- la numeración 01, 02, 03 delante de cada punto: el orden lo dan la posición y, en un carrusel, el
  contador;
- fondos crema o cálidos: el fondo es el negro de marca, o el blanco de día de redes (capítulo 15);
- botones en píldora en la app: ahí los controles son de radio chico (`radius.control`). En las
  piezas de vidrio los botones y los estados sí van en píldora (capítulo 15).

**Los avisos.** Cuando iris dice algo y no hace nada («se te va a quedar sin stock»), se cuenta con
el mensaje y la respuesta de iris (capítulo 15, 15.7), sin el OK, o con una fila del feed. La tarjeta de aprobación es sólo para una
acción que iris hace con el OK: un aviso vestido de propuesta muestra un cambio que iris no va a
hacer.

**Ante la duda**, va la opción con más vida que respete este manual: lo que no está prohibido, se
puede. Sólo tres cosas no salen sin una persona: un testimonio sin consentimiento escrito, un dato
real de un cliente y una foto con personas reales (capítulo 09, 9.10). La única persona que aparece
es la vocera, generada con IA y declarada (capítulo 15, 15.9).
