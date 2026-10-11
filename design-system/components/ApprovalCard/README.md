# ApprovalCard

La tarjeta de aprobación: lo que iris quiere hacer y todavía no hizo, con las cifras de antes y después y los dos botones para decidir.

Reconstrucción estática del `.aprobacion` de `pieces/redes/plantillas/_comun/plantilla.css` y su markup en `pieces/redes/plantillas/feed-4x5/feed-4x5-pieza.html`, según `guide/08-piezas-propias.md` (8.3) de iris-brand.

## Cuándo se usa

- Cuando una acción no está autorizada: iris la propone y espera. Es la pieza que mejor dice la promesa: trabaja solo donde vos lo dejás; si no decidiste, te espera.
- En la app, dentro del hilo o del feed; en una pieza pública, como imagen del producto.

## Qué provee quien lo usa

- El título: la acción como verbo + objeto, «Reponer Mochila urbana 22 L».
- Lo que va a hacer, en filas concepto / cifra: el cambio como antes → después («Stock publicado 3 → 43»), la evidencia («Vendió en 7 días 27») y cuándo se leyó el dato («Leído hoy · 10:40», con la hora en `.mono`).
- Las dos acciones, con estos textos y no otros: «Aprobar» y «Rechazar con motivo».

## Construcción

- Panel en `bg-raised` con borde de 1 px en `border-default` y `radius-panel`, un nivel arriba del feed; padding `space-5` y `space-4` entre bloques.
- Arriba, el antetítulo «Propuesta» en `.eyebrow`, `text-tertiary` y mayúsculas por CSS; a la derecha, la píldora «Espera tu OK» (la misma del `Feed`).
- El título en `.title` (18/500), en `text-primary`.
- Las filas en `.copy-ui`, separadas por `border-subtle`: el concepto en `text-secondary`, la cifra en `text-primary` con `tabular-nums`, alineada a la derecha.
- «Aprobar» es el CTA de tinta (`action-primary` con `text-on-action`); «Rechazar con motivo», ghost con `border-default`. Ver `Button`.

## Sí

- En la app, la tarjeta además dice cuánto arriesga (en `.mono`) y deja abrir lo que va a mandar («Lo que va a hacer»). Rechazar abre un campo para el motivo, que le vuelve al agente, y el botón pasa a «Confirmar rechazo».
- Cuando flota sobre el feed o sobre fotos, la tarjeta es vidrio (`.glass-panel`, ver `Glass`); adentro todo sigue sólido. Dentro del hilo, del feed o en una pieza estática, va lisa.
- En lo público, el antetítulo es «Propuesta», nunca el nombre de un agente, y las cifras se marcan como de ejemplo.
- En una pieza con titular de dos líneas, «Aprobar» va con borde en `text-primary` y sin relleno: el foco es la firma, en el sello petróleo, y lo que dice la pieza (ver `Button`, variante Borde). En la app, igual con el sello de tinta a la vista.

## No

- Cambiar los textos de los botones o poner dos botones llenos.
- Sacar la fecha de lectura, o mostrar una cifra de cambio sin su antes → después.
- El ámbar fuera de la píldora y del glifo, o cualquier color de estado pintando la tarjeta.
- Sombras: el nivel lo dicen la luz del fondo y el borde.
