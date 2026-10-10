# StatusGlyph

El glifo de estado: cinco formas de 10 px que dicen en qué está cada cosa, siempre con su palabra al lado o con una leyenda al pie.

Reconstrucción estática de `guide/04-color.md` (4.6) y `guide/08-piezas-propias.md` (8.1) de iris-brand; el dibujo es el de los `<symbol>` de `pieces/redes/plantillas/cuadrado/cuadrado-pieza.html`.

## Cuándo se usa

- En cada fila de un listado con estados: el feed «Hoy en tu cuenta», la línea «tool · estado», una lista de pendientes.
- En la leyenda al pie de ese listado, con sólo los estados que aparecen y en el orden de las filas.
- No es un ícono: no se reemplaza por uno de lucide ni sirve de viñeta.

## Qué provee quien lo usa

- El estado, que fija la forma y el color. Ninguna forma se repite.
- La palabra de su sección: en un hilo de preguntas lo resuelto se dice «respondida»; en la línea de una tool, «listo». La forma y el color no cambian.
- Un `<svg>` de 10 × 10 px con `viewBox="0 0 10 10"` y el color por `currentColor`, que sale del token del estado.

| Glifo | Estado | Token | Qué dice |
|---|---|---|---|
| ● | te toca | `status-attention` | El dueño tiene que decidir. Es el único ● del set. |
| ✕ | falló | `status-failed` | Algo no se pudo hacer. |
| ◐ | trabajando | `status-working` | iris lo está haciendo ahora. El verde es movimiento. |
| ○ | esperando | `status-idle` | Espera a un tercero (un comprador, el canal) o nadie lo configuró. |
| ✓ | resuelto | `status-done` | Terminó. Es el gris de `text-tertiary`: va en silencio. |

```html
<symbol id="te-toca" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.25" fill="currentColor"/></symbol>
<symbol id="fallo" viewBox="0 0 10 10"><path d="M1.8 1.8 8.2 8.2M8.2 1.8 1.8 8.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" fill="none"/></symbol>
<symbol id="trabajando" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 1a4 4 0 0 1 0 8z" fill="currentColor"/></symbol>
<symbol id="esperando" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/></symbol>
<symbol id="resuelto" viewBox="0 0 10 10"><path d="M1.6 5.4 4 7.8 8.6 2.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/></symbol>
```

## Sí

- Glifo más palabra, o glifo más leyenda: «● te toca · ✕ falló · ◐ trabajando · ○ esperando · ✓ resuelto».
- El orden de la urgencia: te toca, falló, trabajando, esperando, resuelto.
- `aria-hidden="true"` en el glifo cuando la palabra está al lado; si va sin palabra visible, lleva su nombre accesible.
- En lo animado, el ◐ late en opacidad dos veces al entrar al estado (dos ciclos de 1,2 s que bajan a 0,45) y queda quieto. Con `prefers-reduced-motion`, quieto siempre.

## No

- Un sexto color o un sexto estado.
- El color de estado fuera del glifo: ni texto, ni fondo, ni borde, ni titular. La excepción es el rojo, que también va como texto en el botón destructivo, en el error de un campo y en la línea de una tool que falló.
- El ámbar del claro como texto o en un trazo fino: va sólo como relleno, en el ●.
- El verde para decir «bien», «éxito» o algo terminado; el ◐ girando o como «cargando» genérico.
- Otro elemento dibujado como punto lleno, círculo hueco o medio círculo, en ningún color.
