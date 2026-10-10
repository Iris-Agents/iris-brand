# 11 · Aplicaciones

Cómo se arma cada pieza que sale de iris. Todas usan lo mismo: el negro de marca, el ícono o el
lockup, el titular de dos líneas y las piezas propias del capítulo 08. Lo que cambia es el tamaño y
lo que la plataforma tapa.

Reglas que valen para todas:
- **Oscuro.** El fondo es `color.brand.black` (#0A0A09). El claro existe para la app; las piezas no
  lo usan, salvo el email (11.10).
- **Sin efectos.** Sin glow, sombras, vidrio ni gradientes. La única excepción es un degradé radial
  muy sutil (blanco al 4 %) en dos piezas: el banner de LinkedIn y la portada de Facebook.
- **El titular de dos líneas, con sello.** La segunda línea va calada en el sello (capítulo 05,
  5.3), que es el único bloque lleno de tinta de la pieza: si la pieza muestra la tarjeta de
  aprobación, «Aprobar» va con borde (capítulo 06, 6.5).
- **En lo público, el resultado.** Las filas dicen qué logró iris, sin el nombre del agente
  (capítulo 09).
- **Las cifras de una pieza son de ejemplo**, y se marcan: «Datos de ejemplo.» en la pieza cuando
  tiene lugar para una nota, y siempre en el HTML. Un dato real de un cliente no va nunca, salvo
  en un testimonio con consentimiento escrito (9.10).
- **Mercado Libre se nombra como un hecho**, chico y en texto, nunca en un titular (capítulo 12).

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
- **Fondo** `color.brand.black`, con el degradé radial de blanco al 4 %, arriba a la derecha.
- **La zona de la foto, libre:** LinkedIn pone la foto encima, en x 33–373 en la computadora y en
  x 67–702 en el celular. El contenido empieza en x 718.
- **Después de esa zona:** el lockup (el ícono y «iris agents») y, debajo, el titular de dos
  líneas a 40 px, «Agentes expertos / a cargo de tu e-commerce.». La primera línea en la sans 500 y
  `text.primary`; la segunda en la firma, calada en el sello. Sin Mercado Libre en el titular.
- **A la derecha:** el feed «Hoy en tu cuenta» en un panel de 340 px, con los cinco resultados:
  «Mejoró la reputación», «Contestó 40 preguntas», «Resolvió 3 reclamos», «Generó 3 ventas
  adicionales» y «Adhirió a una promoción». Cada fila con ✓, el verbo en `text.secondary` y el
  objeto en `text.primary` 500 (capítulo 08, sección 8.2).
- **Mercado Libre** va en el «Acerca de» del perfil, como un hecho: «para vendedores de Mercado
  Libre».
- **Antes de darlo por bueno,** mirarlo subido en la computadora y en un celular: cuánto recorta
  la app del celular a los costados no está medido.
- El diseño salió del canvas del banner en Claude Design; lo que se edita es el HTML.

## 11.5 Portada y logo de la página de empresa en LinkedIn

- **La portada** es `pieces/linkedin/portada-empresa.html` → `portada-empresa.png`, de 1512 × 256
  (verificada en la ayuda de LinkedIn el 2026-10-10). El logo de la página ya está al lado, así que
  va la **marca sola** («iris agents», sin el ícono) y el titular, «Agentes expertos / a cargo de tu
  e-commerce.», con la segunda línea en el sello, a la derecha de donde cae el logo. Sin feed,
  porque no entra, y sin degradé.
- **El logo** es `pieces/linkedin/logo-empresa-400.png`, de 400 × 400: el ícono a sangre de
  `logo/icon.svg`, cuadrado y sin transparencia. Sale de `logo-empresa.html`, y
  `logo-empresa-preview.png` lo muestra en chico, cuadrado y en círculo.
- Las zonas medidas y sus fuentes están en `pieces/linkedin/README.md`.

## 11.6 Portada de la página de Facebook (1640 × 624)

- El archivo es `pieces/redes/facebook/portada.html` → `portada.png`, y es la única versión. Lleva
  el mismo titular que el banner, «Agentes expertos / a cargo de tu e-commerce.», con la segunda
  línea en el sello, y el mismo degradé radial; es su hermana.
- **Mercado Libre** no va en el titular: va en el «Acerca de» de la página, como un hecho.
- La foto de perfil tapa la esquina de abajo a la izquierda y el celular recorta los costados: las
  zonas seguras y los largos de cada texto están en `pieces/redes/plantillas.md`, y hay que
  mirarla subida en la computadora y en un celular.
- Sus filas siguen la regla de lo público: resultados, sin el nombre del agente.

## 11.7 OG (1200 × 630)

- **La medida** es 1200 × 630 (1,91:1), de hasta 8 MB. La página declara `og:image:width`,
  `og:image:height` y un `og:image:alt` que describe la imagen, no que repite el título. Para
  `twitter:card` va `summary_large_image` con la misma imagen.
- **La composición:**
  - el lockup arriba a la izquierda y un eyebrow de contexto arriba a la derecha;
  - el titular de dos líneas a 64 px, con la segunda en el sello;
  - la tarjeta de aprobación o unas filas del feed, como imagen del producto; en la tarjeta,
    «Aprobar» va con borde, porque el sello es el único bloque lleno;
  - abajo a la izquierda, una línea de hechos con su fuente; abajo a la derecha, el dominio en la
    mono.
- **Se genera desde la página**: una plantilla HTML que lee `tokens.css` y se pasa a PNG en el
  build, con el mismo texto que dibuja la página. Nunca un PNG fijo con cifras que envejecen.
- La OG por defecto (la de una página sin la suya) vive en `pieces/`.
- Sin degradé: sólo lo llevan el banner y la portada de Facebook.

## 11.8 Video y demos

- 1920 × 1080 a 30 fps, fondo `color.brand.black`.
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

| Carpeta | Qué hay | Para qué red |
|---|---|---|
| `pieces/redes/_base/` | `brand.css` (colores, fuentes y las clases `.signature` y `.sello`), `render.sh`, `render-all.sh` y `piezas.tsv` | Todas |
| `pieces/redes/perfil/` | La foto de perfil y una hoja de control con la foto en chico | Instagram, Facebook y WhatsApp |
| `pieces/redes/facebook/` | La portada | Facebook |
| `pieces/redes/instagram/destacadas/` | Las portadas de las historias destacadas: un pictograma de trazo, sin texto | Instagram |
| `pieces/redes/plantillas/` | `feed-4x5/`, `cuadrado/`, `story/` (también portada de reel) y `carrusel/`, con lo común en `_comun/` | Instagram y Facebook |

- **Qué hay en cada carpeta:** `pieces/redes/README.md`.
- **El sello** ya viene armado en cada plantilla con titular de dos líneas: el texto de la segunda
  línea va adentro del `<span class="sello">`. Donde hay tarjeta de aprobación, «Aprobar» va con
  borde (`.boton-borde`).
- **LinkedIn** va aparte, en `pieces/linkedin/` (11.4 y 11.5), y sus PNG salen con el mismo
  `render-all.sh`.
- **La especificación de las plantillas** (formatos, zonas seguras, slots y largos máximos, cómo
  se renderiza y la lista de control): `pieces/redes/plantillas.md`. En Instagram va el 4:5; el
  cuadrado queda para Facebook.
- **Datos fijos:** Instagram `@iris_agents`, la página de Facebook «Iris Agents», la web
  `iris-agents.com`.
- **La bio** puede decir «tu cuenta de Mercado Libre», sin logo ni colores. El nombre de la cuenta
  nunca lleva Mercado Libre.

**Manda este manual.** La especificación de las plantillas se escribió antes de algunas decisiones
del 2026-10-10. Si todavía dice otra cosa, valen estas:
- Las filas del feed en una pieza pública dicen el resultado, sin «Cliente ·», «Producto ·» ni
  «Vendedor ·».
- La tarjeta de aprobación lleva el antetítulo «Propuesta», no el nombre del agente.
- La bio puede nombrar a Mercado Libre como un hecho.

Cómo se regeneran las PNG: capítulo 14.
