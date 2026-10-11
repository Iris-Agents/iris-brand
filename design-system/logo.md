# Logo

El logo es un dibujo en contornos que sale de DM Serif Display itálica. Nunca se tipea: si hay SVG, va el SVG; donde no se puede, un PNG.

## Las tres piezas

| Pieza | Qué es | Cuándo va | Archivo |
|---|---|---|---|
| El ícono | Una «i» minúscula de la firma en `brand-white` sobre un cuadrado `brand-black`, a sangre. | Donde el espacio es cuadrado o chico: foto de perfil, favicon, ícono de app, el conector de Claude. | `assets/Logos/icon.svg` (24px para arriba), `assets/Logos/icon-small.svg` (16 a 23px), `assets/Logos/icon-profile.svg` (avatares que se recortan en círculo) |
| La marca | El logotipo «iris agents», todo en minúscula, a un solo color. | Donde el ícono ya está cerca: el header de la app, la portada de la página de empresa. | `assets/Logos/wordmark-white.svg` sobre oscuro, `assets/Logos/wordmark-black.svg` sobre claro |
| Juntos | El ícono a la izquierda y el logotipo a la derecha. Es el logo principal. | Todo lo demás: la web, la firma de mail, documentos y propuestas, el banner, el pie de los posts. | `assets/Logos/lockup.svg` sobre oscuro, `assets/Logos/lockup-on-light.svg` sobre claro |

Para elegir: si el espacio es cuadrado, el ícono. Si el ícono ya se ve en la misma pantalla, la marca sola. Si no, juntos. La i repetida (la del ícono y la de «iris») está aceptada.

## El ícono

- El cuadrado es 1:1, de `brand-black`, sin borde y sin esquinas: el archivo va a sangre y cada plataforma pone su máscara. Un archivo con esquinas horneadas muestra puntas claras cuando la plataforma aplica la suya.
- La i mide 0,64 del lado en `icon.svg`, 0,75 en `icon-small.svg` (ajustada al píxel para 16 y 32px) y 0,775 en `icon-profile.svg` (lo más grande que entra en el 80 % del radio cuando la red recorta en círculo).
- El centrado es óptico y ya está fijado en el SVG: no lo recentres.
- Tiene una sola versión: trae su propio fondo negro, así que va igual sobre claro y sobre oscuro. Sobre oscuro, como `<img>`, se ve la i sola; si hace falta ver el cuadrado, la pieza lo dibuja con borde `border-default`.

## La marca

- «iris agents» en minúscula, DM Serif Display itálica 400, con tracking de −0,01em y kerning ajustado a mano, vectorizado.
- Un solo color: «agents» no va en gris ni en otro tono que «iris». `brand-white` sobre oscuro, `brand-black` sobre claro.
- Mide unos 4,36 cuerpos de ancho: a 20px de cuerpo, unos 87px.

## Juntos

A es el lado del ícono. Son las medidas de las plantillas, y ya están en `lockup.svg`:

| Medida | Valor | Con A = 52px |
|---|---|---|
| Radio del cuadrado | 0,23 A | 12px |
| Cuerpo de la i | 0,81 A (la i mide 0,58 A de alto) | 42px |
| Aire bajo la i | 0,077 A | 4px |
| Cuerpo del logotipo | 0,77 A | 40px |
| Separación ícono–palabra | 0,27 A | 14px |

- El ícono y la palabra van centrados en vertical.
- El radio del cuadrado existe sólo cuando el ícono se dibuja adentro de una pieza.
- Sobre un fondo del mismo negro, el cuadrado lleva borde `border-default`: 1px en pantalla, 2px en una pieza de 1080. `lockup.svg` ya lo trae; `lockup-on-light.svg` va sin borde.

## Resguardo y mínimos

- Alrededor del ícono o del lockup, A/2 de cada lado (en un lockup de 52px, 26px). Alrededor de la marca sola, 1 x de cada lado (x = 0,496 del cuerpo). En esa franja no entra nada: ni texto, ni otro logo, ni el borde de la pieza. No aplica al ícono como archivo a sangre.

| Pieza | En pantalla | En una pieza de 1080px |
|---|---|---|
| Ícono | 24px con `icon.svg`; 16px sólo con `icon-small.svg` | 52px |
| Marca | 20px de cuerpo (unos 87px de ancho) | 40px de cuerpo |
| Juntos | 26px de alto, para que la marca no baje de 20px | Ícono de 52px |

La marca a 20px es la única excepción escrita al piso de 32px de la firma, porque es un dibujo. Más chico, va el ícono solo.

## Fondos

| Fondo | Marca y lockup | Ícono |
|---|---|---|
| Oscuro: `bg-canvas` y los neutros del oscuro | `wordmark-white.svg`, `lockup.svg` | Su cuadrado negro, con borde `border-default` |
| Claro: `bg-canvas` del claro y sus neutros | `wordmark-black.svg`, `lockup-on-light.svg` | Su cuadrado negro, sin borde |
| Una foto movida, un color de estado, un degradé, el amarillo o el azul de Mercado Libre, el cian de Mercado Pago, un fondo con ruido | No va | No va |

La única excepción es el degradé radial de blanco al 4 % del banner de LinkedIn y de la portada de Facebook: ahí va el lockup en `brand-white`.

## Usos incorrectos

- **Color:** cualquier violeta (el viejo #4C1D95, sus filetes, la raya debajo de la OG vieja); el amarillo (#FFE600) o el azul (#3483FA) de Mercado Libre o el cian de Mercado Pago (#00BCFF) en el logo o a su lado; la marca en gris, a dos tonos, en un color de estado, en petróleo (`brand-petrol`) o en degradé; glow, sombra, contorno, vidrio o gradiente sobre la marca.
- **Forma:** una raya o un subrayado debajo del logotipo; rotar, inclinar más, estirar o comprimir; separar el punto de la i; esquinas horneadas o con transparencia en el ícono; juegos con el ojo (pupilas, círculos concéntricos, «iris ve todo»).
- **Tipografía:** Playfair, la DM Serif Display recta, Plex o cualquier otra fuente; tipear el logotipo; «Iris», «IRIS» o «Iris Agents» en el logotipo; un sufijo («AI», «.ai»); el logotipo como palabra adentro de una oración.
- **Compañía:** mascotas, robots, cerebros, destellos o emojis al lado; la marca de otro más grande, pegada o en co-branding; «partner», «oficial», «certificado», «aliado» o «powered by»; un claim rechazado al lado.

## Archivos

Los de `assets/Logos/` están descritos uno por uno en su README. En el repo hay además el favicon, el `apple-touch-icon`, los íconos del manifest (192, 512 y maskable), el de 1024 y los PNG a 512 y 2048px: [logo/README.md](https://github.com/Iris-Agents/iris-brand/blob/main/logo/README.md).

Capítulo completo: [03 Logo e ícono](https://github.com/Iris-Agents/iris-brand/blob/main/guide/03-logo-e-icono.md).
