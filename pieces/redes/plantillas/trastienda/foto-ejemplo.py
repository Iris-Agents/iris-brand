# Genera foto-ejemplo.jpg: la imagen de muestra del slot «foto» de La trastienda.
# Uso: python3 pieces/redes/plantillas/trastienda/foto-ejemplo.py   (Pillow y numpy; semilla fija).
#
# No es una foto ni la hizo una IA: es un dibujo por script que ocupa el lugar de la foto, con lo que
# la foto tiene que cumplir. Oscura y quieta, luz neutra desde arriba a la derecha, cajas de cartón
# sin imprimir, el tercio de arriba a la izquierda casi negro (ahí va el texto), sin personas, sin
# marcas ni logos, sin amarillo ni azul. El fundido de abajo lo pone el CSS, no la imagen.
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

WIDTH, HEIGHT = 1080, 820
SCALE = 2  # las formas se dibujan al doble y se reducen, para que el borde no salga dentado
FLOOR_Y = 600
generator = np.random.default_rng(20261010)

columns = np.arange(WIDTH)[None, :]
rows = np.arange(HEIGHT)[:, None]


def rgb(hex_color: str) -> np.ndarray:
    return np.array([int(hex_color[i : i + 2], 16) for i in (1, 3, 5)], dtype=float)


def vertical_gradient(top: str, bottom: str, start: float, end: float) -> np.ndarray:
    progress = np.clip((rows - start) / (end - start), 0, 1)[..., None]
    return (rgb(top) * (1 - progress) + rgb(bottom) * progress) * np.ones((1, WIDTH, 1))


def polygon_mask(points: list[tuple[float, float]], blur: float = 0) -> np.ndarray:
    mask = Image.new("L", (WIDTH * SCALE, HEIGHT * SCALE), 0)
    ImageDraw.Draw(mask).polygon([(x * SCALE, y * SCALE) for x, y in points], fill=255)
    mask = mask.resize((WIDTH, HEIGHT), Image.LANCZOS)
    if blur:
        mask = mask.filter(ImageFilter.GaussianBlur(blur))
    return np.asarray(mask, dtype=float)[..., None] / 255


def paint(image: np.ndarray, mask: np.ndarray, color: np.ndarray) -> np.ndarray:
    return image * (1 - mask) + color * mask


def light_falloff(center_x: float, center_y: float, radius: float, strength: float) -> np.ndarray:
    distance = np.hypot(columns - center_x, rows - center_y) / radius
    return (strength * np.clip(1 - distance, 0, 1) ** 2)[..., None]


# La pared y el piso: casi negro, con la luz del softbox arriba a la derecha.
image = vertical_gradient("#0c0c0b", "#0e0e0d", 0, FLOOR_Y)
floor = vertical_gradient("#111110", "#0b0b0a", FLOOR_Y, HEIGHT)
image = np.where((rows >= FLOOR_Y)[..., None], floor, image)
image = image + 255 * light_falloff(820, 120, 620, 0.055)


def box(image: np.ndarray, left: float, top: float, right: float, bottom: float, lid: bool, shade: float, blur: float = 0) -> np.ndarray:
    """Una caja de cartón vista de frente; con lid, también se ve la tapa con la luz encima."""
    face = vertical_gradient("#4a4036", "#2a251f", top, bottom) * shade
    face = face * (0.62 + 0.38 * np.clip((columns - left) / (right - left), 0, 1))[..., None]
    image = paint(image, polygon_mask([(left, top), (right, top), (right, bottom), (left, bottom)], blur), face)
    tape_left = left + (right - left) * 0.43
    tape_right = left + (right - left) * 0.57
    tape_mask = polygon_mask([(tape_left, top), (tape_right, top), (tape_right, top + (bottom - top) * 0.34), (tape_left, top + (bottom - top) * 0.34)], blur)
    image = paint(image, tape_mask * 0.10, np.full(3, 255.0))
    edge_mask = polygon_mask([(right - 2.5, top), (right, top), (right, bottom), (right - 2.5, bottom)], blur)
    image = paint(image, edge_mask * 0.16 * shade, np.full(3, 255.0))
    if not lid:
        return image
    depth_x, depth_y = (right - left) * 0.07, (right - left) * 0.09
    lid_points = [(left, top), (right, top), (right + depth_x, top - depth_y), (left + depth_x, top - depth_y)]
    lid_color = vertical_gradient("#5c5045", "#4a4037", top - depth_y, top) * shade
    image = paint(image, polygon_mask(lid_points, blur), lid_color)
    lid_tape = [(tape_left, top), (tape_right, top), (tape_right + depth_x, top - depth_y), (tape_left + depth_x, top - depth_y)]
    return paint(image, polygon_mask(lid_tape, blur) * 0.12, np.full(3, 255.0))


def contact_shadow(image: np.ndarray, left: float, right: float) -> np.ndarray:
    mask = polygon_mask([(left - 10, FLOOR_Y - 4), (right + 30, FLOOR_Y - 4), (right + 60, FLOOR_Y + 22), (left - 30, FLOOR_Y + 22)], blur=14)
    return paint(image, mask * 0.7, rgb("#050505"))


# La pila del fondo, más chica, más oscura y fuera de foco; adelante, la pila principal y una caja baja.
image = contact_shadow(image, 905, 1080)
image = box(image, 930, 455, 1100, 598, lid=False, shade=0.62, blur=2.4)
image = box(image, 945, 330, 1090, 455, lid=True, shade=0.62, blur=2.4)
image = contact_shadow(image, 600, 900)
image = box(image, 610, 448, 880, 600, lid=False, shade=1.0)
image = box(image, 628, 312, 862, 448, lid=True, shade=1.04)
image = contact_shadow(image, 470, 600)
image = box(image, 478, 512, 598, 600, lid=True, shade=0.8, blur=0.6)

# El grano de la foto y la caída de la luz en las esquinas.
image = image + generator.normal(0, 2.2, (HEIGHT, WIDTH, 1))
vignette = 1 - 0.35 * np.clip(np.hypot((columns - 760) / 900, (rows - 260) / 700) - 0.35, 0, 1)
image = image * vignette[..., None]

output_path = Path(__file__).with_name("foto-ejemplo.jpg")
Image.fromarray(np.clip(image, 0, 255).round().astype(np.uint8), "RGB").save(output_path, quality=90, optimize=True)
print(output_path)
