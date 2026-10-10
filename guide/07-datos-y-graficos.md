# 07 · Datos y gráficos

Un dato de iris es un hecho: dice cuánto, de cuándo es y de dónde salió. Un gráfico es la forma más
rápida de mostrar un hecho, no un adorno. Es el principio «hechos, no adjetivos» (capítulo 01)
llevado a los números.

## 7.1 Cifras

- **Cada cifra va con su fecha y su fuente:** «Vendió 27 en 7 días · leído hoy a las 10:40». En una
  pieza pública, además, contra qué se midió.
- **Cada número sale de una sola fuente.** Si no suma, no se publica.
- **El cero también se muestra.** Un resultado en cero no se esconde.
- **No leído no es cero.** Si un dato no se pudo leer, se dice («sin leer»); nunca se muestra un 0
  que nadie midió.
- **Toda cifra lleva su unidad, y una unidad que se sienta:** «27 por día», no «800 por mes».
- **Un cambio se muestra con las dos puntas:** «Stock publicado 3 → 43». Un porcentaje suelto, sin
  la cifra de antes y la de después, no va.
- **Formato:** en la sans, que ya tiene cifras tabulares; numéricas alineadas a la derecha. Los ids y
  las horas en mono. El separador decimal sigue al idioma (coma en castellano y portugués, punto en
  inglés). La moneda es la de la cuenta: la marca base no fija ninguna.

## 7.2 Series

| Token | Oscuro | Claro | Trazo | Para qué |
|---|---|---|---|---|
| `data.series` | #EDEDEA | #1A1917 | Sólido, 1,5 px | La serie protagonista: lo que se está mirando. |
| `data.comparison` | #9B9A96 | #686764 | Punteado, 1,5 px | La referencia: el período anterior, el precio del ganador. |
| `data.grid` | #2C2B29 | #E3E3E1 | 1 px | Grilla y ejes. Es decorativa. |

- **Dos series como máximo por gráfico:** la protagonista y su referencia. Las dos pasan 3:1 sobre
  todos los fondos de su modo (capítulo 04).
- **Con más de dos, gráficos chicos repetidos**, uno al lado del otro y con la misma escala. Nunca
  más grises, nunca colores.
- **Se distinguen por el trazo**, sólido contra punteado, y no sólo por el gris: se leen igual en
  blanco y negro.
- **Se rotula la línea, no una leyenda de colores:** el nombre de la serie va al lado de su línea, en
  texto.
- **Las etiquetas de los ejes y los valores** van en `text.tertiary`: cifras en la sans, horas y
  fechas cortas en mono. La grilla es mínima: las líneas que hacen falta para leer el valor.

## 7.3 Lo que un gráfico de iris no hace

- **No usa colores de estado como series.** El ámbar, el verde y el rojo son estados, no categorías.
  Si hace falta marcar un evento sobre la serie (un fallo, una aprobación), va su glifo de 10 px con
  la palabra (capítulo 04).
- **No tiene degradés, áreas con gradiente, sombras, 3D ni glow.**
- **No exagera:** las barras arrancan en cero.
- **No se anima al entrar.** La página tiene una sola entrada orquestada, la del titular
  (capítulo 06); los datos aparecen quietos.
- **No muestra una cifra sin base**, ni un badge o un contador que nadie puede rastrear.

## 7.4 Tablas y cifras en grilla

- **Para cifras y reconciliaciones, una tabla, no N tarjetas.** La grilla segmentada separa las celdas
  con un hairline de `border.subtle` (capítulo 08).
- **Los encabezados** usan el estilo `eyebrow`: sans 500 de 12 px, en mayúsculas y `text.tertiary`.
- **Texto a la izquierda, números a la derecha**, tabulares.
- **Sin cebra ni rellenos de color.** El hover es `bg.hover`; la fila seleccionada, `bg.selected` con
  la regla inset de 2 px.
- **Un vacío es una instrucción** con el botón que lo llena, no «Sin datos».

## 7.5 Accesibilidad

- Todo gráfico tiene su equivalente en texto o en una tabla, para quien no lo ve.
- Una tabla de datos lleva `th` con `scope`.
- El color nunca es la única diferencia entre dos series ni entre dos estados.
