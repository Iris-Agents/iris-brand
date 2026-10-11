// Mide una pieza de redes terminada, adentro de su propia página, y dice en palabras lo que el ojo
// de un modelo no ve: el texto fuera del margen o en una zona que tapa la red, la letra bajo el
// mínimo, las fuentes que no cargaron o que caen a otra, los colores fuera de la paleta, el petróleo
// fuera del sello y el texto que se sale de su caja. No frena ni puntúa: cada observación dice qué
// midió, dónde, cuánto dio, contra qué y qué sección del manual lo explica. Sin dependencias.
// Uso (README.md): await medirPieza({ formats, format, brandCss }), con formats el contenido de
// ../formatos.json, format el nombre de un formato y brandCss el texto de ../brand.css.
(() => {
  const MANUAL = {
    sizes: 'capítulo 05, 5.4, y pieces/redes/_base/formatos.json, «minimumSizes»',
    fonts: 'capítulo 05, 5.1 y 5.8',
    fakedFace: 'capítulo 05, 5.9',
    palette: 'capítulo 04, 4.1 y 4.8',
    light: 'capítulo 04, 4.8, y capítulo 11, 11.13',
    petrol: 'capítulo 04, 4.9',
    overflow: 'pieces/redes/plantillas.md, 7',
  };
  const zonesManual = (formatName) => `pieces/redes/_base/formatos.json, «${formatName}»`;
  // Un color a 2 niveles de 8 bits es el mismo (redondeos de una conversión); 1,5 px es un redondeo de
  // layout; la luz radial blanca de las piezas llega al 6 % (capítulo 11, 11.13).
  const COLOR_TOLERANCE = 2;
  const PX_TOLERANCE = 1.5;
  const LIGHT_MAX_ALPHA = 0.06;
  const SKIPPED = 'title, desc, script, style, noscript, template, symbol, defs';

  const decimal = (value) => String(Math.round(value * 10) / 10).replace('.', ',');
  const unquote = (family) => family.trim().replace(/^['"]|['"]$/g, '');
  const firstFamily = (stack) => unquote(stack.split(',')[0]);
  const span = (from, to) => `${Math.round(from)}–${Math.round(to)}`;
  const boxText = (box) => `x ${span(box.left, box.right)} · y ${span(box.top, box.bottom)}`;
  const toHex = ({ r, g, b }) => `#${[r, g, b].map((channel) => Math.round(channel).toString(16).padStart(2, '0')).join('')}`.toUpperCase();
  const plain = (rect) => ({ left: Math.round(rect.left), top: Math.round(rect.top), right: Math.round(rect.right), bottom: Math.round(rect.bottom) });
  const union = (boxes) => boxes.reduce((total, box) => ({ left: Math.min(total.left, box.left), top: Math.min(total.top, box.top), right: Math.max(total.right, box.right), bottom: Math.max(total.bottom, box.bottom) }));

  // checkVisibility no ve el display: none de un elemento SVG: eso se mira a mano. Tampoco ve lo que
  // un recorte deja en 1 × 1 px, como el texto «sólo para lectores de pantalla».
  function isVisible(element) {
    if (!element.checkVisibility({ opacityProperty: true, visibilityProperty: true, checkOpacity: true, checkVisibilityCSS: true })) return false;
    for (let node = element; node instanceof SVGElement; node = node.parentElement) {
      if (getComputedStyle(node).display === 'none') return false;
    }
    for (let node = element; node && node !== document.body; node = node.parentElement) {
      const style = getComputedStyle(node);
      if (style.overflow === 'visible' && style.clip === 'auto') continue;
      const rect = node.getBoundingClientRect();
      if (rect.width <= 1 && rect.height <= 1) return false;
    }
    return true;
  }

  function describe(element, pseudo = '') {
    const classes = [...element.classList].slice(0, 2).map((name) => `.${name}`).join('');
    const slot = element.closest('[data-slot]')?.dataset.slot;
    return `${element.localName}${classes}${pseudo}${slot ? ` [${slot}]` : ''}`;
  }

  function quote(text) {
    const clean = text.replace(/\s+/g, ' ').trim();
    return `«${clean.length > 40 ? `${clean.slice(0, 39)}…` : clean}»`;
  }

  const label = (group) => `${quote(group.element.textContent)} (${describe(group.element)})`;
  const listing = (items) => (items.length > 1 ? `${items.slice(0, -1).join(', ')} y ${items.at(-1)}` : items.join(''));
  const andMore = (count, noun) => (count > 0 ? ` y ${count} ${noun}${count > 1 ? 's' : ''} más` : '');
  const nameAll = (groups) => `${groups.length > 2 ? groups.slice(0, 2).map(label).join(', ') : listing(groups.map(label))}${groups.length > 2 ? andMore(groups.length - 2, 'texto') : ''}`;

  function observe(check, where, measured, against, manual, box = null) {
    return { check, where, box: box && plain(box), measured, against, manual, message: `${where} ${measured}. ${against.replace(/\.$/, '')} (${manual}).` };
  }

  function readBrand(brandCss) {
    const root = brandCss.replace(/\/\*[\s\S]*?\*\//g, '').match(/:root\s*\{([^}]*)\}/)?.[1] ?? '';
    const palette = [...root.matchAll(/(--[\w-]+):\s*#([0-9a-f]{6})\s*;/gi)].map(([, name, hex]) => ({ name, r: parseInt(hex.slice(0, 2), 16), g: parseInt(hex.slice(2, 4), 16), b: parseInt(hex.slice(4), 16) }));
    const stacks = Object.fromEntries([...root.matchAll(/(--font-[\w-]+):\s*([^;]+);/g)].map(([, name, stack]) => [name, firstFamily(stack)]));
    const petrol = palette.find((entry) => entry.name === '--signature-marketing-block');
    const canvas = palette.find((entry) => entry.name === '--bg-canvas');
    if (!petrol || !canvas || !stacks['--font-signature']) throw new Error('brandCss tiene que ser el texto de pieces/redes/_base/brand.css');
    return { palette, petrol, canvas, families: Object.values(stacks), signatureFamily: stacks['--font-signature'] };
  }

  // Chrome da los colores computados en rgb() o color(srgb); los que vienen en otro espacio (oklch,
  // lab) se pasan a sRGB pintando un píxel opaco, con el alfa aparte.
  const pixel = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  const COLOR_TOKENS = /(?:rgba?|oklch|oklab|lab|lch|hwb|hsla?|color)\([^)]*\)/g;

  function parseColor(text) {
    const alpha = (value) => (value === undefined ? 1 : value.endsWith('%') ? parseFloat(value) / 100 : Number(value));
    const rgb = text.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/);
    if (rgb) return { r: +rgb[1], g: +rgb[2], b: +rgb[3], a: alpha(rgb[4]) };
    const srgb = text.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)$/);
    if (srgb) return { r: srgb[1] * 255, g: srgb[2] * 255, b: srgb[3] * 255, a: alpha(srgb[4]) };
    const other = text.match(/^(oklch|oklab|lab|lch|hwb|hsla?|color)\(([^/)]*?)(?:\s*\/\s*([\d.]+%?))?\s*\)$/);
    if (!other) return null;
    pixel.globalCompositeOperation = 'copy';
    pixel.fillStyle = `${other[1]}(${other[2]})`;
    pixel.fillRect(0, 0, 1, 1);
    const [r, g, b] = pixel.getImageData(0, 0, 1, 1).data;
    return { r, g, b, a: alpha(other[3]) };
  }

  function nearest(color, palette) {
    const distanceTo = (entry) => Math.max(Math.abs(entry.r - color.r), Math.abs(entry.g - color.g), Math.abs(entry.b - color.b));
    return palette.map((entry) => ({ entry, distance: distanceTo(entry) })).sort((first, second) => first.distance - second.distance)[0];
  }

  // La caja de un texto: de lado a lado, su avance; de arriba abajo, la tinta (sin el aire de la
  // fuente). El tamaño real sale del rect, que ya trae el zoom y los transform de sus ancestros.
  function measureText(node, element, rects, context) {
    const style = getComputedStyle(element);
    const cases = { uppercase: (text) => text.toUpperCase(), lowercase: (text) => text.toLowerCase() };
    const content = (cases[style.textTransform] ?? ((text) => text))(node.data);
    const zoomedSize = parseFloat(style.fontSize) * (element.currentCSSZoom ?? 1);
    context.font = `${style.fontStyle} ${style.fontWeight} ${zoomedSize}px ${style.fontFamily}`;
    const metrics = context.measureText(content.trim());
    const ratio = rects[0].height / (metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent);
    const scale = Math.abs(ratio - 1) < 0.08 ? 1 : ratio;
    const inkTop = Math.max(0, metrics.fontBoundingBoxAscent - metrics.actualBoundingBoxAscent) * scale;
    const inkBottom = Math.max(0, metrics.fontBoundingBoxDescent - metrics.actualBoundingBoxDescent) * scale;
    const box = union(rects.map((rect) => ({ left: rect.left, right: rect.right, top: rect.top + inkTop, bottom: rect.bottom - inkBottom })));
    const rawBox = union(rects.map((rect) => ({ left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom })));
    return { element, style, content, size: zoomedSize * scale, box, rawBox, lineTops: rects.map((rect) => Math.round(rect.top)) };
  }

  // Un grupo por elemento con texto propio y visible.
  function readTextGroups(context) {
    const groups = new Map();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const element = node.parentElement;
      if (!node.data.trim() || !element || element.closest(SKIPPED) || !isVisible(element)) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      const rects = [...range.getClientRects()].filter((rect) => rect.width > 0 && rect.height > 0);
      if (!rects.length) continue;
      const text = measureText(node, element, rects, context);
      const group = groups.get(element);
      groups.set(element, group ? { ...group, content: `${group.content} ${text.content}`, box: union([group.box, text.box]), rawBox: union([group.rawBox, text.rawBox]), lineTops: [...group.lineTops, ...text.lineTops] } : text);
    }
    return [...groups.values()];
  }

  // Los textos que quedan igual de afuera van juntos: un margen corrido es una sola observación.
  function checkZones(groups, format, formatName, width, height) {
    const outside = new Map();
    const reserved = [];
    for (const group of groups) {
      const inFooter = Boolean(format.footer && group.element.closest('footer'));
      const area = inFooter ? { ...format.safeArea, bottom: format.footer.bottom } : format.safeArea;
      const where = area.circle ? outsideCircle(group.box, area.circle) : outsideRect(group.box, area, width, height);
      if (where) outside.set(`${inFooter}|${where}`, { area, inFooter, where, members: [...(outside.get(`${inFooter}|${where}`)?.members ?? []), group] });
      for (const zone of inFooter ? [] : format.reserved) {
        const overlaps = group.box.left < zone.x + zone.width - PX_TOLERANCE && group.box.right > zone.x + PX_TOLERANCE && group.box.top < zone.y + zone.height - PX_TOLERANCE && group.box.bottom > zone.y + PX_TOLERANCE;
        if (overlaps) reserved.push(observe('zone', label(group), `cae en ${boxText(group.box)}, sobre ${zone.name} (x ${zone.x}–${zone.x + zone.width}, y ${zone.y}–${zone.y + zone.height})`, zone.note, zonesManual(formatName), group.box));
      }
    }
    const margins = [...outside.values()].map(({ area, inFooter, where, members }) => {
      const zone = area.circle ? `el círculo de radio ${area.circle.r} centrado en (${area.circle.cx}, ${area.circle.cy})` : `x ${area.left}–${width - area.right}, y ${area.top}–${height - area.bottom}`;
      const against = `La zona segura de «${formatName}» es ${zone}. ${inFooter ? format.footer.note : area.note}`;
      return observe('zone', nameAll(members), `${members.length > 1 ? 'quedan' : 'queda'} ${where}`, against, zonesManual(formatName), union(members.map((group) => group.box)));
    });
    return [...margins, ...reserved];
  }

  const edge = (distance, side) => (distance < 0 ? `afuera de la pieza, ${Math.round(-distance)} px más allá del borde ${side}` : `a ${Math.round(distance)} px del borde ${side}`);

  function outsideRect(box, area, width, height) {
    const sides = [
      [area.left - box.left, edge(box.left, 'izquierdo')],
      [box.right - (width - area.right), `${edge(width - box.right, 'derecho')} (x = ${Math.round(box.right)})`],
      [area.top - box.top, edge(box.top, 'de arriba')],
      [box.bottom - (height - area.bottom), `${edge(height - box.bottom, 'de abajo')} (y = ${Math.round(box.bottom)})`],
    ];
    const crossed = sides.filter(([overshoot]) => overshoot > PX_TOLERANCE).map(([, text]) => text);
    return crossed.length ? crossed.join(' y ') : null;
  }

  function outsideCircle(box, circle) {
    const farthest = Math.max(...[box.left, box.right].flatMap((x) => [box.top, box.bottom].map((y) => Math.hypot(x - circle.cx, y - circle.cy))));
    return farthest > circle.r + PX_TOLERANCE ? `a ${Math.round(farthest)} px del centro (${boxText(box)})` : null;
  }

  function checkSizes(groups, scale, brand) {
    const { headline, labels, productRows, reading } = scale.roles;
    const others = [productRows && `las filas, los datos y los botones de una pieza de producto van desde ${productRows.px}`, reading && `la lectura, desde ${reading.px}`].filter(Boolean);
    const floor = `El piso de cualquier texto de la pieza es de ${labels.px} px, el de los rótulos${others.length ? `; ${others.join(', y ')}` : ''}`;
    const small = new Map();
    for (const group of groups) {
      const isHeadline = Boolean(group.element.closest('h1')) || firstFamily(group.style.fontFamily) === brand.signatureFamily;
      if (group.size >= (isHeadline ? headline.px : labels.px) - 0.25) continue;
      const key = `${isHeadline}|${decimal(group.size)}`;
      small.set(key, { isHeadline, size: group.size, members: [...(small.get(key)?.members ?? []), group] });
    }
    return [...small.values()].map(({ isHeadline, size, members }) => {
      const where = nameAll(members);
      const against = isHeadline ? `Es parte del titular, que va desde ${headline.px} px` : floor;
      return observe('size', where, `${members.length > 1 ? 'miden' : 'mide'} ${decimal(size)} px`, against, MANUAL.sizes, union(members.map((group) => group.box)));
    });
  }

  // Un carácter está en la fuente si mide lo mismo con dos reservas distintas detrás.
  function covers(context, face, character) {
    if (/\p{Extended_Pictographic}/u.test(character)) return false;
    const widthWith = (fallback) => {
      context.font = `${face.style} ${face.weight} 100px "${face.family}", ${fallback}`;
      return context.measureText(character).width;
    };
    return Math.abs(widthWith('monospace') - widthWith('serif')) < 0.01;
  }

  async function checkFonts(groups, brand, context) {
    const observations = [...document.fonts].filter((face) => face.status === 'error').map((face) =>
      observe('font', `La fuente ${unquote(face.family)} ${face.weight}${face.style === 'italic' ? ' itálica' : ''}`, 'no cargó', 'Una pieza que se renderiza sin sus fuentes no se entrega', MANUAL.fonts));
    const faces = new Map();
    for (const group of groups) {
      const family = firstFamily(group.style.fontFamily);
      const where = label(group);
      if (!brand.families.includes(family)) {
        observations.push(observe('font', where, `está en ${family}`, `Las familias de la marca son ${listing(brand.families)}, y no hay otra ni de reserva`, MANUAL.fonts, group.box));
        continue;
      }
      const key = `${family}|${group.style.fontWeight}|${group.style.fontStyle}`;
      const face = faces.get(key) ?? { family, weight: group.style.fontWeight, style: group.style.fontStyle, groups: [] };
      faces.set(key, { ...face, groups: [...face.groups, { group, where }] });
    }
    for (const face of faces.values()) {
      const characters = [...new Set(face.groups.flatMap(({ group }) => [...group.content]))].filter((character) => !/[ \t\n\r\f]/.test(character));
      await document.fonts.load(`${face.style} ${face.weight} 100px "${face.family}"`, characters.join('')).catch(() => []);
      const loaded = [...document.fonts].filter((candidate) => unquote(candidate.family) === face.family && candidate.status === 'loaded');
      const hasWeight = loaded.some((candidate) => {
        const [from, to = from] = candidate.weight.split(' ').map(Number);
        return Number(face.weight) >= from && Number(face.weight) <= to;
      });
      const fakesItalic = face.style !== 'normal' && face.family !== brand.signatureFamily && !loaded.some((candidate) => candidate.style !== 'normal');
      if (loaded.length && (!hasWeight || fakesItalic)) {
        const asked = `${face.family} ${face.weight}${fakesItalic ? ' itálica' : ''}`;
        observations.push(observe('font', face.groups[0].where + andMore(face.groups.length - 1, 'texto'), `pide ${asked}, que la marca no carga: el navegador la dibuja con otra cara o la falsea`, 'Plex va en 400 y 500, nunca en 600 o 700 ni en itálica', MANUAL.fakedFace, face.groups[0].group.box));
      }
      const against = 'La pieza va sólo en las tres familias de la marca; una que cae a Georgia o a la del sistema no se entrega';
      const fellBack = [];
      for (const { group, where } of face.groups) {
        const own = [...new Set(group.content)].filter((character) => characters.includes(character));
        const missing = own.filter((character) => !covers(context, face, character));
        if (missing.length && missing.length === own.length) fellBack.push(group);
        else if (missing.length) observations.push(observe('font', where, `tiene ${listing(missing.map((character) => `«${character}»`))}, que ${face.family} no trae: ${missing.length > 1 ? 'salen' : 'sale'} con la fuente que sigue en la pila`, against, MANUAL.fonts, group.box));
      }
      if (fellBack.length) observations.push(observe('font', nameAll(fellBack), `${fellBack.length > 1 ? 'salen' : 'sale'} en otra fuente: ${face.family} ${face.weight} no cargó`, against, MANUAL.fonts, union(fellBack.map((group) => group.box))));
    }
    return observations;
  }

  // Con pseudo, los colores de su ::before o ::after: el texto cuenta si el content es un texto.
  function colorsOf(element, style, pseudo) {
    const colors = [];
    const hasText = pseudo ? /^(["']).*\S.*\1$/.test(style.content) : [...element.childNodes].some((child) => child.nodeType === Node.TEXT_NODE && child.data.trim());
    if (hasText) colors.push(['el texto', style.color]);
    colors.push(['el fondo', style.backgroundColor]);
    for (const side of ['Top', 'Right', 'Bottom', 'Left']) {
      if (parseFloat(style[`border${side}Width`]) > 0 && !['none', 'hidden'].includes(style[`border${side}Style`])) colors.push(['el borde', style[`border${side}Color`]]);
    }
    // Un <use> dibuja su símbolo, que en los glifos de estado va en currentColor: cuenta su color.
    // Un pseudoelemento no tiene relleno ni trazo de SVG.
    const drawn = pseudo ? null : element;
    if (drawn instanceof SVGUseElement) colors.push(['el relleno', style.color]);
    else if (drawn instanceof SVGElement && !(drawn instanceof SVGSVGElement)) {
      if (!/^(none|url)/.test(style.fill)) colors.push(['el relleno', style.fill]);
      if (!/^(none|url)/.test(style.stroke) && parseFloat(style.strokeWidth) > 0) colors.push(['el trazo', style.stroke]);
    }
    for (const stop of style.backgroundImage.includes('gradient') ? style.backgroundImage.match(COLOR_TOKENS) ?? [] : []) colors.push(['un degradé', stop]);
    return colors;
  }

  // Un elemento y los ::before y ::after que dibuja: la luz de las plantillas es un ::before.
  const layersOf = (element) => [['', getComputedStyle(element)], ...['::before', '::after']
    .map((pseudo) => [pseudo, getComputedStyle(element, pseudo)])
    .filter(([, style]) => style.content !== 'none' && style.display !== 'none')];

  // La foto (img, video) no se mide: es la de La trastienda y tiene sus reglas. Un fondo petróleo
  // en un pseudoelemento nunca es el sello, que es el span del titular.
  function checkColors(groups, brand) {
    const findings = new Map();
    const petrolBlocks = [];
    for (const element of document.body.querySelectorAll('*')) {
      if (element.closest(`${SKIPPED}, img, video, picture`) || !isVisible(element)) continue;
      for (const [pseudo, style] of layersOf(element)) for (const [kind, value] of colorsOf(element, style, pseudo)) {
        const color = parseColor(value);
        if (!color || color.a === 0) continue;
        const { entry, distance } = nearest(color, brand.palette);
        const inPalette = distance <= COLOR_TOLERANCE;
        const isPetrol = inPalette && entry === brand.petrol;
        if (isPetrol && kind === 'el fondo' && !pseudo) {
          petrolBlocks.push(element);
          continue;
        }
        const isWhite = Math.min(color.r, color.g, color.b) >= 240 && Math.max(color.r, color.g, color.b) - Math.min(color.r, color.g, color.b) <= 6;
        // En un degradé pasan la luz blanca y el fundido hacia el negro del fondo, con cualquier alfa.
        const isBlack = nearest(color, [brand.canvas]).distance <= COLOR_TOLERANCE;
        const isLight = kind === 'un degradé' && ((color.a <= LIGHT_MAX_ALPHA + 0.0005 && (inPalette || isWhite)) || isBlack);
        if (isLight || (!isPetrol && inPalette && color.a >= 0.99)) continue;
        const key = isPetrol ? `petrol|${kind}` : `${kind}|${toHex(color)}|${color.a}`;
        const finding = findings.get(key) ?? { petrol: isPetrol, kind, color, entry: distance <= 24 ? entry : null, element, pseudo, elements: new Set() };
        findings.set(key, { ...finding, elements: finding.elements.add(element) });
      }
    }
    return [...colorObservations(findings, brand), ...petrolBlocks.flatMap((element) => checkPetrolBlock(element, groups, brand))];
  }

  function colorObservations(findings, brand) {
    return [...findings.values()].map((finding) => {
      const more = andMore(finding.elements.size - 1, 'elemento');
      const where = `${finding.kind[0].toUpperCase()}${finding.kind.slice(1)} de ${describe(finding.element, finding.pseudo)}${more}`;
      const box = finding.pseudo ? null : finding.element.getBoundingClientRect();
      if (finding.petrol) return observe('petrol', where, 'va en petróleo', 'El petróleo va sólo de fondo del sello, detrás de la segunda línea del titular: nunca de texto, borde, relleno, degradé ni franja', MANUAL.petrol, box);
      const { color, entry } = finding;
      const hex = toHex(color);
      const seen = color.a < 0.99 ? ` al ${Math.round(color.a * 100)} % (sobre el negro se ve ${toHex({ r: color.r * color.a + brand.canvas.r * (1 - color.a), g: color.g * color.a + brand.canvas.g * (1 - color.a), b: color.b * color.a + brand.canvas.b * (1 - color.a) })})` : '';
      if (finding.kind === 'un degradé') return observe('color', where, `lleva ${hex}${seen}`, 'La única luz es una radial blanca, de hasta el 6 % y detrás del punto focal; no hay otros degradés ni glow', MANUAL.light, box);
      if (entry && nearest(color, [entry]).distance <= COLOR_TOLERANCE) return observe('color', where, `va en ${entry.name}${seen}`, 'Con transparencia, lo que se ve no es un color de la paleta de brand.css', MANUAL.palette, box);
      const hint = entry ? `; el más cercano es ${entry.name} (${toHex(entry)}): va la variable` : '';
      return observe('color', where, `va en ${hex}${seen}`, `No es un color de la paleta de brand.css${hint}`, MANUAL.palette, box);
    });
  }

  // El sello: un bloque petróleo pegado a una letra que es toda de la firma. En dos renglones es un
  // solo bloque del ancho del titular (capítulo 05, 5.3), así que de ancho se mide sólo en uno.
  function checkPetrolBlock(element, groups, brand) {
    const inside = groups.filter((group) => element.contains(group.element));
    const rect = element.getBoundingClientRect();
    const where = `El fondo petróleo de ${describe(element)} (${Math.round(rect.width)} × ${Math.round(rect.height)})`;
    const against = 'El petróleo va sólo en el sello: el bloque pegado a la segunda línea del titular, en la firma';
    if (!inside.length) return [observe('petrol', where, 'no tiene texto encima', against, MANUAL.petrol, rect)];
    const notSignature = inside.find((group) => firstFamily(group.style.fontFamily) !== brand.signatureFamily);
    if (notSignature) return [observe('petrol', where, `va detrás de ${quote(notSignature.element.textContent)}, que no es la firma`, against, MANUAL.petrol, rect)];
    const text = union(inside.map((group) => group.rawBox));
    const em = parseFloat(getComputedStyle(element).fontSize) * (element.currentCSSZoom ?? 1);
    const lines = new Set(inside.flatMap((group) => group.lineTops)).size;
    const wider = lines === 1 && rect.width - (text.right - text.left) > 0.45 * em + 2;
    const taller = rect.height - (text.bottom - text.top) > 0.6 * em;
    if (!wider && !taller) return [];
    return [observe('petrol', where, `es más grande que su letra (${Math.round(text.right - text.left)} × ${Math.round(text.bottom - text.top)}): es una franja, no un sello`, against, MANUAL.petrol, rect)];
  }

  // Una caja que se ve (fondo, borde) o que recorta: si el texto se sale, se nota. Las que no se ven
  // no cuentan, y la pieza entera tampoco: ahí el que habla es el margen.
  function checkOverflow(groups, width, height) {
    const observations = [];
    for (const group of groups) {
      for (let ancestor = group.element; ancestor && ancestor !== document.body; ancestor = ancestor.parentElement) {
        const style = getComputedStyle(ancestor);
        const rect = ancestor.getBoundingClientRect();
        if (rect.width >= width - 1 && rect.height >= height - 1) break;
        const clips = style.overflow !== 'visible';
        const filled = parseColor(style.backgroundColor)?.a > 0;
        const isBox = !['inline', 'contents'].includes(style.display) && !(ancestor instanceof SVGElement && !(ancestor instanceof SVGSVGElement));
        // Un lado se ve si la caja recorta, tiene fondo o tiene borde de ese lado.
        const shows = (side) => clips || filled || (parseFloat(style[`border${side}Width`]) > 0 && !['none', 'hidden'].includes(style[`border${side}Style`]));
        const sides = [['Left', 'por la izquierda', rect.left - group.box.left], ['Right', 'por la derecha', group.box.right - rect.right], ['Top', 'por arriba', rect.top - group.box.top], ['Bottom', 'por abajo', group.box.bottom - rect.bottom]]
          .filter(([side, , overshoot]) => isBox && shows(side) && overshoot > PX_TOLERANCE);
        if (sides.length) {
          const measured = `${clips ? 'queda cortado' : 'se sale'} ${sides.map(([, side, overshoot]) => `${Math.round(overshoot)} px ${side}`).join(' y ')} de su caja, ${describe(ancestor)} (${Math.round(rect.width)} × ${Math.round(rect.height)})`;
          observations.push(observe('overflow', label(group), measured, 'Ningún texto queda cortado ni se sale de su caja', MANUAL.overflow, group.box));
          break;
        }
        if (['absolute', 'fixed'].includes(style.position)) break;
      }
    }
    return observations;
  }

  globalThis.medirPieza = async function medirPieza({ formats, format: formatName, brandCss }) {
    const format = formats?.formats?.[formatName];
    if (!format) throw new Error(`formatos.json no tiene el formato «${formatName}»: los que hay son ${Object.keys(formats?.formats ?? {}).join(', ')}`);
    const brand = readBrand(brandCss);
    document.body.getBoundingClientRect();
    await document.fonts.ready;
    const context = document.createElement('canvas').getContext('2d');
    const groups = readTextGroups(context);
    const fonts = await checkFonts(groups, brand, context);
    return [
      ...checkZones(groups, format, formatName, format.width, format.height),
      ...checkSizes(groups, formats.minimumSizes[format.minimumSizes], brand),
      ...fonts,
      ...checkColors(groups, brand),
      ...checkOverflow(groups, format.width, format.height),
    ];
  };
})();
