/* ============================================================
   CRUD de Chrysos Heirs (vista rápida: index.html)
   ============================================================
   Create  -> botón "+ New heir" y el formulario (openForm / handleSubmit)
   Read    -> renderList(), con búsqueda por texto
   Update  -> botón "Edit" de cada fila (reusa el mismo formulario)
   Delete  -> botón "Delete" de cada fila (deleteHeir)

   Los datos, el guardado y la validación viven en store.js (los
   comparte con gestion.html). Los cambios se guardan en localStorage
   para que sobrevivan a recargar la página; "Reset data" vuelve a los
   datos originales de data.js.
   ============================================================ */

let heirs = loadHeirs();
// id del heredero que se está editando; null significa "creando uno nuevo".
let editingId = null;
let query = "";
// Filtros por propiedad, además del buscador de texto. path/elemento
// vacíos significan "cualquiera"; soloDeliverer en false no filtra.
let filters = { path: "", elemento: "", soloDeliverer: false };

const listEl = document.getElementById("heir-list");
const emptyEl = document.getElementById("empty-state");
const statusEl = document.getElementById("status");
const dialog = document.getElementById("heir-dialog");
const form = document.getElementById("heir-form");
const formError = document.getElementById("form-error");

const filtersToggle = document.getElementById("filters-toggle");
const filtersPanel = document.getElementById("filters-panel");
const filterPathSelect = document.getElementById("filter-path");
const filterElementoSelect = document.getElementById("filter-elemento");
const filterDelivererCheck = document.getElementById("filter-deliverer");

function commit(message) {
  const saved = saveHeirs(heirs);
  renderList();
  showStatus(saved ? message : `${message} (could not save: changes last only until you reload)`);
}

function showStatus(message) {
  statusEl.textContent = message;
}

function matchesQuery(heir) {
  if (!query) return true;
  const haystack = [heir.nombre, heir.titulo, heir.path, heir.elemento, ...heir.rasgos]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function matchesFilters(heir) {
  if (filters.path && heir.path !== filters.path) return false;
  if (filters.elemento && heir.elemento !== filters.elemento) return false;
  if (filters.soloDeliverer && !heir.isDeliverer) return false;
  return true;
}

// Llena un <select> de filtro con los valores que ya existen en los
// datos, conservando la opción "All" y lo que estuviera elegido.
function fillFilterSelect(select, values) {
  const previous = select.value;
  select.replaceChildren(new Option("All", ""));
  [...new Set(values.filter(Boolean))].sort().forEach((value) => select.appendChild(new Option(value, value)));
  select.value = [...select.options].some((option) => option.value === previous) ? previous : "";
}

/* ---------- READ: pintar la lista ---------- */

function createThumb(heir) {
  const wrap = document.createElement("div");
  wrap.className = "thumb";

  const img = document.createElement("img");
  img.alt = "";
  img.loading = "lazy";
  img.src = mediaUrl(heir.imagen);
  // Si la imagen no existe se muestra la inicial en su lugar.
  img.addEventListener("error", () => wrap.classList.add("img-missing"), { once: true });
  wrap.appendChild(img);

  const initial = document.createElement("span");
  initial.className = "thumb-initial";
  initial.textContent = heir.nombre.charAt(0);
  initial.setAttribute("aria-hidden", "true");
  wrap.appendChild(initial);

  return wrap;
}

function createTag(className, text) {
  const tag = document.createElement("span");
  tag.className = className;
  tag.textContent = text;
  return tag;
}

function createRow(heir) {
  const item = document.createElement("li");
  item.className = "heir";
  if (heir.isDeliverer) item.classList.add("is-deliverer");
  // Igual que en el proyecto principal: estos atributos data-* hacen
  // que el CSS pinte la fila con el color de su Path y Elemento.
  item.dataset.path = heir.path;
  item.dataset.element = heir.elemento;
  item.dataset.nombre = heir.nombre;

  item.appendChild(createThumb(heir));

  const info = document.createElement("div");
  info.className = "heir-info";

  const name = document.createElement("h2");
  name.className = "heir-name";
  name.textContent = heir.isDeliverer ? `${heir.nombre} ★` : heir.nombre;
  info.appendChild(name);

  const meta = document.createElement("p");
  meta.className = "heir-meta";
  const version = Number.isFinite(heir.version) ? ` · v${heir.version.toFixed(1)}` : "";
  meta.textContent = `${heir.titulo || "—"}${version}`;
  info.appendChild(meta);

  const tags = document.createElement("div");
  tags.className = "tags";
  if (heir.path) tags.appendChild(createTag("path-tag", heir.path));
  if (heir.elemento) tags.appendChild(createTag("element-tag", heir.elemento));
  heir.rasgos.forEach((rasgo) => tags.appendChild(createTag("trait", rasgo)));
  info.appendChild(tags);

  item.appendChild(info);

  const actions = document.createElement("div");
  actions.className = "heir-actions";

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.className = "btn";
  editBtn.textContent = "Edit";
  editBtn.setAttribute("aria-label", `Edit ${heir.nombre}`);
  editBtn.addEventListener("click", () => openForm(heir));
  actions.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "btn btn-danger";
  deleteBtn.textContent = "Delete";
  deleteBtn.setAttribute("aria-label", `Delete ${heir.nombre}`);
  deleteBtn.addEventListener("click", () => deleteHeir(heir));
  actions.appendChild(deleteBtn);

  item.appendChild(actions);
  return item;
}

// Pinta el array de objetos héroe recibido dentro del grid (#heir-list).
// Es la única función que toca esa lista del DOM.
function renderizarObjetos(listaObjetos) {
  listEl.replaceChildren();
  listaObjetos.forEach((heir) => listEl.appendChild(createRow(heir)));
  emptyEl.hidden = listaObjetos.length > 0;
}

// Decide qué se ve (filtra "heirs" por la búsqueda y por los filtros
// de propiedad) y coordina el resto de la pantalla; create/update/
// delete llegan acá vía commit().
function renderList() {
  const visible = heirs.filter((heir) => matchesQuery(heir) && matchesFilters(heir));
  renderizarObjetos(visible);
  refreshDatalists(heirs);
  fillFilterSelect(filterPathSelect, heirs.map((heir) => heir.path));
  fillFilterSelect(filterElementoSelect, heirs.map((heir) => heir.elemento));
}

/* ---------- CREATE / UPDATE: el formulario ---------- */

function openForm(heir) {
  editingId = heir ? heir.id : null;
  document.getElementById("dialog-title").textContent = heir ? `Edit ${heir.nombre}` : "New heir";
  formError.textContent = "";
  fillHeirForm(form, heir);
  dialog.showModal();
  form.elements.nombre.focus();
}

function handleSubmit(event) {
  event.preventDefault();
  const { heir, error } = readHeirForm(form, heirs, editingId);
  if (error) {
    formError.textContent = error;
    return;
  }

  if (editingId) {
    // Update: se reemplaza el objeto conservando su id.
    heirs = heirs.map((other) => (other.id === editingId ? { ...heir, id: editingId } : other));
    commit(`${heir.nombre} updated.`);
  } else {
    // Create: se agrega al final con un id nuevo.
    heirs = [...heirs, { ...heir, id: newId() }];
    commit(`${heir.nombre} created.`);
  }
  dialog.close();
}

/* ---------- DELETE ---------- */

function deleteHeir(heir) {
  // confirm() bloquea hasta que la persona responde: evita borrar por
  // un click accidental.
  if (!window.confirm(`Delete ${heir.nombre}? This cannot be undone.`)) return;
  heirs = heirs.filter((other) => other.id !== heir.id);
  commit(`${heir.nombre} deleted.`);
}

/* ---------- Reset ---------- */

function resetData() {
  if (!window.confirm("Discard all your changes and restore the original data?")) return;
  heirs = seedHeirs();
  commit("Original data restored.");
}

/* ---------- Eventos y arranque ---------- */

document.getElementById("new-btn").addEventListener("click", () => openForm(null));
document.getElementById("reset-btn").addEventListener("click", resetData);
document.getElementById("cancel-btn").addEventListener("click", () => dialog.close());
form.addEventListener("submit", handleSubmit);
document.getElementById("search").addEventListener("input", (event) => {
  query = event.target.value.trim().toLowerCase();
  renderList();
});

// Botón "Filters": solo muestra/oculta el panel, no toca los filtros.
filtersToggle.addEventListener("click", () => {
  const isOpen = !filtersPanel.hidden;
  filtersPanel.hidden = isOpen;
  filtersToggle.setAttribute("aria-expanded", String(!isOpen));
});

filterPathSelect.addEventListener("change", () => {
  filters.path = filterPathSelect.value;
  renderList();
});
filterElementoSelect.addEventListener("change", () => {
  filters.elemento = filterElementoSelect.value;
  renderList();
});
filterDelivererCheck.addEventListener("change", () => {
  filters.soloDeliverer = filterDelivererCheck.checked;
  renderList();
});
document.getElementById("filters-clear").addEventListener("click", () => {
  filters = { path: "", elemento: "", soloDeliverer: false };
  filterPathSelect.value = "";
  filterElementoSelect.value = "";
  filterDelivererCheck.checked = false;
  renderList();
});

setupThemeToggle();
renderList();
