# 03 · Logo e ícono

## 3.1 Las tres piezas

| Pieza | Qué es | Cuándo va | Por ejemplo |
|---|---|---|---|
| **El ícono** | Una «i» minúscula de DM Serif Display itálica, en `color.brand.white` (#FAFAF9), sobre un cuadrado `color.brand.black` (#0A0A09), a sangre. | Donde el espacio es cuadrado o chico. | Foto de perfil, favicon, ícono de app, el conector de Claude. |
| **La marca** | El logotipo «iris agents», todo en minúscula, en DM Serif Display itálica y a un solo color. | Donde el ícono ya está cerca. | La portada de la página de empresa (el avatar ya muestra el ícono), el header de la app. |
| **Juntos** | El ícono a la izquierda y el logotipo a la derecha, en una fila. Es el **logo principal**. | En todo lo demás. | La web, la firma de mail, documentos y propuestas, el banner, el pie de los posts. |

Para elegir: si el espacio es cuadrado, va el ícono. Si el ícono ya se ve en la misma pantalla, va
la marca sola. Si no, van juntos. La i repetida (la del ícono y la de «iris») está aceptada.

## 3.2 El ícono

### Construcción

- **El cuadrado** es 1:1, de `color.brand.black`, sin borde y sin esquinas: el archivo va a sangre.
  Las esquinas las pone cada plataforma con su máscara. Un archivo con esquinas horneadas muestra
  puntas claras cuando la plataforma aplica la suya.
- **La i** es una minúscula de DM Serif Display itálica en `color.brand.white`. En el master mide
  **0,64 del lado** de alto. (La i vieja, en Playfair, medía 0,52 y se perdía a 16–32 px.)
- **El centrado es óptico**, no por la caja de texto:
  1. En horizontal se centra el dibujo de la i, no su avance. La itálica inclina la caña hacia la
     derecha y sobresale de su caja: centrada por el avance queda corrida unas 32 milésimas de cuerpo.
  2. Después se corre unas 10 milésimas más a la izquierda. El ojo lee la i por la cabeza (el punto y
     el remate de arriba), que queda a la derecha del eje inclinado.
  3. En vertical se centra por su caja: el mismo aire sobre el punto que bajo el pie.
- La corrección queda fijada en el SVG. **El ícono nunca se tipea.**

### El alto de la i según el archivo

| Archivo | Alto de la i | Por qué |
|---|---|---|
| `icon.svg` y sus exportaciones | 0,64 del lado | Es el master. A 0,64 la i también entra en el círculo seguro del maskable (radio 0,4 del lado). |
| `icon-small.svg` | 0,75 del lado | De 16 a 23 px, y los 16 y 32 px del `favicon.ico`. El punto y la caña van alineados al píxel; a 0,72 el aire entre los dos caía en medio píxel a 16 px. |
| Avatar de redes (`pieces/redes/perfil/`) | 0,775 del lado | Las redes recortan en círculo: es lo más grande que entra en el 80 % del radio. |

## 3.3 La marca

- **«iris agents»** en minúscula, DM Serif Display itálica 400, con tracking de −0,01em, vectorizado
  en `wordmark.svg`.
- **La unidad de construcción es x**, el alto de la x itálica dibujada: **0,496 del cuerpo**. La
  fuente declara 0,481, que es el de la recta; como el logotipo es itálico, manda 0,496 (medido sobre
  el archivo de la fuente).
- El kerning entre la r, la i y la s itálicas se ajusta a mano en el SVG.
- La i de «iris» y la del ícono son el mismo dibujo.
- **Un solo color:** «agents» no va en gris ni en otro tono que «iris».
- De ancho mide unos 4,36 cuerpos: a 20 px de cuerpo, unos 87 px, con una x de 10 px.

## 3.4 Juntos

A es el lado del ícono. Son las medidas que usan las plantillas de `pieces/redes/`:

| Medida | Valor | Con A = 52 px |
|---|---|---|
| Radio del cuadrado | 0,23 A | 12 px |
| Cuerpo de la i | 0,81 A (la i mide 0,58 A de alto) | 42 px |
| Aire bajo la i, que la sube al centro óptico | 0,077 A | 4 px |
| Cuerpo del logotipo | 0,77 A | 40 px |
| Separación entre el ícono y la palabra | 0,27 A | 14 px |

- El ícono y la palabra van centrados en vertical.
- En el lockup la i del ícono va más chica que en el ícono solo (0,58 A contra 0,64): así mide casi
  lo mismo que la i de «iris» (0,55 A) y las dos se leen del mismo cuerpo.
- El radio del cuadrado existe sólo cuando el ícono se dibuja adentro de una pieza: `lockup.svg` ya
  lo trae, y un ícono suelto que va como tile lo recibe del CSS de la pieza.
- **Sobre un fondo del mismo negro**, el cuadrado lleva un borde `border.default` (#3A3937): 1 px en
  pantalla, 2 px en una pieza de 1080. Sin el borde, el cuadrado se pierde. `lockup.svg` trae el
  de pantalla (1 px con A = 52), así que en una pieza de 1080 la copia en línea lleva el borde a
  2 px: además del tamaño, es lo único que cambia del SVG. Las plantillas ya lo traen así; la
  cuenta, en `pieces/redes/plantillas.md`.

## 3.5 Área de resguardo

- **Alrededor del ícono o del lockup:** A/2 de cada lado. En un lockup de 52 px son 26 px.
- **Alrededor de la marca sola:** 1x de cada lado (el alto de la x, casi medio cuerpo).
- En esa franja no entra nada: ni texto, ni otro logo, ni el borde de la pieza.
- No aplica al ícono como archivo a sangre (foto de perfil, favicon, ícono de app): ahí el ícono es
  todo el espacio.

## 3.6 Tamaños mínimos

| Pieza | En pantalla | En una pieza de 1080 px |
|---|---|---|
| Ícono | 24 px con `icon.svg`; 16 px sólo con `icon-small.svg` | 52 px |
| Marca | 20 px de cuerpo (unos 87 px de ancho) | 40 px de cuerpo |
| Juntos | Ícono de 26 px, para que la marca no baje de 20 px | Ícono de 52 px |

- La marca a 20 px es la única excepción escrita al piso de 32 px de la firma (capítulo 05), porque
  es un dibujo y no un texto. Más chico que eso, va el ícono solo.
- El mínimo impreso se fija con la primera prueba física.

## 3.7 Versiones

- **El ícono tiene una sola versión.** Trae su propio fondo negro, así que va igual sobre claro y
  sobre oscuro.
- **La marca y el lockup** van en `color.brand.white` sobre oscuro y en `color.brand.black` sobre
  claro. En el lockup sobre claro, el cuadrado del ícono sigue siendo negro.
- **No existe** una versión a color, violeta, en gris, a dos tonos, en un color de estado, con
  degradé ni con contorno.
- **Quedan retirados** el ícono violeta, el de Playfair, la i a 0,52 del lado y la versión redondeada
  con transparencia. La violeta sigue cargada en el panel de developers de Mercado Libre: hay que
  reemplazarla.

## 3.8 Fondos

| Fondo | Marca | Ícono |
|---|---|---|
| Oscuro: `bg.canvas` (#0A0A09) y los demás neutros del oscuro | `color.brand.white` | Su cuadrado negro, con el borde `border.default` |
| Claro: `bg.canvas` del claro (#FAFAF9) y sus neutros | `color.brand.black` | Su cuadrado negro, sin borde |
| Una foto, un color de estado, un degradé, el amarillo o el azul de Mercado Libre, el cian de Mercado Pago, un fondo con ruido | No va | No va |

La única excepción es el degradé radial muy sutil (blanco al 4 %) del banner de LinkedIn y de la
portada de Facebook: ahí el lockup va encima, en `color.brand.white`.

## 3.9 Usos incorrectos

**Color**
- Cualquier violeta: de fondo del ícono (el viejo #4C1D95), de acento, de filete, o la raya violeta
  debajo del logotipo de la OG vieja.
- El amarillo de Mercado Libre (#FFE600), su azul (#3483FA) o el cian de Mercado Pago (#00BCFF), en
  el logo o a su lado.
- La marca en gris, a dos tonos, en un color de estado, en petróleo o en degradé.
- Glow, sombra, contorno, vidrio o un gradiente sobre la marca.

**Forma**
- Una raya o un subrayado debajo del logotipo, en cualquier color, o cualquier trazo de adorno.
- Rotar, inclinar más, estirar, comprimir o cambiar las proporciones. Separar el punto de la i.
- Esquinas redondeadas horneadas en el archivo del ícono, o esquinas con transparencia.
- Juegos con el ojo o con el iris del ojo: pupilas, círculos concéntricos, la i o la palabra como un
  ojo, «iris ve todo».

**Tipografía**
- Playfair, la DM Serif Display recta, Plex o cualquier otra fuente; una itálica o un bold falsos.
- Tipear el logo: el ícono, el logotipo o el lockup. Tampoco en una plantilla, un banner, una portada
  o una mesa de trabajo de Claude Design: va el SVG (3.10).
- «Iris», «IRIS» o «Iris Agents» en el logotipo, o un sufijo: «AI», «.ai».
- El logotipo como palabra adentro de una oración: en un texto se escribe «iris», en la tipografía
  del texto.

**Compañía**
- Mascotas, robots, cerebros, destellos o emojis al lado de la marca.
- La marca de otro (Mercado Libre, Claude) más grande que la de iris, pegada a ella o armando un
  co-branding.
- «Partner», «oficial», «certificado», «aliado» o «powered by» junto al logo.
- Un claim rechazado al lado: «el primer empleado de IA», «piloto automático», «24/7», «bot» o un
  superlativo.

## 3.10 Archivos

Viven en `logo/` y se exportan una sola vez desde los SVG master.

| Archivo | Qué es |
|---|---|
| `icon.svg` | El master del ícono, cuadrado y a sangre. |
| `icon-small.svg` | El master chico, para 16 y 32 px. |
| `wordmark.svg` | La marca «iris agents». Se pinta en `color.brand.white` o en `color.brand.black` según el fondo. |
| `lockup.svg` | Juntos: el logo principal, armado con `icon.svg` y `wordmark.svg` con las medidas de 3.4. |
| `favicon.ico` | 32 px, con el de 16 adentro. |
| `apple-touch-icon.png` | 180 px. |
| `icon-192.png`, `icon-512.png` | Para el manifest de la web. |
| `icon-maskable-512.png` | Para Android, con la i dentro del círculo seguro. |
| `icon-1024.png` | Para tiendas y directorios. |
| `png/` | Para lo que no lee SVG (Canva, Google Docs y Slides, Keynote, Notion, la firma de mail): el logotipo en `color.brand.white` y en `color.brand.black` y los dos lockups, con fondo transparente, a 512, 1024 y 2048 px de ancho; el ícono lleno a 64, 128, 256 y 2048 px. Cuál va dónde, en `logo/README.md`. |
| `preview.png` | La hoja de contacto de `png/`, sobre oscuro y sobre claro. |

**El logo nunca se tipea**: ni en una plantilla, ni en un banner, ni en una portada, ni en una mesa
de trabajo de Claude Design. No hay excepción: ni la i del ícono en un recuadro, ni «iris agents»
como texto en la firma, aunque la fuente esté cargada. Va el SVG en línea, del tamaño y en el
lugar que tendría: `lockup.svg`, `icon.svg` o `wordmark-white.svg` según 3.1, de `logo/`. Lo que
no lee SVG usa un PNG de `png/`.
