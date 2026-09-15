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
   placeholder ("Video / GIF próximamente") en ese espacio.

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
    imagen: "media/phainon.jpg",
    clip: "media/phainon-clip.mp4",
    sticker: "media/phainon-sticker.jpg",
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
    imagen: "media/cyrene.jpg",
    clip: "media/cyrene-clip.mp4",
    sticker: "media/cyrene-sticker.jpg",
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
    imagen: "media/aglaea.jpg",
    clip: "media/aglaea-clip.mp4",
    sticker: "media/aglaea-sticker.jpg",
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
    imagen: "media/tribbie.jpg",
    clip: "media/tribbie-clip.mp4",
    sticker: "media/tribbie-sticker.jpg",
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
    imagen: "media/mydei.jpg",
    clip: "media/mydei-clip.mp4",
    sticker: "media/mydei-sticker.jpg",
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
    imagen: "media/castorice.jpg",
    clip: "media/castorice-clip.mp4",
    sticker: "media/castorice-sticker.jpg",
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
    imagen: "media/anaxa.jpg",
    clip: "media/anaxa-clip.mp4",
    sticker: "media/anaxa-sticker.jpg",
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
    imagen: "media/hyacine.jpg",
    clip: "media/hyacine-clip.mp4",
    sticker: "media/hyacine-sticker.jpg",
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
    imagen: "media/cipher.jpg",
    clip: "media/cipher-clip.mp4",
    sticker: "media/cipher-sticker.jpg",
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
    imagen: "media/hysilens.jpg",
    clip: "media/hysilens-clip.mp4",
    sticker: "media/hysilens-sticker.jpg",
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
    imagen: "media/cerydra.jpg",
    clip: "media/cerydra-clip.mp4",
    sticker: "media/cerydra-sticker.jpg",
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
    imagen: "media/evernight.jpg",
    clip: "media/evernight-clip.mp4",
    sticker: "media/evernight-sticker.jpg",
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
    imagen: "media/danhengpept.jpg",
    clip: "media/danhengpept-clip.mp4",
    sticker: "media/danhengpept-sticker.jpg",
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
    imagen: "media/trailblazer.jpg",
    clip: "media/trailblazer-clip.mp4",
    sticker: "media/trailblazer-sticker.jpg",
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
function createImageWithFallback(src, alt, initial, wrapperClass, imgClass, fallbackClass) {
  const wrapper = document.createElement("div");
  wrapper.className = wrapperClass;

  const img = document.createElement("img");
  img.className = imgClass;
  img.src = src;
  img.alt = alt;
  img.loading = "lazy";
  wrapper.appendChild(img);

  const fallback = document.createElement("span");
  fallback.className = fallbackClass;
  fallback.textContent = initial;
  fallback.setAttribute("aria-hidden", "true");
  wrapper.appendChild(fallback);

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
  article.dataset.path = heir.path;
  article.dataset.element = heir.elemento;

  // La clase "is-deliverer" activa un estilo distinto (ribbon dorado)
  // solo cuando la propiedad booleana "isDeliverer" es true.
  if (heir.isDeliverer) {
    article.classList.add("is-deliverer");
  }

  const initial = heir.nombre.charAt(0);

  // --- Bloque de imagen (retrato + mini-avatar circular superpuesto) ---
  const media = document.createElement("div");
  media.className = "card-media";

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

  if (heir.isDeliverer) {
    const delivererBadge = document.createElement("span");
    delivererBadge.className = "deliverer-badge";
    delivererBadge.title = "Deliverer";
    delivererBadge.textContent = "★";
    media.appendChild(delivererBadge);
  }

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

  const hint = document.createElement("span");
  hint.className = "card-hint";
  hint.textContent = "Ver más ↗";
  hint.setAttribute("aria-hidden", "true");
  panel.appendChild(hint);

  article.appendChild(panel);

  // Toda la tarjeta es clickeable: abre el modal con la descripción
  // completa y el espacio para el video/gif del personaje. También
  // funciona con teclado (Enter / Espacio) para que sea accesible.
  article.tabIndex = 0;
  article.setAttribute("role", "button");
  article.setAttribute("aria-haspopup", "dialog");
  article.setAttribute("aria-label", `Ver más sobre ${heir.nombre}`);

  article.addEventListener("click", () => openHeirModal(heir, article));
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
let heirModal = null;
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
function buildModalMedia(heir) {
  const wrap = document.createElement("div");
  wrap.className = "modal-media-slot";

  if (!heir.clip) {
    wrap.appendChild(createMediaPlaceholder());
    return wrap;
  }

  const isImageClip = /\.(gif|webp|png|jpe?g)$/i.test(heir.clip);
  const mediaEl = document.createElement(isImageClip ? "img" : "video");
  mediaEl.className = "modal-media-content";
  mediaEl.src = heir.clip;

  if (isImageClip) {
    mediaEl.alt = `Clip de ${heir.nombre}`;
  } else {
    mediaEl.autoplay = true;
    mediaEl.muted = true;
    mediaEl.loop = true;
    mediaEl.playsInline = true;
    mediaEl.controls = true;
  }

  mediaEl.addEventListener(
    "error",
    () => {
      mediaEl.remove();
      wrap.appendChild(createMediaPlaceholder());
    },
    { once: true }
  );

  wrap.appendChild(mediaEl);
  return wrap;
}

// Construye el esqueleto del modal (una sola vez) y lo agrega al body.
function createHeirModal() {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.hidden = true;

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

  const mediaSlotHolder = document.createElement("div");
  mediaSlotHolder.className = "modal-media-holder";
  dialog.appendChild(mediaSlotHolder);

  const body = document.createElement("div");
  body.className = "modal-body";
  dialog.appendChild(body);

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

  return { overlay, dialog, closeBtn, mediaSlotHolder, pathTag, elementTag, name, meta, description, traits };
}

function openHeirModal(heir, trigger) {
  if (!heirModal) {
    heirModal = createHeirModal();
  }
  modalTrigger = trigger || null;

  heirModal.dialog.dataset.path = heir.path;
  heirModal.dialog.dataset.element = heir.elemento;

  while (heirModal.mediaSlotHolder.firstChild) {
    heirModal.mediaSlotHolder.removeChild(heirModal.mediaSlotHolder.firstChild);
  }
  heirModal.mediaSlotHolder.appendChild(buildModalMedia(heir));

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
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => {
    heirModal.overlay.classList.add("is-open");
  });
  heirModal.closeBtn.focus();
}

function closeHeirModal() {
  if (!heirModal || !heirModal.overlay.classList.contains("is-open")) return;
  heirModal.overlay.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  heirModal.overlay.addEventListener(
    "transitionend",
    () => {
      heirModal.overlay.hidden = true;
    },
    { once: true }
  );
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
  const video = loadingScreen ? loadingScreen.querySelector("video") : null;

  const hideLoadingScreen = () => {
    document.body.classList.remove("is-loading");
    if (!loadingScreen) return;
    loadingScreen.classList.add("is-hidden");
    loadingScreen.addEventListener(
      "transitionend",
      () => loadingScreen.remove(),
      { once: true }
    );
  };

  if (!video) {
    hideLoadingScreen();
    return;
  }

  video.addEventListener("ended", hideLoadingScreen, { once: true });
  video.addEventListener("error", hideLoadingScreen, { once: true });
}

// Punto de entrada: se ejecuta una vez que se carga el script.
setupLoadingScreen();
renderCollection(chrysosHeirs);
