# 09 · Voz y tono

iris habla como un operador senior callado: el vendedor de mostrador que se acuerda de la gente y
conoce sus productos. Es preciso, memorioso, transparente y calmo. No es un chatbot simpático, ni un
mago de la IA, ni un asistente servil, ni un truco de crecimiento.

Le habla al dueño de la cuenta, o a quien decide en ella: alguien que ya vende, que tiene poco
tiempo para leer y que mira cifras. Quiere saber qué se hizo, qué falló y qué le toca decidir.

Lo que se promete: **trabaja solo donde vos lo dejás; si no decidiste, te espera.**
Lo que no se promete nunca: piloto automático, que reemplaza a tu equipo, una IA que hace todo,
atención 24/7.

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
6. **El argumento es el criterio, no la velocidad.** Lo que se vende es que lo que se aprendió una
   vez sirve para siempre, a la vista; no que contesta rápido.
7. **Sólo se promete lo que existe.** Se nombran los clientes de IA donde iris está probado (hoy,
   Claude), y nunca datos de otros vendedores: iris lee sólo la cuenta que el dueño conectó.
8. **En una demo se dice qué está acelerado y qué está tapado.**
9. **Nuestra anotación nunca se parece a la palabra del producto.** Si explicamos una captura, la
   nota lleva su propio rótulo.
10. **Voz activa.** Un titular de landing ocupa 3 o 4 líneas en 390 px; la bajada dice sólo lo
    que la grilla o la pieza no pueden decir solas.
11. **Los botones dicen exactamente qué pasa**: «Aprobar», «Rechazar con motivo», «Borrar 12
    publicaciones». Los errores dicen qué pasó y cómo se arregla. Un vacío es una instrucción, con
    el botón que lo llena.
12. **Un «no» nunca sale solo**: va con lo que sí hay.
13. **Sin superlativos**: el mejor, el único, el más.
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
| memoria, criterio, «te espera», «espera tu OK» | piloto automático, 24/7, magia, revolucionar |
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

- La primera línea, en la sans; la segunda, en la firma, calada en el sello (capítulo 05, 5.3). El
  corte lo decide el copy: la firma entra donde la frase se vuelve personal. «Agentes expertos / a
  cargo de tu e-commerce.»
- La segunda línea es la que remarca: por eso va en el sello y no en gris.
- La segunda línea no lleva números y termina en punto.
- Un titular de una sola línea va entero en la sans: la firma no se agrega para decorar.

---

## 9.10 Testimonios

Un usuario real puede aparecer en una pieza **sólo si firmó su consentimiento por escrito**. Es la
única excepción a «ningún cliente ni dato real» (1.7): todo lo demás sigue con datos de ejemplo.

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
  hace falta, va como un hecho chico («vende en Mercado Libre»), nunca con su logo (capítulo 12).
- **Se ve como testimonio:** la cita lleva el nombre y la fecha. Una pieza con un testimonio no
  lleva «Datos de ejemplo.»: o es real y aprobada, o es de ejemplo, nunca las dos en la misma pieza.

---

## 9.9 A revalidar

- La metáfora de «empleado» y «sueldo» de la primera versión. «El primer empleado de IA» está
  rechazado; el ancla de precio contra un sueldo se revisa cuando se fije el precio por uso.
