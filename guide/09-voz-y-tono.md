# 09 · Voz y tono

iris habla como el mejor empleado que tuviste: sabe todo de tu cuenta, resuelve antes de que se lo
pidas y te consulta cuando hay plata en juego. Sus rasgos están en el capítulo 01 (1.4).

Le habla a quien decide: el dueño que vende solo o con un equipo chico, o la empresa y la agencia
que manejan varias cuentas. Los dos tienen poco tiempo para leer y miran cifras; quieren saber qué
se hizo, qué falló y qué les toca decidir. Cómo cambia el registro con cada uno, en el 9.12.

Lo que se promete: **trabaja solo donde vos lo dejás; si no decidiste, te espera.**
Cómo se cuenta: arrancás aprobando todo y le vas soltando lo que quieras a medida que confiás,
hasta automatizar todo si querés. La confianza la da el dueño; iris se la gana acertando.
Lo que no se promete nunca: piloto automático, que reemplaza a tu equipo, una IA que hace todo.

---

## 9.1 Cuatro pilares

| Pilar | Qué hacer | Sí | No |
|---|---|---|---|
| **Preciso** | Decí el número, la fecha y contra qué se midió. | «Vendió 27 en 7 días; leído hoy a las 10:40.» | «Vendé más.» |
| **Callado** | Una idea por oración, sin adjetivos. | «Contestó la pregunta a las 09:12.» | «Respuestas rápidas, precisas y humanas.» |
| **Honesto** | Decí lo que no sabés. «No lo leí» no es lo mismo que «no tiene». | «No pude leer el stock de esa variante.» | «No tiene stock», cuando nadie lo leyó. |
| **Del dueño** | Hablale a quien decide, de vos. La autonomía la da el dueño; iris no se la toma. | «Lo que no decidiste, te espera.» · «Espera tu OK.» | «Se encarga de todo sin que hagas nada.» · «Los usuarios pueden configurar permisos.» |

---

## 9.2 Reglas de copy

Vienen de la landing de la primera versión, que se borra; las reglas quedan.

1. **No se inventan métricas.** Cada número sale de una sola fuente. Si no suma, no se publica, y
   el cero también se muestra. Una cifra de ejemplo se marca como tal.
2. **Sin evidencia no hay página.** Ni página, ni promesa, ni glifo lleno.
3. **Se comparan categorías, nunca marcas.** No se nombra a ningún competidor.
4. **iris nunca es un «bot».**
5. **Sin jerga.** Nada de «MCP», «API», «endpoint», «orquestación» ni «AI-first» fuera de la
   documentación técnica. Se dice «conectá tu cuenta a Claude».
6. **El argumento es un resultado, uno por pieza:** velocidad, margen, reputación, control o
   tiempo (9.13).
7. **Sólo se promete lo que existe.** Se nombran los clientes de IA donde iris está probado (hoy,
   Claude y ChatGPT), y nunca datos de otros vendedores: iris lee sólo la cuenta que el dueño conectó.
8. **En una demo se dice qué está acelerado y qué está tapado.**
9. **Nuestra anotación nunca se parece a la palabra del producto.** Si explicamos una captura, la
   nota lleva su propio rótulo.
10. **Voz activa.** Un titular de landing ocupa 3 o 4 líneas en 390 px; la bajada dice sólo lo
    que la grilla o la pieza no pueden decir solas.
11. **Los botones dicen exactamente qué pasa**: «Aprobar», «Rechazar con motivo», «Borrar 12
    publicaciones». Los errores dicen qué pasó y cómo se arregla. Un vacío es una instrucción, con
    el botón que lo llena.
12. **Un «no» nunca sale solo**: va con lo que sí hay.
13. **Sin superlativos sobre el producto**: el mejor del mercado, el único, el más rápido. «El mejor
    empleado que tuviste» describe cómo habla iris; no se compara con nadie.
14. **Cifras exactas en la página, y un piso redondo en la meta** (la descripción para buscadores
    envejece mejor con «más de 450» que con «467»). Se eligen unidades que se sienten: «27 por
    día», no «800 por mes».
15. **Con calma**: sin signos de exclamación, emojis, mayúsculas sostenidas ni urgencia inventada.
    Sí: «Probalo en iris-agents.com.» No: «¡Últimos cupos! Sumate YA.»

---

## 9.3 En lo público, el resultado

Adentro trabajan tres agentes (Cliente, Producto y Vendedor). Afuera se vende una sola cosa: iris.

- **En lo público** (banner, redes, landing, OG, video) cada fila y cada frase dicen qué logró
  iris: «Contestó 40 preguntas», «Resolvió 3 reclamos», «Generó 3 ventas adicionales», «Adhirió a
  una promoción», «Mejoró la reputación». Sin «Cliente ·», «Producto ·» ni «Vendedor ·»: quien ve
  la pieza todavía no usó la app.
- **En la app** los agentes se nombran por su rol, como etiqueta gris: «Producto · recuperó el
  Buy Box». No hay un cuarto agente, ni apodos, ni «nuestro robot de precios».
- Ningún agente va en un titular, un claim ni un nombre de producto.

---

## 9.4 El nombre en el texto

Las reglas completas están en el capítulo 02. Lo que más se olvida al escribir:
- **«iris»** va en minúscula, también al abrir una oración, y sin artículo: «iris resolvió el
  reclamo».
- **«Iris Agents»** con mayúsculas es sólo el nombre formal de la empresa.
- Lo que hace iris se cuenta con verbos, no con módulos con nombre propio: «iris Reclamos» no
  existe.

---

## 9.5 Idiomas

| Idioma | Trato | Nota |
|---|---|---|
| es-AR | voseo sobrio: «conectá», «vos decidís» | El idioma de la marca base. |
| es neutro (México y el resto) | tuteo: «conecta», «tú decides» | Sin modismos de ningún país. |
| pt-BR | «você» | El canal se escribe «Mercado Livre». |
| en | neutro | — |

- **La marca base no lleva modismos, moneda ni nombres de organismos de un país.** Lo local vive
  en los datos de la cuenta, no en el copy: la moneda, los impuestos, el formato de la fecha.
- **El separador decimal sigue al idioma**: coma en castellano y portugués («0,29»), punto en
  inglés («0.29»).
- **El idioma de la app sale de la cuenta.** El de una publicación es siempre el del sitio donde
  se publica.
- Lo que lee el modelo (tools, instrucciones, errores) va en inglés neutro: ver el capítulo 10.

---

## 9.6 Hacia el comprador

- **iris nunca firma.** Lo que lee un comprador (una respuesta, un mensaje, la solución de un
  reclamo) habla con la voz del vendedor, en su tono y con sus datos.
- **La marca no aparece en la vidriera**: ni «respondido por iris», ni el ícono, ni un pie.
- Las reglas de voz de este capítulo valen igual (preciso, callado, honesto); el trato y el
  registro son los que eligió el vendedor.

---

## 9.7 Palabras

| Sí | No |
|---|---|
| cuenta, cliente, producto, propuesta, aprobación | bot, chatbot, asistente virtual |
| memoria, criterio, «te espera», «espera tu OK» | piloto automático, magia, revolucionar |
| agente, tu equipo, tu cuenta | «Iris AI», «la herramienta» |
| ejecuta, analiza, responde, cuida; margen, reputación, posicionamiento, venta cruzada | revoluciona, disruptivo, potenciar, sinergia |
| un piso redondo: «miles de preguntas por mes» | «100 % automatizado», «sin errores», «contesta todo» |
| contestó, resolvió, recuperó, reponer (verbo + objeto) | «reemplaza a tu equipo», «el primer empleado de IA», copiloto |
| «tu cuenta de Mercado Libre», «para vendedores de Mercado Libre» | «partner», «oficial», «certificado», «aliado», «powered by» de Mercado Libre |
| «conectá tu cuenta a Claude» | MCP, API, endpoint, orquestación, AI-first (en público) |
| Mercado Libre, Mercado Livre | MercadoLibre, Mercadolibre, MeLi, ML (en público) |
| una cifra con su fecha | el mejor, el único, el más |

Además: «expertos» no va pegado a «Mercado Libre», porque evoca un programa de Mercado Libre
(capítulo 12). El titular del banner, «Agentes expertos / a cargo de tu e-commerce.», está bien
porque no lo nombra.

---

## 9.8 El titular de dos líneas

- La primera línea, en la sans; la segunda, en la firma y en color, la frase (capítulo 05, 5.3). El
  corte lo decide el copy: la firma entra donde la frase se vuelve personal. «Agentes expertos / a
  cargo de tu e-commerce.»
- La segunda línea es la que remarca: por eso va en color y no en gris.
- La segunda línea no lleva números y termina en punto.
- Un titular de una sola línea va entero en la sans: la firma no se agrega para decorar. Y la frase
  nunca va sola, sin su primera línea (capítulo 05, 5.3).

---

## 9.9 A revalidar

- El ancla de precio contra un sueldo: se revisa cuando se fije el precio por uso. La imagen del
  empleado ya se usa (capítulo 01, 1.4); «el primer empleado de IA» sigue afuera, porque «el
  primero» no se puede sostener.

---

## 9.10 Testimonios

Un usuario real puede aparecer en una pieza **sólo si firmó su consentimiento por escrito**. Es la
única excepción a «ningún cliente ni dato real» (capítulo 01, 1.5, principio 7): todo lo demás
sigue con datos de ejemplo.

- **El consentimiento se guarda.** Por escrito (un mail o un documento firmado), con la fecha, el
  uso que autoriza y el texto exacto que aprobó. Se guarda fuera de este repo, en el registro
  privado de iris. Sin consentimiento guardado, no se publica.
- **Qué se puede mostrar:** el nombre de la persona (y el de su tienda, si lo autorizó), su rubro,
  la cita textual y las cifras que la persona aprobó, cada una con su fecha y contra qué se midió
  («95 de 100 preguntas respondidas en 3 días, agosto de 2026»). Nada que no esté en el texto
  aprobado: no se edita la cita ni se redondea una cifra.
- **El permiso se puede retirar.** Si la persona lo retira, la pieza se baja de donde se pueda, no
  se vuelve a usar y se anota la fecha del retiro junto al consentimiento.
- **Mercado Libre sigue igual:** no va en titulares ni en pauta paga aunque la persona venda ahí. Si
  hace falta, va como un hecho chico («vende en Mercado Libre»), y su logo sólo como apoyo (capítulo 12).
- **Se ve como testimonio:** la cita lleva el nombre y la fecha. Una pieza con un testimonio no
  lleva «Datos de ejemplo.»: o es real y aprobada, o es de ejemplo, nunca las dos en la misma pieza.

---

## 9.11 La conversación en redes

- **Quién dijo qué.** En una pieza, lo que escribe la persona va en la casilla, si está por
  enviarse, o en la burbuja, si ya se envió; lo que contesta iris va sin globo y empieza con la línea
  «tool · estado». Sin avatar, sin columnas por turno y sin los tres puntitos de «escribiendo».
  Cómo se dibuja cada uno, en el capítulo 15 (15.7); la pieza entera es el intercambio (capítulo
  08, 8.9).
- **El mensaje se escribe bien,** aunque sea lo que tipea el dueño: en sus palabras y de vos, con
  mayúscula al empezar y, si es una pregunta, con los dos signos. «¿Qué se queda sin stock este
  finde?», nunca «qué se queda sin stock este finde». Un pedido lleva su punto: «Bajame el precio de
  la cafetera a 21.900.». Vale también para las preguntas de los titulares, las pills y los textos
  de cada red. No es un titular: no lleva la firma.
- **La respuesta es una cifra con su unidad**, con la voz de siempre: «6.100 por venta.». El OK es
  una pregunta corta con su palabra: «¿La bajo? Espera tu OK.».
- **La línea de contexto**, la de arriba de todo en una pieza de redes, dice el tema, la campaña o
  la fecha en una a tres palabras y sin punto («Precios», «Aprobaciones», «Domingo, 22 hs»), o para
  quién es («Para vendedores de Mercado Libre»). A la derecha, si hay una fecha real, va cuándo
  («Faltan 2 semanas»). Nunca lleva «iris», porque sale en mayúsculas. La lleva la lámina que abre:
  un post, una story, la portada de un carrusel. Puede faltar donde el tema ya está a la vista, como
  en un titular con una pieza propia o en el interior y el cierre de un carrusel. Si nombra a
  Mercado Libre, sigue el capítulo 12. La letra y la pill, en el capítulo 15 (15.6).

---

## 9.12 Un tono, dos públicos

Es la misma personalidad; cambia a quién le duele y cómo se cuenta.

- **Con el vendedor** (Instagram, TikTok, X): cómplice y directo. Segunda persona, voseo y alguna
  expresión del rubro («¿hay stock?», «el finde»). Lo que se destaca: cuánto te queda de verdad
  cada venta, las ventas que no se escapan, las horas libres. «Vendiste más este mes. ¿Ganaste
  más?»
- **Con la empresa y la agencia** (LinkedIn): ejecutivo y cercano. Habla de «tu equipo» y «tus
  cuentas», de vos y sin modismos. Lo que se destaca: crecer en cuentas sin sumar gente al mismo
  ritmo, la reputación de cada cuenta, el control del equipo y que cada respuesta tiene su porqué.
  «Con diez cuentas, tu equipo llega. Con la número once, alguien se queda hasta tarde.»
- **Con humor** (X y los reels): irónico y rápido, sobre situaciones que cualquier vendedor
  reconoce, y sobre iris misma. Nunca del comprador como persona, de la competencia ni de política.
  Si hay que explicar el chiste, no va. La temperatura de cada formato de redes, en el capítulo 15
  (15.9).

---

## 9.13 Seis principios para cualquier red

Valen para Instagram, LinkedIn, X, la web y los mensajes directos.

1. **Primero el problema, después iris.** La primera línea nombra algo que el lector vive: una
   venta perdida, un margen que se va, un reclamo un domingo. iris aparece en la segunda o la
   tercera.
2. **Un resultado por pieza.** Velocidad, margen, reputación, control o tiempo: si hay dos, son dos
   piezas.
3. **Mostrar, no prometer.** Un caso, una cifra, una captura o una pregunta real que se le puede
   hacer a la cuenta. Con datos de ejemplo, la pieza dice «Datos de ejemplo.».
4. **El control siempre a la vista.** Toda pieza que muestra a iris actuando deja claro, aunque sea
   en una línea, que vos elegís qué hace sola y qué te consulta: todo es configurable, también lo
   que toca plata. Nunca «siempre espera tu OK»: depende de cómo la configuró cada cuenta.
5. **Frases cortas.** Menos de 20 palabras por frase, de vos y sin jerga (9.2).
6. **Un solo pedido al final.** Comentar, escribir o probar: uno por pieza, nunca los tres.

