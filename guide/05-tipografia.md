# 05 · Tipografía

**Tres familias, dos pesos.** Cada familia tiene un solo trabajo y no hay ninguna otra, ni siquiera
de reserva.

## 5.1 Las tres familias

| Familia | Token | Trabajo | Pesos |
|---|---|---|---|
| **DM Serif Display itálica** | `font.family.signature` | La firma: el logotipo, la i del ícono y la segunda línea de un titular de dos líneas. Nada más. | 400, el único que tiene. |
| **IBM Plex Sans** | `font.family.sans` | Todo lo que se lee y se opera: titulares, cuerpo, interfaz, botones, etiquetas, cifras. | 400 para leer, 500 para titulares, títulos, etiquetas y botones. No hay tercer peso. |
| **IBM Plex Mono** | `font.family.mono` | Sólo datos: ids, horas, nombres de tools, payloads, atajos de teclado. | 400. |

Los pesos son `font.weight.regular` (400) y `font.weight.medium` (500). El bold que grita no existe.

Las tres tienen licencia SIL OFL 1.1. Vienen de Google Fonts y de sus repos oficiales
(`googlefonts/dm-fonts` e `IBM/plex`), y viven autoalojadas en `fonts/` con su licencia al lado.

## 5.2 La regla de la firma

DM Serif Display itálica va en estos tres lugares y en ninguno más. La firma se reconoce porque
escasea.

| Uso | Dónde | Cómo |
|---|---|---|
| El logotipo | Header, footer, OG, firma de mail, el lockup | Dibujo vectorial (`wordmark.svg`), desde 20 px de cuerpo. |
| La i del ícono | Favicon, foto de perfil, ícono de app, conector de Claude | Dibujo vectorial (`icon.svg`), desde 16 px con el master chico. |
| La segunda línea de un titular de dos líneas | Hero y OG (64 px), secciones y banner (40 px) | Texto, 400 itálica, del mismo tamaño que la primera línea, desde 32 px, en el sello (5.3). |
| **Nada más** | — | Ni una palabra suelta adentro de una línea sans, ni un titular de una sola línea, ni un estado vacío, ni números, ni botones, ni eyebrows, ni cuerpo, ni interfaz. |

- **Por qué tan poco:** tiene un solo peso y no trae cifras tabulares, así que no sirve para datos
  ni para operar. Y la itálica pierde su efecto si aparece en todos lados.
- **Se carga como una familia propia con una sola cara**, «DM Serif Display Italic»: la itálica 400,
  en dos archivos (latin y latin-ext). Como la única cara es la itálica, no puede salir recta aunque
  algo fuerce `font-style: normal`. Para que nadie le invente un bold, la app pone
  `html { font-synthesis: none; }` (capítulo 14, 14.2): `fonts.css` sólo declara caras y no puede
  ponerlo.
- **Afuera se llama distinto.** «DM Serif Display Italic» existe sólo donde se carga `fonts.css`. En
  Google Fonts, en las piezas de redes y en cualquier pieza que no carga `fonts.css`, la familia es
  «DM Serif Display» y la itálica sale de `font-style: italic` (`family=DM+Serif+Display:ital@1`).
  Por eso la pila de `font.family.signature` trae los dos nombres: «DM Serif Display Italic», «DM
  Serif Display», «DM Serif Display Italic Fallback», serif. Se escribe entera, siempre con
  `font-style: italic` y `font-synthesis: none`.
- El test frena la firma por debajo de 32 px, fuera del peso 400 o fuera de sus usos.

## 5.3 El titular de dos líneas

| | Línea 1 | Línea 2 |
|---|---|---|
| Familia | IBM Plex Sans 500 | La firma, 400 itálica |
| Color | `text.primary` | En el sello: en la app, calada en `signature.text` (el color del fondo) sobre `signature.block` (la tinta); en marketing, en tinta (`signature.marketing.text`) sobre `signature.marketing.block` (el petróleo) |
| Tamaño | El mismo en las dos | El mismo en las dos |
| Interlineado | El de su estilo | La línea, 1, con 0,16em de aire arriba; adentro del sello, 0,86 |

- **El corte lo decide el copy:** la firma entra donde la frase se vuelve personal.
- La línea 2 no lleva números y termina en punto.
- Se compone con `text-wrap: balance`.
- Un titular de una sola línea va entero en Plex Sans.

> **Agentes expertos**\
> *a cargo de tu e-commerce.*
>
> **Lo que aprendió una vez**\
> *le sirve para siempre.*

### El sello

La segunda línea no va en gris: el gris, en lugar de remarcar, apagaba. Va en un sello, un bloque
de esquinas rectas detrás de la firma. Lo decidió Franco el 2026-10-10, entre cuatro opciones
(rosa, sello, rosa con rúbrica y rosa grande); «blanco y más blanco» quedó descartado.

Hay dos sellos, con las mismas medidas y distintos colores:

| Sello | Dónde | El bloque | La letra | Clase | Contraste |
|---|---|---|---|---|---|
| De tinta | La app | `signature.block`: #EDEDEA en oscuro, #1A1917 en claro | Calada, en `signature.text`: #0A0A09 en oscuro, #FAFAF9 en claro | `.signature-seal` | 16,89:1 y 16,82:1 |
| Petróleo | Marketing: las piezas de redes, los banners, las portadas, el titular de la landing y las OG | `signature.marketing.block`: #03313C en los dos modos | En tinta, `signature.marketing.text`: #EDEDEA en los dos modos | `.signature-seal-marketing`; en las piezas de redes, el `.sello` de `pieces/redes/_base/brand.css` | 11,87:1 |

- **La receta** vive en `css/signature.css` y va siempre igual:
  - la línea de la firma (`.signature-line`), en bloque, con `margin-top: 0.16em` y
    `line-height: 1`;
  - adentro, el sello (`.signature-seal` o `.signature-seal-marketing`): un `<span>` con
    `display: inline-block`, `padding: 0.14em 0.16em 0.18em 0.13em` (arriba, derecha, abajo,
    izquierda), `line-height: 0.86` y esquinas rectas, sin borde ni sombra;
  - el bloque y la letra, los de su sello.
- **Las medidas van en em:** el sello sigue al tamaño del titular, en los dos pares y en las piezas.
- **Con el sello a la vista, el botón principal va con borde** (el «Aprobar» de la tarjeta en una
  pieza, el botón principal del hero de la landing; capítulo 06, 6.5).
- **En dos renglones**, el sello es un solo bloque del ancho del titular.
- **El petróleo va sólo en el sello de marketing**, y es la única variante del sello (capítulo 04,
  4.9). El bloque casi no se despega del negro (1,42:1), a propósito: lo que se lee es la firma.

```html
<!-- En la landing: el sello petróleo. En la app, la misma estructura con .signature-seal. -->
<h1 class="text-hero">
  Agentes expertos
  <span class="signature-line text-hero-signature font-signature italic"><span class="signature-seal-marketing">a cargo de tu e-commerce.</span></span>
</h1>
```

Hay dos pares, sin tipografía fluida: `headline.hero` (64/1,05) para el hero y las OG, y
`headline.section` (40/1,1) para secciones y el banner. Abajo de 600 px de ancho
(`layout.breakpoint.narrow`) el hero usa el par de sección, y en un teléfono de 390 px ocupa de 3 a
4 líneas.

## 5.4 La escala

Doce estilos, los de la pantalla: la app, la landing y los documentos. El tracking se calcula una vez
con la regla de su familia y vive en cada estilo, en px.

**Una pieza de redes de 1080 px no usa esta escala.** Se ve a un tercio de su tamaño, así que elige
sus propios tamaños, con las mismas tres familias y los mismos dos pesos, sin bajar de los mínimos
de `pieces/redes/_base/formatos.json` y con el tracking por tamaño de `pieces/redes/plantillas.md`.

| Token | Para qué | Familia | Tamaño / interlineado | Peso | Tracking |
|---|---|---|---|---|---|
| `headline.hero.first` | Primera línea del hero y de la OG | sans | 64 / 1,05 | 500 | −0,02em (−1,28 px) |
| `headline.hero.second` | Segunda línea del hero y de la OG | firma | 64 / 1,05 | 400 | −0,01em (−0,64 px) |
| `headline.section.first` | Primera línea de una sección y del banner; el hero en pantallas angostas | sans | 40 / 1,1 | 500 | −0,015em (−0,6 px) |
| `headline.section.second` | Segunda línea del mismo titular | firma | 40 / 1,1 | 400 | −0,01em (−0,4 px) |
| `title` | Título de una entidad en la app; título de card en la landing | sans | 18 / 1,35 | 500 | −0,01em (−0,18 px) |
| `copy.lede` | La bajada del hero, hasta 60 caracteres por línea | sans | 18 / 1,55 | 400 | −0,01em (−0,18 px) |
| `copy.body` | Cuerpo de la landing, de los documentos y de los legales, hasta 66 | sans | 16 / 1,6 | 400 | −0,01em (−0,16 px) |
| `copy.reading` | El hilo del agente, las skills y la memoria, hasta 72, en `text.primary` y sin globo | sans | 15 / 1,65 | 400 | −0,01em (−0,15 px) |
| `copy.ui` | La base densa de la app | sans | 13 / 1,5 | 400 | −0,01em (−0,13 px) |
| `label` | Botón, nav, título de fila, píldora | sans | 13 / 1,4 | 500 | −0,01em (−0,13 px) |
| `eyebrow` | Antetítulo, en MAYÚSCULAS y `text.tertiary` | sans | 12 / 1,4 | 500 | +0,08em (0,96 px) |
| `mono` | Horas, ids, la línea «tool · estado», payloads | mono | 12 / 1,5 | 400 | 0 |

El largo de línea está en `layout.measure.lede` (60), `layout.measure.prose` (66) y
`layout.measure.reading` (72), en caracteres.

**La regla del tracking**, que el test verifica estilo por estilo:

| Familia y tamaño | Tracking |
|---|---|
| Plex Sans de 13 a 24 px | −0,01em |
| Plex Sans a 40 px | −0,015em |
| Plex Sans a 64 px | −0,02em |
| Plex Sans a 12 px | 0, salvo el eyebrow |
| Eyebrow | +0,08em |
| La firma, a cualquier tamaño | −0,01em |
| Plex Mono | 0 |

## 5.5 El eyebrow

- Plex Sans 500 de 12 px, en mayúsculas, con +0,08em, en `text.tertiary`.
- Sans y no mono: la mono en mayúsculas se lee como una terminal.
- En el HTML se escribe en minúscula normal («Hoy en tu cuenta») y el CSS lo pasa a mayúsculas.
- Nunca lleva «iris»: saldría «IRIS».
- Los encabezados de una tabla usan el mismo estilo.
- **En una pieza de redes**, el eyebrow de arriba de todo es la línea de contexto y va en
  `text.primary`, no en `text.tertiary` (capítulo 09, 9.11).

## 5.6 Números

- **Van en la sans.** Las cifras de Plex ya son tabulares (los diez dígitos miden lo mismo), así que
  una columna se alinea sin activar nada. Las numéricas se alinean a la derecha.
- **Los ids y las horas van en mono:** «id 4418», «10:40».
- **La firma nunca lleva números.**
- **El separador decimal sigue al idioma:** coma en castellano y portugués («0,29»), punto en inglés.
- **Un cambio se escribe antes y después, con una flecha en el medio:** «3 → 43». La flecha se ve
  como una letra más: del color, del peso y del cuerpo del texto que la rodea, con el trazo de Plex
  y un espacio de cada lado. Vale para toda flecha de una pieza, también la de «deslizá →». Nunca
  una flecha de otra fuente, un emoji, «->» ni «>». Si la fuente cargada no la trae, el navegador
  la toma de la del sistema sin avisar, y eso ya es una pieza que cayó a otra fuente (5.8). Cómo se
  dibuja en una pieza: `pieces/redes/plantillas.md`.

## 5.7 Links en texto corrido

- Del mismo color que el texto que los rodea: el link no cambia de color.
- Subrayado de 1 px en `link.underline` (#72716E en oscuro, #868581 en claro), a 3 px de distancia
  (`link.underline-offset`).
- En hover, el subrayado pasa a `text.primary`.
- La prohibición de rayas y subrayados es del logotipo, no de los links.

## 5.8 Carga

- WOFF2 autoalojado en `fonts/`, recortado a latin y latin-ext con `unicode-range`. Latin cubre
  castellano y portugués.
- Los `@font-face` viven en `css/fonts.css`, con `font-display: swap` y fallbacks con métricas
  ajustadas (Georgia Italic para la firma, Arial para la sans) para que la página no salte cuando
  llega la fuente.
- Se precargan sólo los dos archivos del hero: Plex Sans 500 y la firma.
- Una pieza que se renderiza sin las fuentes (cae a Georgia o a la del sistema) no se entrega,
  tampoco si es un solo carácter que la fuente no trae, como la flecha (5.6).

## 5.9 Prohibido

- Un tercer peso (600 o 700) o un bold falso. Un titular va en 500.
- La firma recta (DM Serif Display regular), la firma fuera de sus tres usos o por debajo de 32 px
  como texto.
- La segunda línea del titular en gris o sin el sello; un sello con esquinas redondeadas, borde,
  sombra o un color que no sea el de sus dos tokens; el sello petróleo en la app, o el de tinta en
  marketing.
- Plex Sans en itálica: no se carga y el navegador la falsearía. La única itálica es la firma.
- La mono en eyebrows, etiquetas, botones o palabras («en curso» y «hoy» van en sans).
- Un texto de menos de 12 px; en una pieza de redes, de menos de su mínimo (5.4).
- Mayúsculas sostenidas fuera del eyebrow.
- Un tracking distinto del de su estilo (en una pieza de redes, del de su tamaño), o tipografía
  fluida.
- Cualquier familia fuera de las tres: ni Playfair, ni Inter, ni la del sistema como elección.
