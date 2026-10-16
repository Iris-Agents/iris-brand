# Especificación de las piezas de redes

Cómo están hechas las piezas de `pieces/redes/` y `pieces/linkedin/`: las dos hojas de estilo, las
plantillas de ejemplo, cómo va el logo, cómo se renderiza una pieza y cómo se revisa. Lo que cumple
toda pieza está en el manual (`guide/`): las de redes, en el capítulo 15, que manda en lo que es de
redes, y una pieza sin plantilla, en el 11 (11.14). Esta especificación no repite reglas: dice dónde
está cada una y cómo la resuelven las hojas. La guía de medidas de cada formato (el lienzo, el
margen o la zona segura, lo que tapa o recorta cada red y el tamaño mínimo de la letra) es
`_base/formatos.json`. Cómo se escribe y se publica un post no está acá: es oficio de contenido y
vive fuera de este repo.

Hay dos hojas:
- **`_base/vidrio.css`**, la de los posts, carruseles, stories y reels (redes v2, capítulo 15): las
  cuatro variantes, la luz, el vidrio, el mensaje y los estados como pill. Se mide en `cqw`, así una
  misma pieza sirve en cualquier formato.
- **`_base/brand.css`**, la de las piezas fijas de la marca: la foto de perfil, la portada de
  Facebook, las destacadas de Instagram y las de LinkedIn. Trae los colores, las fuentes, la firma,
  la frase y la flecha.

- **Los valores mandan en el CSS.** Si esta especificación y una hoja dicen cosas distintas, vale la
  hoja; y las dos copian sus colores de los tokens, que el test controla (capítulo 14, 14.4).
- **Las plantillas mandan en el HTML.** Los largos máximos de cada texto están en el comentario
  `<!-- EDITAR -->` de cada pieza.

Redactada el 2026-10-10; rehecha el 2026-10-15, cuando las plantillas de los tres registros se
reemplazaron por las de vidrio.

---

## 1. Color

Las reglas son las del capítulo 04 del manual: los roles (4.2), qué texto va en cada gris (4.5), los
cinco estados (4.6), lo prohibido (4.8) y los dos colores de la marca, con la luz y la frase (4.9).

- **En `vidrio.css`** cada variante (`.n1a`, `.n1b`, `.n2a`, `.n2b`) declara sus colores en
  variables `--vp-*`, que salen de su token (el hex con el nombre del token al lado, o su
  `var(--iris-…)`): el fondo y el texto, los estados, la luz (`backlight.*`) y la frase
  (`signature.phrase`). El material del vidrio es `glass.marketing.*` (capítulo 06, 6.8). Qué es
  propio de redes, en el capítulo 15 (15.10).
- **En `brand.css`** cada color es una variable con el nombre de su token y guiones:
  `text.secondary` es `--text-secondary`. Una pieza usa siempre la variable, nunca el hex suelto.

| Variable de `brand.css` | Dónde la usan las piezas |
|---|---|
| `--brand-black` | El cuadrado del ícono y el fondo de la foto de perfil. |
| `--brand-white` | El logotipo y la i del ícono, sobre el negro. |
| `--bg-canvas` | El fondo de toda pieza: es el mismo negro de marca. |
| `--bg-surface` · `--bg-raised` · `--bg-hover` · `--bg-selected` | Ninguna hoy: el panel de la portada y del banner es de vidrio. |
| `--border-default` | El borde del cuadrado del ícono sobre el negro, en el lockup. |
| `--border-subtle` · `--border-control` | Ninguna hoy. |
| `--text-tertiary` | El eyebrow del panel («Hoy en tu cuenta») y las notas fijas y cortas, como «Datos de ejemplo.». |
| `--text-secondary` | El texto de cada fila del panel, menos lo que cambió. |
| `--text-primary` | La primera línea del titular y lo que cambió en cada fila (en `<b>`). |
| `--signature-phrase` | La frase: la segunda línea del titular (`.frase`). |
| `--backlight-iris` | La luz petróleo detrás del panel de la portada de Facebook y del banner de LinkedIn. |
| `--status-*` | El glifo de cada estado, y nada más. |

### Estados

Los glifos toman su color de las variables de estado (`--status-*` en `brand.css`; `--vp-toca`,
`--vp-trabajando`, `--vp-esperando`, `--vp-listo` y `--vp-fallo` en `vidrio.css`). La forma, el
color y las reglas de cada estado están en el capítulo 04 (4.6); el SVG de cada glifo, en el 08
(8.1). Qué HTML dibuja cada glifo: `README.md`, «Los colores de estado».

### Las excepciones a «sin gradientes»

Son las de 4.8, y las piezas las usan así:
- **La luz** (`.luz`): en las piezas de vidrio, un círculo de color que se apaga hacia afuera y se
  mueve con `--lx`, `--ly` y `--ls` (capítulo 15, 15.3); en la portada de Facebook y el banner de
  LinkedIn, el mismo círculo en `--backlight-iris`, detrás del panel.
- **El brillo del vidrio**: el `::before` del vidrio, un degradé blanco muy bajo en diagonal, con los
  valores del capítulo 15 (15.4).
- **La foto se funde con el negro** donde lleva texto encima: el `::after` de `.foto` en
  `vidrio.css` la oscurece hacia abajo, sin otro color.

## 2. Tipografía

Las reglas son las del capítulo 05: las tres familias y sus pesos (5.1), la firma en sus tres usos
(5.2), el titular de dos líneas y la frase (5.3), el eyebrow (5.5), los números y la flecha (5.6), la
carga (5.8) y lo prohibido (5.9). En las piezas de vidrio, además, los pesos 600 y 700 y los tamaños
del capítulo 15 (15.6).

- Las dos hojas cargan las fuentes desde Google Fonts: las piezas no necesitan nada instalado, pero
  sin internet el navegador pone Georgia o la del sistema, y esa pieza no se entrega (5.8).
- La firma es `.signature` en `brand.css` y `.frase` en `vidrio.css`, y en una pieza va sólo en la
  segunda línea del titular: el logotipo y la i del ícono son los SVG de `logo/` (sección 3).
- La mono va en las horas (`09:12`), los nombres de tools y el contador de un carrusel.

### El titular de dos líneas

En la portada de Facebook: `<span data-slot="titular-linea-1">` y
`<span class="signature frase" data-slot="titular-linea-2">`. En vidrio: `.titular` y `.frase`. La
segunda línea va en color y sin bloque (5.3). En los posts de LinkedIn va sin cursiva (5.3): la
frase es Plex 500 en `--signature-phrase`. El banner y la portada de LinkedIn la llevan en la firma.

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
| Plex de 25 a 39 px | entre −0,01 y −0,015em |
| La firma, a cualquier tamaño | −0,01em |
| Eyebrow y línea de contexto: Plex 500 en mayúsculas | +0,08em |
| Plex Mono | 0 |
| En vidrio: el titular (600) y la cifra (700) | −0,022em y −0,055em (capítulo 15, 15.6) |

### La línea de contexto

Cómo se ve, en el capítulo 15 (15.6), y qué dice y cuándo puede faltar, en el 09 (9.11). En vidrio
es `.contexto`; las piezas fijas de la marca no la llevan.

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
piezas.

### El logo va siempre como SVG

Nunca se tipea ni se rearma (3.10): cada pieza lleva el SVG de `logo/` tal cual, en línea o como
`<img>`.

| Qué va | Archivo | Dónde ya está |
|---|---|---|
| El lockup, sobre el negro | `logo/lockup.svg` | El pie de las piezas de vidrio negras, el banner del perfil de LinkedIn y la portada de Facebook. |
| El lockup, sobre el blanco de día | `logo/lockup-on-light.svg` | El pie de las piezas de vidrio blancas, como la story. |
| La marca sola, sobre el negro | `logo/wordmark-white.svg` | La portada de la página de LinkedIn, donde el ícono ya se ve en el logo de la página. |
| El ícono a sangre, para un recorte en círculo | `logo/icon-profile.svg` | La foto de perfil (`perfil/perfil.html`). |
| El ícono a sangre, cuadrado | `logo/icon.svg` | El logo de la página de LinkedIn (`pieces/linkedin/logo-empresa.html`, como `<img>`). |

Cómo va en una pieza:

- Se copia el `<svg>` de una pieza que ya lo trae, o el del archivo. De sus atributos cambian
  sólo el alto y el ancho: en el lockup, el lado del ícono A y 4,594 A (`width="257.27"
  height="56"` a 56 px); en la marca sola, 0,936 y 4,264 veces el cuerpo (`width="170.56"
  height="37.44"` a 40 px).
- En una pieza de 1080, el borde del cuadrado del lockup mide 2 px (capítulo 03, 3.4). El archivo lo
  trae a 1/52 A, que es 1 px en pantalla, así que en la copia cambia el `<rect>` del borde:
  `stroke-width` 2000 / A, `x` e `y` la mitad del trazo, el lado 1000 menos el trazo y `rx` 230
  menos medio trazo. A 56 px queda `<rect x="17.86" y="17.86" width="964.29" height="964.29"
  rx="212.14" fill="none" stroke="#3a3937" stroke-width="35.71"/>`. La portada de Facebook
  y el banner de LinkedIn lo traen a 52 px: medido en sus PNG, el borde da 2,0 px.

### El resguardo

Todas las piezas cumplen el de 3.5: 28 px alrededor del lockup de 56 y 20 alrededor de la marca
sola de 40 px de cuerpo.

---

## 4. Mercado Libre

Las reglas están en el capítulo 12 del manual (12.1 y 12.2). En vidrio, «Para vendedores de Mercado
Libre» va en la línea de contexto (`.contexto`), en texto y sin sus colores; su logo, sólo como apoyo (capítulo 12).
En la portada de Facebook y en las de LinkedIn no va: se nombra en el «Acerca de».

---

## 5. Las plantillas

Tres ejemplos de vidrio, en `plantillas/vidrio/`, sobre `_base/vidrio.css`. Son ejemplos, no el
límite: una pieza nueva se arma con la hoja y el capítulo 15, y vale lo mismo sin plantilla
(capítulo 11, 11.14).

| Archivo | Formato | Variante | Qué muestra |
|---|---|---|---|
| `vidrio-dato.html` | Feed 4:5, 1080 × 1350 | N1a, petróleo | Una pregunta, la tool, una cifra y dos filas. |
| `vidrio-decision.html` | Feed 4:5, 1080 × 1350 | N1b, ámbar | Una propuesta que espera el OK, con la frase y los botones. |
| `vidrio-story.html` | Story, 1080 × 1920 | N2b, blanco y ámbar | El mismo vidrio en 9:16, libre arriba y abajo, con el OK. Es una story: una portada de reel se arma aparte, con la zona segura del reel. |

La raíz de cada pieza lleva `data-formato` (el de `_base/formatos.json`) y las clases `.vp` y su
variante; las clases del contenido y cuándo va cada forma del vidrio están en el capítulo 15.

Las plantillas de los tres registros anteriores (pregunta y cifra, en vivo y La trastienda: feed,
cuadrado, story, carrusel, intercambio y trastienda) se borraron el 2026-10-15. Están en el
historial de git.

---

## 6. Cómo se renderiza

Cada PNG sale de su HTML con `pieces/redes/_base/render.sh`. Hace falta Google Chrome en
`/Applications` (macOS) e internet para las fuentes (las hojas las cargan de Google Fonts), y
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

Las plantillas enlazan su hoja y el logo con rutas relativas (`../../_base/vidrio.css`,
`../../../../logo/lockup.svg`): una copia en otra carpeta los pierde y sale sin las fuentes, los
colores ni el logo. Con `--plantilla <carpeta>`, `render.sh` renderiza
una copia temporal de la pieza con `<base href="file://<carpeta>/">` agregado en el `<head>`, y las
rutas relativas resuelven contra la carpeta de la plantilla de la que salió la pieza. Sin
`--plantilla`, renderiza el archivo tal cual.

Desde un proyecto que instaló el paquete, que trae `pieces/`:

```sh
PLANTILLAS="$PWD/node_modules/iris-brand/pieces/redes/plantillas"
RENDER=node_modules/iris-brand/pieces/redes/_base/render.sh
cp "$PLANTILLAS/vidrio/vidrio-dato.html" posts/2026-10-12-preguntas.html
# ... editar los textos marcados con EDITAR en posts/2026-10-12-preguntas.html ...
"$RENDER" --plantilla "$PLANTILLAS/vidrio" posts/2026-10-12-preguntas.html 1080 1350 "$PWD/posts/2026-10-12-preguntas.png"
```

- `--plantilla` va primero, antes de la pieza.
- Una ruta relativa que agregue la pieza, como una imagen propia, también resuelve contra la
  carpeta de la plantilla: va en ruta absoluta.

---

## 7. Cómo se revisa una PNG

Se miran las dos imágenes, la limpia y, si la pieza la tiene, la de guías, a tamaño real y a tamaño
de teléfono:

- Que ningún texto quede cortado ni pase de sus renglones.
- Que nada importante cruce una línea magenta, y que el texto quede dentro de la zona segura de su
  formato (`_base/formatos.json`).
- Que las fuentes sean las de la marca: si la frase no sale en serif itálica, cargó la de reserva.
  Un carácter que las Plex cargadas no traen sale con la del sistema aunque el resto cargue: por eso
  la flecha va siempre en SVG (la clase `.flecha`).
- Que el texto sobre una foto se lea contra lo más claro que tiene detrás (capítulo 15, 15.4).

### Lista de control

- [ ] La pieza usa una sola variante de vidrio, y el color dice lo que muestra: petróleo, salvo con
  el ● de «Espera tu OK» a la vista, que va en ámbar (capítulo 15, 15.2). En un carrusel no cambia
  el negro o el blanco.
- [ ] Hay una sola luz, nada se lee sobre ella sin el vidrio encima y, si es ámbar, va chica, detrás
  del OK y de los botones (15.3).
- [ ] El vidrio no lleva sombra y su brillo es el de la hoja (15.4).
- [ ] Están el marco, el contexto, el pie y un solo protagonista (15.1).
- [ ] La firma va sólo en la frase, nunca sola y sin bloque detrás, y el logo es el SVG de `logo/`:
  no está tipeado ni rearmado.
- [ ] Con foto, persona, gráfico o mucho contenido, va en monocromo (15.5).
- [ ] El mensaje de la persona va en la casilla o en la burbuja, bien escrito (capítulo 09, 9.11);
  la respuesta de iris va sin globo, con el nombre real de la tool (15.7).
- [ ] Lo único lleno es «Aprobar»: la pill del OK es neutra (15.7).
- [ ] No hay cartón ni texturas, verde claro, rosa ni violeta, ni los colores de Mercado Libre o
  Mercado Pago.
- [ ] «Mercado Libre» no va en el titular ni en una pieza de pauta, y su logo va sólo como apoyo (capítulo 12).
- [ ] Cada glifo tiene su palabra, y el ● va sólo si hay una decisión del dueño.
- [ ] Ninguna fila nombra un agente: cada fila dice el resultado.
- [ ] Las cifras inventadas están marcadas, y no hay ningún dato real sin autorización. Con la
  vocera, la pieza dice que es IA.
- [ ] La `-guias.png` es para revisar: nunca se publica.
