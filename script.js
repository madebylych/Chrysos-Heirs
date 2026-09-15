/* ============================================================
   DATOS: la colección
   ============================================================
   Este es un array de objetos. Cada objeto representa UNA obra
   (anime, manga o manhwa) de la colección personal.

   Cada objeto usa los 4 tipos de datos que pide el ejercicio:
   - texto   (string)  -> titulo, tipo, estudioOAutor, sinopsis, imagen, gif
   - número  (number)  -> anioEstreno, episodiosOCapitulos
   - booleano(boolean) -> favorito
   - array             -> generos (un array DENTRO del objeto)

   IMPORTANTE: estos son datos PLACEHOLDER. Emily todavía no ha
   pasado los títulos reales, así que estos 8 objetos solo existen
   para probar que el array y el render funcionan con la cantidad
   de tarjetas pedida (entre 8 y 10). Cuando lleguen los títulos
   reales, solo hay que reemplazar los valores de cada propiedad;
   la estructura (los nombres de las propiedades) se queda igual.

   "imagen" y "gif" son rutas a archivos dentro de la carpeta media/.
   Por ahora apuntan a placeholders generados con
   scripts/generar_placeholders.py (rectángulos de color, uno
   estático y uno animado por tarjeta). Cuando Emily tenga las
   imágenes/gifs reales, solo hay que cambiar la ruta por el
   nombre del archivo real (o reemplazar el archivo del placeholder
   manteniendo el mismo nombre) — el código de render no cambia.
   ============================================================ */
const coleccion = [
  {
    titulo: "Título de ejemplo 1",
    tipo: "Anime",
    anioEstreno: 2016,
    episodiosOCapitulos: 12,
    generos: ["Acción", "Fantasía"],
    favorito: true,
    estudioOAutor: "Estudio de ejemplo",
    sinopsis: "Texto de relleno. Reemplazar con la sinopsis real cuando llegue el título.",
    imagen: "media/imagen-1.svg",
    gif: "media/gif-1.svg"
  },
  {
    titulo: "Título de ejemplo 2",
    tipo: "Manga",
    anioEstreno: 2011,
    episodiosOCapitulos: 205,
    generos: ["Drama", "Misterio"],
    favorito: false,
    estudioOAutor: "Autor(a) de ejemplo",
    sinopsis: "Texto de relleno. Reemplazar con la sinopsis real cuando llegue el título.",
    imagen: "media/imagen-2.svg",
    gif: "media/gif-2.svg"
  },
  {
    titulo: "Título de ejemplo 3",
    tipo: "Manhwa",
    anioEstreno: 2020,
    episodiosOCapitulos: 98,
    generos: ["Romance", "Comedia"],
    favorito: true,
    estudioOAutor: "Autor(a) de ejemplo",
    sinopsis: "Texto de relleno. Reemplazar con la sinopsis real cuando llegue el título.",
    imagen: "media/imagen-3.svg",
    gif: "media/gif-3.svg"
  },
  {
    titulo: "Título de ejemplo 4",
    tipo: "Anime",
    anioEstreno: 2019,
    episodiosOCapitulos: 24,
    generos: ["Terror", "Psicológico"],
    favorito: false,
    estudioOAutor: "Estudio de ejemplo",
    sinopsis: "Texto de relleno. Reemplazar con la sinopsis real cuando llegue el título.",
    imagen: "media/imagen-4.svg",
    gif: "media/gif-4.svg"
  },
  {
    titulo: "Título de ejemplo 5",
    tipo: "Manga",
    anioEstreno: 2004,
    episodiosOCapitulos: 72,
    generos: ["Aventura", "Shonen"],
    favorito: false,
    estudioOAutor: "Autor(a) de ejemplo",
    sinopsis: "Texto de relleno. Reemplazar con la sinopsis real cuando llegue el título.",
    imagen: "media/imagen-5.svg",
    gif: "media/gif-5.svg"
  },
  {
    titulo: "Título de ejemplo 6",
    tipo: "Anime",
    anioEstreno: 2013,
    episodiosOCapitulos: 64,
    generos: ["Acción", "Drama"],
    favorito: true,
    estudioOAutor: "Estudio de ejemplo",
    sinopsis: "Texto de relleno. Reemplazar con la sinopsis real cuando llegue el título.",
    imagen: "media/imagen-6.svg",
    gif: "media/gif-6.svg"
  },
  {
    titulo: "Título de ejemplo 7",
    tipo: "Manhwa",
    anioEstreno: 2018,
    episodiosOCapitulos: 140,
    generos: ["Fantasía", "Acción"],
    favorito: false,
    estudioOAutor: "Autor(a) de ejemplo",
    sinopsis: "Texto de relleno. Reemplazar con la sinopsis real cuando llegue el título.",
    imagen: "media/imagen-7.svg",
    gif: "media/gif-7.svg"
  },
  {
    titulo: "Título de ejemplo 8",
    tipo: "Manga",
    anioEstreno: 1998,
    episodiosOCapitulos: 42,
    generos: ["Slice of life", "Comedia"],
    favorito: true,
    estudioOAutor: "Autor(a) de ejemplo",
    sinopsis: "Texto de relleno. Reemplazar con la sinopsis real cuando llegue el título.",
    imagen: "media/imagen-8.svg",
    gif: "media/gif-8.svg"
  }
];

/* ============================================================
   CONSTRUCCIÓN DE UNA TARJETA
   ============================================================
   Esta función recibe UN objeto de la colección y devuelve
   el elemento HTML (un <article>) ya armado con sus datos.
   No se toca el HTML a mano en ningún momento: todo el markup
   de la tarjeta se crea aquí con JS (createElement / textContent),
   y por eso el array "generos" también se recorre con .map()
   para convertirlo en varias etiquetas <span>.
   ============================================================ */
function crearTarjeta(obra) {
  const articulo = document.createElement("article");
  articulo.className = "tarjeta";

  // La clase "favorito" activa un estilo distinto (borde/insignia)
  // solo cuando la propiedad booleana "favorito" es true.
  if (obra.favorito) {
    articulo.classList.add("es-favorito");
  }

  // Imagen de portada. Se crea un <img> que arranca mostrando
  // "obra.imagen" (la imagen fija). Los eventos "mouseenter"/"mouseleave"
  // cambian el atributo src entre la imagen fija y el gif: al entrar el
  // mouse se pone el gif (obra.gif), al salir vuelve a la imagen fija.
  // Así se resuelve "imagen + gif en hover" sin depender de CSS,
  // porque CSS no puede cambiar el src de una etiqueta <img>.
  const portada = document.createElement("img");
  portada.className = "portada";
  portada.src = obra.imagen;
  portada.alt = `Portada de ${obra.titulo}`;
  portada.addEventListener("mouseenter", () => {
    portada.src = obra.gif;
  });
  portada.addEventListener("mouseleave", () => {
    portada.src = obra.imagen;
  });

  // Bloque superior: tipo de obra + insignia de favorito (si aplica).
  const encabezado = document.createElement("div");
  encabezado.className = "tarjeta-encabezado";

  const etiquetaTipo = document.createElement("span");
  etiquetaTipo.className = "tipo";
  etiquetaTipo.textContent = obra.tipo;
  encabezado.appendChild(etiquetaTipo);

  if (obra.favorito) {
    const insigniaFavorito = document.createElement("span");
    insigniaFavorito.className = "insignia-favorito";
    insigniaFavorito.textContent = "★ Favorito";
    encabezado.appendChild(insigniaFavorito);
  }

  // Título de la obra.
  const titulo = document.createElement("h2");
  titulo.className = "titulo";
  titulo.textContent = obra.titulo;

  // Metadatos: año, autor/estudio y cantidad de episodios/capítulos.
  const meta = document.createElement("p");
  meta.className = "meta";
  meta.textContent = `${obra.anioEstreno} · ${obra.estudioOAutor} · ${obra.episodiosOCapitulos} eps/caps`;

  // Sinopsis.
  const sinopsis = document.createElement("p");
  sinopsis.className = "sinopsis";
  sinopsis.textContent = obra.sinopsis;

  // Géneros: el array "generos" se convierte en una lista de <span>,
  // uno por cada género, dentro de un contenedor.
  const contenedorGeneros = document.createElement("div");
  contenedorGeneros.className = "generos";
  obra.generos.forEach((genero) => {
    const etiquetaGenero = document.createElement("span");
    etiquetaGenero.className = "genero";
    etiquetaGenero.textContent = genero;
    contenedorGeneros.appendChild(etiquetaGenero);
  });

  // Se ensambla la tarjeta completa en el orden en que debe verse.
  articulo.appendChild(portada);
  articulo.appendChild(encabezado);
  articulo.appendChild(titulo);
  articulo.appendChild(meta);
  articulo.appendChild(sinopsis);
  articulo.appendChild(contenedorGeneros);

  return articulo;
}

/* ============================================================
   RENDER: pintar toda la colección en el HTML
   ============================================================
   Esta función busca el contenedor vacío que está en index.html
   (<main id="contenedor-tarjetas">), y por cada objeto del array
   crea su tarjeta (con crearTarjeta) y la agrega al contenedor.
   Esta es la parte que cumple el requisito de "renderizado desde
   el .js hacia el .html": el HTML no tiene tarjetas escritas,
   todas llegan por acá.
   ============================================================ */
function renderizarColeccion(lista) {
  const contenedor = document.getElementById("contenedor-tarjetas");
  lista.forEach((obra) => {
    const tarjeta = crearTarjeta(obra);
    contenedor.appendChild(tarjeta);
  });
}

// Punto de entrada: se ejecuta una vez que se carga el script.
renderizarColeccion(coleccion);
