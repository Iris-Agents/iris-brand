# Piezas de LinkedIn

El banner del perfil personal de Franco y la portada y el logo de la página de empresa
«Iris Agents». Cada pieza es un HTML editable; la PNG que se sube sale de renderizarlo. Cómo se
arma cada una está en el manual: `guide/11-aplicaciones.md`, 11.4 y 11.5.

## Los archivos

| Archivo | Qué es | Dónde se sube | Tamaño (px) |
|---|---|---|---|
| `banner-perfil.png` | El lockup, el titular «Agentes expertos / a cargo de tu e-commerce.» y el panel «Hoy en tu cuenta» con cinco resultados, sobre el negro con el degradé radial. | Perfil personal: la foto de fondo. | 1584 × 396 |
| `portada-empresa.png` | La marca sola («iris agents», sin el ícono, porque el logo de la página va pegado) y el mismo titular. Sin panel y sin degradé. | Página de empresa: la portada. | 1512 × 256 |
| `logo-empresa-400.png` | El ícono a sangre (`logo/icon.svg`): la i a 0,64 del lado, cuadrado, sin esquinas horneadas ni transparencia. | Página de empresa: el logo. | 400 × 400 |
| `banner-perfil-guias.png`, `portada-empresa-guias.png` | La misma pieza con las zonas en magenta. **Nunca se publica.** | No se sube. | Las de su pieza |
| `logo-empresa-preview.png` | Hoja de control: el logo a 128, 60 y 32 px, cuadrado y en círculo, sobre blanco y sobre negro. **Nunca se publica.** | No se sube. | 700 × 380 |

Cada PNG sale del HTML con su nombre (`banner-perfil.html`, `portada-empresa.html`,
`logo-empresa.html`, `logo-empresa-preview.html`). Los textos que se editan llevan `data-slot` y su
largo máximo en el comentario `<!-- EDITAR -->`; hoy: titular, línea 1, 18 caracteres en las dos
piezas; línea 2, 25 de texto común en el banner y 28 de texto ancho en la portada; título del
panel, 22, y cada fila, 26 de texto ancho. Las cifras del panel son de ejemplo y están marcadas en
el HTML.

## Las zonas que se respetaron

En píxeles de cada imagen. «Vista pública» es lo que midió quien hizo las piezas en la vista
pública de LinkedIn el 2026-10-10; «terceros» son guías de internet que los HTML no nombran y que
nadie midió. LinkedIn no publica dónde va la foto de perfil ni cuánto recorta el celular.

### Banner del perfil (1584 × 396)

La medida es la de la ayuda de LinkedIn.

| Zona | Dónde | Fuente |
|---|---|---|
| Foto de perfil en la computadora | x 33–373, y 228–396 | Vista pública, con ventanas de 800 a 1440 px. |
| Foto de perfil en la computadora, más grande | 568 × 264 abajo a la izquierda (x 0–568, y 132–396) | Terceros. |
| Foto de perfil en el celular | x 67–702, y 31–396 | Vista pública, a 360 y 390 px de ancho. |
| Costados en la app del celular | Recorta del 15 al 20 % de cada lado: se ve x 238–1346, o x 317–1267 | Terceros. La vista pública no recorta. |

Cómo quedó:
- El lockup y el titular empiezan en x 718, 16 px a la derecha de todas las fotos. Ninguna zona de
  foto tiene un píxel de tinta.
- El sello de la segunda línea del titular (el `.sello` de `pieces/redes/_base/brand.css`) termina
  en x 1167: entra entero aun con el recorte del 20 %.
- El panel mide 340 px y va en x 1208–1547, a 36 px del borde derecho, con 40 px de aire después
  del sello. Con el titular a 40 px no entra uno más ancho: el sello sumó 14 px al ancho de la
  línea, y el panel se corrió 4 px a la derecha para no perder el aire.
- En el celular el banner se ve a 0,25 y las filas quedan en 4 px: ahí se lee el titular. Si la
  app recorta los costados, el panel pierde su parte derecha.

### Portada de la página de empresa (1512 × 256)

La medida es la de la ayuda de LinkedIn (linkedin.com/help/linkedin/answer/a563309, leída el
2026-10-10).

| Zona | Dónde | Fuente |
|---|---|---|
| Logo de la página en la computadora | x 39–327, y 95–256 | Vista pública, con ventanas de 800 a 1440 px. |
| Lo que se ve en la computadora | x 5–1505: pierde unos 8 px de cada costado | Vista pública. |
| Logo de la página en el celular | x 65–605, y 128–256 | Vista pública, a 360 y 390 px de ancho. |
| Lo importante | En el centro y lejos de los bordes, sobre todo de la esquina de abajo a la derecha | La ayuda de LinkedIn. |

Cómo quedó: la marca y el titular empiezan en x 640, a la derecha de los dos logos, y la tinta
ocupa x 640–1089, y 48–205 (el sello de la segunda línea va de x 640 a 1089 y de y 159 a 205, con
la g de «cargo» adentro).

### Logo de la página (400 × 400)

- 400 × 400 es la medida que recomienda la ayuda de LinkedIn; el mínimo es 268 × 268.
- LinkedIn lo muestra a 128 px en la cabecera de la página (vista pública), sobre fondo claro y
  oscuro. La vista pública lo dibuja cuadrado; la hoja de control lo muestra también en círculo,
  como peor caso: la i entra igual, porque su píxel más lejano está a 0,33 del lado del centro.

## Cómo se regenera

Las seis PNG están en `pieces/redes/_base/piezas.tsv`, así que salen con el resto
(`guide/14-recursos.md`, 14.6). Una sola, desde esta carpeta, con el tamaño de la tabla de arriba
(cómo se usa `render.sh`: `pieces/redes/plantillas.md`, sección 6):

```sh
../redes/_base/render.sh banner-perfil.html 1584 396 "$PWD/banner-perfil.png"
../redes/_base/render.sh "banner-perfil.html?guias" 1584 396 "$PWD/banner-perfil-guias.png"
```

`logo-empresa-preview.png` se renderiza después de `logo-empresa-400.png`, porque la muestra.

## Antes de darlas por buenas

- Subirlas y mirarlas en la computadora y en un celular, al lado de su `-guias.png`: los recortes
  de terceros no están medidos.
- Mercado Libre va en el «Acerca de» del perfil y de la página, no en las piezas
  (`guide/12-mercado-libre.md`, 12.1).
