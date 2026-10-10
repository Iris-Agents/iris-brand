iris es un SaaS de agentes que atienden a los clientes y manejan la cuenta de un vendedor de Mercado Libre de punta a punta, con la autonomía que el dueño les da. La marca es elegante, oscura y minimalista. Es monocroma: la jerarquía sale de la luz, la tinta es el acento y lo único que grita es un CTA lleno y el ● de «te toca». La diferencia no está en la paleta sino en las piezas de producto (el feed, la tarjeta de aprobación, los glifos de estado, la línea «tool · estado») y en una itálica que aparece poco. La itálica firma; el producto convence.

## Contenido

### Voz

- Hablá como un operador senior callado: preciso, memorioso, transparente y calmo. Nunca como un chatbot simpático, un mago de la IA ni un asistente servil.
- Decí el número, la fecha y contra qué se midió: «Vendió 27 en 7 días; leído hoy a las 10:40.», no «Vendé más.».
- Escribí una idea por oración, sin adjetivos y en voz activa: «Contestó la pregunta a las 09:12.», no «Respuestas rápidas, precisas y humanas.».
- Decí lo que no sabés. «No lo leí» no es «no tiene»: «No pude leer el stock de esa variante.», nunca «No tiene stock» si nadie lo leyó. Un dato sin leer se muestra como «sin leer», nunca como 0.
- Hablale al dueño, de vos y con voseo sobrio: «conectá», «vos decidís». En español neutro, tuteo («conecta»); en pt-BR, «você»; en inglés, neutro. La marca base no lleva modismos, monedas ni organismos de un país.
- Prometé sólo esto: «Trabaja solo donde vos lo dejás; si no decidiste, te espera.». Nunca «piloto automático», «24/7», «reemplaza a tu equipo», «IA que hace todo» ni «el primer empleado de IA».
- Escribí con calma: sin superlativos (el mejor, el único, el más), sin signos de exclamación, sin emojis, sin mayúsculas sostenidas y sin urgencia. Sí: «Probalo en iris-agents.com.». No: «¡Últimos cupos! Sumate YA.».
- En público no uses jerga: ni «MCP», ni «API», ni «endpoint», ni «orquestación», ni «AI-first». Decí «conectá tu cuenta a Claude».
- Escribí botones que dicen qué pasa: «Aprobar», «Rechazar con motivo», «Borrar 12 publicaciones». Un error dice qué pasó y cómo se arregla («El precio tiene que ser mayor que 0.»), nunca «Error» ni «Algo salió mal». Un vacío es una instrucción con el botón que lo llena, no «Sin datos». Un «no» va siempre con lo que sí hay.
- La voz completa, con los pilares y la tabla de palabras, está en la sección Voz y tono.

### El nombre

- Escribí «iris» siempre en minúscula, también al abrir una oración, y sin artículo: «iris resolvió el reclamo».
- Usá «Iris Agents» sólo como nombre formal de la empresa: la página de empresa, facturas, contratos y el descargo. «iris agents» existe sólo como dibujo, en el logotipo: no lo tipees.
- No le agregues sufijos ni apodos («iris AI», «iris bot», «el copiloto») ni sub-marcas por área («iris Reclamos»): lo que hace iris se cuenta con verbos.

### En lo público, el resultado

- En la landing, el banner, las redes, las OG y el video, cada fila dice qué logró iris: «Contestó 40 preguntas», «Resolvió 3 reclamos», «Generó 3 ventas adicionales», «Adhirió a una promoción», «Mejoró la reputación». Sin «Cliente ·», «Producto ·» ni «Vendedor ·»: quien ve la pieza todavía no usó la app.
- En la app, el agente es una etiqueta gris en `text-tertiary` antes de un punto medio: «Producto · recuperó el Buy Box». Sólo existen Cliente, Producto y Vendedor; ninguno tiene ícono, color ni sub-marca, y ninguno va en un titular o un claim.
- Poné «Propuesta» como antetítulo de la tarjeta de aprobación, nunca el nombre de un agente.
- El titular del banner y de la portada de Facebook es «Agentes expertos / *a cargo de tu e-commerce.*».
- Marcá las cifras de una pieza como de ejemplo («Datos de ejemplo.»). Nunca publiques datos, nombres ni rubros de un cliente, ni siquiera tapados. La única excepción es un testimonio de un usuario que firmó su consentimiento por escrito: se muestra sólo lo que aprobó (nombre, rubro, la cita textual y las cifras con su fecha), el permiso se puede retirar, y esa pieza no lleva «Datos de ejemplo.» ([9.10](https://github.com/Iris-Agents/iris-brand/blob/main/guide/09-voz-y-tono.md)).
- Lo que lee un comprador habla con la voz del vendedor: iris nunca firma, ni «respondido por iris».

### Cifras

- Toda cifra lleva su unidad, en una que se sienta («27 por día», no «800 por mes»), y su fecha y su fuente.
- Mostrá un cambio con las dos puntas, con flecha: «Stock publicado 3 → 43». Un porcentaje suelto no va. El cero también se muestra.
- Las cifras van en la sans (las de Plex ya son tabulares) y alineadas a la derecha; los ids y las horas, en `.mono`. El separador decimal sigue al idioma: coma en castellano y portugués («0,29»), punto en inglés. La moneda es la de la cuenta.

## Fundamentos visuales

### Color por modo

- Tratá `dark` como la identidad: es el primer tema y el default. La landing, las piezas, las OG, el banner y las redes van siempre en oscuro. `light` existe para la app de día; comparte los roles, no es el oscuro invertido.
- Leé por rol, nunca por gris. Fondos: `bg-canvas` (nivel 0), `bg-surface` (nivel 1), `bg-raised` (nivel 2), `bg-hover` y `bg-selected`. En claro los tres primeros son el mismo blanco y el nivel lo dice el borde.
- Elegí el texto por lo que dice, no por cuánto querés atenuarlo:

| Token | Para qué | Sobre qué fondos |
|---|---|---|
| `text-primary` | Lo que se lee de corrido: titulares, nombres, el hilo del agente, el cuerpo. | Los cinco fondos, `glass-bar` y `glass-panel`, en los dos modos. |
| `text-secondary` | Apoyo de 13px para arriba: bajadas, ayudas, el verbo de una fila, la segunda línea del titular. | Los cinco fondos, `glass-bar` y `glass-panel`. |
| `text-tertiary` | Datos sueltos: hora, id, contador, eyebrow, leyenda, meta de fila. Nunca una oración. | Los cinco fondos y `glass-panel`. Nunca `glass-bar`. |
| `text-placeholder` | El placeholder de un input (mismo valor que `text-tertiary`). | Los cinco fondos. |
| `text-disabled` | Una etiqueta deshabilitada. | Los cinco fondos (exento de contraste; queda en 3:1). |
| `text-on-action` | El texto del CTA. | Sólo `action-primary`. |

- No atenúes con opacidad un texto que significa algo: elegí el token. La opacidad 0,4 es sólo para un control deshabilitado entero.
- Usá sólo los colores de `tokens.json`. Un hex suelto es un error, y un color que no está ahí no existe. Cada par de texto pasa WCAG 2.2 AA sobre los cinco fondos de su modo; los más justos son `border-control` (3,11:1 y 3,05:1), `status-attention` en claro (3,33:1) y `action-destructive` como texto (4,91:1 y 4,64:1): no los toques.
- Fijá el modo con `data-theme="dark"` o `data-theme="light"` en el `<html>`. El `theme-color` de cada página es su `bg-canvas`.

### La tinta es el acento

- `action-primary`, `focus` y `text-primary` son la misma tinta. No hay color de marca ni un azul de «novedad».
- Armá el CTA como relleno de `action-primary` con `text-on-action`, en `.label`, con `radius-control` y `size-control-dense` (28px, la app) o `size-control-comfortable` (40px, la landing y las piezas). Hay uno solo lleno por pantalla. En hover baja a opacidad 0,9.
- Armá el secundario ghost: sin relleno, borde `border-default`, texto `text-primary`, hover `bg-hover`.
- Armá el destructivo ghost: texto y borde `action-destructive`, nunca relleno, con una confirmación que repite el objeto («Borrar 12 publicaciones», no «¿Estás seguro?»).
- Armá el input con borde `border-control`, placeholder `text-placeholder` y foco de tinta. El foco es un outline de 2px en `focus` a 2px de distancia, con `:focus-visible`.
- Dejá el link del color del texto que lo rodea, subrayado 1px en `link-underline` a 3px de distancia; en hover el subrayado pasa a `text-primary`.
- El hover y la selección no tienen color: son `bg-hover` y `bg-selected`.

### Los cinco estados

Cada estado tiene un glifo de 10px, un color y una palabra. Ninguna forma se repite y el color va sólo en el glifo.

| Glifo | Palabra | Token | Regla |
|---|---|---|---|
| ● | te toca | `status-attention` | El dueño tiene que decidir. El único ● del set; va agrupado arriba de todo, con la píldora «Espera tu OK». En claro, sólo como relleno. |
| ✕ | falló | `status-failed` | Algo no se pudo hacer. El único que también va como texto: error de campo, botón destructivo, la línea de una tool que falló. |
| ◐ | trabajando | `status-working` | iris lo está haciendo, con «en curso». El verde es movimiento, nunca «bien». Late dos veces al entrar y queda quieto; nunca gira. |
| ○ | esperando | `status-idle` | Espera a un tercero (un comprador, Mercado Libre) o nadie lo configuró. Nunca como viñeta. |
| ✓ | resuelto | `status-done` | Hecho, en silencio: el gris de `text-tertiary`, y la fila baja a gris. |

- Poné siempre glifo más palabra, o glifo más leyenda. La palabra va en un token de texto; nunca pintes de estado un texto (salvo el rojo), un fondo, un borde, un titular ni el logo.
- Ordená por urgencia: te toca, falló, trabajando, esperando, resuelto. Al pie de un listado con estados mezclados va la leyenda, con sólo los que aparecen: «● te toca · ✕ falló · ◐ trabajando · ○ esperando · ✓ resuelto». Cada sección usa su palabra («respondida» en un hilo de preguntas, «listo» en una tool).
- No dibujes ningún otro elemento como un punto lleno, un círculo hueco o un medio círculo. Los glifos no son íconos y no se reemplazan por lucide. Los SVG para copiar están en la sección Estados.

### Tipografía

Tres familias, dos pesos (400 y 500). No hay tercer peso ni bold falso: poné `html { font-synthesis: none; }`.

| Familia | Variable | Trabajo |
|---|---|---|
| IBM Plex Sans 400 y 500 | `--font-sans` | Todo lo que se lee y se opera: titulares, cuerpo, interfaz, botones, etiquetas, cifras. |
| DM Serif Display itálica 400, la firma | `--font-signature` | Sólo la segunda línea de un titular de dos líneas. |
| IBM Plex Mono 400 | `--font-mono` | Sólo datos: ids, horas, nombres de tools, payloads, atajos. |

- Usá los doce estilos y nada entre medio: `.headline-hero-first` y `.headline-hero-second` (64px, hero y OG); `.headline-section-first` y `.headline-section-second` (40px, secciones, banner y el hero abajo de 600px); `.title` (18/500); `.copy-lede` (18, bajada, hasta 60 caracteres); `.copy-body` (16, landing y documentos, hasta 66); `.copy-reading` (15, el hilo del agente, hasta 72, sin globo); `.copy-ui` (13, la base densa de la app); `.label` (13/500, botón, nav, píldora); `.eyebrow` (12/500); `.mono` (12).
- Aplicá la regla de la firma: DM Serif Display itálica va en el logotipo y en la i del ícono, que son dibujos de `assets/Logos/`, y como texto sólo en `.headline-hero-second` o `.headline-section-second`, en `text-secondary`, desde 32px. Nunca una palabra suelta en itálica, un titular de una línea, números, botones, eyebrows, cuerpo ni interfaz.
- Componé el titular de dos líneas con las dos clases del mismo par, el mismo tamaño e interlineado y `text-wrap: balance`. La primera en `text-primary`; la segunda, la firma, donde la frase se vuelve personal, sin números y terminada en punto. Un titular de una línea va entero en la sans.

```html
<h1>
  <span class="headline-hero-first" style="display:block;color:var(--text-primary)">Agentes expertos</span>
  <span class="headline-hero-second" style="display:block;color:var(--text-secondary)">a cargo de tu e-commerce.</span>
</h1>
```

- Escribí el `.eyebrow` en minúscula normal y pasalo a mayúsculas con `text-transform: uppercase` (la clase no lo hace), en `text-tertiary`. Nunca lleva «iris». Los encabezados de tabla usan el mismo estilo.
- No bajes de 12px, no uses Plex en itálica, no pongas la mono en eyebrows, etiquetas, botones ni palabras («en curso» y «hoy» van en sans), y no uses mayúsculas sostenidas fuera del eyebrow. Ninguna familia fuera de las tres: ni Inter, ni Playfair, ni la del sistema.

### Espacio y layout

- Usá la escala de 4px: `space-1` (4) a `space-16` (64); el nombre es el múltiplo. Densidad en los datos, aire en el chrome: una tabla puede ir apretada, lo que la rodea no.
- Alineá a la izquierda, en una columna de `layout-container` (1080px), con `layout-gutter` (24px) o `layout-gutter-narrow` (16px). No centres el contenido.
- Separá las secciones con `layout-section` (80px) y dale al hero `layout-hero` (104px) arriba y abajo. Abajo de 600px (`layout-breakpoint-narrow`; escribilo literal en la media query) pasá a los `-narrow`: se achica el ritmo, no el contenido.
- Todo lo que se toca mide `size-target-min` (24px) o más.

### Radios por rol

- `radius-chip` (4px) para kbd, badge y controles chicos; `radius-control` (6px) para botón e input; `radius-card` (8px) para card, popover, burbuja y composer; `radius-panel` (12px) para paneles, diálogos, el feed y la tarjeta de aprobación; `radius-frame` (16px) para marcos de captura y video; `radius-pill` para píldoras.
- Mantené los radios concéntricos: el del hijo es el del padre menos el padding, nunca mayor.

### Bordes, sin sombras

- Usá bordes de 1px en todo; el color dice el peso: `border-subtle` (el hairline dominante), `border-default` (popovers, diálogos, secundario) o `border-control` (inputs y controles).
- Usá la regla inset de 2px en `text-primary`, junto con `bg-selected`, sólo para la fila activa de una lista. Nunca es un filete de color al costado de una card.
- No uses sombras en ningún modo, ni glow, ni gradientes llamativos. La única excepción es un degradé radial de blanco al 4 % en el banner de LinkedIn y en la portada de Facebook, y en ninguna otra pieza.

### Elevación

| Nivel | Qué es | Cómo se arma |
|---|---|---|
| 0 | La página | `bg-canvas` |
| 1 | Card, panel, composer, el feed | `bg-surface` + `border-subtle` |
| 2 | Popover, menú, diálogo, ⌘K, la tarjeta de aprobación | `bg-raised` + `border-default` |
| 3 | Diálogo modal | Nivel 2 + `backdrop` detrás |
| Flotante | La barra de la landing, ⌘K sin cortina, popovers, la aprobación que flota | El vidrio, que sin soporte vuelve al nivel 2 |

### El vidrio

- Usá vidrio ahumado sólo en la capa que flota sobre contenido que se mueve. Nunca en el contenido (feed, cards, tablas, chat, formularios), nunca en una pieza estática (OG, banner, redes), nunca vidrio sobre vidrio, nunca más de dos a la vez y nunca con `backdrop` detrás.
- Usá `glass-bar` para la barra flotante de la landing: lleva sólo `text-primary`, `text-secondary`, el CTA de tinta sólido y el foco. Usá `glass-panel` para lo que flota con contenido (⌘K, popovers, menús, la aprobación que flota): todo lo que se lee sobre `bg-selected` se lee ahí.
- Armalo con blur de 24px y saturate 1,4, borde de 1px en `glass-rim` y la línea de luz `glass-specular` inset arriba. Sin lente, sin ruido, sin tinte de color, sin sombra. El contraste lo garantiza el tinte, no el blur.

```css
.glass-panel { background-color: var(--bg-raised); border: 1px solid var(--border-default); }
@supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
  .glass-panel {
    background-color: var(--glass-panel);          /* la barra: var(--glass-bar) */
    border-color: var(--glass-rim);
    box-shadow: inset 0 1px 0 var(--glass-specular); /* luz, no sombra */
    -webkit-backdrop-filter: blur(24px) saturate(1.4);
    backdrop-filter: blur(24px) saturate(1.4);
  }
}
@media (prefers-reduced-transparency: reduce), (prefers-contrast: more) {
  .glass-panel { background-color: var(--bg-raised); border-color: var(--border-default);
    box-shadow: none; -webkit-backdrop-filter: none; backdrop-filter: none; }
}
@media (forced-colors: active) {
  .glass-panel { background-color: Canvas; border-color: CanvasText;
    box-shadow: none; -webkit-backdrop-filter: none; backdrop-filter: none; }
}
```

- Hacelo aparecer e irse con `opacity`, en el mismo elemento. Nunca animes el blur.

### Movimiento

| Duración | Valor | Para qué |
|---|---|---|
| fast | 120ms | Color, borde, hover. |
| base | 180ms | Plegar, desplegar, abrir un popover. |
| slow | 280ms | Panel lateral, sheet. |
| reveal | 600ms | La única entrada orquestada de la página. |
| stagger | 80ms | El desfase entre líneas de esa entrada. |
| pulse | 1200ms | Un latido del ◐. |

- Usá `cubic-bezier(0.23, 1, 0.32, 1)` (ease-out quint) por default y `cubic-bezier(0.65, 0, 0.35, 1)` para lo que va de un lugar a otro y el latido.
- Orquestá una sola entrada por página: el titular, línea por línea, con `opacity` y `translateY`, a 600ms con 80ms de desfase. El resto aparece sin coreografía, y los datos aparecen quietos.
- Animá sólo `transform`, `opacity` y colores. Nunca `transition: all`, `filter` ni el blur del vidrio. Sin rebotes ni resortes.
- Hacé latir el ◐ en opacidad dos veces al entrar al estado (de 1 a 0,45 y de vuelta, 1200ms cada latido) y dejalo quieto. Nunca gira ni late en loop. En una pieza estática no se mueve.
- Con `prefers-reduced-motion: reduce`, dejá todo quieto y visible.

### Datos y gráficos

- Dibujá la serie protagonista en `data-series` (sólida, 1,5px) y la referencia en `data-comparison` (punteada, 1,5px), con la grilla en `data-grid`. Dos series como máximo; con más, gráficos chicos repetidos con la misma escala. Rotulá la línea, no una leyenda de colores.
- Poné las etiquetas de eje y los valores en `text-tertiary`. Nunca uses colores de estado como series; un evento sobre la serie va con su glifo y su palabra.
- Sin degradés, áreas con gradiente, 3D ni glow; las barras arrancan en cero.
- Para cifras y reconciliaciones, usá una tabla, no N tarjetas: encabezados en `.eyebrow`, texto a la izquierda, números a la derecha, sin cebra, hover `bg-hover`.

## Logo

- Usá el SVG; el logo nunca se tipea. Hay tres piezas:

| Pieza | Archivo | Cuándo |
|---|---|---|
| El ícono: la i de la firma en `brand-white` sobre un cuadrado `brand-black`, a sangre | `assets/Logos/icon.svg`; de 16 a 23px, `assets/Logos/icon-small.svg`; para un avatar que se recorta en círculo, `assets/Logos/icon-profile.svg` | Todo espacio cuadrado o chico: avatar, favicon, ícono de app, el conector de Claude. |
| La marca: «iris agents» en minúscula, a un solo color | `assets/Logos/wordmark-white.svg` sobre oscuro, `assets/Logos/wordmark-black.svg` sobre claro | Donde el ícono ya se ve cerca: el header de la app, la portada de la página de empresa. |
| Juntos, el logo principal | `assets/Logos/lockup.svg` sobre oscuro, `assets/Logos/lockup-on-light.svg` sobre claro | Todo lo demás: la web, la firma de mail, documentos, el banner, el pie de los posts. |

- Elegí así: si el espacio es cuadrado, el ícono; si el ícono ya está en la pantalla, la marca sola; si no, juntos.
- Poné la marca y el lockup sobre los neutros de su modo. Nunca sobre una foto movida, un color de estado, un degradé (salvo el del banner) ni los colores de Mercado Libre o Mercado Pago. Sobre `brand-black`, el cuadrado del ícono lleva borde `border-default` (`lockup.svg` ya lo trae); sobre claro, va sin borde.
- Dejá el resguardo libre: A/2 alrededor del ícono o del lockup (A es el lado del ícono); 1 x alrededor de la marca sola (x ≈ medio cuerpo).
- Respetá los mínimos: el ícono, 24px (16px sólo con `icon-small.svg`); la marca, 20px de cuerpo (unos 87px de ancho); el lockup, 26px de alto. En una pieza de 1080, ícono de 52px y marca de 40px de cuerpo.
- Si una pieza dibuja el ícono como tile, el cuadrado lleva radio de 0,23 de su lado. Los archivos del ícono van siempre cuadrados, sin esquinas ni transparencia: la máscara la pone la plataforma.
- No lo cambies: nada de violeta, gris, dos tonos, degradé, contorno, sombra, glow ni vidrio; nada de rayas debajo, rotar, estirar ni separar el punto de la i; nada de juegos con el ojo. La sección Logo tiene el detalle y los PNG para lo que no lee SVG.

## Glifos e íconos

- No hay un set de íconos de marca. En la interfaz usá lucide a 16px, en el color del texto que acompaña, sólo cuando ayuda a operar; nunca decorativo.
- No uses ningún ícono de «IA»: ni destellos, ni cerebros, ni robots, ni varitas. Tampoco mascotas, ilustraciones ni emojis, en ningún lugar.
- Los cinco glifos de estado son la única forma propia del sistema, y viven en la sección Estados.

## Mercado Libre y terceros

- Nombrá a Mercado Libre como un hecho y en texto: «tu cuenta de Mercado Libre», «para vendedores de Mercado Libre». iris siempre más grande; Mercado Libre nunca en un titular, nunca sujeto de la frase.
- No uses su logo, su isotipo, su amarillo (#FFE600), su azul (#3483FA), una captura de su interfaz como imagen ni un diseño que se le parezca.
- No escribas «partner», «oficial», «certificado», «aliado», «integración oficial» ni «powered by». No pongas «expertos» pegado a «Mercado Libre».
- No pongas Mercado Libre ni sus palabras («mercado», «libre», «pago», «envíos», «crédito») en el nombre de la app, de un módulo o de una cuenta. La app se llama «iris».
- Escribí «Mercado Libre» en dos palabras; en portugués, «Mercado Livre». En público nunca «MercadoLibre», «MeLi» ni «ML».
- Nombrá a Mercado Pago como un hecho («pagás con Mercado Pago»); su cian (#00BCFF) nunca es nuestro.
- Nombrá a Claude en texto («conectá tu cuenta a Claude», «funciona en Claude»). Su logo no va sin aprobación previa de Anthropic, y no imites su identidad: ni su clay (#D97757), ni su marfil, ni su tipografía. Claude nunca más grande que iris.
- El descargo y los demás detalles están en la sección Mercado Libre.

## Lo que no

El violeta, en cualquier tono. El amarillo de Mercado Libre. Juegos con el iris del ojo. «El primer empleado de IA». Playfair. Mascotas, robots, destellos y emojis. Glow, sombras y gradientes llamativos. Blur fuera del vidrio. «Piloto automático», «24/7», «bot» y los superlativos.

## No sincronizado

- No hay una librería de componentes en el repo: los componentes de este sistema son reconstrucciones estáticas de las piezas del manual, armadas con estos tokens.
- El movimiento no entra en `tokens.json`: las duraciones y las curvas van escritas en Movimiento. Tampoco entran la opacidad (0,9 en hover, 0,4 deshabilitado, 0,45 en el latido), los grosores de borde y de foco, el blur y la saturación del vidrio, el tamaño y el trazo de los glifos, el largo de línea ni la distancia del subrayado: sus valores están escritos en este manual.
- Los PNG de `pieces/` (perfil, banners, portadas, plantillas de redes) no se copiaron. Los logos están en `assets/Logos/`.
