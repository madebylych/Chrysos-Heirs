"""
Genera imágenes y "gifs" placeholder para las 8 tarjetas de la colección.

Por qué SVG y no un .png/.gif real:
- No dependemos de librerías externas (Pillow, etc.), solo texto plano.
- Un SVG con <animate> se anima igual que un GIF cuando se usa en <img src="...">,
  así que sirve perfecto como placeholder de "gif" sin tener que fabricar
  un archivo GIF binario de verdad.
- Cuando Emily tenga las imágenes/gifs reales, solo reemplaza el archivo
  (o cambia la ruta en script.js) y el resto del código no cambia.

Salida: archivos media/imagen-N.svg (estático) y media/gif-N.svg (animado),
uno por cada una de las 8 tarjetas placeholder de script.js.
"""

from pathlib import Path

# Carpeta de salida: media/ dentro de este mismo proyecto (ld3_coleccion_tarjetas).
CARPETA_SALIDA = Path(__file__).resolve().parent.parent / "media"
CARPETA_SALIDA.mkdir(exist_ok=True)

# Un color distinto por tarjeta, dentro de la paleta morada del proyecto,
# para que los 8 placeholders se distingan entre sí de un vistazo.
PALETA = [
    "#5800AF", "#7A4FD1", "#9D6BFF", "#3D2C5C",
    "#B084F5", "#4A3870", "#8E5CD9", "#2A1D43",
]

PLANTILLA_IMAGEN_ESTATICA = """<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180">
  <rect width="320" height="180" fill="{color}" />
  <text x="50%" y="50%" fill="white" font-family="sans-serif" font-size="16"
        text-anchor="middle" dominant-baseline="middle">Imagen {n}</text>
</svg>
"""

# El "gif" alterna entre el color de la tarjeta y blanco para que sea obvio,
# al mirarlo, que SÍ se está moviendo (y no es solo la imagen estática).
PLANTILLA_GIF_ANIMADO = """<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180">
  <rect width="320" height="180" fill="{color}">
    <animate attributeName="fill" values="{color};#ffffff;{color}" dur="1.6s" repeatCount="indefinite" />
  </rect>
  <text x="50%" y="50%" fill="#1a1228" font-family="sans-serif" font-size="16"
        text-anchor="middle" dominant-baseline="middle">GIF {n}</text>
</svg>
"""

for i, color in enumerate(PALETA, start=1):
    (CARPETA_SALIDA / f"imagen-{i}.svg").write_text(
        PLANTILLA_IMAGEN_ESTATICA.format(color=color, n=i), encoding="utf-8"
    )
    (CARPETA_SALIDA / f"gif-{i}.svg").write_text(
        PLANTILLA_GIF_ANIMADO.format(color=color, n=i), encoding="utf-8"
    )

print(f"Generados {len(PALETA) * 2} archivos placeholder en: {CARPETA_SALIDA}")
