# Especificación de las plantillas de redes

Cómo están hechas las plantillas de `pieces/redes/`: las variables y las clases de
`_base/brand.css` que usan, cómo va el logo en una pieza y, de cada plantilla, su formato, los
slots con sus largos máximos, cómo se renderiza y cómo se revisa. Lo que cumple toda pieza de redes
está en el manual (`guide/`), y una pieza sin plantilla se arma con el capítulo 11 (11.14). Las
medidas de cada formato (el lienzo, el margen o la zona segura, lo que tapa o recorta cada red y el
tamaño mínimo de la letra) están en `_base/formatos.json`. Cómo se escribe y se publica un post no
está acá: es oficio de contenido y vive fuera de este repo.

- **Los valores mandan en el CSS.** Si esta especificación y `pieces/redes/_base/brand.css`
  dicen cosas distintas, vale `brand.css`.
- **Las plantillas mandan en el HTML.** Los largos máximos de cada texto están en el comentario
  `<!-- EDITAR -->` de cada plantilla. Esta especificación los copia, pero si no coinciden vale el
  HTML.

Redactada el 2026-10-10 y revisada el mismo día contra los archivos reales (rutas, tamaños y slots).

---

## 1. Color

Las reglas son las del capítulo 04 del manual: los roles y para qué es cada uno (4.2), qué texto
va en cada gris (4.5), los cinco estados (4.6), lo prohibido (4.8) y el petróleo, sólo en el sello,
con lo descartado (4.9). Acá, cómo lo usan las plantillas.

- Cada color es una variable de `_base/brand.css` con el nombre de su token y guiones:
  `text.secondary` es `--text-secondary`. Una pieza usa siempre la variable
  (`var(--text-primary)`), nunca el hex suelto.
- Las dos del sello se llaman como `signature.marketing` de los tokens:
  `--signature-marketing-block` (el bloque petróleo) y `--signature-marketing-text` (la firma en
  tinta). En los tokens, `signature-block` y `signature-text` son el sello de tinta de la app, que
  estas piezas no usan.

| Variable | Dónde la usan las plantillas |
|---|---|
| `--brand-black` | El cuadrado del ícono y el fondo de la foto de perfil. |
| `--brand-white` | El logotipo y la i del ícono, sobre el negro. |
| `--bg-canvas` | El fondo de toda pieza: es el mismo negro de marca. |
| `--bg-surface` | El panel del feed «Hoy en tu cuenta». |
| `--bg-raised` | La tarjeta de aprobación, un nivel arriba del panel. |
| `--bg-hover` · `--bg-selected` | Ninguna: son de la app, para una fila en hover o seleccionada. |
| `--border-subtle` | Los separadores entre filas y el borde del panel del feed. |
| `--border-default` | El borde de la tarjeta de aprobación, el de «Rechazar con motivo» y el del cuadrado del ícono sobre el negro. |
| `--border-control` | El borde de la píldora «Espera tu OK». |
| `--text-tertiary` | El eyebrow de adentro de una pieza de producto («Propuesta», «Hoy en tu cuenta»), las horas, el contador, `@iris_agents`, la leyenda y las notas fijas y cortas, como «Datos de ejemplo.». |
| `--text-secondary` | La bajada y el texto de cada fila del feed, menos lo que cambió. |
| `--text-primary` | La línea de contexto de arriba de todo, la primera línea del titular, lo que cambió en cada fila del feed (en `<b>`), las cifras, el título de la tarjeta y el borde y la letra de «Aprobar». |
| `--signature-marketing-block` · `--signature-marketing-text` | El sello (`.sello`), y nada más. |
| `--status-*` | El glifo de cada estado, y nada más. |

### Estados

Los glifos toman su color de las variables `--status-*` (`--status-attention`, `--status-failed`,
`--status-working`, `--status-done` y `--status-idle`). La forma, el color y las reglas de cada
estado están en el capítulo 04 (4.6); el SVG de cada glifo, para copiar, en el 08 (8.1), y las filas
del feed, en 8.2. Qué HTML dibuja cada glifo y qué se mira cuando cambia uno: `README.md`, «Los
colores de estado».

### Las excepciones a «sin gradientes»

Son las de 4.8, y las plantillas las usan así:
- La portada de Facebook lleva el degradé radial del banner de LinkedIn (blanco al 4 %): es su
  hermana.
- La luz radial de las piezas de redes (capítulo 11, 11.13) la usa
  `plantillas/intercambio/intercambio.css`, detrás de la cifra del intercambio.
- **La foto de La trastienda se funde con el negro** donde lo toca, con un `mask-image` lineal de
  `plantillas/trastienda/trastienda.css` que la apaga hacia el fondo sin sumar color: en el feed,
  los 300 px de abajo; en la portada del carrusel, 120 px arriba y 280 abajo. Cada HTML fija el
  largo en `--fundido-arriba` y `--fundido-abajo`.

---

## 2. Tipografía

Las reglas son las del capítulo 05: las tres familias y sus pesos (5.1), la firma en sus tres usos
(5.2), el titular de dos líneas y su sello (5.3), el eyebrow (5.5), los números y la flecha (5.6),
la carga (5.8) y lo prohibido (5.9). Acá, cómo las cumplen las plantillas.

- `brand.css` carga las tres familias desde Google Fonts (`--font-signature`, `--font-sans` y
  `--font-mono`): las plantillas no necesitan nada instalado, pero sin internet el navegador pone
  Georgia o la del sistema, y esa pieza no se entrega (5.8). Carga también Plex Mono 500, que no se
  usa: la mono va sólo en 400 (5.1).
- La firma es la clase `.signature`, y en una pieza va sólo en la segunda línea del titular: el
  logotipo y la i del ícono son los SVG de `logo/` (sección 3). El título de una lámina interior del
  carrusel va sin firma.
- El contador del carrusel (`1/3`) va en la mono, como las horas (`09:12`) y los nombres de tools.

### El titular de dos líneas

En las plantillas ya está armado: `<span data-slot="titular-linea-1">` y
`<span class="signature"><span class="sello" data-slot="titular-linea-2">…</span></span>` (en el
carrusel, la línea es un `<em class="signature">`). El texto se cambia adentro del sello.

- La línea 1 lleva un interlineado de 1,04 a 1,14; la línea 2, el del sello (5.3).
- El sello es `.sello`, con la receta de 5.3, y es el mismo en todas las plantillas y en los tres
  registros. Donde va la tarjeta de aprobación, «Aprobar» es `.boton-borde` (capítulo 06, 6.5).

### Tamaños mínimos

Una pieza de 1080 px no usa los doce estilos del capítulo 05, que son de la pantalla (5.4): cada
plantilla elige sus tamaños sin bajar de los mínimos de `_base/formatos.json` («minimumSizes»: uno
para las piezas de 1080 y otro para la portada de Facebook, que el celular muestra a otra escala).

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

### El eyebrow y la línea de contexto

La letra del eyebrow está en 5.5, y qué dice la línea de contexto y cuándo puede faltar, en 9.11. En
las plantillas:
- En las de siempre, la línea de contexto es el `.eyebrow` de arriba (slot `eyebrow`), que cada HTML
  pasa a tinta; en las de los registros (el intercambio y La trastienda) es `.contexto`, con el tema
  a la izquierda y, si hay una fecha real, cuándo a la derecha («Faltan 3 semanas»).
- No la llevan las de titular con pieza de producto (`feed-4x5-pieza`, `cuadrado-pieza`,
  `story-pieza`) ni el interior y el cierre del carrusel.
- Cuánto ocupa «Para vendedores de Mercado Libre» en cada una: sección 4.

### Descargas oficiales

Verificadas el 2026-10-10: todas respondieron HTTP 200.

| Familia | Google Fonts | Repo oficial | Licencia |
|---|---|---|---|
| DM Serif Display | https://fonts.google.com/specimen/DM+Serif+Display | https://github.com/googlefonts/dm-fonts | SIL OFL 1.1: https://raw.githubusercontent.com/google/fonts/main/ofl/dmserifdisplay/OFL.txt |
| IBM Plex Sans | https://fonts.google.com/specimen/IBM+Plex+Sans | https://github.com/IBM/plex (descargas: https://github.com/IBM/plex/releases) | SIL OFL 1.1: https://raw.githubusercontent.com/IBM/plex/master/LICENSE.txt |
| IBM Plex Mono | https://fonts.google.com/specimen/IBM+Plex+Mono | https://github.com/IBM/plex | la misma |

---

## 3. Logo e ícono

Las reglas son las del capítulo 03: qué pieza va dónde (3.1), el lockup y su borde (3.4), el
resguardo (3.5), los mínimos (3.6), los fondos (3.8), lo que no se hace (3.9) y los archivos
(3.10). El nombre escrito en un texto, en el capítulo 02 (2.2 y 2.3). Acá, cómo va el logo en las
plantillas.

### El logo va siempre como SVG

Nunca se tipea ni se rearma (3.10): cada pieza lleva en línea el SVG de `logo/`, copiado con sus
trazados tal cual.

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
- En una pieza de 1080, el borde del cuadrado del lockup mide 2 px (capítulo 03, 3.4). El archivo lo
  trae a 1/52 A, que es 1 px en pantalla, así que en la copia cambia el `<rect>` del borde:
  `stroke-width` 2000 / A, `x` e `y` la mitad del trazo, el lado 1000 menos el trazo y `rx` 230
  menos medio trazo. A 56 px queda `<rect x="17.86" y="17.86" width="964.29" height="964.29"
  rx="212.14" fill="none" stroke="#3a3937" stroke-width="35.71"/>`. Las plantillas ya lo traen a
  52, 56 y 120 px: medido en sus PNG, el borde da 2,0 px arriba y a la izquierda en todas.

### El resguardo en las plantillas

Todas las plantillas cumplen el de 3.5: 28 px alrededor del lockup de 56, 60 alrededor del de 120
del cierre del carrusel y 20 alrededor de la marca sola de 40 px de cuerpo.

---

## 4. Mercado Libre

Las reglas están en el capítulo 12 del manual (12.1 y 12.2). Acá, lo que se midió en las
plantillas.

- **Como línea de contexto**, «Para vendedores de Mercado Libre» entra en todas las plantillas que
  la tienen (medido el 2026-10-11, con Chrome):
  - En el intercambio y en el feed de La trastienda (28 px, caja de 936): ocupa 598 px, y con
    «Faltan 3 semanas» al lado, 915. A su lado el cuándo va hasta 15 caracteres de texto ancho: con
    16, la línea pasa 18 px el margen. Sobre la foto de ejemplo de La trastienda da 15,16:1.
  - En la portada de La trastienda (24 px, caja de 904) entra aun con el cuándo al máximo: 821 px.
  - En el eyebrow de las plantillas de siempre entra en un renglón: 598 px a 28 en el feed 4:5,
    555 a 26 en el cuadrado, 640 a 30 en la story y 512 a 24 en la portada del carrusel. Pasa los
    30 (24 en el carrusel) caracteres del slot: es la única excepción a ese máximo.
- **Como dato chico** va, por ejemplo, en el slot `dato` del cierre del carrusel.

---

## 5. Las plantillas

### Los tres registros

Qué es cada registro, cuándo va y qué lleva: capítulo 11, 11.13. Las plantillas de cada uno:

| Registro | Plantillas |
|---|---|
| **Pregunta y cifra** | `intercambio/`, y las de siempre: `feed-4x5/`, `cuadrado/`, `story/` y `carrusel/`. |
| **En vivo** | No hay plantilla de video en este repo, ni del cuadro de cierre. `intercambio/intercambio-story.html` sirve de portada y muestra el intercambio completo, que es como termina la secuencia antes del cierre; los tiempos y el movimiento están en el manual (capítulo 06, 6.7). |
| **La trastienda** | `trastienda/` (feed y portada de carrusel). Las láminas que siguen a la portada son las del carrusel de siempre, sobre el negro. |

### Qué imagen lleva una pieza

La tarjeta de aprobación, el feed, el intercambio y la foto de La trastienda se arman como dice el
manual: capítulo 08 (8.2 el feed, 8.3 la tarjeta y 8.9 el intercambio) y capítulo 11 (11.13 la foto,
11.14 los avisos). Lo propio de las plantillas:

- **El feed** lleva hasta 4 filas, y abajo la leyenda. La portada de Facebook lleva 5, todas
  resueltas y sin leyenda: es el mismo panel del banner de LinkedIn. Lo que cambió en cada fila va
  dentro de `<b>`.
- **El intercambio** lleva debajo de la cifra dos filas de contexto, y su cursor es una barra fina
  en tinta, pegada a la pregunta, que no se borra.

### Cómo están hechas

- **Archivos que acompañan a cada HTML.** Cada `.html` tiene al lado su `.png` limpio y su
  `-guias.png`. Las excepciones están en la tabla.
- **Las guías.** Se ven sólo si la URL lleva `?guias`: son líneas punteadas en magenta (#FF2D95).
  El magenta no es un color de marca y nunca sale en la pieza limpia.
- **Qué se edita.** Cada texto editable tiene `data-slot="nombre"` y, arriba, un comentario
  `<!-- EDITAR: … máximo N caracteres -->`. Lo que no tiene `data-slot` es el armado de la
  plantilla: cambiarlo ya es armar una pieza sin plantilla (capítulo 11, 11.14).
- **La foto** de La trastienda es un `<img data-slot="foto">`: se cambia el `src`. La de ejemplo
  (`trastienda/foto-ejemplo.jpg`) es un dibujo hecho por script (`foto-ejemplo.py`), no una foto ni
  una imagen de IA: por eso su nota dice «Imagen de ejemplo.».
- **Las cifras inventadas** llevan `<!-- EJEMPLO -->` o `data-ejemplo` en el HTML.
  - En las plantillas que tienen el slot `nota`, se muestra además «Datos de ejemplo.» en la pieza.
    En el carrusel interior la nota va en el pie, a la izquierda del contador.
  - La portada de Facebook no lleva nota visible: es una portada, no un post, y sus cifras de
    ejemplo quedan marcadas sólo en el HTML.
- **Las piezas de producto se agrandan enteras** (capítulo 08): se dibujan con los px de la app y
  crecen juntos el texto, los glifos, los bordes y los radios.
  - En el feed 4:5, el cuadrado y la story, con `zoom`: `--pieza-zoom: 2.4` (`_comun/plantilla.css`),
    porque un panel de 936 px es la app en un teléfono de 390. El glifo de 10 px sale a 24 y el
    borde de 1 px, a 2,4.
  - En el carrusel, al doble, con los tamaños escritos en `carrusel.css`: glifo de 20, bordes de 2 y
    radio de 24.
  - En la portada de Facebook, con tamaños escritos en `portada.css`: glifo de 16, filas de 23 px y
    bordes de 2. En el banner de LinkedIn, con `zoom` 1,2.
- **La flecha** («3 → 43», «deslizá →») va como el SVG de `.flecha` de `_base/brand.css`, nunca
  tipeada: las Plex que se cargan no traen U+2192, y el navegador la tomaría de la fuente del
  sistema (capítulo 05, 5.6 y 5.8). Mide el alto de la x, va a media altura de las cifras, como la
  flecha de Plex, y toma el color del texto. El trazo es el de Plex 400; en un texto en 500 lleva
  además la clase `flecha-500`, como en los valores de las filas del intercambio:

  ```html
  3 <svg class="flecha" viewBox="0 0 820 516" role="img" aria-label="a"><path d="M55 258H717M483 24 717 258 483 492"/></svg> 43
  ```

  En «deslizá →» va con `aria-hidden="true"` en lugar de `role` y `aria-label`.

**Los slots de las filas del feed.** Para no repetir, la tabla los abrevia así:
- `fila-N-accion` es la fila entera: el resultado, con lo que cambió dentro de `<b>`. Es el único
  slot que lleva una etiqueta adentro. El largo cuenta también lo que va en `<b>`.
- El estado de cada fila se cambia en la clase y en el `href` del `<svg>`, que tienen que ser
  iguales. La píldora y «en curso» no son slots: se copian de la fila de ejemplo.

### La tabla

Todas las rutas son desde la raíz del repo `iris-brand`. En la tabla
cada ruta va completa. El formato es el de `_base/formatos.json`: ahí están su tamaño, su margen o
zona segura y lo que tapa o recorta la red. La columna «Uso» dice además lo propio de la plantilla.

| Archivo | Uso | Formato | Slots editables (máximo de caracteres) |
|---|---|---|---|
| `pieces/redes/perfil/perfil.html` → `perfil-1080.png`, `perfil-guias.png`; la vista en chico sale de `perfil-preview.html` → `perfil-preview-circulos.png` | Foto de perfil de Instagram, Facebook y WhatsApp: el ícono a sangre. | `perfil` | Ninguno: **no se edita**. La i es `logo/icon-profile.svg` en línea: su tamaño y su posición están medidos. |
| `pieces/redes/facebook/portada.html` → `portada.png`, `portada-guias.png` | Portada de la página de Facebook, en una sola versión. | `portada-facebook` | `titular-linea-1` 18 · `titular-linea-2` 23 de texto ancho (el sello termina antes de x 763 y quedan 40 px hasta el panel) · `panel-titulo` 22 · `fila-1..5-accion` 36. Las cinco filas van resueltas (✓), sin hora y sin leyenda, como el banner de LinkedIn. |
| `pieces/redes/plantillas/feed-4x5/feed-4x5-titular.html` | Post de feed 4:5 con titular grande y bajada. **El formato de Instagram.** | `feed-4x5` | `eyebrow` 30 (o «Para vendedores de Mercado Libre», 32, en un renglón) · `titular-linea-1` 28 (hasta 2 renglones) · `titular-linea-2` 28 (hasta 2 renglones, sin números) · `bajada` 110 (hasta 3 renglones) |
| `pieces/redes/plantillas/feed-4x5/feed-4x5-pieza.html` | Post de feed 4:5 con titular corto y la tarjeta de aprobación. | `feed-4x5` | `titular-linea-1` 22 (1 renglón) · `titular-linea-2` 22 (sin números) · `aprobacion-antetitulo` 28 («Propuesta») · `aprobacion-titulo` 30 · `dato-1-etiqueta` 24 · `dato-1-valor` 13 · `dato-2-etiqueta` 24 · `dato-2-valor` 13 · `dato-3-dia` («hoy» o «ayer», en Plex) · `dato-3-hora` (HH:MM, en mono) · `nota` 40 |
| `pieces/redes/plantillas/cuadrado/cuadrado-titular.html` | Post cuadrado con titular y bajada. **Para Facebook**: en Instagram la grilla lo recorta. | `cuadrado` | `eyebrow` 30 (o «Para vendedores de Mercado Libre», 32, en un renglón) · `titular-linea-1` 28 (hasta 2 renglones) · `titular-linea-2` 28 (hasta 2 renglones, sin números) · `bajada` 110 (hasta 3 renglones) |
| `pieces/redes/plantillas/cuadrado/cuadrado-pieza.html` | Post cuadrado con el feed «Hoy en tu cuenta», de 2 a 3 filas. **Para Facebook.** | `cuadrado` | `titular-linea-1` 24 (1 renglón) · `titular-linea-2` 24 (sin números) · `fila-1-accion` 29 (lleva la píldora) · `fila-2..3-accion` 41 (sin nada a la derecha; 35 si llevan «en curso») · `nota` 40 |
| `pieces/redes/plantillas/story/story-titular.html` | Story y portada de reel, con titular y bajada. La bajada termina en x = 950, antes de los botones del reel. | `story`; de portada de reel, también `reel` | `eyebrow` 30 (o «Para vendedores de Mercado Libre», 32, en un renglón) · `titular-linea-1` 28 (hasta 2 renglones) · `titular-linea-2` 28 (hasta 2 renglones, sin números) · `bajada` 110 (hasta 3 renglones) |
| `pieces/redes/plantillas/story/story-pieza.html` | Story y portada de reel con el feed, de 3 a 4 filas. | `story`; de portada de reel, también `reel` | `titular-linea-1` 22 (1 renglón) · `titular-linea-2` 22 (sin números) · `fila-1-accion` 29 (lleva la píldora) · `fila-2-accion` 41 · `fila-3-accion` 35 (lleva «en curso») · `fila-4-accion` 41 · `nota` 40 |
| `pieces/redes/plantillas/carrusel/carrusel-1-portada.html` | Carrusel 4:5, lámina 1: la portada. Margen de 88 px. | `carrusel` | `eyebrow` 24 (o «Para vendedores de Mercado Libre», 32, en un renglón) · `titular-linea-1` 30 (hasta 2 renglones) · `titular-linea-2` 28 (hasta 2 renglones; con 16 entra en 1; termina en punto) · `contador` («1/3») |
| `pieces/redes/plantillas/carrusel/carrusel-2-interior.html` | Carrusel, lámina interior: una por punto o paso, y se repite. Margen de 88 px. | `carrusel` | `titulo` 36 (hasta 2 renglones, sin firma) · `texto` 140 (3 renglones) · `pieza`: la tarjeta, el feed del `<template id="pieza-feed">` (sus filas no son slots: 37 caracteres con píldora, 43 con «en curso» y 51 sin nada) o nada · `aprobacion-antetitulo` 38 («Propuesta») · `aprobacion-titulo` 30 · `aprobacion-concepto-1` 24 · `aprobacion-cifra-1` 12 · `aprobacion-concepto-2` 24 · `aprobacion-cifra-2` 12 · `aprobacion-leido` 14 · `nota` 40 (en el pie; vacía si la lámina va sin pieza) · `contador` |
| `pieces/redes/plantillas/carrusel/carrusel-3-cierre.html` | Carrusel, última lámina: el cierre con el llamado. Margen de 88 px. | `carrusel` | `cta-linea-1` 28 (hasta 2 renglones; una dirección o un @ van dentro de `<span class="sin-corte">`) · `cta-linea-2` 22 (1 renglón) · `dato` 44 (acá sí puede ir «Mercado Libre») · `contador` |
| `pieces/redes/plantillas/intercambio/intercambio-feed.html` | Post de feed 4:5 del registro Pregunta y cifra: el intercambio como imagen, sin titular. Siempre sobre el negro. | `feed-4x5` | `contexto` 26 de texto ancho, o «Para vendedores de Mercado Libre» (32) · `contexto-cuando` 16 (15 de texto ancho al lado de «Para vendedores de Mercado Libre»; vacío si no hay una fecha real) · `pregunta` 60 (hasta 3 renglones; minúscula inicial; el cursor va pegado y no se borra) · `tool` 36 (en mono, el nombre real) · `tool-hora` (HH:MM) · `cifra` 6 (con el punto de miles y el signo) · `cifra-unidad` 34 (termina en punto; va al lado de la cifra si la cifra tiene hasta 5 caracteres y la unidad unos 10, si no baja sola) · `fila-1..2-etiqueta` 30 · `fila-1..2-valor` 18 · `ok-pregunta` 26 (sólo si hay una decisión; si no, se borra el `<p class="ok">` entero) · `nota` 40 |
| `pieces/redes/plantillas/intercambio/intercambio-story.html` | Story y portada de reel con el intercambio. También es el último cuadro, quieto, de la secuencia de un reel de En vivo; el reel cierra después con el cuadro del titular. | `story`; de portada de reel, también `reel` | Los mismos que el feed, con los mismos largos: con todos al máximo, la nota termina justo en y = 1248. |
| `pieces/redes/plantillas/trastienda/trastienda-feed.html` | Post de feed 4:5 del registro La trastienda, para campañas y fechas: la foto arriba, el titular con el sello y una bajada. La foto ocupa y 0–820 a sangre y se funde con el negro en sus 300 px de abajo: el contexto y el titular caen sobre ella y pasan 4,5:1. La nota de la foto y el pie van en el negro liso. | `feed-4x5` | `foto` (1080 × 820 o más grande en la misma proporción; se recorta al centro) · `contexto` 26 de texto ancho, o «Para vendedores de Mercado Libre» (32) · `contexto-cuando` 16 (15 de texto ancho al lado de «Para vendedores de Mercado Libre») · `titular-linea-1` 19 (1 renglón) · `titular-linea-2` 38 (hasta 2 renglones; con 19 entra en 1, y mejor en 1) · `bajada` 86 (hasta 2 renglones) · `foto-nota` 40 («Imagen generada con IA.» si lo es; si es una foto propia, se borra) |
| `pieces/redes/plantillas/trastienda/trastienda-portada.html` | Carrusel 4:5 del registro La trastienda, lámina 1: la portada con la foto. Las láminas que siguen son `carrusel-2-interior` y `carrusel-3-cierre`, sobre el negro. Usa `carrusel.css`. Margen de 88 px. La foto va en y 172–892, debajo del lockup y de su resguardo, y se funde con el negro 120 px arriba y 280 abajo: de y 0 a 172 no hay nada de la foto. | `carrusel` | `foto` (caja de 1080 × 720; sirve la misma del feed) · `contexto` 26 de texto ancho, o «Para vendedores de Mercado Libre» (32), que entra aun con el cuándo al máximo · `contexto-cuando` 16 · `titular-linea-1` 17 (1 renglón) · `titular-linea-2` 30 (hasta 2 renglones; con 18 entra en 1, y mejor en 1) · `foto-nota` 40 · `contador` («1/3») |
| `pieces/redes/instagram/destacadas/destacada-{demo,casos,precios,ayuda,como-funciona,novedades,permisos}.html` → la vista de las siete juntas en `destacadas-preview.html` y `.png` | Portadas de historias destacadas de Instagram: un pictograma de trazo sobre negro, sin texto. | `destacada` | `pictograma`: un SVG de trazo en grilla de 24 × 24, dibujado entre 2 y 22. Sin `stroke-width` (el trazo de 30 px lo fija `destacada.css`). Los puntos llenos llevan `class="dot"`. |

### Avisos de cada formato

- **Carrusel:** el lockup y el pie de cada lámina no se tocan.
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
  - **Ojo:** la ayuda oficial de hoy habla de un recorte alineado a la izquierda. Falta comprobarlo
    subiendo la portada y comparándola con `portada-guias.png`.
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
`/Applications` (macOS) e internet para las fuentes (`brand.css` las carga de Google Fonts), y
tarda unos 2 s por imagen. La salida va en ruta absoluta, y la versión con guías es el mismo HTML
con `?guias`:

```sh
pieces/redes/_base/render.sh <pieza.html> <ancho> <alto> <salida.png>
pieces/redes/_base/render.sh "<pieza.html>?guias" <ancho> <alto> <salida-guias.png>
```

El `?guias` va entre comillas, porque si no la terminal lo interpreta.

El ancho y el alto son los del formato de la pieza: `width` y `height` en `_base/formatos.json`.

Las PNG de las plantillas no se renderizan a mano: salen todas con `_base/render-all.sh`
(`guide/14-recursos.md`, 14.6). Una pieza nueva no está en esa lista: se renderiza con `render.sh`.

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

Antes de mirar, `pnpm medir <pieza.html> <formato>` dice en palabras lo que se puede medir desde
la página: el texto fuera de la zona del formato, la letra bajo el mínimo, una fuente que no cargó,
un color fuera de la paleta, el petróleo fuera del sello y el texto que desborda
(`_base/medir/README.md`). Después se miran las dos imágenes, la limpia y la de guías:

- Que ningún texto quede cortado ni pase de sus renglones.
- Que nada importante cruce una línea magenta.
- Que las fuentes sean las de la marca: si la segunda línea del titular no sale en serif itálica,
  cargó la de reserva. Un carácter que las Plex cargadas no traen sale con la del sistema aunque el
  resto cargue: por eso la flecha va siempre en SVG (sección 5, «Cómo están hechas»).

Los píxeles se miden con Python, Pillow y numpy (`pip install pillow numpy`). La tinta tiene que
caer dentro de la zona segura de su formato (`_base/formatos.json`), y la versión limpia tiene
que dar `magenta 0`:

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
- [ ] La línea de contexto, si la lámina la lleva, va en tinta.
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
