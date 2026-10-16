# 13 · Accesibilidad

La regla es **WCAG 2.2 nivel AA**, en los dos modos. Este capítulo es la lista de control: lo que
frena el test no se puede romper, y lo demás se revisa antes de entregar una pieza o una pantalla.

---

## 13.1 Contraste

Lo frena el test: ninguno de los 169 pares baja de su mínimo sobre ninguno de los fondos de su
modo (canvas, surface, raised, hover y selected en oscuro; canvas, hover y selected en claro).

Cada par, con su mínimo y su valor sobre el canvas y sobre el peor fondo de cada modo, está en el
capítulo 04 (4.4).

- [ ] Ningún color fuera de los tokens. Un valor nuevo entra por el archivo de tokens, y el test lo
      mide contra todos los fondos.
- [ ] Lo que se lee de corrido va en `text.primary`; el apoyo de 13 px para arriba, en
      `text.secondary`; `text.tertiary` sólo para datos sueltos (hora, id, contador, eyebrow), nunca
      para una oración. Una nota fija y corta, como «Datos de ejemplo.», cuenta como dato (capítulo
      04, 4.5).
- [ ] En claro, el ámbar de te toca va sólo como glifo lleno: nunca como texto ni en un trazo fino
      (no llega a 4,5:1).
- [ ] La frase va en `signature.phrase` (9,65:1 en el peor fondo del oscuro, 8,13:1 en el del
      claro) o, en lo que te toca, en `text.primary`; nunca en ámbar. Donde sigue un sello, la letra
      se lee contra su bloque: 16,89:1 y 16,82:1 el de tinta, 11,87:1 el petróleo, con un mínimo de
      7:1 (capítulo 04, 4.9).
- [ ] La luz de fondo es decorativa: nada se lee sobre ella sin un vidrio encima, lleva
      `aria-hidden` y se apaga con `prefers-reduced-transparency`, `prefers-contrast: more` y
      `forced-colors`.
- [ ] No se baja la opacidad de un texto que dice algo. La opacidad de 0,4 es para un control
      deshabilitado entero, que WCAG exime.
- [ ] En el vidrio, el contraste lo garantiza el tinte, no el desenfoque: pasa con blanco puro
      detrás aunque el blur no se pinte. En la barra flotante no van texto gris ni glifos de estado.

## 13.2 El estado no depende del color

- [ ] Cada estado tiene su forma (● ✕ ◐ ○ ✓) y ninguna se repite.
- [ ] Siempre glifo + palabra, o glifo + leyenda.
- [ ] Con protanopía y deuteranopía, el ámbar se separa del verde y del rojo por la luz. El verde y
      el rojo tienen la misma luz en oscuro: los separa la forma, ◐ contra ✕.
- [ ] El glifo es decorativo cuando la palabra está al lado: lleva `aria-hidden="true"`. Si en algún
      lugar va sin palabra visible, lleva su nombre accesible.
- [ ] Un link en texto corrido va subrayado (1 px, a 3 px de distancia), porque tiene el mismo color
      que el texto.

## 13.3 Foco y lo que se toca

- [ ] El foco se ve siempre: un outline de 2 px a 2 px de distancia, en `focus` (la tinta). Con
      `:focus-visible`, para que no aparezca al hacer clic con el mouse.
- [ ] Todo lo que se toca o se clickea mide 24 × 24 px o más (`size.target-min`, WCAG 2.5.8).
- [ ] Los controles de la app miden 28 px de alto, y los de la landing, 40.
- [ ] El orden del foco sigue el orden de lectura. Un diálogo atrapa el foco y lo devuelve al
      cerrarse: se usa `<dialog>` nativo.

## 13.4 Movimiento y transparencia

- [ ] Con `prefers-reduced-motion: reduce`, todo queda quieto y visible: la entrada del titular, los
      pliegues y el latido del ◐.
- [ ] El ◐ late dos veces (2 × 1,2 s) y queda quieto: menos de los 5 s que pide WCAG 2.2.2 para
      algo que se mueve solo. Nunca gira ni late en loop.
- [ ] Se animan transform, opacity y colores; nunca `filter` ni `transition: all`. El vidrio no se
      anima: aparece y se va con opacity.
- [ ] Con `prefers-reduced-transparency` o `prefers-contrast: more`, el vidrio vuelve a la superficie
      lisa. Safari no le pasa a la web la preferencia de reducir transparencia, y por eso el tinte
      tiene que garantizar el contraste solo.
- [ ] Con `forced-colors: active`, el vidrio se apaga y manda el sistema (Canvas y CanvasText).
- [ ] En el HTML del que sale un reel, con `prefers-reduced-motion: reduce` se ve el cuadro final,
      quieto y con todo visible (capítulo 06, «Movimiento en piezas de video»).

## 13.5 Texto

- [ ] Ningún texto por debajo de 12 px. La mono tampoco.
- [ ] La firma, como texto, desde 32 px y sólo en 400 (lo frena el test). El logotipo y la i del
      ícono son dibujos y tienen su mínimo propio (capítulo 03).
- [ ] La app pone `html { font-synthesis: none; }`: el navegador nunca inventa una negrita ni una
      itálica, ni en la firma ni en la sans.
- [ ] El largo de línea tiene tope: 72 caracteres para el hilo, 66 para documentos, 60 para la
      bajada.
- [ ] El `<html>` lleva el `lang` del idioma de la página (`es`, `pt-BR`, `en`).
- [ ] La página se lee a 320 px de ancho sin scroll horizontal (WCAG 1.4.10). El gutter baja a
      16 px abajo de 600.

## 13.6 Estructura

- [ ] Un solo `<h1>` por página, y los títulos en orden.
- [ ] Las tablas tienen `<th scope>`; las cifras van alineadas a la derecha y tabulares.
- [ ] Los botones son `<button>` y los links son `<a>`: un link no ejecuta una acción.
- [ ] Un error de campo se asocia a su campo (`aria-describedby`) y dice qué pasó y cómo se arregla.

## 13.7 Imágenes, piezas y video

- [ ] `og:image:alt` y el texto alternativo de una pieza describen la imagen, no repiten el título.
      Si la pieza tiene texto, el alternativo lo dice.
- [ ] En redes, cada post lleva su texto alternativo (Instagram y Facebook lo permiten al publicar).
- [ ] El video tiene poster, `preload="none"`, y su conversación también está en HTML. Si tiene voz,
      lleva subtítulos.
- [ ] Una censura con chip dice «oculto» en texto, que también se lee con un lector de pantalla.
- [ ] En una pieza con foto, el texto que cae sobre la foto pasa 4,5:1 contra lo que tiene
      detrás, medido en la PNG; si la foto es generada con IA, la pieza lo dice.

---

## Cómo se verifica

- **Tokens:** `pnpm build` corre el test con la matriz de contraste entera; si un par falla, no hay
  build (capítulo 14, 14.4).
- **Una pantalla o una página:** recorrerla con el teclado, mirarla en los dos modos, con
  `prefers-reduced-motion` y con zoom al 200 %.
- **Una pieza de redes:** renderizarla, medirla y repasar la lista de control de
  `pieces/redes/plantillas.md` (secciones 6 y 7).
