# Piezas propias

Un negro, un blanco, una sans y una serif itálica son la plantilla de las landings de IA de estos años. Lo que no tiene nadie es lo que hace iris, y por eso estas piezas son la imagen de la marca: el centro de la landing, el motivo de las OG, el corazón del banner y de los posts. Son siete: el glifo de estado (en la sección Estados), el feed, la tarjeta de aprobación, la línea «tool · estado», la grilla segmentada, el error con lo destructivo y la censura con chip.

## El feed «Hoy en tu cuenta»

La lista de lo que pasó en la cuenta hoy. Lo que necesita al dueño va arriba; lo que iris resolvió va abajo y en silencio.

- Panel en `bg-surface` con borde `border-subtle` y `radius-panel`.
- Arriba, el `.eyebrow` «Hoy en tu cuenta» en `text-tertiary` (escrito en minúscula, pasado a mayúsculas por CSS).
- Cada fila: glifo · acción · dato a la derecha, separadas por `border-subtle`. La acción es verbo + objeto: el verbo en `text-secondary`, el objeto en `text-primary` 500. «Contestó **40 preguntas**», «Reponer **Mochila urbana 22 L**».
- A la derecha va una sola cosa: la píldora «Espera tu OK» (`.label`, borde `border-control`, `radius-pill`) sólo en te toca; «en curso», en la sans, sólo en trabajando; la hora HH:MM en `.mono` y `text-tertiary` en el resto.
- Orden: te toca, falló, trabajando, esperando, resuelto. Lo resuelto baja a gris: la acción a `text-tertiary` y el objeto a `text-secondary`.
- Al pie, la leyenda.

```
HOY EN TU CUENTA
●  Reponer Mochila urbana 22 L              [Espera tu OK]
✕  No pudo activar una promoción                     11:30
◐  Revisa el precio del ganador                   en curso
○  Espera la respuesta de un comprador               12:20
✓  Resolvió 3 reclamos                               13:05
✓  Contestó 40 preguntas                             09:12
● te toca · ✕ falló · ◐ trabajando · ○ esperando · ✓ resuelto
```

- En la app, la fila puede llevar el agente como etiqueta gris antes de un punto medio: «Producto · recuperó el Buy Box».
- En lo público, la fila dice el resultado, sin el agente. Una pieza de sólo resultados (el banner) lleva todas las filas con ✓, sin bajarlas a gris, y la leyenda puede faltar.

## La tarjeta de aprobación

Lo que iris quiere hacer y todavía no hizo: trabaja solo donde vos lo dejás; si no decidiste, te espera.

- Panel en `bg-raised` con borde `border-default` y `radius-panel`: un nivel arriba del feed.
- Arriba a la izquierda, el `.eyebrow` «Propuesta»; arriba a la derecha, la píldora «Espera tu OK».
- El título en `.title` es la acción, verbo + objeto: «Reponer Mochila urbana 22 L».
- Debajo, filas concepto / cifra: el concepto en `text-secondary`, la cifra en `text-primary`, tabular. El cambio como antes → después («Stock publicado 3 → 43»), la evidencia («Vendió en 7 días 27») y cuándo se leyó («Leído hoy · 10:40», la hora en `.mono`).
- Dos botones con estos textos, que no se cambian: «Aprobar», el CTA de tinta (`action-primary` con `text-on-action`), el único lleno de la pantalla; y «Rechazar con motivo», ghost con `border-default`.
- En la app, además dice cuánto arriesga (en `.mono`) y deja abrir «Lo que va a hacer». Rechazar abre un campo para el motivo y el botón pasa a «Confirmar rechazo».
- Cuando flota sobre el feed o sobre fotos, es vidrio (`glass-panel`) y adentro todo es sólido. Dentro del hilo, del feed o de una pieza estática, va lisa.
- No: cambiar los textos de los botones, dos botones llenos, sacar la fecha de lectura, una cifra sin antes → después, el ámbar fuera de la píldora y el glifo.

## La línea «tool · estado»

El trabajo de iris a la vista, plegado en una línea: qué se llamó y cómo terminó.

- Glifo de estado + `nombre_de_la_tool · estado`, en `.mono` y `text-tertiary`. Si falló, la línea va en `status-failed`.
- Las palabras del estado: «preparando», «en curso», «espera aprobación», «listo», «falló», «rechazada», «cortada».
- El trabajo entre dos textos del agente se pliega en una línea de resumen: abierta mientras trabaja o si algo espera a la persona, plegada cuando terminó. Al abrirla, los bloques se rotulan «Entrada», «Salida» o «Error».
- En una pieza (OG, video, post) puede llevar la hora: `price_update · listo · 10:40`. Es la prueba de que iris trabaja con herramientas reales.

## La grilla segmentada

Para cifras y reconciliaciones: una tabla, no N tarjetas.

- Celdas separadas por un hairline de 1px en `border-subtle` (una grilla con `gap: 1px` sobre el color del borde), con borde exterior y `radius-panel`. Cada celda en `bg-surface`.
- En cada celda: la cifra (sans 500, tabular), el nombre en `.label` y, si hace falta, una oración en `text-secondary`. `text-tertiary` sólo para un dato suelto.
- Toda cifra con su unidad («27 por día»); el cero se muestra; el signo «+» va más chico y apagado.
- Sin barra de color a la izquierda de ninguna celda.

## Error y destructivo

- Una fila que falló lleva el ✕ y dice qué no pudo hacer: «No pudo activar una promoción». Al abrirla, una oración dice por qué y qué hacer.
- Un error de campo: borde y mensaje en `status-failed`, con el ✕ y una oración que dice qué pasó y cómo se arregla: «El precio tiene que ser mayor que 0.». Asociado al campo con `aria-describedby`.
- Una acción destructiva: botón ghost con texto y borde en `action-destructive`, nunca lleno. La confirmación repite el objeto: «Borrar 12 publicaciones», no «¿Estás seguro?».
- El rojo no se usa para nada más.

## La censura con chip

Cuando una captura o un video real muestran algo de una persona o de una cuenta (un nombre, un teléfono, un id), se tapa con un chip:

- `radius-chip`, fondo `bg-selected` y la palabra «oculto» en la sans de 12px y `text-tertiary`. Si ayuda, dice qué se tapó: «nombre oculto».
- A la altura de la línea, para que la lectura siga.
- Nunca barras negras, desenfoque ni pixelado.
- En una pieza pública, antes que censurar, datos de ejemplo.

Capítulo completo: [08 Piezas propias](https://github.com/Iris-Agents/iris-brand/blob/main/guide/08-piezas-propias.md). La especificación de las plantillas de redes, que traen el markup del glifo, del feed y de la tarjeta: [pieces/redes/plantillas.md](https://github.com/Iris-Agents/iris-brand/blob/main/pieces/redes/plantillas.md).
