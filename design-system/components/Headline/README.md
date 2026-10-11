# Headline

El titular de dos líneas: la primera en IBM Plex Sans 500 y `text-primary`, la segunda en la firma (DM Serif Display itálica) en el sello, las dos del mismo tamaño.

El sello reemplazó a la firma en gris (2026-10-10): el gris, en lugar de remarcar, apagaba. Hay dos sellos, con la misma geometría:

| Sello | Dónde | Bloque | Letra | En iris-brand |
|---|---|---|---|---|
| Petróleo | Marketing: posts, stories, reels, carruseles, banners, portadas de LinkedIn y Facebook, el titular de la landing y las OG | `signature-marketing-block` (#03313C, en los dos modos) | `signature-marketing-text`, la tinta (#EDEDEA), a 11,87:1 | `.signature-seal-marketing` de `css/signature.css`; en las piezas de redes, `.sello` de `pieces/redes/_base/brand.css` |
| De tinta | La app | `signature-block` | Calada en `signature-text`, a 16,89:1 en oscuro y 16,82:1 en claro | `.signature-seal` de `css/signature.css` |

Receta, igual en los dos: la línea de la firma con 0,16em de aire arriba e interlineado 1; adentro, el sello con `padding: 0.14em 0.16em 0.18em 0.13em`, interlineado 0,86 y esquinas rectas, sin borde ni sombra. El petróleo casi no se despega del negro (1,42:1), a propósito: el sello lo hace la letra. Con el sello a la vista, el botón principal va con borde (ver `Button`).

Reconstrucción estática del `.titular` de `pieces/redes/plantillas/_comun/plantilla.css` y del `.headline` de `pieces/redes/facebook/portada.html`, según `guide/05-tipografia.md` (5.2 y 5.3) de iris-brand.

## Cuándo se usa

- **Hero** (`.headline-hero-first` + `.headline-hero-second`, 64/1,05): el hero de la landing y las OG, con el sello petróleo.
- **Sección** (`.headline-section-first` + `.headline-section-second`, 40/1,1): titulares de sección, el banner, y el hero abajo de 600 px de ancho (`layout-breakpoint-narrow`).
- El titular de la marca es «Agentes expertos / *a cargo de tu e-commerce.*», el del banner y la portada de Facebook.

## Qué provee quien lo usa

- Las dos líneas, cortadas donde la frase se vuelve personal: ahí entra la firma.
- Cada línea en un `<span>` en bloque, con `text-wrap: balance`, dentro de un solo `<h1>` o `<h2>`.

## Sí

- El sello petróleo en todo lo de marketing y el de tinta en la app, nunca al revés.
- La segunda línea sin números y terminada en punto.
- Un titular de una sola línea va entero en Plex Sans.
- `html { font-synthesis: none; }`, para que el navegador no le invente una negrita a la firma.
- En la landing, el titular es la única entrada orquestada de la página: entra línea por línea con `opacity` y `translateY`, a 600 ms y con 80 ms de desfase; con `prefers-reduced-motion`, quieto y visible.

## No

- El petróleo fuera del sello de marketing: de fondo, en una franja, en el texto, en un borde o en el logo. Tampoco aclararlo ni saturarlo para que el bloque se despegue más.
- La firma fuera de sus tres usos (el logotipo, la i del ícono y esta segunda línea), como texto por debajo de 32 px, o en un peso que no sea 400.
- Una palabra suelta en la firma adentro de una línea sans, o las dos líneas en la firma.
- Tamaños distintos entre las dos líneas, tipografía fluida o un tracking distinto del de su estilo.
- «Mercado Libre» en el titular: se nombra como un hecho en la bajada, el «Acerca de» o la bio, nunca pegado a «expertos».
