# Button

El botón de iris: tinta llena para la única acción principal, ghost para la secundaria y ghost rojo para lo que borra o revierte, en 28 px en la app y 40 px en la landing y las piezas.

Reconstrucción estática de `.boton`, `.boton-lleno` y `.boton-ghost` de `pieces/redes/plantillas/_comun/plantilla.css`, según `guide/06-forma-espacio-movimiento.md` (6.5) y `guide/08-piezas-propias.md` (8.6) de iris-brand.

## Cuándo se usa

- **Tinta llena:** la acción principal de la pantalla, «Aprobar» en la tarjeta de aprobación, el CTA de la landing. Hay una sola por pantalla.
- **Ghost:** la secundaria, «Rechazar con motivo».
- **Destructivo:** borrar, revertir o reemplazar, «Borrar 12 publicaciones».
- **Borde:** el botón principal cuando a la vista hay un sello (el titular de dos líneas, ver `Headline`): borde de 1 px en `text-primary`, sin relleno y con la letra en `text-primary`. En marketing, con el sello petróleo, porque el foco es la firma y lo que dice la pieza: lleno, «Aprobar» era lo que más se veía en las piezas, y eso era un defecto. En la app, con el sello de tinta, porque el sello es el único bloque lleno de tinta. Sin sello a la vista, el principal es la tinta llena.

## Qué provee quien lo usa

- Un `<button>` (un link que navega es un `<a>`, nunca al revés).
- El texto, que dice exactamente qué pasa: «Aprobar», «Rechazar con motivo», «Borrar 12 publicaciones». Nunca «OK», «Enviar» ni «¿Estás seguro?».
- El tamaño: `size-control-dense` (28 px) en la app, `size-control-comfortable` (40 px) en la landing y las piezas.

## Construcción

- Texto en `.label` (13/500), `radius-control`, borde de 1 px. Padding horizontal `space-3` a 28 px y `space-4` a 40 px.
- Tinta llena: fondo y borde `action-primary`, texto `text-on-action`. En hover baja a opacidad 0,9.
- Ghost: sin relleno, borde `border-default`, texto `text-primary`. En hover, `bg-hover`.
- Destructivo: sin relleno, texto y borde `action-destructive`. En hover, `bg-hover`.
- Foco: outline de 2 px en `focus` a 2 px de distancia, con `:focus-visible`.
- Deshabilitado: el control entero a opacidad 0,4.
- Todo lo que se toca mide 24 × 24 px o más (`size-target-min`).

## Sí

- Una confirmación para lo destructivo, que repite el objeto: «Borrar 12 publicaciones».
- Un ícono de lucide de 16 px sólo si ayuda a operar, en el color del texto.

## No

- Dos botones llenos en la misma pantalla.
- El destructivo con relleno rojo, o el rojo como acento de un botón que no borra.
- Otro color de relleno, sombras, gradientes o un tercer peso de letra.
- La mono o la firma en un botón.
