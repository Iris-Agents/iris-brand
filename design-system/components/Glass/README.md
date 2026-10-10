# Glass

El vidrio ahumado de iris: la barra y el panel de la capa que flota sobre contenido que se mueve, y en ningún otro lugar.

Reconstrucción estática de `css/glass.css` de iris-brand, con las variables de este sistema (`glass-bar`, `glass-panel`, `glass-rim`, `glass-specular`), según `guide/06-forma-espacio-movimiento.md` (6.8).

## Cuándo se usa

- **`.glass-bar`:** la barra flotante de la landing, alineada al contenedor de 1080 px (no una píldora chica en el medio). Lleva sólo `text-primary`, `text-secondary`, el CTA de tinta sólido y el foco.
- **`.glass-panel`:** lo que flota con texto: ⌘K sin cortina, popovers y menús, la tarjeta de aprobación cuando flota sobre el feed o sobre fotos.

## Qué provee quien lo usa

- Algo que de verdad flota encima de contenido que se mueve: sin movimiento detrás, el vidrio es un dibujo de vidrio.
- El contenido de adentro, sólido: el CTA de tinta y el ghost (ver `Button`), el texto en sus tokens.

## La receta

- Sin soporte de `backdrop-filter`, el nivel 2 liso: `bg-raised` con borde de 1 px en `border-default`.
- Con soporte: borde en `glass-rim`, la línea de luz de 1 px inset arriba en `glass-specular` (`box-shadow: inset 0 1px 0`; es luz, no sombra), `backdrop-filter: blur(24px) saturate(1.4)`, y el tinte `glass-bar` (`bg-surface` al 80 %) o `glass-panel` (`bg-raised` al 94 %).
- El blur de 24 px y la saturación de 1,4 son de iris-brand (`glass.blur`, `glass.saturate`) y no son tokens de este sistema: van escritos así.
- Con `prefers-reduced-transparency: reduce` o `prefers-contrast: more`, vuelve a la superficie lisa; con `forced-colors: active`, `Canvas` y `CanvasText` sin blur.

## Sí

- El contraste lo garantiza el tinte, no el blur: con el peor fondo detrás y sin desenfoque, el texto permitido pasa.
- Aparece y se va con `opacity`, en el mismo elemento que lleva el vidrio.
- ⌘K va con vidrio o con `backdrop`, nunca con los dos: con la cortina, el vidrio desaparece.

## No

- En el contenido: feed, cards, tablas, chat, documentos, formularios. La tarjeta de aprobación adentro del feed es contenido y va lisa.
- En una pieza estática: OG, banner, redes, logo.
- Vidrio sobre vidrio, más de dos a la vez, o a pantalla completa.
- En la barra: `text-tertiary`, placeholder, texto rojo, `border-control` o glifos de estado. Si hacen falta, es un panel.
- Lente, refracción, ruido, tinte de color, sombra, o animar el blur o un `filter` del padre.
