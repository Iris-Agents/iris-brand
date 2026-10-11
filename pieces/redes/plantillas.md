# Especificación de las plantillas de redes

Lo que cumple toda pieza de redes de iris y cómo están hechas las de `pieces/redes/`: el color, la
tipografía, el logo, las reglas de Mercado Libre y, de cada plantilla, el formato, el tamaño, las
zonas seguras, los slots con sus largos máximos y cómo se renderiza. Cómo se escribe y se publica
un post no está acá: es oficio de contenido y vive fuera de este repo.

- **Los valores mandan en el CSS.** Si esta especificación y `pieces/redes/_base/brand.css`
  dicen cosas distintas, vale `brand.css`.
- **Las plantillas mandan en el HTML.** Los largos máximos de cada texto están en el comentario
  `<!-- EDITAR -->` de cada plantilla. Esta especificación los copia, pero si no coinciden vale el
  HTML.

Redactada el 2026-10-10 y revisada el mismo día contra los archivos reales (rutas, tamaños y slots).

---

## 1. Color

La marca es monocroma y oscura. La jerarquía sale de la luz: más claro es más importante.

- Hay **un solo acento de color, el petróleo**, y va en un solo lugar: el sello de la segunda línea
  del titular (ver «El sello» más abajo).
- Los **estados** tienen color sólo en su glifo.
- Usá siempre la variable CSS (`var(--text-primary)`), nunca el hex suelto.
- El contraste de la tabla está medido sobre `--bg-canvas` (WCAG).

### Neutros del oscuro, negro y blanco de marca, y el sello

| Token | Hex | Contraste | Cuándo sí | Cuándo no |
|---|---|---|---|---|
| `--brand-black` | #0A0A09 | — | Cuadrado del ícono, fondo de la foto de perfil, logotipo sobre fondo claro. | Para texto sobre fondo oscuro: no se ve. |
| `--brand-white` | #FAFAF9 | 18,96 | El logotipo y la i del ícono sobre fondo oscuro. | Para texto común: el texto usa `--text-primary`. |
| `--bg-canvas` | #0A0A09 | — | El fondo de toda pieza. Es el mismo negro de marca. | Para un bloque encima de otro: cada nivel sube un escalón (surface, raised). |
| `--bg-surface` | #111110 | — | El panel del feed «Hoy en tu cuenta». | Como fondo de la pieza entera. |
| `--bg-raised` | #181816 | — | La tarjeta de aprobación, un nivel arriba del panel. | Para separar bloques de texto: para eso está el aire. |
| `--bg-hover` | #201F1E | — | Sólo si se dibuja la app con una fila en hover. Las plantillas no lo usan. | En piezas comunes. |
| `--bg-selected` | #262624 | — | Sólo si se dibuja la app con una fila seleccionada. Las plantillas no lo usan. | En piezas comunes. |
| `--border-subtle` | #2C2B29 | 1,40 | Separadores entre filas, borde del panel del feed. | Como borde de un control. |
| `--border-default` | #3A3937 | 1,72 | Borde de la tarjeta de aprobación y del botón «Rechazar con motivo». También el borde del cuadrado del ícono sobre fondo negro. | Para texto. |
| `--border-control` | #72716E | 4,06 | Borde de la píldora «Espera tu OK» y de los controles. | Para separadores (pesa demasiado) o para texto. |
| `--text-tertiary` | #9B9A96 | 7,03 | Datos sueltos: el eyebrow de adentro de una pieza de producto («Propuesta», «Hoy en tu cuenta»), horas, contador, nota, `@iris_agents`, leyenda. | Para un párrafo que se lee de corrido, o para la línea de contexto de arriba de todo, que va en `--text-primary`. |
| `--text-secondary` | #BFBEB9 | 10,64 | Bajada, texto de apoyo, el texto de cada fila del feed menos lo que cambió. | Para el titular: la línea 1 va en `--text-primary` y la 2, en el sello. |
| `--text-primary` | #EDEDEA | 16,89 | La línea de contexto de arriba de todo, la primera línea del titular, lo que cambió en cada fila del feed (la cifra o el objeto, en `<b>` y Plex 500), cifras, título de la tarjeta, el borde y la letra de «Aprobar». | Para el logotipo: va en `--brand-white`. |
| `--signature-marketing-block` | #03313C | 1,42, a propósito: casi no se despega del negro | El sello: el bloque petróleo detrás de la segunda línea del titular. Es el único acento de color de la pieza. | En cualquier otro lugar (ver «El sello»). Tampoco para un botón: «Aprobar» va con borde de 1 px (2 px en el carrusel) en `--text-primary`, sin relleno. |
| `--signature-marketing-text` | #EDEDEA | 11,87 sobre `--signature-marketing-block` | La letra de la firma en el sello: la tinta. | Fuera del sello: ahí la tinta es `--text-primary`, que tiene el mismo valor. |

Las dos del sello se llaman como `signature.marketing` de los tokens. En los tokens,
`signature-block` y `signature-text` son el sello de tinta de la app, que estas piezas no usan.

### El sello

Decisión de Franco del 2026-10-10: iris sigue monocroma, con un solo acento de color. Es el petróleo
(#03313C, OKLCH 0.29 0.05 219) y va en un solo lugar: el bloque del sello, con la firma en tinta
encima. «El verde, de forma sutil y cuando realmente se necesita»: por eso el bloque casi no se
despega del negro (1,42:1) y lo que se lee es la letra (11,87:1).

- **Va en todo lo de marketing:** posts, stories, reels, carruseles, banners y portadas (LinkedIn,
  Facebook) y el titular de la landing. En las piezas es la clase `.sello` de `_base/brand.css`, la
  misma en los tres registros (sección 5).
- **La app no lo usa:** ahí el sello sigue siendo de tinta (bloque #EDEDEA y letra #0A0A09 en oscuro,
  invertido en claro). No es de estas piezas.
- **Nunca** va de fondo de la pieza, de franja, de texto, de borde, de botón, de ícono, de glifo, de
  estado ni en el logo. El verde de «trabajando» (◐, `--status-working`) es otra cosa: un estado,
  que no cambia.
- **El botón principal a la vista** («Aprobar» en la tarjeta) va con borde de tinta y sin relleno: el
  foco es la firma y lo que dice la pieza, no el botón.

### Estados

> La paleta se verificó el 2026-10-10 para el modo oscuro: contraste, daltonismo y distancia al
> amarillo de Mercado Libre. El mismo día Franco decidió que el verde es «en movimiento» (pasa a
> trabajando) y que lo resuelto va en silencio (✓ gris). Los valores reales viven siempre en
> `pieces/redes/_base/brand.css`. Nunca copies estos
> hex a una pieza: usá la variable. Si cambian, se regenera todo con `_base/render-all.sh`.

| Token | Hex hoy | Glifo | Significa | Cuándo sí | Cuándo no |
|---|---|---|---|---|---|
| `--status-attention` | #F7AC4D | ● lleno | **te toca**: el dueño decide | La fila que espera una decisión del dueño, con la píldora «Espera tu OK». Va arriba de todo. | Para llamar la atención sin que haya una decisión pendiente. |
| `--status-failed` | #E66E68 | ✕ | **falló** | Una acción que no se pudo hacer. | Como acento, como alarma decorativa o en texto. |
| `--status-working` | #50A064 | ◐ medio círculo: el contorno entero y la mitad derecha llena | **iris trabajando** | Una acción en curso, con «en curso» a la derecha. | Como adorno o «cargando» genérico, ni para decir «bien», «éxito» o «crecimiento». |
| `--status-done` | #9B9A96 (el mismo que `--text-tertiary`) | ✓ | **resuelto** | Un resultado del día: «Contestó 40 preguntas». Sin hora: el «hoy» lo da el título del panel. | Para destacar un logro: lo resuelto va en silencio. |
| `--status-idle` | #EDEDEA | ○ hueco | **esperando o sin declarar** | Algo que nadie declaró todavía. | Como viñeta de una lista. |

**Reglas de los estados:**
- El color va sólo en el glifo: nunca en texto, fondos, bordes, titulares ni logotipo.
- Cada glifo va con su palabra o con una leyenda. La leyenda nombra sólo los estados que
  aparecen en la pieza.
- Excepción: un panel con todas las filas resueltas va sin leyenda, como el banner de LinkedIn y
  la portada de Facebook. La ✓ y el verbo en pasado ya dicen que está hecho, y una leyenda de un
  solo estado no agrega nada.
- Cada estado tiene su forma, y ninguna se repite: el único ● lleno es «te toca», el único ○
  hueco es «esperando» y el único ◐ medio círculo es «trabajando». Ningún otro estado se dibuja
  como un punto lleno, un círculo hueco o medio lleno, ni siquiera en otro color.
- El verde es sólo «trabajando»: algo en movimiento. Nunca marca algo terminado ni «bien». El ◐
  va entero en verde (contorno y mitad), sin punteado.
- En las piezas quietas el ◐ no se mueve. En una pieza animada puede latir suave en opacidad dos
  veces al entrar al estado y después queda quieto. Nunca gira.
- «Resuelto» es una ✓ gris, del mismo gris que los datos sueltos: lo terminado no pide atención.
- El texto de la fila se escribe igual en todos los estados (lo que cambió en `--text-primary`, el
  resto en `--text-secondary`): el estado lo dicen el glifo, el verbo y lo que va a la derecha.

Los glifos, para copiar. Son los mismos de las plantillas, con `viewBox` de 10 y el color por
`currentColor`:

```html
<symbol id="te-toca" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.25" fill="currentColor"/></symbol>
<symbol id="fallo" viewBox="0 0 10 10"><path d="M1.8 1.8 8.2 8.2M8.2 1.8 1.8 8.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" fill="none"/></symbol>
<symbol id="trabajando" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 1a4 4 0 0 1 0 8z" fill="currentColor"/></symbol>
<symbol id="resuelto" viewBox="0 0 10 10"><path d="M1.6 5.4 4 7.8 8.6 2.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/></symbol>
<symbol id="esperando" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/></symbol>
```

### Colores que no existen

- **Violeta**, en ningún tono: tampoco en el cursor, que va en tinta.
- **El cartón**, ni como sello, ni como textura, ni como color. **El verde claro** (aguamarina) y
  **el rosa**. **El petróleo de fondo** de una pieza entera.
- **Los colores de Mercado Libre** (su amarillo, #FFE600 y parecidos, y su azul) y **el cian de
  Mercado Pago**, tampoco en redes.
- **Gradientes llamativos, glow, glass y sombras.** En oscuro, cada nivel se separa con un escalón
  de luz y un borde.

**Dos excepciones de luz:**
- La portada de Facebook lleva un degradé radial muy sutil (blanco al 4 %). Es hermana del banner de
  LinkedIn.
- Las piezas de redes pueden llevar **una luz radial blanca de hasta el 6 %**, una sola y sólo
  detrás del punto focal (la cifra del intercambio): nunca a pantalla completa ni de color. En su
  centro el texto sigue pasando: el terciario da 6,25:1, medido en la PNG. La usa
  `plantillas/intercambio/intercambio.css`.

---

## 2. Tipografía

Son tres familias, cada una con su trabajo. No se usa ninguna otra, ni siquiera de reserva. Si
falta internet al renderizar, el navegador pone Georgia o la del sistema: esa pieza no se entrega.

| Familia | Para qué | Pesos | Nunca |
|---|---|---|---|
| **DM Serif Display itálica**: la firma (`.signature`) | Sólo tres cosas: el logotipo y la i del ícono, que están dibujados en los SVG de `logo/` y nunca se tipean, y la segunda línea de un titular de dos líneas. | 400 itálica, el único que existe | Como palabra suelta, en números, en botones, en el eyebrow, en el cuerpo, en un título de una línea. |
| **IBM Plex Sans** | Todo lo que se lee: titular (línea 1), bajada, filas, etiquetas, botones, píldora, `@`. | 400 para leer, 500 para titulares, eyebrow, botones, píldora y título de la tarjeta | En 600 o 700: el bold no existe. Tampoco en itálica: `brand.css` no la carga y el navegador la falsearía. |
| **IBM Plex Mono** | Sólo datos: horas (`09:12`), ids, nombres de tools, el contador del carrusel (`1/3`), el marcador (`01`). | 400 (`brand.css` carga también el 500; las plantillas no lo usan) | En palabras: «en curso» o «hoy» van en Plex Sans. Tampoco en etiquetas. |

### La regla de la firma

La firma se reconoce porque escasea, y por eso va sólo en tres lugares:

1. **El logotipo** «iris agents».
2. **La i del ícono.**
3. **La segunda línea de un titular de dos líneas.**

No hay un cuarto uso. Un titular de una sola línea va entero en Plex. El título de una lámina
interior del carrusel también va sin firma.

Los dos primeros son dibujos: van como SVG de `logo/` (sección 3). En una pieza, la clase
`.signature` va sólo en la segunda línea del titular.

### El titular de dos líneas

- **Línea 1:** IBM Plex Sans 500, en `--text-primary`.
- **Línea 2:** la firma (DM Serif Display 400 itálica), en el sello: la letra en
  `--signature-marketing-text` (la tinta) sobre el bloque `--signature-marketing-block` (el
  petróleo). No va en gris.
- **Las dos al mismo tamaño.** El interlineado de la línea 1 es de 1,04 a 1,14; la línea 2 lleva el
  del sello: 1, con 0,16em de aire arriba.
- **El sello** es la clase `.sello` de `brand.css`: `inline-block`, padding de 0,14em 0,16em
  0,18em 0,13em, interlineado de 0,86 y esquinas rectas. En dos renglones es un solo bloque del
  ancho del titular.
- **Es el único color de la pieza**, fuera del glifo de un estado. El foco es la firma y lo que
  dice la pieza: donde va la tarjeta de aprobación, «Aprobar» va con borde de tinta y sin relleno
  (`.boton-borde`).
- **Es el mismo en todas las piezas y en los tres registros**, también en La trastienda: sin
  textura ni otro color.
- **La línea 2 no lleva números** y termina en punto.

En las plantillas ya está armado: `<span data-slot="titular-linea-1">` y
`<span class="signature"><span class="sello" data-slot="titular-linea-2">…</span></span>` (en el
carrusel, la línea es un `<em class="signature">`). El texto se cambia adentro del sello.

### Tamaños mínimos en piezas de 1080 px de ancho

Una pieza de 1080 px se ve en el teléfono a unos 390 px de ancho, o sea a 0,36 de su tamaño.

| Uso | Mínimo | En las plantillas | En un teléfono de 390 |
|---|---|---|---|
| Titular (las dos líneas) | 64 px | 64 a 120 px | 23 px o más |
| Bajada y texto de lectura | 34 px | 34 a 42 px | 12 px o más |
| Filas, datos y botones de las piezas de producto | 28 px | 28 a 34 px | 10 px o más |
| La línea «tool · estado» del intercambio | 26 px, y hasta 30 | 28 px | 9 a 11 px |
| Rótulos de una a tres palabras (eyebrow, nota, `@`, hora, contador, leyenda) | 22 px, y mejor 24 | 22 a 30 px | 8 a 11 px |
| Logotipo dentro del lockup | 40 px de cuerpo | 40 a 92 px | 14 px o más |

La portada de Facebook (1640 × 624) tiene otra escala, porque el celular la muestra a 0,577. Ahí
el piso es 22 px y el titular va a 38 px: no le apliques esta tabla.

### Tracking (espaciado entre letras)

| Qué | Tracking |
|---|---|
| Plex de 64 px para arriba | −0,02em |
| Plex alrededor de 40 px (de 40 a 63) | −0,015em |
| Plex de 13 a 24 px | −0,01em |
| Plex de 25 a 39 px | entre −0,01 y −0,015em (las plantillas usan −0,0125em a 34 px) |
| La firma, a cualquier tamaño | −0,01em |
| Eyebrow y línea de contexto: Plex 500 en mayúsculas | +0,08em |
| Plex Mono | 0 |

**El eyebrow:**
- En el HTML se escribe en minúscula normal («Hoy en tu cuenta») y el CSS lo pasa a mayúsculas.
- Nunca lleva «iris»: saldría «IRIS», y la marca va siempre en minúscula.
- **La línea de contexto** es el eyebrow de arriba de todo, en toda pieza: la misma letra, pero en
  `--text-primary`, porque se tiene que leer en el primer segundo. En las plantillas de siempre es el
  `.eyebrow` de arriba (slot `eyebrow`), que cada HTML pasa a tinta; en las de los registros (el
  intercambio y La trastienda) es `.contexto`, con el tema a la izquierda y, si hay una fecha real,
  cuándo a la derecha («Faltan 3 semanas»).
- **En un post orgánico, la línea de contexto puede ser «Para vendedores de Mercado Libre»**, con la
  cuenta regresiva a la derecha si la hay. Es el único lugar de arriba donde va Mercado Libre, y
  tiene sus límites (sección 4).
- El eyebrow de adentro de una pieza de producto («Propuesta», «Hoy en tu cuenta») sigue en
  `--text-tertiary`, como en la app.

### Descargas oficiales

Verificadas el 2026-10-10: todas respondieron HTTP 200.

| Familia | Google Fonts | Repo oficial | Licencia |
|---|---|---|---|
| DM Serif Display | https://fonts.google.com/specimen/DM+Serif+Display | https://github.com/googlefonts/dm-fonts | SIL OFL 1.1: https://raw.githubusercontent.com/google/fonts/main/ofl/dmserifdisplay/OFL.txt |
| IBM Plex Sans | https://fonts.google.com/specimen/IBM+Plex+Sans | https://github.com/IBM/plex (descargas: https://github.com/IBM/plex/releases) | SIL OFL 1.1: https://raw.githubusercontent.com/IBM/plex/master/LICENSE.txt |
| IBM Plex Mono | https://fonts.google.com/specimen/IBM+Plex+Mono | https://github.com/IBM/plex | la misma |

Las plantillas no necesitan nada instalado: `brand.css` carga las tres familias desde Google Fonts.

---

## 3. Logo e ícono

### Las tres piezas

| Pieza | Qué es | Cuándo va |
|---|---|---|
| **Ícono** | Una «i» minúscula de DM Serif Display itálica, en `--brand-white`, sobre un cuadrado `--brand-black`. | En un espacio cuadrado o chico: la foto de perfil, el favicon, el ícono de una app. |
| **Logotipo** | «iris agents», todo en minúscula, en DM Serif Display itálica. | Cuando el ícono ya está cerca, como en el header de una app. |
| **Juntos** (lockup) | Ícono y logotipo en una fila. | Es el logo principal: el pie de los posts, el carrusel, la portada de Facebook. La i repetida está aceptada. |

### Tamaños mínimos

- **Ícono:** 24 px en pantalla. Puede bajar a 16 px sólo con el master chico,
  `logo/icon-small.svg`.
- **Logotipo:** 20 px de cuerpo.
- **En una pieza de 1080:** el ícono del lockup va de 52 px de lado o más, y el logotipo de 40 px
  de cuerpo o más.

### El logo va siempre como SVG

El logo nunca se tipea (`guide/03-logo-e-icono.md`, 3.9 y 3.10): ni en una plantilla, ni en un
banner, ni en una portada, ni en una mesa de trabajo de Claude Design. No hay excepción. Cada
pieza lleva en línea el SVG de `logo/`, copiado con sus trazados tal cual:

| Qué va | Archivo | Dónde ya está |
|---|---|---|
| El lockup, sobre el negro | `logo/lockup.svg` | El pie de los posts y de las stories, la cabecera y el cierre del carrusel, la portada de La trastienda, el banner del perfil de LinkedIn y la portada de Facebook. |
| La marca sola, sobre el negro | `logo/wordmark-white.svg` | La portada de la página de LinkedIn, donde el ícono ya se ve en el logo de la página. |
| El ícono a sangre, para un recorte en círculo | `logo/icon-profile.svg` | La foto de perfil (`perfil/perfil.html`). |
| El ícono a sangre, cuadrado | `logo/icon.svg` | El logo de la página de LinkedIn (`pieces/linkedin/logo-empresa.html`, como `<img>`). |

Cómo va en una pieza:

- Se copia el `<svg>` de una plantilla, que ya lo trae, o el del archivo. De sus atributos cambian
  sólo el alto y el ancho: en el lockup, el lado del ícono A y 4,594 A (`width="257.27"
  height="56"` a 56 px); en la marca sola, 0,936 y 4,264 veces el cuerpo (`width="170.56"
  height="37.44"` a 40 px).
- En una pieza de 1080, el borde del cuadrado del lockup mide 2 px (`guide/03`, 3.4). El archivo lo
  trae a 1/52 A, que es 1 px en pantalla, así que en la copia cambia el `<rect>` del borde:
  `stroke-width` 2000 / A, `x` e `y` la mitad del trazo, el lado 1000 menos el trazo y `rx` 230
  menos medio trazo. Las plantillas ya lo traen a 52, 56 y 120 px.
- Nunca se rearma con CSS (la i en un recuadro y «iris agents» en DM Serif como texto) ni se tocan
  sus trazados.

### Construcción del lockup

Las medidas son las del capítulo 03 del manual (`guide/03-logo-e-icono.md`, 3.4) y ya están
dibujadas en `logo/lockup.svg`. A es el lado del ícono:

| Medida | Valor |
|---|---|
| Radio del cuadrado | 0,23 A |
| Cuerpo de la i | 0,81 A |
| Aire bajo la i (la sube al centro óptico) | 0,077 A |
| Cuerpo del logotipo | 0,77 A |
| Separación entre ícono y palabra | 0,27 A |

**Sobre fondo negro**, el cuadrado lleva un borde en `--border-default` (1 px en pantalla, 2 px en
una pieza de 1080), porque si no se pierde contra un fondo del mismo negro.

### Área de resguardo

Es la del capítulo 03 del manual (`guide/03-logo-e-icono.md`, 3.5):

- **Alrededor del ícono o del lockup:** A/2 de cada lado. En un lockup de 56 px son 28 px; en el
  de 120 del cierre del carrusel, 60.
- **Alrededor de la marca sola:** 1x de cada lado, con x el alto de la x itálica, 0,496 del cuerpo
  (casi medio cuerpo): a 40 px de cuerpo, 20 px.
- No aplica al ícono como archivo a sangre, como la foto de perfil: ahí el ícono es todo el espacio.

En esa franja no entra nada: ni texto, ni otro logo, ni el borde de la pieza. Todas las plantillas
la cumplen.

### Fondos

| Fondo | Logotipo | Ícono |
|---|---|---|
| Oscuro (`--bg-canvas` y los demás neutros del oscuro) | `--brand-white` | Su cuadrado negro, con el borde `--border-default` |
| Claro (#FAFAF9) | `--brand-black` | Su cuadrado negro, siempre: también sobre claro |
| Foto, color de estado o degradé fuerte | No va | No va |

### El nombre escrito en un texto

- **En texto corrido** se escribe «iris», en minúscula, aunque abra la oración.
- **«Iris Agents»**, con mayúsculas, sólo como nombre formal: el nombre de la página de Facebook,
  facturas, contratos.
- **El usuario** es `@iris_agents` y **la web** es `iris-agents.com`.

### Qué no hacer

- Subrayar el logotipo o agregarle cualquier trazo o adorno.
- Usar violeta, el amarillo o el azul de Mercado Libre, su logo o el cian de Mercado Pago, en el logo o a su lado.
- Hacer juegos con el ojo: pupilas, círculos concéntricos, la i o la palabra «iris» como ojo.
- Escribir «Iris» con mayúscula, «IRIS» o «Iris Agents» en el logotipo.
- Agregarle un sufijo: «iris AI», «iris agents AI», «iris.ai».
- Cambiarle la fuente, el peso o el espaciado, poner el logotipo en Plex o usar una itálica falsa.
- Tipear el logotipo o la i del ícono, también en una plantilla, un banner o una portada: va el SVG
  de `logo/` (ver «El logo va siempre como SVG»).
- Ponerle sombras, glow, glass o contorno.
- Deformarlo: estirarlo, comprimirlo, rotarlo, inclinarlo más o separar el ícono de la palabra.
- Hornear esquinas redondeadas en el archivo del ícono o del avatar: va cuadrado, a sangre, y la red
  pone su máscara. El radio existe sólo en el cuadrado del lockup, y ya viene en `logo/lockup.svg`.
- Cambiarle el color: el logotipo nunca va en gris, en un color de estado, en petróleo ni en degradé.
- Ponerle al lado robots, cerebros, destellos ✨, chispas o emojis.

---

## 4. Mercado Libre

> Las reglas completas están en el capítulo 12 del manual (`guide/12-mercado-libre.md`). Mercado
> Libre se nombra como un hecho, nunca como protagonista.

- **No va en titulares.** El titular decidido es «Agentes expertos / a cargo de tu e-commerce.». No:
  «a cargo de tu Mercado Libre.» Tampoco «expertos» pegado a «Mercado Libre»: evoca su programa
  «Experto Certificado».
- **En la bio y en el «Acerca de» sí, como un hecho:** «tu cuenta de Mercado Libre», «para vendedores
  de Mercado Libre». iris siempre se ve más que Mercado Libre. El nombre de la cuenta nunca lo lleva.
- **En una pieza orgánica puede ir arriba, como la línea de contexto:** «Para vendedores de Mercado
  Libre», con la letra del eyebrow de arriba (Plex Sans 500, mayúsculas por CSS, tracking +0,08em,
  en `--text-primary`) y, si la hay, la cuenta regresiva a la derecha («Faltan 3 semanas»). Entra
  en todas las plantillas que tienen línea de contexto (medido el 2026-10-11, con Chrome):
  - En el intercambio y en el feed de La trastienda (28 px, caja de 936): ocupa 598 px, y con
    «Faltan 3 semanas» al lado, 915. A su lado el cuándo va hasta 15 caracteres de texto ancho: con
    16, la línea pasa 18 px el margen. Sobre la foto de ejemplo de La trastienda da 15,16:1.
  - En la portada de La trastienda (24 px, caja de 904) entra aun con el cuándo al máximo: 821 px.
  - En el eyebrow de las plantillas de siempre entra en un renglón: 598 px a 28 en el feed 4:5,
    555 a 26 en el cuadrado, 640 a 30 en la story y 512 a 24 en la portada del carrusel. Pasa los
    30 (24 en el carrusel) caracteres del slot: es la única excepción a ese máximo.
- **Sus límites:** nunca en el titular, nunca con el logo de Mercado Libre, su amarillo ni su azul,
  nunca en pauta (los avisos pagos) y siempre con iris más visible: el lockup de la pieza pesa más
  que la línea de contexto. Los banners y las portadas (LinkedIn, Facebook) siguen sin Mercado
  Libre: ahí va en el «Acerca de».
- **También puede ir como dato chico**, si hace falta, en texto `--text-tertiary` y en Plex 400. Sí:
  «Para vendedores de Mercado Libre.» Va, por ejemplo, en el slot `dato` del cierre del carrusel.
- **Se escribe «Mercado Libre»**, en dos palabras y con mayúsculas. En público nunca va
  «MercadoLibre», «MeLi», «ML» ni «Mercadolibre».
- **Nunca digas que iris es «partner», «oficial», «certificado», «aliado» o «integración oficial»**
  de Mercado Libre.
- **Nunca uses su logo, su amarillo** (#FFE600 y parecidos), **su azul** (#3483FA), **el cian de
  Mercado Pago** ni capturas de su interfaz.

---

## 5. Las plantillas

### Los tres registros

Los posts se arman sobre el mismo sistema en tres registros. **Cada post usa uno solo**: no se
mezcla el intercambio con la foto, ni la foto con las piezas de producto.

| Registro | Cuándo va | La imagen | Plantillas | El sello |
|---|---|---|---|---|
| **Pregunta y cifra** | La base: los posts, las stories y los carruseles. | El intercambio: la pregunta con su cursor, la línea «tool · estado» y la cifra grande. También las piezas de producto (la tarjeta, el feed). | `intercambio/`, y las de siempre: `feed-4x5/`, `cuadrado/`, `story/` y `carrusel/` | Petróleo, en el titular cuando la pieza lo lleva (una portada, un cierre). El intercambio va sin titular: si el post lleva titular, va en otra lámina. |
| **En vivo** | Los reels. | La secuencia del intercambio en el tiempo: la pregunta que se tipea → ◐ trabajando → la respuesta → el OK, sin titular. El reel cierra con un cuadro aparte: el titular de dos líneas con el sello y el lockup. | No hay plantilla de video en este repo, ni del cuadro de cierre. `intercambio/intercambio-story.html` sirve de portada y muestra el intercambio completo, que es como termina la secuencia antes del cierre; los tiempos y el movimiento están en el manual (capítulo 06, «Movimiento en piezas de video»). | Petróleo, en el cuadro de cierre, con el lockup. El cursor va en tinta. |
| **La trastienda** | Campañas y fechas. | Una foto oscura y quieta del mundo del vendedor. | `trastienda/` (feed y portada de carrusel; las láminas que siguen son las del carrusel de siempre) | Petróleo, el mismo de los otros dos, sin textura. |

**El video** de En vivo es vertical, de 1080 × 1920 (además del 1920 × 1080 de las demos). Una pieza
animada en HTML, con `prefers-reduced-motion`, queda quieta en su cuadro final.

**El intercambio va sin titular.** El sello nunca comparte la imagen con la pregunta y la cifra: si
el post lleva titular, va en otra lámina (la portada o el cierre de un carrusel). En un reel de En
vivo la secuencia del intercambio va sin titular, y el reel cierra con un cuadro aparte que lleva el
titular de dos líneas, con el sello petróleo, y el lockup. Ese cuadro sigue las zonas de la story: el
titular y el lockup van entre y = 285 e y = 1248, porque en un reel lo de abajo lo tapa la leyenda.

### Qué imagen lleva una pieza

La imagen de iris son sus **piezas propias**, dibujadas como en la app:

- **El feed «Hoy en tu cuenta».** Cada fila es un resultado con su glifo de estado, sin el nombre
  del agente (ver `guide/09-voz-y-tono.md`, 9.3).
  - Empieza con mayúscula y no lleva punto. El verbo dice el estado: «Reponer Mochila urbana 22 L»
    (te toca: lo que propone), «Revisa el precio del ganador» (trabajando), «Contestó 40 preguntas»
    (resuelto), «No pudo activar una promoción» (falló).
  - Lo que cambió (la cifra o el objeto) va dentro de `<b>`, en Plex 500 y `--text-primary`; el
    resto de la oración va en `--text-secondary`. Así: «Contestó **40 preguntas**».
  - A la derecha va la píldora «Espera tu OK» (sólo en te toca) o «en curso» (sólo en trabajando,
    en Plex). Las demás filas no llevan nada, ni hora: el «hoy» lo da el título del panel.
  - Va primero lo que te toca, después lo que falló, lo que está en curso y lo resuelto.
  - Hasta 4 filas, y abajo la leyenda. La portada de Facebook lleva 5, todas resueltas y sin
    leyenda: es el mismo panel del banner de LinkedIn.
- **La tarjeta de aprobación.**
  - Arriba, el antetítulo «Propuesta» y la píldora «Espera tu OK». No va el nombre del agente.
  - El título es la acción, con verbo y objeto.
  - Debajo, «lo que va a hacer», con dos cifras (antes → después) y cuándo se leyó el dato.
  - Los botones son «Aprobar», con borde de tinta y sin relleno (el foco es la firma y lo que dice
    la pieza), y «Rechazar con motivo», en ghost. Esos dos textos no se cambian.
- **El intercambio** (registro Pregunta y cifra). La conversación con iris, sin burbuja de chat: lo
  que escribe el dueño termina en un cursor y lo que contesta iris empieza con la línea «tool ·
  estado». Va sin titular. De arriba abajo:
  - La línea de contexto, en tinta. En un post orgánico puede ser «Para vendedores de Mercado
    Libre» (sección 4).
  - La pregunta del dueño, en sus palabras y con minúscula inicial, como se tipea: Plex 500 al tamaño
    de un titular, terminada en el cursor (una barra fina en tinta, que no se borra).
  - La línea «tool · estado»: la ✓ gris, el nombre real de la tool en mono, «listo» y la hora, en
    `--text-tertiary` y a 26–30 px.
  - La cifra grande, lo más grande de la pieza, con su unidad al lado («**6.100** por venta.»), y
    debajo dos filas de contexto (la etiqueta en `--text-secondary`, el valor en `--text-primary` 500).
  - El OK, sólo si la respuesta termina en una decisión del dueño: el ● de «te toca» como objeto (de
    hasta 48 px) y su palabra, «¿La bajo? Espera tu OK.». Si no hay nada que decidir, no va: el ●
    nunca va sin decisión.
- **La foto de La trastienda.** Oscura y quieta, del mundo del vendedor: cajas, kraft, una persiana.
  - Sin personas, sin logos ni marcas, sin el packaging de Mercado Libre y sin productos de clientes
    reales.
  - Si es generada con IA, lo dice en chico, en `--text-tertiary`: «Imagen generada con IA.».
  - El texto que cae sobre la foto pasa 4,5:1 contra lo que tiene detrás, medido en la PNG (sección 7).
  - El logo nunca va sobre la foto: va en el negro liso.

**No entran en ninguna pieza:** fotos de stock (la única foto es la de La trastienda, con sus
reglas), burbujas de chat, robots, cerebros, destellos ✨, emojis, mockups de teléfonos, capturas de
cuentas reales, gradientes llamativos, glow, glass ni sombras.

**Los glifos ● y ◐ como objeto** (en el intercambio, en un reel) van de hasta 48 px y siempre con su
palabra al lado.

### Cómo están hechas

- **Archivos que acompañan a cada HTML.** Cada `.html` tiene al lado su `.png` limpio y su
  `-guias.png`. Las excepciones están en la tabla.
- **Las guías.** Se ven sólo si la URL lleva `?guias`: son líneas punteadas en magenta (#FF2D95).
  El magenta no es un color de marca y nunca sale en la pieza limpia.
- **Qué se edita.** Cada texto editable tiene `data-slot="nombre"` y, arriba, un comentario
  `<!-- EDITAR: … máximo N caracteres -->`. Lo que no tiene `data-slot` no se toca.
- **La foto** de La trastienda es un `<img data-slot="foto">`: se cambia el `src`. La de ejemplo
  (`trastienda/foto-ejemplo.jpg`) es un dibujo hecho por script (`foto-ejemplo.py`), no una foto ni
  una imagen de IA: por eso su nota dice «Imagen de ejemplo.».
- **Las cifras inventadas** llevan `<!-- EJEMPLO -->` o `data-ejemplo` en el HTML.
  - En las plantillas que tienen el slot `nota`, se muestra además «Datos de ejemplo.» en la pieza.
    En el carrusel interior la nota va en el pie, a la izquierda del contador.
  - La portada de Facebook no lleva nota visible: es una portada, no un post, y sus cifras de
    ejemplo quedan marcadas sólo en el HTML.

**Los slots de las filas del feed.** Para no repetir, la tabla los abrevia así:
- `fila-N-accion` es la fila entera: el resultado, con lo que cambió dentro de `<b>`. Es el único
  slot que lleva una etiqueta adentro. El largo cuenta también lo que va en `<b>`.
- El estado de cada fila se cambia en la clase y en el `href` del `<svg>`, que tienen que ser
  iguales. La píldora y «en curso» no son slots: se copian de la fila de ejemplo.

### La tabla

Todas las rutas son desde la raíz del repo `iris-brand`. En la tabla
cada ruta va completa.

| Archivo | Formato y uso | Tamaño (px) | Zonas seguras | Slots editables (máximo de caracteres) |
|---|---|---|---|---|
| `pieces/redes/perfil/perfil.html` → `perfil-1080.png`, `perfil-guias.png`; la vista en chico sale de `perfil-preview.html` → `perfil-preview-circulos.png` | Foto de perfil de Instagram, Facebook y WhatsApp: el ícono a sangre. | 1080 × 1080 | Las redes recortan el círculo inscripto (radio 540). La i entra en el círculo de radio 432 (el 80 %). | Ninguno: **no se edita**. La i es `logo/icon-profile.svg` en línea: su tamaño y su posición están medidos. |
| `pieces/redes/facebook/portada.html` → `portada.png`, `portada-guias.png` | Portada de la página de Facebook, en una sola versión. | 1640 × 624 | En escritorio se ve entera (a 820 × 312). En el celular, sólo la franja x 266–1374. La foto de perfil tapa x 0–660, y 420–624. El contenido va en x 294–1346 y empieza a 40 px de arriba. Texto de 22 px o más. | `titular-linea-1` 18 · `titular-linea-2` 23 de texto ancho (el sello termina antes de x 763 y quedan 40 px hasta el panel) · `panel-titulo` 22 · `fila-1..5-accion` 36. Las cinco filas van resueltas (✓), sin hora y sin leyenda, como el banner de LinkedIn. |
| `pieces/redes/plantillas/feed-4x5/feed-4x5-titular.html` | Post de feed 4:5 con titular grande y bajada. **El formato de Instagram.** | 1080 × 1350 | Margen de 72 px. La grilla 3:4 del perfil recorta 34 px por lado. | `eyebrow` 30 (o «Para vendedores de Mercado Libre», 32, en un renglón) · `titular-linea-1` 28 (hasta 2 renglones) · `titular-linea-2` 28 (hasta 2 renglones, sin números) · `bajada` 110 (hasta 3 renglones) |
| `pieces/redes/plantillas/feed-4x5/feed-4x5-pieza.html` | Post de feed 4:5 con titular corto y la tarjeta de aprobación. | 1080 × 1350 | Margen de 72 px. La grilla 3:4 recorta 34 px por lado. | `titular-linea-1` 22 (1 renglón) · `titular-linea-2` 22 (sin números) · `aprobacion-antetitulo` 28 («Propuesta») · `aprobacion-titulo` 30 · `dato-1-etiqueta` 24 · `dato-1-valor` 13 · `dato-2-etiqueta` 24 · `dato-2-valor` 13 · `dato-3-dia` («hoy» o «ayer», en Plex) · `dato-3-hora` (HH:MM, en mono) · `nota` 40 |
| `pieces/redes/plantillas/cuadrado/cuadrado-titular.html` | Post cuadrado con titular y bajada. **Para Facebook**: en Instagram la grilla lo recorta. | 1080 × 1080 | Margen de 72 px. La grilla 3:4 de Instagram recorta 135 px por lado y corta el titular en la vista previa. | `eyebrow` 30 (o «Para vendedores de Mercado Libre», 32, en un renglón) · `titular-linea-1` 28 (hasta 2 renglones) · `titular-linea-2` 28 (hasta 2 renglones, sin números) · `bajada` 110 (hasta 3 renglones) |
| `pieces/redes/plantillas/cuadrado/cuadrado-pieza.html` | Post cuadrado con el feed «Hoy en tu cuenta», de 2 a 3 filas. **Para Facebook.** | 1080 × 1080 | Igual que el cuadrado con titular. | `titular-linea-1` 24 (1 renglón) · `titular-linea-2` 24 (sin números) · `fila-1-accion` 29 (lleva la píldora) · `fila-2..3-accion` 41 (sin nada a la derecha; 35 si llevan «en curso») · `nota` 40 |
| `pieces/redes/plantillas/story/story-titular.html` | Story y portada de reel, con titular y bajada. | 1080 × 1920 | Story: 250 px arriba, 340 abajo y 64 por lado. Lo importante va entre y = 285 e y = 1248 (en un reel, Meta pide dejar libre el 14 % de arriba, el 35 % de abajo y el 6 % por lado). La bajada termina en x = 950. El pie va hasta y = 1580; en un reel lo tapa la leyenda. | `eyebrow` 30 (o «Para vendedores de Mercado Libre», 32, en un renglón) · `titular-linea-1` 28 (hasta 2 renglones) · `titular-linea-2` 28 (hasta 2 renglones, sin números) · `bajada` 110 (hasta 3 renglones) |
| `pieces/redes/plantillas/story/story-pieza.html` | Story y portada de reel con el feed, de 3 a 4 filas. | 1080 × 1920 | Las mismas que la story con titular. | `titular-linea-1` 22 (1 renglón) · `titular-linea-2` 22 (sin números) · `fila-1-accion` 29 (lleva la píldora) · `fila-2-accion` 41 · `fila-3-accion` 35 (lleva «en curso») · `fila-4-accion` 41 · `nota` 40 |
| `pieces/redes/plantillas/carrusel/carrusel-1-portada.html` | Carrusel 4:5, lámina 1: la portada. | 1080 × 1350 | Margen de 88 px (el mínimo es 72). La grilla 3:4 recorta 34 px por lado. Arriba a la derecha quedan 200 × 150 px vacíos para el contador de fotos de Instagram (medida estimada). | `eyebrow` 24 (o «Para vendedores de Mercado Libre», 32, en un renglón) · `titular-linea-1` 30 (hasta 2 renglones) · `titular-linea-2` 28 (hasta 2 renglones; con 16 entra en 1; termina en punto) · `contador` («1/3») |
| `pieces/redes/plantillas/carrusel/carrusel-2-interior.html` | Carrusel, lámina interior: una por punto o paso, y se repite. | 1080 × 1350 | Margen de 88 px. Arriba a la derecha, 200 × 150 px vacíos. | `marcador` («01») · `titulo` 36 (hasta 2 renglones, sin firma) · `texto` 140 (3 renglones) · `pieza`: la tarjeta, el feed del `<template id="pieza-feed">` (sus filas no son slots: 37 caracteres con píldora, 43 con «en curso» y 51 sin nada) o nada · `aprobacion-antetitulo` 38 («Propuesta») · `aprobacion-titulo` 30 · `aprobacion-concepto-1` 24 · `aprobacion-cifra-1` 12 · `aprobacion-concepto-2` 24 · `aprobacion-cifra-2` 12 · `aprobacion-leido` 14 · `nota` 40 (en el pie; vacía si la lámina va sin pieza) · `contador` |
| `pieces/redes/plantillas/carrusel/carrusel-3-cierre.html` | Carrusel, última lámina: el cierre con el llamado. | 1080 × 1350 | Margen de 88 px. Arriba a la derecha, 200 × 150 px vacíos. | `cta-linea-1` 28 (hasta 2 renglones; una dirección o un @ van dentro de `<span class="sin-corte">`) · `cta-linea-2` 22 (1 renglón) · `dato` 44 (acá sí puede ir «Mercado Libre») · `contador` |
| `pieces/redes/plantillas/intercambio/intercambio-feed.html` | Post de feed 4:5 del registro Pregunta y cifra: el intercambio como imagen, sin titular. Siempre sobre el negro. | 1080 × 1350 | Margen de 72 px. La grilla 3:4 del perfil recorta 34 px por lado. | `contexto` 26 de texto ancho, o «Para vendedores de Mercado Libre» (32) · `contexto-cuando` 16 (15 de texto ancho al lado de «Para vendedores de Mercado Libre»; vacío si no hay una fecha real) · `pregunta` 60 (hasta 3 renglones; minúscula inicial; el cursor va pegado y no se borra) · `tool` 36 (en mono, el nombre real) · `tool-hora` (HH:MM) · `cifra` 6 (con el punto de miles y el signo) · `cifra-unidad` 34 (termina en punto; va al lado de la cifra si la cifra tiene hasta 5 caracteres y la unidad unos 10, si no baja sola) · `fila-1..2-etiqueta` 30 · `fila-1..2-valor` 18 · `ok-pregunta` 26 (sólo si hay una decisión; si no, se borra el `<p class="ok">` entero) · `nota` 40 |
| `pieces/redes/plantillas/intercambio/intercambio-story.html` | Story y portada de reel con el intercambio. También es el último cuadro, quieto, de la secuencia de un reel de En vivo; el reel cierra después con el cuadro del titular. | 1080 × 1920 | Las mismas que la story con titular: lo importante entre y = 285 e y = 1248; el pie, hasta y = 1580. | Los mismos que el feed, con los mismos largos: con todos al máximo, la nota termina justo en y = 1248. |
| `pieces/redes/plantillas/trastienda/trastienda-feed.html` | Post de feed 4:5 del registro La trastienda, para campañas y fechas: la foto arriba, el titular con el sello y una bajada. | 1080 × 1350 | Margen de 72 px. La grilla 3:4 recorta 34 px por lado. La foto ocupa y 0–820 a sangre y se funde con el negro en sus 300 px de abajo: el contexto y el titular caen sobre ella y pasan 4,5:1. La nota de la foto y el pie van en el negro liso. | `foto` (1080 × 820 o más grande en la misma proporción; se recorta al centro) · `contexto` 26 de texto ancho, o «Para vendedores de Mercado Libre» (32) · `contexto-cuando` 16 (15 de texto ancho al lado de «Para vendedores de Mercado Libre») · `titular-linea-1` 19 (1 renglón) · `titular-linea-2` 38 (hasta 2 renglones; con 19 entra en 1, y mejor en 1) · `bajada` 86 (hasta 2 renglones) · `foto-nota` 40 («Imagen generada con IA.» si lo es; si es una foto propia, se borra) |
| `pieces/redes/plantillas/trastienda/trastienda-portada.html` | Carrusel 4:5 del registro La trastienda, lámina 1: la portada con la foto. Las láminas que siguen son `carrusel-2-interior` y `carrusel-3-cierre`, sobre el negro. Usa `carrusel.css`. | 1080 × 1350 | Margen de 88 px. La grilla 3:4 recorta 34 px por lado. Arriba a la derecha, 200 × 150 px vacíos. La foto va en y 172–892, debajo del lockup y de su resguardo, y se funde con el negro 120 px arriba y 280 abajo: de y 0 a 172 no hay nada de la foto. | `foto` (caja de 1080 × 720; sirve la misma del feed) · `contexto` 26 de texto ancho, o «Para vendedores de Mercado Libre» (32), que entra aun con el cuándo al máximo · `contexto-cuando` 16 · `titular-linea-1` 17 (1 renglón) · `titular-linea-2` 30 (hasta 2 renglones; con 18 entra en 1, y mejor en 1) · `foto-nota` 40 · `contador` («1/3») |
| `pieces/redes/instagram/destacadas/destacada-{demo,casos,precios,ayuda,como-funciona,novedades,permisos}.html` → la vista de las siete juntas en `destacadas-preview.html` y `.png` | Portadas de historias destacadas de Instagram: un pictograma de trazo sobre negro, sin texto. | 1080 × 1920 | Instagram recorta un círculo de Ø1080 centrado en (540, 960). La zona segura es un círculo de Ø720. La caja del pictograma mide 528 px (492 en Demo, para que pese lo mismo que las otras), con un máximo de 560. | `pictograma`: un SVG de trazo en grilla de 24 × 24, dibujado entre 2 y 22. Sin `stroke-width` (el trazo de 30 px lo fija `destacada.css`). Los puntos llenos llevan `class="dot"`. |

### Avisos de cada formato

- **Carrusel:** el lockup y el pie de cada lámina no se tocan.
- **Un post, un registro.** El intercambio no lleva titular de dos líneas, foto ni piezas de
  producto; La trastienda no lleva el intercambio ni piezas de producto.
- **La trastienda, con otra foto:** el texto que cae sobre la foto se vuelve a medir (sección 7).
  Si no pasa 4,5:1, se cambia o se oscurece la foto; el texto no se mueve ni cambia de color.
- **Largos máximos:** en todas las plantillas y en la portada de Facebook están medidos con un
  texto ancho a propósito (muchas m, ñ, o, d), así que un texto común siempre entra. En las filas
  del feed se midió además con todo en `<b>` salvo la primera palabra, que es lo más ancho.

### De dónde salen las medidas

Las leyeron el 2026-10-10 los agentes que hicieron cada plantilla.

- **Perfil.** El recorte en círculo es el de las tres redes. El 80 % es una regla de marca, no de
  las redes.
- **Portada de Facebook:**
  - Los círculos de 176 y 196 px de la foto de perfil salen de la ayuda de Facebook,
    https://www.facebook.com/help/125379114252045.
  - La vista de 820 × 312 y 640 × 360 sale de https://outfeed.ai/blog/facebook-cover-photo-size/
    y de https://postfa.st/sizes/facebook/cover.
  - Los 96 px que sube la foto de perfil en escritorio salen de
    https://contentstudio.io/blog/facebook-cover-photo-size.
  - El recorte centrado en el celular sale de https://socialsizes.io/facebook-cover-photo-size/.
  - **Ojo:** la ayuda oficial de hoy habla de un recorte alineado a la izquierda. Franco tiene que
    subir la portada y compararla con `portada-guias.png`.
- **Grilla 3:4 del perfil de Instagram** (desde enero de 2025):
  https://help.hopperhq.com/en/articles/10907941-instagram-s-vertical-grid y
  https://www.oktopost.com/blog/instagram-grid-size-guide/.
- **Reel:**
  - Las zonas que pide Meta (14 %, 35 % y 6 %) salen de
    https://www.facebook.com/business/ads-guide/update/video/instagram-reels.
  - Los recortes del reel en el feed y en la grilla salen de
    https://www.hopperhq.com/blog/instagram-reel-size/.
  - Los 250, 340 y 64 px de la story son un pedido de marca.
- **Feed y carrusel.** El margen de 72 px es un pedido de marca. El contador de fotos de Instagram
  (200 × 150 px) es una estimación sin fuente oficial.
- **Destacadas.** Instagram no publica cuánto recorta. Se eligió la medida más estricta de
  https://www.elev8or.io/blog/engage/instagram-highlight-covers y de
  https://instasize.com/size-guides/instagram/highlight-cover.

---

## 6. Cómo se renderiza

Cada PNG sale de su HTML con `pieces/redes/_base/render.sh`. Hace falta Google Chrome en
`/Applications` e internet para las fuentes (`brand.css` las carga de Google Fonts), y tarda unos
2 s por imagen. La salida va en ruta absoluta, y la versión con guías es el mismo HTML con `?guias`:

```sh
pieces/redes/_base/render.sh <pieza.html> <ancho> <alto> <salida.png>
pieces/redes/_base/render.sh "<pieza.html>?guias" <ancho> <alto> <salida-guias.png>
```

El `?guias` va entre comillas, porque si no la terminal lo interpreta.

El tamaño va según el formato:

| Formato | Ancho | Alto |
|---|---|---|
| Feed 4:5 y carrusel | 1080 | 1350 |
| Cuadrado y perfil | 1080 | 1080 |
| Story, reel y destacadas | 1080 | 1920 |
| Portada de Facebook | 1640 | 624 |

Las plantillas en sí no se renderizan a mano: `pieces/redes/_base/render-all.sh` regenera todas
las PNG de `_base/piezas.tsv` (por ejemplo, cuando cambian los colores de estado). Una pieza nueva
no está en esa lista: se renderiza con `render.sh`.

### Una pieza fuera de la carpeta de su plantilla

Las plantillas enlazan sus estilos con rutas relativas (`../../_base/brand.css`,
`../_comun/plantilla.css`, `carrusel.css`, `carrusel-guias.js`): una copia en otra carpeta los
pierde y sale sin las fuentes ni los colores. Con `--plantilla <carpeta>`, `render.sh` renderiza
una copia temporal de la pieza con `<base href="file://<carpeta>/">` agregado en el `<head>`, y las
rutas relativas resuelven contra la carpeta de la plantilla de la que salió la pieza. Sin
`--plantilla`, renderiza el archivo tal cual.

Desde un proyecto que instaló el paquete, que trae `pieces/`:

```sh
PLANTILLAS="$PWD/node_modules/iris-brand/pieces/redes/plantillas"
RENDER=node_modules/iris-brand/pieces/redes/_base/render.sh
cp "$PLANTILLAS/feed-4x5/feed-4x5-titular.html" posts/2026-10-12-preguntas.html
# ... editar los data-slot de posts/2026-10-12-preguntas.html ...
"$RENDER" --plantilla "$PLANTILLAS/feed-4x5" posts/2026-10-12-preguntas.html 1080 1350 "$PWD/posts/2026-10-12-preguntas.png"
"$RENDER" --plantilla "$PLANTILLAS/feed-4x5" "posts/2026-10-12-preguntas.html?guias" 1080 1350 "$PWD/posts/2026-10-12-preguntas-guias.png"
```

- `--plantilla` va primero, antes de la pieza.
- Una ruta relativa que agregue la pieza, como una imagen propia, también resuelve contra la
  carpeta de la plantilla: va en ruta absoluta.

---

## 7. Cómo se revisa una PNG

Se miran las dos imágenes, la limpia y la de guías:

- Que ningún texto quede cortado ni pase de sus renglones.
- Que nada importante cruce una línea magenta.
- Que las fuentes sean las de la marca: si la segunda línea del titular no sale en serif itálica,
  cargó la de reserva.

Los píxeles se miden con Python, Pillow y numpy (`pip install pillow numpy`). La tinta tiene que
caer dentro de la zona segura de la tabla de la sección 5, y la versión limpia tiene que dar
`magenta 0`:

```python
import sys
import numpy as np
from PIL import Image

imagen = np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(int)
fondo = np.array([10, 10, 9])  # --bg-canvas
tinta = np.abs(imagen - fondo).sum(axis=-1) > 48
filas, columnas = np.where(tinta)
rojo, verde, azul = imagen[..., 0], imagen[..., 1], imagen[..., 2]
magenta = ((rojo > 200) & (verde < 90) & (azul > 110) & (azul < 190)).sum()
alto, ancho = tinta.shape
print(f'{ancho}×{alto} · tinta x {columnas.min()}–{columnas.max()} · y {filas.min()}–{filas.max()} · magenta {magenta}')
```

Por ejemplo, el feed 4:5 con margen de 72 tiene que dar x 72–1008 e y 72–1278 o menos. En la
story, la tinta llega hasta y = 1580 porque ahí va el pie. En La trastienda la foto va a sangre, así
que la tinta toca los bordes: ahí el margen se mira en la `-guias.png`.

### El texto sobre la foto de La trastienda

Tiene que pasar 4,5:1 contra lo más claro que tenga detrás. Se mide así:

1. Se renderiza una copia de la pieza con el texto transparente: en el `<head>`, después de los
   estilos, `<style>* { color: transparent !important; }</style>`.
2. En esa PNG se toma la caja de cada texto que cae sobre la foto (el contexto, la línea 1 del
   titular) y se busca el píxel más claro.
3. Se calcula el contraste WCAG del color del texto contra ese píxel:

```python
import sys
import numpy as np
from PIL import Image

# Uso: python3 contraste.py <png-sin-texto> <x0> <y0> <x1> <y1> <hex del texto>
def luminance(rgb):
    channel = rgb / 255
    linear = np.where(channel <= 0.04045, channel / 12.92, ((channel + 0.055) / 1.055) ** 2.4)
    return linear @ np.array([0.2126, 0.7152, 0.0722])

background = np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(float)
left, top, right, bottom = map(int, sys.argv[2:6])
text = luminance(np.array([int(sys.argv[6][i:i + 2], 16) for i in (1, 3, 5)], dtype=float))
behind = luminance(background[top:bottom, left:right].reshape(-1, 3)).max()
print(f'peor contraste {(max(text, behind) + 0.05) / (min(text, behind) + 0.05):.2f}:1')
```

Con la foto de ejemplo y todos los textos al máximo, el peor caso es el «cuándo» del feed, arriba a
la derecha, donde la foto tiene su luz: 13,91:1. El resto del texto sobre la foto da de 15,16:1 a
16,79:1, y la letra del sello, sobre su bloque, 11,87:1.

### Lista de control

- [ ] El post usa un solo registro: Pregunta y cifra, En vivo o La trastienda.
- [ ] El intercambio va sin titular: si el post lo lleva, va en otra lámina, y en un reel, en el
  cuadro de cierre, con el sello y el lockup.
- [ ] La firma va sólo en la segunda línea del titular, y el logo es el SVG de `logo/` en línea:
  no está tipeado ni rearmado, y sus trazados no se tocaron.
- [ ] La segunda línea va en el sello petróleo (`.sello`, la letra en tinta), y el petróleo no
  aparece en ningún otro lugar: ni de fondo, ni en una franja, un texto, un borde o un botón.
  «Aprobar» va con borde, sin relleno.
- [ ] No hay cartón ni texturas, verde claro, rosa ni violeta (tampoco en el cursor), ni los colores
  de Mercado Libre o Mercado Pago.
- [ ] No hay burbujas de chat: la persona se marca con el cursor y la respuesta empieza con la línea
  «tool · estado», a 26–30 px y con el nombre real de la tool.
- [ ] La línea de contexto va en tinta.
- [ ] Si hay luz radial, es una sola, blanca, de hasta el 6 % y detrás del punto focal.
- [ ] En La trastienda: la foto no tiene personas, marcas, el packaging de Mercado Libre ni
  productos de clientes; si es de IA lo dice («Imagen generada con IA.»); el texto encima pasa
  4,5:1 medido en la PNG, y el logo va en el negro.
- [ ] «Mercado Libre» no va en el titular, junto al logo ni en una pieza de pauta. Arriba va sólo
  en la línea de contexto de un post orgánico («Para vendedores de Mercado Libre», en dos palabras),
  en tinta, sin su logo, su amarillo ni su azul, y con iris más visible. En los banners y las
  portadas de LinkedIn y Facebook no va.
- [ ] Cada glifo tiene su palabra o su leyenda, y la leyenda nombra sólo los estados que
  aparecen (un panel con todas las filas resueltas va sin leyenda). Un ● o un ◐ como objeto mide
  hasta 48 px, y el ● va sólo si hay una decisión del dueño.
- [ ] Lo que te toca va primero en el feed.
- [ ] Ninguna fila ni tarjeta nombra un agente (Cliente, Producto, Vendedor): cada fila dice el
  resultado, con lo que cambió en `<b>`.
- [ ] Las cifras inventadas están marcadas, y no hay ningún dato real. La única excepción es un
  testimonio con consentimiento escrito guardado (guide/09, 9.10).
- [ ] La `-guias.png` es para revisar: nunca se publica.
