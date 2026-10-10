# Headline

El titular de dos líneas: la primera en IBM Plex Sans 500 y `text-primary`, la segunda en la firma (DM Serif Display itálica) y `text-secondary`, las dos del mismo tamaño e interlineado.

Reconstrucción estática del `.titular` de `pieces/redes/plantillas/_comun/plantilla.css` y del `.headline` de `pieces/redes/facebook/portada.html`, según `guide/05-tipografia.md` (5.2 y 5.3) de iris-brand.

## Cuándo se usa

- **Hero** (`.headline-hero-first` + `.headline-hero-second`, 64/1,05): el hero de la landing y las OG.
- **Sección** (`.headline-section-first` + `.headline-section-second`, 40/1,1): titulares de sección, el banner, y el hero abajo de 600 px de ancho (`layout-breakpoint-narrow`).
- El titular de la marca es «Agentes expertos / *a cargo de tu e-commerce.*», el del banner y la portada de Facebook.

## Qué provee quien lo usa

- Las dos líneas, cortadas donde la frase se vuelve personal: ahí entra la firma.
- Cada línea en un `<span>` en bloque, con `text-wrap: balance`, dentro de un solo `<h1>` o `<h2>`.

## Sí

- La segunda línea sin números y terminada en punto.
- Un titular de una sola línea va entero en Plex Sans.
- `html { font-synthesis: none; }`, para que el navegador no le invente una negrita a la firma.
- En la landing, el titular es la única entrada orquestada de la página: entra línea por línea con `opacity` y `translateY`, a 600 ms y con 80 ms de desfase; con `prefers-reduced-motion`, quieto y visible.

## No

- La firma fuera de sus tres usos (el logotipo, la i del ícono y esta segunda línea), como texto por debajo de 32 px, o en un peso que no sea 400.
- Una palabra suelta en la firma adentro de una línea sans, o las dos líneas en la firma.
- Tamaños distintos entre las dos líneas, tipografía fluida o un tracking distinto del de su estilo.
- «Mercado Libre» en el titular: se nombra como un hecho en la bajada, el «Acerca de» o la bio, nunca pegado a «expertos».
