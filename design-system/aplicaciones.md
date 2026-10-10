# Aplicaciones

Cómo se arma cada pieza que sale de iris. Todas usan lo mismo: el negro de marca, el ícono o el lockup, el titular de dos líneas y las piezas propias. Lo que cambia es el tamaño y lo que la plataforma tapa.

## Reglas de todas

- **Oscuro.** El fondo es `brand-black`. Las piezas no usan el claro, salvo el email.
- **Sin efectos.** Sin glow, sombras, vidrio ni gradientes. La única excepción es el degradé radial de blanco al 4 % del banner de LinkedIn y de la portada de Facebook.
- **En lo público, el resultado.** Las filas dicen qué logró iris, sin el nombre del agente.
- **Cifras de ejemplo, marcadas.** «Datos de ejemplo.» en la pieza cuando hay lugar para una nota, y siempre en el HTML. Un dato real de un cliente no va nunca.
- **Mercado Libre como un hecho**, chico y en texto, nunca en un titular.
- **Con las fuentes cargadas.** Una pieza que se renderiza cayendo a Georgia o a la fuente del sistema no se entrega.

## Favicon e ícono de app

| Archivo | Medida | Para qué |
|---|---|---|
| `favicon.ico` | 32, con 16 adentro | Navegadores viejos y lectores de feeds. |
| `icon-small.svg` | vectorial | El favicon SVG de 16 a 23px. |
| `apple-touch-icon.png` | 180 | iOS, al agregar a la pantalla de inicio. |
| `icon-192.png`, `icon-512.png` | 192 y 512 | El manifiesto web. |
| `icon-maskable-512.png` | 512 | Android, que recorta con su máscara. |

- El ícono trae su fondo negro: el mismo archivo sirve sobre la pestaña clara y la oscura. El `theme-color` es el `bg-canvas` de cada modo.
- El ícono de app y el del directorio de conectores van siempre full-bleed: cuadrado, sin esquinas horneadas ni alfa. Antes de subirlo, miralo a 16, 24 y 32px sobre claro y sobre oscuro. En el directorio el nombre es «iris», nunca «iris for Mercado Libre», «iris AI» ni «iris for Claude».

## Foto de perfil

- El ícono a sangre: la i blanca sobre el cuadrado negro, sin borde. La misma foto para Instagram, Facebook, WhatsApp, X, GitHub y Google Workspace.
- El archivo es `pieces/redes/perfil/perfil-1080.png` (1080 × 1080; el dibujo es `assets/Logos/icon-profile.svg`). Se sube cuadrado y cada red lo recorta en círculo: la i entra en el círculo del 80 % y el recorte no la toca.
- El logo de la página de empresa de LinkedIn es otro: `pieces/linkedin/logo-empresa-400.png`, el ícono a sangre de `icon.svg` a 400 × 400.

## Banner del perfil de LinkedIn (1584 × 396)

- Fondo `brand-black`, con el degradé radial de blanco al 4 % arriba a la derecha.
- La zona de la foto queda libre: LinkedIn la pone en x 33–373 en la computadora y en x 67–702 en el celular. El contenido empieza en x 718.
- Después de esa zona, el lockup y, debajo, el titular a 40px: «Agentes expertos / *a cargo de tu e-commerce.*», con `.headline-section-first` en `text-primary` y `.headline-section-second` en `text-secondary`.
- A la derecha, el feed en un panel de 340px con los cinco resultados («Mejoró la reputación», «Contestó 40 preguntas», «Resolvió 3 reclamos», «Generó 3 ventas adicionales», «Adhirió a una promoción»), cada uno con ✓, el verbo en `text-secondary` y el objeto en `text-primary` 500.
- Mercado Libre va en el «Acerca de» del perfil, no en el banner.

## Portada de la página de empresa de LinkedIn (1512 × 256)

- El logo de la página ya está al lado: va la marca sola (`wordmark-white.svg`) y el titular a la derecha de donde cae el logo. Sin feed, porque no entra, y sin degradé.

## Portada de Facebook (1640 × 624)

- La hermana del banner: el mismo titular y el mismo degradé radial. Mercado Libre va en el «Acerca de».
- La foto de perfil tapa la esquina de abajo a la izquierda y el celular recorta los costados: las zonas seguras están en la especificación de plantillas.

## OG (1200 × 630)

- El lockup arriba a la izquierda y un `.eyebrow` de contexto arriba a la derecha; el titular de dos líneas a 64px (`.headline-hero-first` y `.headline-hero-second`); la tarjeta de aprobación o unas filas del feed como imagen del producto; abajo a la izquierda, una línea de hechos con su fuente; abajo a la derecha, el dominio en `.mono`.
- Se genera desde la página, con el mismo texto que dibuja, nunca como un PNG fijo con cifras que envejecen. Sin degradé.
- La página declara `og:image:width`, `og:image:height` y un `og:image:alt` que describe la imagen. `twitter:card` es `summary_large_image`.

## Video y demos

- 1920 × 1080 a 30 fps, fondo `brand-black`. Clips de 15 a 25 s donde se vean las llamadas, con la línea «tool · estado».
- Si la demo está acelerada, se dice cuánto. Lo de una cuenta real va con la censura con chip; mejor, con datos de ejemplo.
- En la web: poster, `preload="none"` y la conversación también como texto. Con voz, subtítulos.

## Propuestas y one-pagers

- Se leen en pantalla: en oscuro, con el lockup, el titular de dos líneas, las piezas propias y la grilla segmentada para las cifras.
- Una pieza reutilizable no nombra a ningún cliente. La propuesta para un cliente puede nombrarlo sólo a él, y no se reutiliza.

## Email

- Fondo claro, porque los clientes de correo invierten o ignoran el oscuro. El ícono conserva su cuadrado negro.
- El texto primero: el nombre va escrito («iris»); el ícono, si va, es una imagen con `alt="iris"`.
- Un solo CTA de tinta, que dice qué pasa al tocarlo.
- La firma de mail de una persona lleva el lockup como imagen al doble de resolución (`lockup-on-light-1024.png` sobre blanco).

## Plantillas de redes

En Instagram va el 4:5; el cuadrado queda para Facebook; además hay story y carrusel. Cada pieza es un HTML editable con su PNG, y una versión `-guias` con las zonas seguras que nunca se publica. La bio puede decir «tu cuenta de Mercado Libre», sin logo ni colores; el nombre de la cuenta nunca lleva Mercado Libre.

Capítulo completo: [11 Aplicaciones](https://github.com/Iris-Agents/iris-brand/blob/main/guide/11-aplicaciones.md). Zonas medidas de LinkedIn: [pieces/linkedin/README.md](https://github.com/Iris-Agents/iris-brand/blob/main/pieces/linkedin/README.md). Formatos, zonas seguras y largos máximos de las plantillas: [pieces/redes/plantillas.md](https://github.com/Iris-Agents/iris-brand/blob/main/pieces/redes/plantillas.md).
