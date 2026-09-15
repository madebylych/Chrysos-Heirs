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
   - booleano (boolean) -> isDeliverer (solo Phainon es "El Deliverer",
                            el título oficial en inglés de su rol en la
                            historia de Amphoreus)
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
    isDeliverer: true,
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
    isDeliverer: false,
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
    isDeliverer: false,
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
    isDeliverer: false,
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
    isDeliverer: false,
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
    isDeliverer: false,
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
    isDeliverer: false,
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
    isDeliverer: false,
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
    isDeliverer: false,
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
    isDeliverer: false,
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
    isDeliverer: false,
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
    isDeliverer: false,
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
function createCard(heir) {
  const article = document.createElement("article");
  article.className = "card";

  // La clase "is-deliverer" activa un estilo distinto (ribbon)
  // solo cuando la propiedad booleana "isDeliverer" es true.
  if (heir.isDeliverer) {
    article.classList.add("is-deliverer");
  }

  // Retrato del personaje.
  const portrait = document.createElement("img");
  portrait.className = "portrait";
  portrait.src = heir.imagen;
  portrait.alt = `Retrato de ${heir.nombre}`;
  article.appendChild(portrait);

  // Bloque superior: Path del personaje + insignia de Deliverer (si aplica).
  const header = document.createElement("div");
  header.className = "card-header";

  const pathTag = document.createElement("span");
  pathTag.className = "path-tag";
  pathTag.textContent = heir.path;
  header.appendChild(pathTag);

  if (heir.isDeliverer) {
    const delivererBadge = document.createElement("span");
    delivererBadge.className = "deliverer-badge";
    delivererBadge.textContent = "★ Deliverer";
    header.appendChild(delivererBadge);
  }
  article.appendChild(header);

  // Nombre del personaje.
  const name = document.createElement("h2");
  name.className = "name";
  name.textContent = heir.nombre;
  article.appendChild(name);

  // Metadatos: epíteto, elemento y versión en la que se volvió jugable.
  const meta = document.createElement("p");
  meta.className = "meta";
  meta.textContent = `${heir.titulo} · ${heir.elemento} · v${heir.version.toFixed(1)}`;
  article.appendChild(meta);

  // Descripción.
  const description = document.createElement("p");
  description.className = "description";
  description.textContent = heir.descripcion;
  article.appendChild(description);

  // Rasgos: el array "rasgos" se convierte en una lista de <span>,
  // uno por cada rasgo, dentro de un contenedor.
  const traitsContainer = document.createElement("div");
  traitsContainer.className = "traits";
  heir.rasgos.forEach((rasgo) => {
    const traitTag = document.createElement("span");
    traitTag.className = "trait";
    traitTag.textContent = rasgo;
    traitsContainer.appendChild(traitTag);
  });
  article.appendChild(traitsContainer);

  return article;
}

/* ============================================================
   RENDER: pintar todos los Chrysos Heirs en el HTML
   ============================================================
   Esta función busca el contenedor vacío que está en index.html
   (<main id="cards-container">), y por cada objeto del array
   crea su tarjeta (con createCard) y la agrega al contenedor.
   El HTML no tiene tarjetas escritas a mano: todas llegan por acá.
   ============================================================ */
function renderCollection(list) {
  const container = document.getElementById("cards-container");
  list.forEach((heir) => {
    const card = createCard(heir);
    container.appendChild(card);
  });
}

// Punto de entrada: se ejecuta una vez que se carga el script.
renderCollection(chrysosHeirs);
