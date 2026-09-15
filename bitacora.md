# Bitácora — Colección de tarjetas (LD3)

## Estado actual

Estructura completa y funcionando con datos **placeholder** (8 objetos). Falta reemplazar los valores por los títulos reales de la colección de anime/manga/manhwa cuando se definan.

## Qué se le pidió a la IA y qué resultado dio

1. **Primer pedido:** armar una sola tarjeta para probar el estilo antes de construir el array completo, con render hecho desde JS (no HTML escrito a mano).
   - Resultado: se montó `index.html` con un contenedor vacío (`#contenedor-tarjetas`) y `script.js` con una función `crearTarjeta()` que arma el `<article>` completo con `createElement`/`textContent`, incluyendo el recorrido del array `generos` con `.forEach()` para generar los `<span>` de género.

2. **Segundo pedido (implícito en el enunciado):** explorar más de un estilo visual, no quedarse con el primero que funcionó.
   - Se generaron **dos variantes** que comparten exactamente el mismo `script.js` (mismos datos, misma lógica) y solo cambian la hoja de estilos:

### Variante A — `style.css` (la que quedó activa en `index.html`)
- Paleta oscura con degradado morado (consistente con la estética que Emily usa en otros proyectos).
- Tipografía serif (Georgia) para títulos, sans-serif para el resto.
- Layout en grid responsivo (`auto-fill`, sin media queries).
- Hover: `translateY` + rotación leve + sombra con glow morado.
- El estado "favorito" (booleano) se marca con una insignia de texto (`★ Favorito`) y un borde/sombra distinto.

### Variante B — `style-alt.css` + `alt.html`
- Paleta clara, tipografía sans-serif bold en mayúsculas ("estilo flashcard").
- Bordes gruesos y esquinas casi cuadradas en vez de bordes suaves.
- Hover: `scale()` + sombra dura desplazada (estilo "neobrutalista"), en vez del lift suave de la variante A.
- El estado "favorito" se marca con un **ribbon diagonal** hecho con `::before` y `transform: rotate(45deg)`, en vez de un elemento de texto. La insignia que sí genera `script.js` se oculta con `display: none` en esta hoja, para no tocar el JS solo por un cambio visual.

**Resultado de la comparación:** ambas variantes se probaron abriendo las dos páginas en el navegador (con un servidor local simple) y funcionan sin errores. La variante A es la que quedó como principal porque combina mejor con la identidad visual que Emily ya usa en otros proyectos (paleta oscura/morada); la variante B se dejó en el proyecto como evidencia de la exploración y como opción alternativa, no se descartó por defecto.

3. **Tercer pedido:** agregar imágenes y gifs a cada tarjeta.
   - Se preguntó primero de dónde saldrían los archivos (reales vs. placeholder) y qué combinación quería: Emily eligió **placeholder por ahora** e **imagen fija + gif al pasar el mouse**.
   - Como no había archivos reales todavía, se generaron placeholders **locales** en vez de usar un servicio externo (tipo placeholder.com), para que el proyecto funcione sin depender de internet. Se hizo con un script de Python (`scripts/generar_placeholders.py`, siguiendo la convención de usar scripts reutilizables para este tipo de tareas) que crea 16 archivos `.svg` en `media/`: 8 imágenes estáticas (`imagen-1.svg` a `imagen-8.svg`) y 8 "gifs" (`gif-1.svg` a `gif-8.svg`).
   - Los "gifs" son en realidad SVG con animación (`<animate>`), no archivos `.gif` reales: un SVG animado se comporta igual que un gif cuando se usa como `src` de una `<img>` (cambia de color solo, en loop), y así no hace falta fabricar un binario de gif de mentira. Cuando lleguen los gifs reales, basta con reemplazar el archivo o cambiar la ruta.
   - En `script.js` se agregaron dos propiedades nuevas a cada objeto (`imagen` y `gif`, ambas string con la ruta del archivo), y en `crearTarjeta()` se creó un `<img class="portada">` con dos listeners: `mouseenter` cambia el `src` al gif, `mouseleave` lo vuelve a la imagen fija. Este swap se hace en JS porque CSS no puede cambiar el atributo `src` de una etiqueta `<img>`.
   - Se ajustó el CSS de cada variante para acomodar la imagen: en la variante A la imagen se estira hasta los bordes de la tarjeta (esquinas superiores redondeadas); en la variante B queda enmarcada por el borde grueso, coherente con el look "flashcard".
   - Se verificó en el navegador que el hover sí cambia la imagen por el gif y que vuelve a la imagen al sacar el mouse.

## Decisiones tomadas

- Los datos son **placeholder explícito** (`"Título de ejemplo 1"`, etc.) hasta que Emily pase los títulos reales — no se inventaron opiniones personales (favoritos, ratings) porque esa es información suya, no algo que la IA deba fabricar.
- El array quedó con **8 objetos**, dentro del rango pedido (8–10). Se puede ampliar a 9 o 10 fácilmente copiando el patrón de un objeto más.
- Cada objeto tiene 8 propiedades (más que el mínimo de 6), cubriendo los 4 tipos de datos pedidos:
  - texto: `titulo`, `tipo`, `estudioOAutor`, `sinopsis`
  - número: `anioEstreno`, `episodiosOCapitulos`
  - booleano: `favorito`
  - array: `generos`

## Próximo paso

Cuando Emily pase los títulos reales: reemplazar solo los valores dentro de cada objeto en `script.js` (la estructura de propiedades no cambia). Después de eso, revisar si alguna sinopsis queda muy larga/corta para el layout de la tarjeta.
