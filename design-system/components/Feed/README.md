# Feed

El panel «Hoy en tu cuenta»: la lista de lo que pasó hoy en la cuenta, con lo que necesita al dueño arriba y lo que iris resolvió abajo.

Reconstrucción estática del `.feed` de `pieces/redes/plantillas/_comun/plantilla.css` y su markup en `pieces/redes/plantillas/cuadrado/cuadrado-pieza.html`, según `guide/08-piezas-propias.md` (8.2) de iris-brand.

## Cuándo se usa

- Es la pieza propia que muestra el producto: el centro de la landing, el motivo de las OG, el corazón del banner y de los posts.
- En la app, como resumen del día de la cuenta.

## Qué provee quien lo usa

- Las filas, en el orden de la urgencia: te toca, falló, trabajando, esperando, resuelto. Cada una lleva su `StatusGlyph`.
- La acción de cada fila como verbo + objeto, con el objeto o la cifra en `<b>`: «Reponer **Mochila urbana 22 L**», «Contestó **40 preguntas**». El verbo dice el estado: «Reponer» (te toca, lo que propone), «Revisa» (trabajando), «Contestó» (resuelto), «No pudo» (falló).
- A la derecha, una sola cosa: la píldora «Espera tu OK» sólo en te toca, «en curso» sólo en trabajando, y nada en lo demás.
- La leyenda al pie, con sólo los estados que aparecen y en el orden de las filas.

## Construcción

- Panel en `bg-surface` con borde de 1 px en `border-subtle` y `radius-panel`; padding de 18 px arriba, `space-5` a los lados y 14 px abajo.
- El eyebrow «Hoy en tu cuenta» en `.eyebrow`, `text-tertiary` y `text-transform: uppercase`: en el HTML va en minúscula normal, y por eso nunca lleva «iris».
- Cada fila en `.copy-ui`: glifo de 10 px, acción y dato, en una grilla con `space-3` de separación y 11 px de aire arriba y abajo, separadas por `border-subtle`. El verbo va en `text-secondary`; lo que va en `<b>`, en `text-primary` 500.
- La píldora: 24 px de alto (`space-6`), borde `border-control`, `radius-pill`, texto `.label` en `text-primary`. «en curso» va en la sans, en `text-tertiary`.
- En una pieza de redes el panel se agranda entero con `zoom` (las plantillas usan 2,4); no se cambian tamaños sueltos.

## Sí

- En lo público (banner, redes, landing, OG), cada fila dice el resultado y todas conservan secundario y primario: «Contestó 40 preguntas», «Resolvió 3 reclamos», «Generó 3 ventas adicionales», «Adhirió a una promoción», «Mejoró la reputación».
- Una pieza de sólo resultados lleva todas las filas con ✓ y puede ir sin leyenda: el verbo en pasado ya dice que terminó.
- Las cifras de una pieza pública son de ejemplo, y fuera del panel una nota lo dice: «Datos de ejemplo.»
- En la app, lo resuelto baja a gris (la acción a `text-tertiary` y el objeto a `text-secondary`), la hora va a la derecha en `.mono` y `text-tertiary`, y la fila puede llevar el agente como etiqueta gris antes de un punto medio: «Producto · recuperó el Buy Box».

## No

- El nombre de un agente en lo público: quien ve la pieza todavía no usó la app.
- Dos cosas a la derecha de una fila, o la píldora fuera de te toca.
- Una barra de color al costado de una fila o del panel, sombras o vidrio: el feed es contenido.
- Mercado Libre como logo o con sus colores; se nombra como un hecho, si hace falta.
