/* ============================================================
   DATOS: Chrysos Heirs (Honkai: Star Rail)
   ============================================================
   Este es un array de objetos. Cada objeto representa UN Chrysos
   Heir de Amphoreus (los doce personajes que terminan convirtiéndose
   en semidioses tras arrebatar las Coreflames a los Titanes).

   Cada objeto usa los 4 tipos de datos que pide el ejercicio:
   - texto    (string)  -> nombre, titulo, path, elemento, descripcion, imagen
   - número   (number)  -> version (versión de Honkai: Star Rail en la
                            que el personaje se volvió jugable)
   - booleano (boolean) -> esProtagonista (solo Phainon es el
                            protagonista de la historia de Amphoreus)
   - array             -> rasgos (un array DENTRO del objeto, con
                            palabras clave sobre cada personaje)

   Datos verificados contra fuentes actuales del juego (wiki, guías)
   al 15 de septiembre de 2026. El lore de Amphoreus sigue en
   desarrollo, así que algún dato podría ampliarse en parches futuros.

   "imagen" es la ruta a un archivo dentro de media/. Por ahora solo
   existen las fotos reales de Aglaea y Cyrene (media/aglaea.jpg,
   media/cyrene.jpg); al resto todavía les falta la imagen real, así
   que sus rutas van a mostrarse rotas hasta que Emily agregue
   media/<nombre-en-minuscula>.jpg para cada una.
   ============================================================ */
const chrysosHeirs = [
  {
    nombre: "Phainon",
    titulo: "El Rey sin Nombre",
    path: "Destrucción",
    elemento: "Físico",
    version: 3.4,
    esProtagonista: true,
    descripcion:
      "Chrysos Heir profetizado para gobernar Amphoreus tras derrotar a los Titanes antiguos. Apareció por primera vez en la historia principal en la versión 3.0 y se volvió jugable en la 3.4.",
    rasgos: ["protagonista de Amphoreus", "guerrero", "profecía"],
    imagen: "media/phainon.jpg"
  },
  {
    nombre: "Aglaea",
    titulo: "Maestra Costurera de Okhema",
    path: "Remembranza",
    elemento: "Rayo",
    version: 3.0,
    esProtagonista: false,
    descripcion: "Teje el hilo dorado que conecta el destino de Amphoreus.",
    rasgos: ["Okhema", "destino", "hilo dorado"],
    imagen: "media/aglaea.jpg"
  },
  {
    nombre: "Tribbie",
    titulo: "La Mensajera de Tres Caras",
    path: "Armonía",
    elemento: "Cuántico",
    version: 3.1,
    esProtagonista: false,
    descripcion:
      "Mensajera oficial de los Chrysos Heirs; usa las puertas miríada para viajar entre mundos y entregar información importante.",
    rasgos: ["mensajera", "puertas miríada"],
    imagen: "media/tribbie.jpg"
  },
  {
    nombre: "Mydei",
    titulo: "El Guerrero Inmortal",
    path: "Destrucción",
    elemento: "Imaginario",
    version: 3.1,
    esProtagonista: false,
    descripcion:
      "Semidiós de la Contienda, considerado uno de los guerreros más fuertes de todo Amphoreus.",
    rasgos: ["semidiós de la Contienda", "guerrero"],
    imagen: "media/mydei.jpg"
  },
  {
    nombre: "Castorice",
    titulo: "Hija del río Estigia",
    path: "Remembranza",
    elemento: "Cuántico",
    version: 3.2,
    esProtagonista: false,
    descripcion:
      "Concede a los muertos un descanso apacible; su historia está profundamente ligada al duelo y la memoria.",
    rasgos: ["río Estigia", "muerte", "duelo"],
    imagen: "media/castorice.jpg"
  },
  {
    nombre: "Anaxa",
    titulo: "El Erudito Necio",
    path: "Erudición",
    elemento: "Viento",
    version: 3.2,
    esProtagonista: false,
    descripcion:
      "Posee un conocimiento vastísimo y cuestiona abiertamente las profecías de Amphoreus.",
    rasgos: ["erudito", "cuestiona profecías"],
    imagen: "media/anaxa.jpg"
  },
  {
    nombre: "Hyacine",
    titulo: "La Sacerdotisa del Cielo",
    path: "Remembranza",
    elemento: "Viento",
    version: 3.3,
    esProtagonista: false,
    descripcion:
      "Capaz de sanar el cielo y reconstruir el reino místico de Amphoreus.",
    rasgos: ["sacerdotisa", "sanación", "cielo"],
    imagen: "media/hyacine.jpg"
  },
  {
    nombre: "Cipher",
    titulo: "La de Pies Ligeros",
    path: "Nihilismo",
    elemento: "Cuántico",
    version: 3.3,
    esProtagonista: false,
    descripcion:
      "Descrita como una sombra veloz capaz de saltar por encima del tiempo.",
    rasgos: ["velocidad", "sombra"],
    imagen: "media/cipher.jpg"
  },
  {
    nombre: "Hysilens",
    titulo: "Caballera de las Cuerdas Vibrantes",
    path: "Nihilismo",
    elemento: "Físico",
    version: 3.5,
    esProtagonista: false,
    descripcion: "Comandante de los Caballeros de Okhema.",
    rasgos: ["Okhema", "comandante", "caballera"],
    imagen: "media/hysilens.jpg"
  },
  {
    nombre: "Cerydra",
    titulo: "Monarca Maestra del Ajedrez",
    path: "Armonía",
    elemento: "Viento",
    version: 3.5,
    esProtagonista: false,
    descripcion:
      "Porta la Coreflame de la Ley y es comandante suprema en Talanton.",
    rasgos: ["Coreflame de la Ley", "Talanton", "comandante suprema"],
    imagen: "media/cerydra.jpg"
  },
  {
    nombre: "Evernight",
    titulo: "Guardiana de la Coreflame del Tiempo",
    path: "Remembranza",
    elemento: "Hielo",
    version: 3.6,
    esProtagonista: false,
    descripcion:
      "Identidad de Amphoreus de March 7th; oculta la Coreflame del Tiempo y completa a los doce Chrysos Heirs.",
    rasgos: ["Coreflame del Tiempo", "March 7th", "memoria"],
    imagen: "media/evernight.jpg"
  },
  {
    nombre: "Cyrene",
    titulo: "Hija de Aedes Elysiae",
    path: "Remembranza",
    elemento: "Hielo",
    version: 3.7,
    esProtagonista: false,
    descripcion:
      "Encargada de sembrar la Semilla de la Memoria para el futuro de Amphoreus; su kit está pensado para apoyar específicamente a los otros Chrysos Heirs.",
    rasgos: ["Semilla de la Memoria", "soporte", "Aedes Elysiae"],
    imagen: "media/cyrene.jpg"
  }
];

/* ============================================================
   CONSTRUCCIÓN DE UNA TARJETA
   ============================================================
   Esta función recibe UN objeto del array y devuelve el elemento
   HTML (un <article>) ya armado con sus datos. No se toca el HTML
   a mano en ningún momento: todo el markup de la tarjeta se crea
   aquí con JS (createElement / textContent), y por eso el array
   "rasgos" también se recorre con .forEach() para convertirlo en
   varias etiquetas <span>.
   ============================================================ */
function crearTarjeta(heir) {
  const articulo = document.createElement("article");
  articulo.className = "tarjeta";

  // La clase "es-protagonista" activa un estilo distinto (ribbon)
  // solo cuando la propiedad booleana "esProtagonista" es true.
  if (heir.esProtagonista) {
    articulo.classList.add("es-protagonista");
  }

  // Retrato del personaje.
  const portada = document.createElement("img");
  portada.className = "portada";
  portada.src = heir.imagen;
  portada.alt = `Retrato de ${heir.nombre}`;
  articulo.appendChild(portada);

  // Bloque superior: Path del personaje + insignia de protagonista (si aplica).
  const encabezado = document.createElement("div");
  encabezado.className = "tarjeta-encabezado";

  const etiquetaPath = document.createElement("span");
  etiquetaPath.className = "tipo";
  etiquetaPath.textContent = heir.path;
  encabezado.appendChild(etiquetaPath);

  if (heir.esProtagonista) {
    const insigniaProtagonista = document.createElement("span");
    insigniaProtagonista.className = "insignia-protagonista";
    insigniaProtagonista.textContent = "★ Protagonista";
    encabezado.appendChild(insigniaProtagonista);
  }
  articulo.appendChild(encabezado);

  // Nombre del personaje.
  const titulo = document.createElement("h2");
  titulo.className = "titulo";
  titulo.textContent = heir.nombre;
  articulo.appendChild(titulo);

  // Metadatos: epíteto, elemento y versión en la que se volvió jugable.
  const meta = document.createElement("p");
  meta.className = "meta";
  meta.textContent = `${heir.titulo} · ${heir.elemento} · v${heir.version.toFixed(1)}`;
  articulo.appendChild(meta);

  // Descripción.
  const descripcion = document.createElement("p");
  descripcion.className = "sinopsis";
  descripcion.textContent = heir.descripcion;
  articulo.appendChild(descripcion);

  // Rasgos: el array "rasgos" se convierte en una lista de <span>,
  // uno por cada rasgo, dentro de un contenedor.
  const contenedorRasgos = document.createElement("div");
  contenedorRasgos.className = "generos";
  heir.rasgos.forEach((rasgo) => {
    const etiquetaRasgo = document.createElement("span");
    etiquetaRasgo.className = "genero";
    etiquetaRasgo.textContent = rasgo;
    contenedorRasgos.appendChild(etiquetaRasgo);
  });
  articulo.appendChild(contenedorRasgos);

  return articulo;
}

/* ============================================================
   RENDER: pintar todos los Chrysos Heirs en el HTML
   ============================================================
   Esta función busca el contenedor vacío que está en index.html
   (<main id="contenedor-tarjetas">), y por cada objeto del array
   crea su tarjeta (con crearTarjeta) y la agrega al contenedor.
   El HTML no tiene tarjetas escritas a mano: todas llegan por acá.
   ============================================================ */
function renderizarColeccion(lista) {
  const contenedor = document.getElementById("contenedor-tarjetas");
  lista.forEach((heir) => {
    const tarjeta = crearTarjeta(heir);
    contenedor.appendChild(tarjeta);
  });
}

// Punto de entrada: se ejecuta una vez que se carga el script.
renderizarColeccion(chrysosHeirs);
