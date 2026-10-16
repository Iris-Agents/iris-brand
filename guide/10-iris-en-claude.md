# 10 · iris adentro de Claude

Es la superficie más vista de la marca, y casi no tiene imagen: es texto. Cuando alguien conecta
su cuenta a Claude, lo que construye la impresión de iris son los nombres de las tools, sus
descripciones, sus errores y las respuestas que salen de ellas. Este capítulo es la voz de iris en
ese lugar.

Este repo es público. Acá van los principios; la gramática completa de nombres y las reglas de
cada carpeta viven en el repo del producto, junto al código que las cumple.

---

## 10.1 Quién lee qué

| Quién | Qué lee | En qué idioma |
|---|---|---|
| **El modelo** | Los nombres de las tools, sus descripciones y las de cada argumento, las instrucciones del servidor, las skills y los errores. | Inglés neutro, siempre. |
| **La persona** | La respuesta del modelo, la confirmación que pinta el cliente de Claude antes de una escritura, y el ícono y el nombre del conector. | El de la cuenta. |

Por qué inglés: es neutro. Una descripción en castellano sesga al modelo a contestarle en
castellano a un vendedor de Brasil. El idioma en que el modelo le habla a la persona sale de la
configuración de la cuenta, no del texto de las tools. Lo único que se traduce es lo que lee una
persona: la interfaz y la instrucción de en qué idioma contestar.

---

## 10.2 Nombres

- **El nombre dice qué devuelve, no cómo lo hace.** Es la primera señal con la que el modelo elige,
  así que vale más un nombre exacto que una descripción larga.
- **El sufijo es un contrato.** Una vista de una entidad, un listado, una agregación a números, el
  contexto alrededor de una entidad y el veredicto de un dominio llevan cada uno su sufijo, y ese
  sufijo significa lo mismo en todas las tools.
- **El prefijo declara la fuente.** Una tool que lee lo que iris ya guardó lleva un prefijo
  distinto de una que va al canal en vivo, y las tools propias de iris llevan `iris_`. Un nombre
  pelado nunca promete una fuente que no es.
- **Un sustantivo por una necesidad, una tool.** Sin duplicados por escala: la que trae muchas
  también trae una.
- **Las tools que son espejo del canal** conservan los nombres del canal y no se renombran. Las
  palabras del canal (`_list`, `_search`) no se usan para lo nuestro.
- **El vocabulario es nuestro y es uno.** Un concepto, una palabra, en todas las tools: si una dice
  «variation», ninguna dice «variant».

---

## 10.3 Descripciones

Una descripción no es documentación: es la instrucción con la que el modelo decide qué tool usar y
cómo. Se escribe así:

- **De 2 a 4 oraciones, en tercera persona.** La primera dice qué devuelve, concreto. Después,
  cuándo usarla, y su trampa.
- **Si escribe, lo dice.** Y si la escritura tiene riesgo, dice cuál: «replaces the whole array»,
  «public and permanent».
- **Lo que no chequea, también lo dice.** Mejor que el modelo sepa que una tool no verifica algo a
  que lo suponga.
- **El énfasis se conserva donde previene un error real.** Un NEVER es un NEVER, no un «avoid».
  Pero no hay mayúsculas de relleno.
- **Nada inferido se escribe como hecho.** Lo que la documentación del canal no dice y nadie midió
  no va.
- **Ningún ritmo prometido.** Una tool no dice «tarda 2 s»: el ritmo depende del resto del trabajo.

Sí:

> Returns the account's open claims, newest first, with the deadline and the last message of each.
> Use it to see which claims need an answer today. It only reads: it never replies or changes a
> claim.

No:

> Use this after claims_search to get the details of this account's claims in ARS. Super fast and
> smart!

Lo que falla en el segundo: nombra a otra tool, supone «esta cuenta», supone una moneda, promete
velocidad y elogia.

---

## 10.4 Una tool habla de sí misma

Una descripción que manda a otra tool es un error. Se paga en cada turno, se duplica, y cuando la
otra cambia queda mintiendo sin que nada falle. El filtro es una pregunta: **¿la descripción nombra
a otra tool?**

| Lo que dice | A dónde va |
|---|---|
| «después llamá a X para completar» | Es una cadena: se hace una vez, en código, como una tool compuesta. |
| «eso ya lo tenés en Y» | Es inventario: va en las instrucciones del servidor. |
| «calculá con…», «compará contra…» | Es criterio de oficio: va en una skill. |
| no nombra a nadie | Se queda, aunque sea imperativa. |

Lo último importa: «el cargo fijo ya está incluido, no lo sumes de nuevo» es una trampa del dato
de esa misma tool. Si se muda a una skill, quien llame la tool sin leer la skill suma dos veces. No
sale lo imperativo: sale lo que nombra a otro.

---

## 10.5 Sin cliente, sin proveedor, sin país

Lo que lee el modelo de un cliente lo lee el modelo de todos.

- **Ningún cliente** se nombra: ni su tienda, ni su rubro, ni una cifra suya como ejemplo.
- **Ningún proveedor ni competidor** se nombra fuera del adaptador que habla con él. Una tool que
  dice «coordinar con» un sistema ajeno la lee el modelo de todos los clientes.
- **Ninguna cuenta supuesta.** Nunca «this account», «your account» ni «the connected seller». La
  cuenta la elige quien llama, por un argumento que agrega el servidor; la descripción dice «the
  account's …».
- **Ningún país supuesto.** Ni una moneda, ni un huso horario, ni un organismo. Los ejemplos de ids
  van de más de un sitio (`MLA1234567890 or MLB1234567890`).
- **La disponibilidad por país se dice sólo si el canal la declara**, al final: «Available only in:
  MLA, MLB.» Una restricción mal puesta hace que el modelo se niegue a algo que anda; ante la
  duda, no se pone.
- **Los ids propios salen del contexto.** El id del vendedor nunca es un argumento: lo sabe la
  cuenta. El de otra persona sí, y se nombra por su rol (`buyer_id`).

---

## 10.6 Respuestas

Las respuestas las escribe el modelo; lo que iris controla es lo que le devuelve y cómo se lo pide.

- **Hechos con fuente.** Cada cifra sale de una lectura, con su hora. Si una pasada no leyó algo,
  lo devuelve como no leído, nunca como cero. «No lo leí» no es «no tiene».
- **Una escritura devuelve lo que contestó el canal, no lo que se pidió.** Un 2xx no prueba que el
  cambio ocurrió. Si quien llama dice qué valor cree que hay, lo que no coincide no se toca.
- **Las escrituras se marcan como tales**, para que el cliente de Claude pida confirmación. Nunca
  se le baja la guardia a una escritura: lo público o lo irreversible (un mensaje al comprador, un
  reembolso) se confirma siempre.
- **Toda respuesta termina con la cuenta sobre la que actuó.**
- **Los errores dicen qué pasó y qué hacer**, en inglés, igual que la descripción. Un error no
  revela lo que no le corresponde a quien preguntó.
- Las reglas de voz del capítulo 09 valen para las instrucciones: sin superlativos, sin emojis, sin
  urgencia.

---

## 10.7 En el directorio de conectores

- **El ícono**, full-bleed, probado a 16, 24 y 32 px sobre claro y sobre oscuro (capítulo 11). Si
  el directorio redondea, la máscara la pone él.
- **El nombre es «iris».** Nunca «iris for Mercado Libre», «iris AI» ni «iris for Claude».
- **Una línea sin superlativos**, que dice qué hace y con qué permiso. En inglés: «iris answers
  buyers and manages a Mercado Libre seller account, within the permissions the owner sets.» En
  castellano: «iris atiende a tus clientes y maneja tu cuenta de Mercado Libre, con los permisos
  que vos le das.»
- **El logo de Claude**, sólo como apoyo (capítulo 12, 12.5). En texto,
  «funciona en Claude» o «conectá tu cuenta a Claude».
- Lo que pide el directorio (tamaños, formato del ícono, largo de la descripción) hay que
  verificarlo en su documentación antes de cada envío.
