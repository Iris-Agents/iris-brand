# Estados

Cinco estados, cinco formas, y ninguna se repite. Cada uno tiene un glifo de 10px, un color y una palabra. El color va sólo en el glifo y refuerza a la forma: nunca la reemplaza.

| Glifo | Palabra | Token | Oscuro · claro | Qué dice |
|---|---|---|---|---|
| ● lleno | te toca | `status-attention` | #f7ac4d · #ad721c | El dueño tiene que decidir. Es el único ● del set. |
| ✕ | falló | `status-failed` | #e66e68 · #bc3732 | Algo no se pudo hacer. |
| ◐ medio círculo | trabajando | `status-working` | #50a064 · #266739 | iris lo está haciendo ahora. El verde es movimiento. |
| ○ hueco | esperando o sin declarar | `status-idle` | #ededea · #4e4d49 | Espera a un tercero (un comprador, el canal) o nadie lo configuró. |
| ✓ | resuelto | `status-done` | #9b9a96 · #686764 | Terminó, en silencio: es el gris de `text-tertiary`. |

No existe un sexto color. Se probó un azul para «novedad» y quedó pegado al cian de Mercado Pago; ningún estado lo necesita.

## Los glifos

Cuadro de 10 × 10, dibujados a 10px, con el color por `currentColor`. Pintá el color con el token del estado:

```html
<svg width="10" height="10" style="display:none">
  <symbol id="te-toca" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.25" fill="currentColor"/></symbol>
  <symbol id="fallo" viewBox="0 0 10 10"><path d="M1.8 1.8 8.2 8.2M8.2 1.8 1.8 8.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" fill="none"/></symbol>
  <symbol id="trabajando" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 1a4 4 0 0 1 0 8z" fill="currentColor"/></symbol>
  <symbol id="esperando" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/></symbol>
  <symbol id="resuelto" viewBox="0 0 10 10"><path d="M1.6 5.4 4 7.8 8.6 2.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/></symbol>
</svg>

<svg width="10" height="10" aria-hidden="true" style="color:var(--status-attention)"><use href="#te-toca"/></svg>
<span class="copy-ui" style="color:var(--text-secondary)">te toca</span>
```

- El ○ y el contorno del ◐ llevan trazo de 1,5; el ✕ y el ✓, de 1,7 con puntas redondas.
- El glifo es decorativo cuando la palabra está al lado: `aria-hidden="true"`. Si va sin palabra visible, lleva su nombre accesible.
- Los glifos no son íconos: no se reemplazan por lucide ni se agrandan como adorno.

## La regla de cada uno

- **Te toca (●).** Va arriba de todo, agrupado: con el CTA, es lo único que grita. En el feed lleva la píldora «Espera tu OK». No lo uses para llamar la atención si no hay una decisión pendiente. En claro va sólo como relleno: nunca como texto ni en un trazo fino (pasa 3:1 como glifo, no llega a 4,5:1).
- **Falló (✕).** El único estado que también va como texto: el error de un campo, el botón destructivo y la línea de una tool que falló, siempre con una oración que dice qué pasó y cómo se arregla. Nunca como acento ni como alarma decorativa.
- **Trabajando (◐).** Contorno de radio 4 con la mitad derecha llena, todo en verde, con «en curso» a la derecha de la fila. En lo animado late suave en opacidad dos veces al entrar al estado (dos ciclos de 1200ms que bajan a 0,45) y queda quieto; nunca gira. En una pieza quieta, quieto. El verde nunca quiere decir «bien», «éxito» ni «crecimiento», y el ◐ no es un «cargando» genérico.
- **Esperando o sin declarar (○).** En oscuro es el blanco del sistema; en claro baja a `text-secondary` para no pesar más que te toca. Lo que nadie declaró se ve hueco, nunca como un default silencioso. Nunca como viñeta de una lista.
- **Resuelto (✓).** El gris de los datos sueltos, y la fila también baja a gris: la acción a `text-tertiary`, el objeto a `text-secondary`. Va abajo de la lista y no festeja. La excepción es una pieza pública de sólo resultados, como el banner, donde las filas con ✓ no bajan a gris porque el resultado es el mensaje.

## La regla de todos

- Siempre glifo + palabra, o glifo + leyenda.
- Ordená por urgencia: te toca, falló, trabajando, esperando, resuelto.
- Al pie de cada listado con estados mezclados va la leyenda, con sólo los estados que aparecen y en el mismo orden: «● te toca · ✕ falló · ◐ trabajando · ○ esperando · ✓ resuelto».
- La leyenda usa la palabra de su sección: en un hilo de preguntas, lo resuelto se dice «respondida»; en la línea de una tool, «listo». La forma y el color no cambian.
- La palabra va en los tokens de texto. Nunca pintes de estado un texto (salvo el rojo), un fondo, un borde, un titular ni el logotipo.
- Ningún otro elemento se dibuja como un punto lleno, un círculo hueco o un medio círculo, ni siquiera en otro color.
- Con daltonismo (protanopía y deuteranopía), el ámbar se separa por luz del verde y del rojo. El verde y el rojo tienen casi la misma luz en oscuro: los separa la forma, ◐ contra ✕.

## Contraste

Cada glifo pasa 3:1 sobre los cinco fondos de su modo, y el rojo como texto pasa 4,5:1. Peor caso, sobre `bg-selected`:

| Token | Mínimo | Oscuro | Claro |
|---|---|---|---|
| `status-attention` | 3 | 7,91 | 3,33 |
| `status-working` | 3 | 4,73 | 5,62 |
| `status-done` | 3 | 5,38 | 4,66 |
| `status-idle` | 3 | 12,92 | 6,98 |
| `status-failed` como texto | 4,5 | 4,91 | 4,64 |

Sobre `glass-panel` pasan igual. Sobre `glass-bar` no van.

Capítulos completos: [04 Color, «Los cinco estados»](https://github.com/Iris-Agents/iris-brand/blob/main/guide/04-color.md) · [08 Piezas propias, «El glifo de estado»](https://github.com/Iris-Agents/iris-brand/blob/main/guide/08-piezas-propias.md).
