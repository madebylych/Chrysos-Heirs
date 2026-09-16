/* ============================================================
   DATOS: Chrysos Heirs (Honkai: Star Rail)
   ============================================================
   Este es un array de objetos. Cada objeto representa UN Chrysos
   Heir de Amphoreus (el grupo de personajes que terminan
   convirtiéndose en semidioses tras arrebatar las Coreflames a los
   Titanes). Son 14 entradas, no 12: además de los doce Chrysos Heirs
   "clásicos", se agregaron Dan Heng • Permansor Terrae y el
   Trailblazer, que las fuentes también describen como parte del
   grupo (el Trailblazer, por ejemplo, coautor de "As I've Written",
   el diario que documenta el viaje de los Heirs). Si en verdad cuentan
   dentro de "los doce" originales o son un caso aparte es algo que ni
   las wikis de fans terminan de acordar, así que no se afirma un
   número cerrado acá.

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

   "titulo", "path", "elemento", "descripcion" y "rasgos" están en
   inglés y usan el lore oficial del juego (perfiles de personaje de
   icy-veins.com): "descripcion" es el párrafo de introducción/lore
   tal cual aparece en la ficha de cada Chrysos Heir, así que algunos
   nombres ahí son el nombre "verdadero" narrativo del personaje
   (ej. Mydeimos, Tribios, Helektra, Cifera), distinto del nombre
   jugable — es parte real de la trama de Amphoreus, no un error.
   Cyrene es un caso especial: además de la Daughter of Aedes Elysiae
   del poema oficial, su identidad real es Mem — la entidad que, tras
   acumular las memorias de más de 30 millones de ciclos de Amphoreus,
   despierta al Demiurgo (la consciencia central del mundo). Esa parte
   de "descripcion" no es una cita textual del juego, es un resumen
   verificado contra Wikipedia y wikis del juego, hecho a propósito
   para no confundirla con Evernight (otra Chrysos Heir de Remembranza
   con lore de tiempo/memoria, pero una identidad distinta).

   "imagen" es la ruta a un archivo dentro de media/. Todavía no existe
   ninguna foto real ahí, así que por ahora cada tarjeta muestra el
   fallback con la inicial del nombre hasta que Emily agregue
   media/<nombre-en-minuscula>.jpg para cada una.

   "clip" es la ruta a un video corto (.mp4) o gif de ese Chrysos Heir,
   pensado para mostrarse en grande al hacer click en su tarjeta. Es
   opcional: mientras el archivo no exista, el modal muestra un
   placeholder ("Video / GIF próximamente") en ese espacio. Normalmente
   es un string (un solo clip en loop), pero también puede ser un
   array de dos strings [primero, segundo] cuando hay dos videos que
   deben reproducirse en secuencia (Phainon, Cyrene y Trailblazer):
   arranca el primero y, al terminar, sigue solo con el segundo.

   "sticker" es la ruta a una imagen propia (distinta de "imagen") para
   el círculo que sobresale entre el retrato y el panel de info, tipo
   sticker. Mientras no exista, ese círculo también cae al fallback de
   la inicial.
   ============================================================ */
const chrysosHeirs = [
  {
    nombre: "Phainon",
    titulo: "The Blazing Sun That Burns Itself Away",
    path: "Destruction",
    elemento: "Physical",
    version: 3.4,
    isDeliverer: true,
    descripcion:
      "The Nameless hero, Khaslana, the Chrysos Heir carrying the Coreflame of Worldbearing, memorizes the ideals of the entire world, carries the fate of millions, and brings the first light of dawn to the new world.",
    rasgos: ["Amphoreus protagonist", "warrior", "prophecy"],
    imagen: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/phainon.jpg",
    clip: ["https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/phainonfirst.mp4", "https://raw.githubusercontent.com/madebylych/Chrysos-Heirs/master/media/phainon.mp4"],
    sticker: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/phainon-sticker.gif",
  },
  {
    nombre: "Cyrene",
    titulo: "Mem, the Demiurge",
    path: "Remembrance",
    elemento: "Ice",
    version: 3.7,
    isDeliverer: false,
    descripcion:
      "A meteor streaks across the night sky, stirring rippling waves in the river of life, shimmering with thirteen hues. Daughter of Aedes Elysiae, she plants the Seed of Memory, letting yesterday's flowers bloom in tomorrow. Beneath that role hides Mem: an experimental entity that once simulated the Path of Remembrance, and across more than thirty million cycles of Amphoreus quietly gathered the memories of everyone who lived them. Those memories are what finally wake the Demiurge — the world's core consciousness, the true heart of Amphoreus.",
    rasgos: ["Mem / Demiurge", "Seed of Memory", "support"],
    imagen: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/cyrene.jpg",
    clip: ["https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/cyrenefirst.mp4", "https://raw.githubusercontent.com/madebylych/Chrysos-Heirs/master/media/cyrene.mp4"],
    sticker: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/cyrene-sticker.gif",
  },
  {
    nombre: "Aglaea",
    titulo: "Dressmaster of Okhema",
    path: "Remembrance",
    elemento: "Lightning",
    version: 3.0,
    isDeliverer: false,
    descripcion:
      "In that holy city kissed by the dawn, the weaver caresses the golden threads, entwining fates. The Chrysos Heir who bears the Coreflame of Romance gathered the world's heroes, leading them on a long journey once more — to topple the gods, reclaim the divine flame, and grant rebirth to the nearly fallen Amphoreus.",
    rasgos: ["Okhema", "fate", "golden thread"],
    imagen: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/aglaea.jpg",
    clip: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/aglaea.mp4",
    sticker: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/aglaea-sticker.gif",
  },
  {
    nombre: "Tribbie",
    titulo: "The Three-Faced Messenger",
    path: "Harmony",
    elemento: "Quantum",
    version: 3.1,
    isDeliverer: false,
    descripcion:
      "From that holy land blessed by the tripartite prophecy, the messenger split into a thousand forms, embarking on a long journey. Tribios, Holy Maiden of Janusopolis, the Chrysos Heir who stole the Coreflame of Passage, toiled for the masses and brought the news of deliverance to all domains.",
    rasgos: ["messenger", "myriad gates"],
    imagen: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/tribbie.jpg",
    clip: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/tribbie.mp4",
    sticker: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/tribbie-sticker.gif",
  },
  {
    nombre: "Mydei",
    titulo: "The Immortal Warrior",
    path: "Destruction",
    elemento: "Imaginary",
    version: 3.1,
    isDeliverer: false,
    descripcion:
      "The undying Mydeimos, the lion apart from the rest. The Chrysos Heir who seeks the Coreflame of Strife must suffer a thousand deaths, be bathed in blood on the path home, and bear the madness of fate alone.",
    rasgos: ["demigod of Strife", "warrior"],
    imagen: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/mydei.jpg",
    clip: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/mydei.mp4",
    sticker: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/mydei-sticker.gif",
  },
  {
    nombre: "Castorice",
    titulo: "Daughter of the River of Souls",
    path: "Remembrance",
    elemento: "Quantum",
    version: 3.2,
    isDeliverer: false,
    descripcion:
      "Aidonia, the snowy land that respects and worships death, has already sunk into sweet slumber. Castorice, daughter of the River of Souls, the Chrysos Heir in search of the Coreflame of Death, set forth to guard the lament of the souls in this world and embrace the solitude of destiny.",
    rasgos: ["River Styx", "death", "grief"],
    imagen: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/castorice.jpg",
    clip: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/castorice.mp4",
    sticker: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/castorice-sticker.gif",
  },
  {
    nombre: "Anaxa",
    titulo: "The Foolish Scholar",
    path: "Erudition",
    elemento: "Wind",
    version: 3.2,
    isDeliverer: false,
    descripcion:
      "The Grove of Epiphany, where knowledge flourishes and philosophers are born. Yet here stands Anaxagoras the blasphemer, the Chrysos Heir who challenges the Coreflame of Reason — daring to defy prophecy, even at the cost of infamy, driving the thorns of doubt into the Sacred Tree of wisdom.",
    rasgos: ["scholar", "questions prophecy"],
    imagen: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/anaxa.jpg",
    clip: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/anaxa.mp4",
    sticker: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/anaxa-sticker.gif",
  },
  {
    nombre: "Hyacine",
    titulo: "Priestess of the Sky",
    path: "Remembrance",
    elemento: "Wind",
    version: 3.3,
    isDeliverer: false,
    descripcion:
      "As the city-state in the clouds crumbles through time, the Twilight Courtyard opens its gates once more, bringing a glimmer of light to Evernight. Physician Hyacinthia, the Chrysos Heir who guards the Coreflame of the Sky, inherits her ancestors' will to mend the torn fabric of dusk and dawn.",
    rasgos: ["priestess", "healing", "sky"],
    imagen: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/hyacine.jpg",
    clip: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/hyacine.mp4",
    sticker: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/hyacine-sticker.gif",
  },
  {
    nombre: "Cipher",
    titulo: "The Light-Footed One",
    path: "Nihility",
    elemento: "Quantum",
    version: 3.3,
    isDeliverer: false,
    descripcion:
      "In the fallen city of bandits, Dolos, the 300 Rogues run wild and free, the entire city at their mercy. The fleet-footed Thief Star Cifera, Chrysos Heir of the Coreflame of Trickery, races onward so her web of lies may spread with the breeze throughout all lands.",
    rasgos: ["speed", "shadow"],
    imagen: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/cipher.jpg",
    clip: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/cipher.mp4",
    sticker: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/cipher-sticker.gif",
  },
  {
    nombre: "Hysilens",
    titulo: "Knight of the Vibrant Strings",
    path: "Nihility",
    elemento: "Physical",
    version: 3.5,
    isDeliverer: false,
    descripcion:
      "Styxia, the coastal city of intoxication and dreams, where echoes of old songs still drift among the waves. Helektra, Daughter of the Sea, the Chrysos Heir who cleanses the Coreflame of the Ocean, dispels the murky undercurrents and orchestrates a feast of revelry for the heroes beyond the sky.",
    rasgos: ["Okhema", "commander", "knight"],
    imagen: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/hysilens.jpg",
    clip: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/hysilens.mp4",
    sticker: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/hysilens-sticker.gif",
  },
  {
    nombre: "Cerydra",
    titulo: "Chess Grandmaster",
    path: "Harmony",
    elemento: "Wind",
    version: 3.5,
    isDeliverer: false,
    descripcion:
      "The Northern Empire, a lost dynasty, where frozen lands burn with ambitions of conquest. Sovereign Cerydra, the Chrysos Heir who wields the Coreflame of Law, sets her pieces, challenges the gods, passes judgment upon the faithless, and carves the path of the Flame-Chase into the fate of this world.",
    rasgos: ["Coreflame of Law", "Talanton", "supreme commander"],
    imagen: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/cerydra.jpg",
    clip: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/cerydra.mp4",
    sticker: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/cerydra-sticker.gif",
  },
  {
    nombre: "Evernight",
    titulo: "Guardian of the Coreflame of Time",
    path: "Remembrance",
    elemento: "Ice",
    version: 3.6,
    isDeliverer: false,
    descripcion:
      "In the Memory Zone secluded from the world, candlelight reflects the past, silently extinguishing in the mist. Evernight, child of Remembrance born from the shadow, the Chrysos Heir who conceals the Coreflame of Time, stirs the tide of Oblivion, guarding the wish of the mirrored soul.",
    rasgos: ["Coreflame of Time", "March 7th", "memory"],
    imagen: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/evernight.jpg",
    clip: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/evernight.mp4",
    sticker: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/evernight-sticker.gif",
  },
  {
    nombre: "Dan Heng • Permansor Terrae",
    titulo: "Guardian of the Earth's Coreflame",
    path: "Preservation",
    elemento: "Physical",
    version: 3.6,
    isDeliverer: false,
    descripcion:
      "The chest of Georios, the body of the Fallen Dragon supporting the shattered earth, enduring millennia of pain. Nameless Dan Heng, the Chrysos Heir who guards the Earth's Coreflame, must steady the world as it falls, and guide all life across the land to a new home beyond.",
    rasgos: ["Fallen Dragon", "Georios", "guardian"],
    imagen: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/danhengpept.jpg",
    clip: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/danhengpept.mp4",
    sticker: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/danhengpept-sticker.gif",
  },
  {
    nombre: "Trailblazer",
    titulo: "Co-Author of As I've Written",
    path: "Remembrance",
    elemento: "Ice",
    version: 3.0,
    isDeliverer: false,
    descripcion:
      "The Astral Express carried them into Amphoreus, where the world's oldest prophecy folded them into its story. Recognized among the Chrysos Heirs and gifted the power of Remembrance, the Trailblazer became a co-author of \"As I've Written,\" the journal that records the journeys of the Twelve across the endless cycles of the Flame-Chase.",
    rasgos: ["Astral Express", "As I've Written", "outsider Heir"],
    imagen: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/trailblazer.jpg",
    clip: ["https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/trailblazerfirst.mp4", "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/trailblazer.mp4"],
    sticker: "https://cdn.jsdelivr.net/gh/madebylych/Chrysos-Heirs@master/media/trailblazer-sticker.gif",
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
// Crea un <img> con un fallback de iniciales que aparece automáticamente
// si la imagen no existe todavía (media/ está incompleta por ahora).
// Se usa dos veces por tarjeta: para el retrato grande y para el
// sticker chico, por eso recibe los nombres de clase como parámetros
// en vez de tenerlos fijos adentro de la función.
function createImageWithFallback(src, alt, initial, wrapperClass, imgClass, fallbackClass) {
  // El wrapper es el que lleva la clase CSS que decide el tamaño/forma
  // (portrait-wrap o avatar-chip); adentro conviven el <img> real y su
  // fallback, y el CSS decide cuál de los dos se ve.
  const wrapper = document.createElement("div");
  wrapper.className = wrapperClass;

  const img = document.createElement("img");
  img.className = imgClass;
  img.src = src;
  img.alt = alt;
  // loading="lazy": el navegador no descarga la imagen hasta que está
  // por entrar en pantalla, para no cargar las 14 de una sola vez.
  img.loading = "lazy";
  wrapper.appendChild(img);

  // El fallback (la inicial grande) ya está armado en el DOM desde el
  // principio, escondido por CSS; no se crea recién cuando falla la
  // imagen, para no tener que esperar a ese momento.
  const fallback = document.createElement("span");
  fallback.className = fallbackClass;
  fallback.textContent = initial;
  // aria-hidden: es decorativo (el nombre completo ya lo lee el lector
  // de pantalla en otro lado), así que no hace falta que se anuncie.
  fallback.setAttribute("aria-hidden", "true");
  wrapper.appendChild(fallback);

  // Si el archivo de imagen no existe (o falla por cualquier otro
  // motivo), el navegador dispara "error" en el <img>. Ahí se le
  // agrega la clase .img-missing al wrapper, y el CSS es el que
  // realmente esconde el <img> roto y muestra el fallback.
  img.addEventListener(
    "error",
    () => {
      wrapper.classList.add("img-missing");
    },
    { once: true }
  );

  return wrapper;
}

// Vacía "container" y le mete un <span class="trait"> por cada rasgo.
// La usan tanto la tarjeta como el modal, para no repetir el mismo
// forEach dos veces.
function renderTraits(container, rasgos) {
  // Antes de agregar los rasgos nuevos, se borra cualquier <span> que
  // hubiera quedado de una llamada anterior (importante para el
  // modal, que reutiliza el mismo contenedor cada vez que se abre con
  // un personaje distinto).
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  rasgos.forEach((rasgo) => {
    const traitTag = document.createElement("span");
    traitTag.className = "trait";
    traitTag.textContent = rasgo;
    container.appendChild(traitTag);
  });
}

function createCard(heir) {
  const article = document.createElement("article");
  article.className = "card";
  // dataset.path / dataset.element quedan como atributos data-path y
  // data-element en el HTML final; el CSS los usa para pintar cada
  // tarjeta con el color de su Path/Elemento (ver style.css). dataset
  // .nombre existe solo para poder darle una excepción de color a un
  // personaje puntual (Phainon) sin tocar el resto de su mismo Path.
  article.dataset.path = heir.path;
  article.dataset.element = heir.elemento;
  article.dataset.nombre = heir.nombre;

  // La clase "is-deliverer" activa un estilo distinto (ribbon dorado)
  // solo cuando la propiedad booleana "isDeliverer" es true.
  if (heir.isDeliverer) {
    article.classList.add("is-deliverer");
  }

  // Primera letra del nombre: es lo que se muestra en los dos
  // fallbacks (retrato y sticker) mientras esos archivos no existen.
  const initial = heir.nombre.charAt(0);

  // --- Bloque de imagen (retrato + mini-avatar circular superpuesto) ---
  const media = document.createElement("div");
  media.className = "card-media";

  // Retrato grande del personaje, con su propio fallback de inicial.
  const portraitWrap = createImageWithFallback(
    heir.imagen,
    `Retrato de ${heir.nombre}`,
    initial,
    "portrait-wrap",
    "portrait",
    "portrait-fallback"
  );
  media.appendChild(portraitWrap);

  // Degradado transparente -> blanco pegado al borde inferior de la
  // imagen, para que el panel de texto se mezcle con ella en vez de
  // cortar seco.
  const mediaFade = document.createElement("div");
  mediaFade.className = "card-media-fade";
  mediaFade.setAttribute("aria-hidden", "true");
  media.appendChild(mediaFade);

  // La insignia dorada "★" solo se crea (y solo existe en el DOM)
  // para el personaje que tiene isDeliverer === true, o sea Phainon.
  if (heir.isDeliverer) {
    const delivererBadge = document.createElement("span");
    delivererBadge.className = "deliverer-badge";
    delivererBadge.title = "Deliverer";
    delivererBadge.textContent = "★";
    media.appendChild(delivererBadge);
  }

  // Sticker chico (el gif oficial), con el mismo mecanismo de
  // fallback que el retrato pero apuntando a heir.sticker en vez de
  // heir.imagen. El alt queda vacío a propósito: es decorativo, el
  // nombre del personaje ya se lee en el <h2> de más abajo.
  const avatarChip = createImageWithFallback(
    heir.sticker,
    "",
    initial,
    "avatar-chip",
    "avatar-img",
    "avatar-fallback"
  );
  media.appendChild(avatarChip);

  article.appendChild(media);

  // --- Panel de información (superpuesto tipo "glass card") ---
  const panel = document.createElement("div");
  panel.className = "card-panel";

  // Fila de arriba del panel: pill de Path + pill de Elemento + los
  // "···" decorativos.
  const topRow = document.createElement("div");
  topRow.className = "card-toprow";

  const pathTag = document.createElement("span");
  pathTag.className = "path-tag";
  pathTag.textContent = heir.path;
  topRow.appendChild(pathTag);

  const elementTag = document.createElement("span");
  elementTag.className = "element-tag";
  elementTag.textContent = heir.elemento;
  topRow.appendChild(elementTag);

  // Los tres puntos "⋯" no hacen nada al clickearlos: son solo un
  // detalle visual (copiando el estilo de tarjeta de personaje de
  // juego de la referencia), por eso aria-hidden.
  const menuDots = document.createElement("span");
  menuDots.className = "card-menu";
  menuDots.textContent = "⋯";
  menuDots.setAttribute("aria-hidden", "true");
  topRow.appendChild(menuDots);

  panel.appendChild(topRow);

  // Nombre del personaje.
  const name = document.createElement("h2");
  name.className = "name";
  name.textContent = heir.nombre;
  panel.appendChild(name);

  // Metadatos: epíteto y versión en la que se volvió jugable.
  const meta = document.createElement("p");
  meta.className = "meta";
  meta.textContent = `${heir.titulo} · v${heir.version.toFixed(1)}`;
  panel.appendChild(meta);

  // Descripción corta: el texto completo vive en heir.descripcion,
  // pero acá se recorta visualmente con CSS (line-clamp) para dejar
  // la tarjeta compacta. El texto completo se ve en el modal.
  const description = document.createElement("p");
  description.className = "description";
  description.textContent = heir.descripcion;
  panel.appendChild(description);

  // Rasgos: el array "rasgos" se convierte en una lista de <span>,
  // uno por cada rasgo, dentro de un contenedor.
  const traitsContainer = document.createElement("div");
  traitsContainer.className = "traits";
  renderTraits(traitsContainer, heir.rasgos);
  panel.appendChild(traitsContainer);

  // Pista visual de que la tarjeta se puede clickear para ver más.
  // aria-hidden porque ya existe aria-label en la tarjeta (más abajo)
  // con el mismo mensaje para quien use lector de pantalla.
  const hint = document.createElement("span");
  hint.className = "card-hint";
  hint.textContent = "Ver más ↗";
  hint.setAttribute("aria-hidden", "true");
  panel.appendChild(hint);

  article.appendChild(panel);

  // Toda la tarjeta es clickeable: abre el modal con la descripción
  // completa y el espacio para el video/gif del personaje. También
  // funciona con teclado (Enter / Espacio) para que sea accesible.
  // tabIndex=0 la hace alcanzable con Tab (un <article> normal no lo
  // es), y role="button" + aria-haspopup + aria-label le avisan a un
  // lector de pantalla qué es y qué va a pasar al activarla.
  article.tabIndex = 0;
  article.setAttribute("role", "button");
  article.setAttribute("aria-haspopup", "dialog");
  article.setAttribute("aria-label", `Ver más sobre ${heir.nombre}`);

  // Click con mouse/touch.
  article.addEventListener("click", () => openHeirModal(heir, article));
  // Enter o Espacio con el teclado hacen lo mismo que un click.
  // preventDefault() evita que Espacio además scrollee la página (su
  // comportamiento normal cuando el foco está en un elemento así).
  article.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openHeirModal(heir, article);
    }
  });

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
  // Una tarjeta por cada objeto del array, en el mismo orden en que
  // están escritos en chrysosHeirs.
  list.forEach((heir) => {
    const card = createCard(heir);
    container.appendChild(card);
  });
}

/* ============================================================
   MODAL: descripción completa + video/gif del Chrysos Heir
   ============================================================
   Un solo modal se construye una vez (createHeirModal) y se
   reutiliza para los 12 personajes; openHeirModal() solo cambia
   su contenido. Así, si el archivo de "clip" todavía no existe,
   se ve un placeholder en vez de un video roto — mismo patrón que
   el fallback de las imágenes de retrato.
   ============================================================ */
// heirModal guarda las referencias a los elementos del modal después
// de construirlo la primera vez (createHeirModal), para no tener que
// volver a armarlo cada vez que se abre. Arranca en null porque el
// modal recién se crea la primera vez que alguien clickea una tarjeta
// (ver openHeirModal).
let heirModal = null;
// modalTrigger guarda qué tarjeta (elemento del DOM) abrió el modal,
// para devolverle el foco del teclado ahí mismo cuando se cierra.
let modalTrigger = null;

// Placeholder que se muestra en el espacio del video/gif mientras
// ese archivo todavía no existe en media/.
function createMediaPlaceholder() {
  const placeholder = document.createElement("div");
  placeholder.className = "modal-media-placeholder";

  const icon = document.createElement("span");
  icon.className = "modal-media-icon";
  icon.textContent = "▶";
  icon.setAttribute("aria-hidden", "true");
  placeholder.appendChild(icon);

  const label = document.createElement("span");
  label.textContent = "Video / GIF próximamente";
  placeholder.appendChild(label);

  return placeholder;
}

// Arma el contenido del espacio de media del modal: video (.mp4/.webm),
// imagen animada (.gif/.webp) o, si no hay "clip" o el archivo falla
// al cargar, el placeholder de arriba.
//
// "clip" normalmente es un string (un solo video en loop), pero Phainon,
// Cyrene y Trailblazer tienen DOS: ahí "clip" es un array
// [primero, segundo]. En ese caso se reproduce el primero y, apenas
// termina (evento "ended"), arranca solo el siguiente; al terminar el
// último, vuelve a empezar la secuencia desde el principio.
function buildModalMedia(heir) {
  // "wrap" es el contenedor que va a tener adentro, según el caso: el
  // placeholder, una imagen animada, o el video (+ su fondo
  // desenfocado + los controles de carrusel si corresponde).
  const wrap = document.createElement("div");
  wrap.className = "modal-media-slot";

  // Caso 1: el personaje todavía no tiene ningún clip cargado.
  if (!heir.clip) {
    wrap.appendChild(createMediaPlaceholder());
    return wrap;
  }

  // heir.clip puede ser un string (un solo clip) o un array de dos
  // strings (Phainon/Cyrene/Trailblazer). Se normaliza siempre a
  // array para que el resto de la función no tenga que fijarse cuál
  // de los dos casos es.
  const sources = Array.isArray(heir.clip) ? heir.clip : [heir.clip];
  // Se mira la extensión del PRIMER archivo para decidir si esto es
  // una imagen animada (gif/webp/etc.) o un video real.
  const isImageClip = /\.(gif|webp|png|jpe?g)$/i.test(sources[0]);

  // Caso 2: es una imagen animada. Como es una sola imagen (no tiene
  // sentido un "array" de gifs en secuencia), se usa directo
  // sources[0] y se corta acá, sin llegar a la parte de <video> de
  // abajo.
  if (isImageClip) {
    const img = document.createElement("img");
    img.className = "modal-media-content";
    img.src = sources[0];
    img.alt = `Clip de ${heir.nombre}`;
    // Si el gif falla al cargar, se cae al mismo placeholder que si
    // no hubiera clip.
    img.addEventListener(
      "error",
      () => {
        img.remove();
        wrap.appendChild(createMediaPlaceholder());
      },
      { once: true }
    );
    wrap.appendChild(img);
    return wrap;
  }

  // Caso 3 (el resto de esta función): es un video real, o dos.

  // El video real es vertical y el hueco es 4:3, así que a los costados
  // sobra espacio ("contain"). En vez de rellenarlo con un degradado
  // fijo del Path/Elemento, se pone una copia del mismo video de
  // fondo, agrandada y muy desenfocada: como no se distingue la
  // imagen, se ve como un resplandor de color que sale del propio
  // video (mismo truco que usan Spotify/Apple TV para el "ambient
  // glow"). Esa copia va muda y no tiene controles; el sonido sale
  // solo del video de encima.
  const backdrop = document.createElement("video");
  backdrop.className = "modal-media-backdrop";
  backdrop.muted = true;
  backdrop.playsInline = true;
  backdrop.setAttribute("aria-hidden", "true");

  const video = document.createElement("video");
  video.className = "modal-media-content";
  // Sin muted: como el video arranca porque la persona hizo click en
  // la tarjeta (un gesto real del usuario), el navegador sí deja
  // reproducir con sonido. La pantalla de carga es distinta: esa
  // arranca sola al cargar la página, sin ningún click, así que ahí
  // sí hace falta estar muteada para que el autoplay funcione.
  video.playsInline = true;
  video.controls = true;

  // Índice del clip que se está viendo ahora mismo dentro de
  // "sources" (0 o 1 en los personajes con dos videos; siempre 0 en
  // los que tienen uno solo).
  let index = 0;
  // Se reemplaza más abajo si hay carrusel (más de un clip); si no,
  // queda como no-op.
  let updateDots = () => {};

  // Pone en los dos <video> (el principal y el fondo) el clip que
  // corresponde a "index" ahora mismo, y los pone a reproducir.
  const playCurrent = () => {
    const src = sources[index];
    video.src = src;
    // .play() devuelve una Promise; el navegador a veces la rechaza
    // (por ejemplo si bloquea el autoplay), y el .catch(() => {})
    // vacío evita que eso aparezca como un error sin manejar en la
    // consola. Ver los comentarios de arriba sobre por qué NO va
    // mute en este video.
    video.play().catch(() => {});
    // El fondo desenfocado sigue el mismo índice de la secuencia. No
    // hace falta un sync perfecto entre los dos videos: al estar tan
    // desenfocado, un pequeño desfase de milisegundos no se nota.
    backdrop.src = src;
    backdrop.play().catch(() => {});
    updateDots();
  };

  // goTo() la usan tanto el auto-avance al terminar un video como las
  // flechas del carrusel de abajo, así que ambos quedan sincronizados
  // en el mismo índice. La cuenta con "% sources.length" es un
  // wraparound: si el índice se pasa del final vuelve al principio, y
  // si el prevBtn lo manda a -1 (goTo(index - 1) cuando index es 0),
  // sumarle sources.length antes del módulo lo lleva de vuelta al
  // último elemento en vez de dar un índice negativo.
  const goTo = (newIndex) => {
    index = (newIndex + sources.length) % sources.length;
    playCurrent();
  };

  // Si hay más de un clip (Phainon/Cyrene/Trailblazer): auto-avance +
  // carrusel manual. Si hay uno solo: loop simple, sin ningún control
  // extra (rama "else" de abajo).
  if (sources.length > 1) {
    // Al terminar el clip actual, pasa solo al siguiente.
    video.addEventListener("ended", () => goTo(index + 1));

    // Carrusel manual: por si Emily quiere adelantar o volver a ver
    // el otro video sin esperar a que termine el actual.
    const prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "modal-media-nav modal-media-nav-prev";
    prevBtn.setAttribute("aria-label", "Video anterior");
    prevBtn.textContent = "‹";
    prevBtn.addEventListener("click", (event) => {
      // Sin esto, el click "atravesaría" el botón y podría disparar
      // otros manejadores de click más arriba en el árbol del DOM.
      event.stopPropagation();
      goTo(index - 1);
    });

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "modal-media-nav modal-media-nav-next";
    nextBtn.setAttribute("aria-label", "Video siguiente");
    nextBtn.textContent = "›";
    nextBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      goTo(index + 1);
    });

    // Un punto por cada clip disponible (acá siempre van a ser 2).
    const dotsWrap = document.createElement("div");
    dotsWrap.className = "modal-media-dots";
    const dotEls = sources.map(() => {
      const dot = document.createElement("span");
      dot.className = "modal-media-dot";
      dotsWrap.appendChild(dot);
      return dot;
    });
    // Reemplaza el updateDots "vacío" de más arriba: ahora sí marca
    // con la clase .is-active cuál punto corresponde al índice actual
    // (y se lo saca a los demás).
    updateDots = () => {
      dotEls.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
    };

    wrap.appendChild(prevBtn);
    wrap.appendChild(nextBtn);
    wrap.appendChild(dotsWrap);
  } else {
    // Un solo clip: se repite solo, sin flechas ni puntos (no tendría
    // sentido un carrusel de un solo elemento).
    video.loop = true;
    backdrop.loop = true;
  }

  // Si el archivo de video falla al cargar (por ejemplo porque
  // todavía no existe en media/), se sacan los dos <video> y se cae
  // al mismo placeholder que en los otros casos.
  video.addEventListener(
    "error",
    () => {
      backdrop.remove();
      video.remove();
      wrap.appendChild(createMediaPlaceholder());
    },
    { once: true }
  );

  // El backdrop se agrega ANTES que el video principal a propósito:
  // aunque el CSS ya se encarga del orden con z-index, mantener acá
  // el mismo orden visual (fondo primero, contenido encima) hace el
  // código más fácil de leer.
  wrap.appendChild(backdrop);
  wrap.appendChild(video);
  // Arranca la reproducción del primer clip apenas se arma todo.
  playCurrent();
  return wrap;
}

// Construye el esqueleto del modal (una sola vez) y lo agrega al body.
// Ninguno de estos elementos lleva todavía datos de ningún personaje
// (nombre, descripción, etc.): eso lo completa openHeirModal() cada
// vez que se abre. Acá solo se arma la "carcasa" vacía y se conecta
// una sola vez todo lo que no cambia entre apertura y apertura
// (cerrar con click afuera, con Escape, pausar al cambiar de pestaña).
function createHeirModal() {
  // Fondo oscuro que cubre toda la pantalla. Arranca "hidden" (ni
  // siquiera ocupa espacio) porque el modal recién se muestra cuando
  // alguien clickea una tarjeta.
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.hidden = true;

  // La tarjeta blanca en sí. role="dialog" + aria-modal le avisan a
  // un lector de pantalla que esto es una ventana modal.
  const dialog = document.createElement("div");
  dialog.className = "modal";
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "modal-close";
  closeBtn.setAttribute("aria-label", "Cerrar");
  closeBtn.textContent = "✕";
  closeBtn.addEventListener("click", closeHeirModal);
  dialog.appendChild(closeBtn);

  // Contenedor vacío: acá adentro va a caer el resultado de
  // buildModalMedia() (armado de nuevo cada vez que se abre el
  // modal, porque cambia según el personaje).
  const mediaSlotHolder = document.createElement("div");
  mediaSlotHolder.className = "modal-media-holder";
  dialog.appendChild(mediaSlotHolder);

  // Todo el texto del modal (pills, nombre, meta, descripción
  // completa, rasgos) vive adentro de este "body".
  const body = document.createElement("div");
  body.className = "modal-body";
  dialog.appendChild(body);

  // Reusa la misma clase "card-toprow" que usan las tarjetas, para
  // que las pills de Path/Elemento se vean iguales en los dos lados.
  const topRow = document.createElement("div");
  topRow.className = "card-toprow";
  const pathTag = document.createElement("span");
  pathTag.className = "path-tag";
  const elementTag = document.createElement("span");
  elementTag.className = "element-tag";
  topRow.appendChild(pathTag);
  topRow.appendChild(elementTag);
  body.appendChild(topRow);

  const name = document.createElement("h2");
  name.className = "name";
  body.appendChild(name);

  const meta = document.createElement("p");
  meta.className = "meta";
  body.appendChild(meta);

  // "modal-description" (no "description"): a propósito una clase
  // distinta a la de la tarjeta, porque acá NO se recorta el texto
  // con line-clamp — se ve completo.
  const description = document.createElement("p");
  description.className = "modal-description";
  body.appendChild(description);

  const traits = document.createElement("div");
  traits.className = "traits";
  body.appendChild(traits);

  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  // Cerrar clickeando el fondo oscuro (no el diálogo en sí) o con Escape.
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeHeirModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.classList.contains("is-open")) {
      closeHeirModal();
    }
  });

  // Si la persona cambia de pestaña o minimiza el navegador mientras
  // el video está sonando, se pausa solo: que no quede sonando de
  // fondo sin que se vea nada.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pauseModalMedia();
  });

  // Se devuelven todas las referencias juntas en un objeto: así
  // openHeirModal() y closeHeirModal() pueden acceder directo a
  // heirModal.name, heirModal.description, etc. sin tener que volver
  // a buscarlas en el DOM cada vez.
  return { overlay, dialog, closeBtn, mediaSlotHolder, pathTag, elementTag, name, meta, description, traits };
}

// Se llama cada vez que se clickea (o se activa con teclado) una
// tarjeta. "heir" es el objeto del personaje correspondiente, y
// "trigger" es la tarjeta que disparó la apertura (para devolverle el
// foco al cerrar).
function openHeirModal(heir, trigger) {
  // El modal se construye recién la primera vez que se necesita; las
  // veces siguientes se reutiliza el mismo (heirModal ya no es null).
  if (!heirModal) {
    heirModal = createHeirModal();
  }
  modalTrigger = trigger || null;

  // Mismos atributos data-* que ya tiene la tarjeta, para que el
  // modal se pinte con el color de Path/Elemento correcto.
  heirModal.dialog.dataset.path = heir.path;
  heirModal.dialog.dataset.element = heir.elemento;
  heirModal.dialog.dataset.nombre = heir.nombre;

  // Se borra el video/gif/placeholder del personaje anterior (si
  // había uno) antes de armar el de este.
  while (heirModal.mediaSlotHolder.firstChild) {
    heirModal.mediaSlotHolder.removeChild(heirModal.mediaSlotHolder.firstChild);
  }
  heirModal.mediaSlotHolder.appendChild(buildModalMedia(heir));

  // Se actualiza todo el texto del modal con los datos de este
  // personaje en particular.
  heirModal.pathTag.textContent = heir.path;
  heirModal.elementTag.textContent = heir.elemento;
  heirModal.name.textContent = heir.nombre;
  heirModal.meta.textContent = `${heir.titulo} · v${heir.version.toFixed(1)}`;
  heirModal.description.textContent = heir.descripcion;
  renderTraits(heirModal.traits, heir.rasgos);

  // Primero se hace visible (display) sin la clase "is-open", y recién
  // en el frame siguiente se agrega la clase: así el navegador sí
  // anima la transición de opacity/transform en vez de saltar directo
  // al estado final ("spawnear" de golpe).
  heirModal.overlay.hidden = false;
  // Bloquea el scroll de la página de fondo mientras el modal está
  // abierto (ver body.modal-open en el CSS).
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => {
    heirModal.overlay.classList.add("is-open");
  });
  // Mueve el foco del teclado al botón de cerrar, para que alguien
  // navegando con Tab no se quede "perdido" en la tarjeta de atrás.
  heirModal.closeBtn.focus();
}

// Pausa cualquier <video> que esté sonando adentro del modal (el
// principal y el fondo desenfocado). Se usa al cerrar el modal y al
// cambiar de pestaña, para que el audio no siga sonando de fondo sin
// que se vea nada.
function pauseModalMedia() {
  if (!heirModal) return;
  heirModal.mediaSlotHolder.querySelectorAll("video").forEach((video) => {
    video.pause();
  });
}

function closeHeirModal() {
  // Si el modal no existe todavía, o ya está cerrado, no hay nada que
  // hacer (esto evita, por ejemplo, cerrar dos veces seguidas si
  // alguien aprieta Escape mientras ya se está por cerrar).
  if (!heirModal || !heirModal.overlay.classList.contains("is-open")) return;
  // Sacar "is-open" dispara la transición de salida (opacity/transform
  // volviendo a su estado inicial, ver el CSS).
  heirModal.overlay.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  pauseModalMedia();
  // Recién cuando la transición de CSS termina de verdad se le pone
  // "hidden" de nuevo (display:none): así no desaparece de golpe a
  // mitad del fundido de salida.
  heirModal.overlay.addEventListener(
    "transitionend",
    () => {
      heirModal.overlay.hidden = true;
    },
    { once: true }
  );
  // Devuelve el foco del teclado a la tarjeta que abrió el modal.
  if (modalTrigger) modalTrigger.focus();
  modalTrigger = null;
}

/* ============================================================
   PANTALLA DE CARGA
   ============================================================
   Reproduce el video de Amphoreus una sola vez. Cuando termina
   (o si falla, para no dejar a alguien atascado en la pantalla
   negra) se desvanece y deja ver el sitio.
   ============================================================ */
function setupLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  // querySelector("video") busca el <video> que está adentro del
  // div#loading-screen en el HTML.
  const video = loadingScreen ? loadingScreen.querySelector("video") : null;

  // Función compartida para esconder la pantalla de carga, la use
  // quien la use (el video terminando, el video fallando, o el caso
  // de que ni siquiera exista el elemento).
  const hideLoadingScreen = () => {
    // Deja de bloquear el scroll del resto de la página.
    document.body.classList.remove("is-loading");
    if (!loadingScreen) return;
    // Agregar .is-hidden dispara la transición de opacity del CSS; el
    // elemento recién se borra del DOM cuando esa transición termina
    // de verdad (evento "transitionend"), no antes.
    loadingScreen.classList.add("is-hidden");
    loadingScreen.addEventListener(
      "transitionend",
      () => loadingScreen.remove(),
      { once: true }
    );
  };

  // Si por algún motivo no hay <video> (el HTML cambió, o algo salió
  // mal), no tiene sentido esperar un evento que nunca va a llegar:
  // se esconde la pantalla de carga directo.
  if (!video) {
    hideLoadingScreen();
    return;
  }

  // Los dos eventos posibles que terminan la espera: el video se
  // reprodujo entero, o falló al cargar. En cualquiera de los dos
  // casos se hace lo mismo (esconder la pantalla), para no dejar a
  // nadie mirando una pantalla negra para siempre si el archivo del
  // video tuviera algún problema.
  video.addEventListener("ended", hideLoadingScreen, { once: true });
  video.addEventListener("error", hideLoadingScreen, { once: true });
}

/* ============================================================
   MODO OSCURO / CLARO
   ============================================================
   Solo afecta el panel blanco de las tarjetas (y el modal, que
   reusa las mismas variables de color) vía el atributo
   data-theme="dark" en <html>. El fondo con la ilustración de
   Amphoreus no cambia con esto.

   La preferencia elegida se guarda en localStorage para que no haya
   que volver a tocar el botón en la próxima visita; si todavía no
   eligió nada, se respeta prefers-color-scheme del sistema.
   ============================================================ */
// Nombre de la clave que se usa en localStorage. Tenerlo en una sola
// constante evita errores de tipeo si se usara el string suelto en
// más de un lugar.
const THEME_STORAGE_KEY = "chrysos-heirs-theme";

// Aplica un tema ("dark" o "light"): le pone el atributo data-theme a
// <html> (de ahí lo toma todo el CSS, ver :root[data-theme="dark"])
// y actualiza el texto/estado del botón para que coincida.
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const button = document.getElementById("theme-toggle");
  if (!button) return;
  const isDark = theme === "dark";
  // El texto del botón siempre describe la ACCIÓN que va a hacer al
  // apretarlo, no el estado actual: si ya está en oscuro, ofrece
  // pasar a claro, y viceversa.
  button.textContent = isDark ? "Modo claro" : "Modo oscuro";
  button.setAttribute("aria-pressed", String(isDark));
}

// Deja todo listo la primera vez que carga la página: decide con qué
// tema arrancar, y conecta el click del botón para poder cambiarlo.
function setupThemeToggle() {
  const button = document.getElementById("theme-toggle");
  if (!button) return;

  // Si la persona ya eligió un tema en una visita anterior, se
  // respeta esa elección (queda guardada en localStorage, que
  // persiste entre visitas). Si nunca lo tocó, se usa la preferencia
  // de modo oscuro/claro del sistema operativo.
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));

  // Cada click alterna entre los dos temas y guarda la nueva
  // elección, para que la próxima visita arranque igual.
  button.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
  });
}

// Punto de entrada: se ejecuta una vez que se carga el script. El
// orden acá no importa demasiado (son tres cosas independientes),
// pero conviene tenerlas juntas y visibles al final del archivo, en
// vez de "escondidas" en algún lugar del medio.
setupLoadingScreen();
setupThemeToggle();
renderCollection(chrysosHeirs);
