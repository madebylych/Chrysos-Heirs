/* ============================================================
   Panel de gestión de Chrysos Heirs (gestion.html)
   ============================================================
   C Create  -> formulario generado desde HEIR_FIELDS + botón
                "Accept and add" (handleCreate)
   R Read    -> renderTable(), con búsqueda y contador
   U Update  -> se elige un heredero, sus datos se cargan en un
                formulario con los mismos campos y se guarda con
                "Update heir" (loadUpdateForm / handleUpdate)
   D Delete  -> se elige un heredero, se ve un resumen y se borra
                con "Delete heir" (deleteHeir), con "Undo" unos segundos
   S Storage -> estado de localStorage, exportar/importar JSON y
                borrar lo guardado

   Los botones "Edit" y "Delete" de cada fila de la tabla no actúan
   directo: eligen ese heredero en el panel U o D (selectForUpdate /
   selectForDelete), así toda modificación pasa por su sección.

   Datos, guardado y validación: store.js (compartido con index.html).
   Lo que se guarda acá en localStorage también lo lee el sitio
   principal (la carpeta de arriba, Chrysos Heirs), así que lo que agregues aparece allá.
   ============================================================ */

// Todo el archivo va dentro de un IIFE: así heirs, commit,
// handleCreate, deleteHeir, etc. dejan de ser variables/funciones
// globales que se puedan invocar escribiendo su nombre en la consola
// del navegador (era como se podía escribir y borrar datos saltando
// el login).
(function () {

/* ============================================================
   ESQUEMA: qué propiedades tiene un heredero
   ============================================================
   Es la lista de propiedades de los objetos de data.js, una entrada
   por propiedad. De acá se generan los campos del formulario de
   Create y de Update, así que si un heredero gana una propiedad
   nueva, se agrega UNA línea acá y aparece en los dos formularios.

   - name  : nombre exacto de la propiedad (lo usan fillHeirForm y
             readHeirForm de store.js para leer/escribir el campo).
   - kind  : tipo de dato que se espera; se muestra como etiqueta.
   - type  : tipo de control HTML (text, number, checkbox, textarea).
   - wide  : true = ocupa todo el ancho; false = comparte fila.
   ============================================================ */
const HEIR_FIELDS = [
  { name: "nombre", label: "Name", kind: "string", type: "text", required: true, maxLength: 60, wide: true },
  { name: "titulo", label: "Title", kind: "string", type: "text", maxLength: 120, wide: true },
  { name: "path", label: "Path", kind: "string", type: "text", list: "path-options", placeholder: "Remembrance" },
  { name: "elemento", label: "Element", kind: "string", type: "text", list: "element-options", placeholder: "Ice" },
  { name: "version", label: "Version", kind: "number", type: "number", step: "0.1", min: "0", placeholder: "3.4" },
  { name: "isDeliverer", label: "Is the Deliverer", kind: "boolean", type: "checkbox" },
  { name: "descripcion", label: "Description", kind: "string", type: "textarea", wide: true },
  { name: "rasgos", label: "Traits", kind: "array", type: "text", hint: "comma separated", placeholder: "warrior, prophecy", wide: true },
  { name: "imagen", label: "Image path", kind: "string", type: "text", placeholder: "media/name.jpg", wide: true },
  { name: "sticker", label: "Sticker path", kind: "string", type: "text", placeholder: "media/name-sticker.gif", wide: true },
  { name: "clip", label: "Clip path(s)", kind: "string | array", type: "text", hint: "optional; comma separated for several", placeholder: "media/name.mp4", wide: true },
];

// Crea el control (input o textarea) de UNA propiedad.
function createControl(field) {
  const control = document.createElement(field.type === "textarea" ? "textarea" : "input");
  control.name = field.name;
  if (field.type === "textarea") {
    control.rows = 4;
  } else {
    control.type = field.type;
  }
  if (field.required) control.required = true;
  if (field.maxLength) control.maxLength = field.maxLength;
  if (field.step) control.step = field.step;
  if (field.min) control.min = field.min;
  if (field.list) control.setAttribute("list", field.list);
  if (field.placeholder) control.placeholder = field.placeholder;
  return control;
}

// Recorre HEIR_FIELDS y arma un <label> por cada propiedad dentro de
// "container": texto del campo + etiqueta del tipo esperado + control.
function buildFields(container) {
  container.replaceChildren();
  HEIR_FIELDS.forEach((field) => {
    const label = document.createElement("label");
    label.className = field.wide ? "field field-wide" : "field";
    if (field.type === "checkbox") label.classList.add("field-check");

    const caption = document.createElement("span");
    caption.className = "field-caption";
    caption.textContent = field.required ? `${field.label} *` : field.label;

    const kind = document.createElement("span");
    kind.className = "kind";
    kind.textContent = field.hint ? `${field.kind} · ${field.hint}` : field.kind;
    caption.appendChild(kind);

    const control = createControl(field);
    // El checkbox va antes del texto; el resto, texto primero.
    if (field.type === "checkbox") {
      label.append(control, caption);
    } else {
      label.append(caption, control);
    }
    container.appendChild(label);
  });
}

/* ---------- Estado y referencias ---------- */

let heirs = loadHeirs();
let query = "";
// Solo grantAccess() (login correcto) la pone en true. commit() y
// clearStorage() la revisan antes de guardar o repintar nada: son los
// únicos dos caminos por los que se persisten cambios, así que ninguna
// opción de Create/Update/Delete/Undo/Import/Reset/Clear funciona
// mientras no haya sesión válida.
let isAuthenticated = false;

const bodyEl = document.getElementById("heir-body");
const emptyEl = document.getElementById("empty-state");
const statusEl = document.getElementById("status");
const countEl = document.getElementById("count");

const createForm = document.getElementById("create-form");
const createError = document.getElementById("create-error");

const updatePanel = document.getElementById("update-panel");
const updateForm = document.getElementById("update-form");
const updateSelect = document.getElementById("update-select");
const updateFieldset = document.getElementById("update-fieldset");
const updateError = document.getElementById("update-error");
const updateSubmit = document.getElementById("update-submit");

const deletePanel = document.getElementById("delete-panel");
const deleteSelect = document.getElementById("delete-select");
const deletePreview = document.getElementById("delete-preview");
const deleteBtn = document.getElementById("delete-btn");
const deleteMessage = document.getElementById("delete-message");
const undoBtn = document.getElementById("undo-btn");

// Cuánto tiempo (ms) se ofrece deshacer un borrado.
const UNDO_MS = 8000;
// Último heredero borrado y la posición donde estaba; solo se recuerda
// uno (deshacer de un nivel). undoTimer es el temporizador que lo olvida.
let lastDeleted = null;
let undoTimer = null;

function clearUndo() {
  clearTimeout(undoTimer);
  lastDeleted = null;
  undoBtn.hidden = true;
  deleteMessage.textContent = "";
}

// Guarda, repinta y avisa. Cualquier acción nueva pasa por acá y por
// eso cancela el "Undo" pendiente: el aviso de borrado no debe quedar
// al lado de un mensaje que no tiene nada que ver.
function commit(message) {
  if (!isAuthenticated) return;
  clearUndo();
  const saved = saveHeirs(heirs);
  renderTable();
  renderStorage();
  statusEl.textContent = saved
    ? message
    : `${message} (could not save: changes last only until you reload)`;
}

function matchesQuery(heir) {
  if (!query) return true;
  const haystack = [heir.nombre, heir.titulo, heir.path, heir.elemento, ...heir.rasgos]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function findHeir(id) {
  return heirs.find((heir) => heir.id === id) || null;
}

/* ---------- C — CREATE ---------- */

// Botón "Accept and add": lee el formulario (readHeirForm valida:
// nombre obligatorio y único, versión numérica), agrega el heredero
// al array, guarda y repinta la tabla.
function handleCreate(event) {
  event.preventDefault();
  const { heir, error } = readHeirForm(createForm, heirs, null);
  if (error) {
    createError.textContent = error;
    return;
  }

  heirs = [...heirs, { ...heir, id: newId() }];
  clearCreateForm();
  commit(`${heir.nombre} added. It will also show in Chrysos Heirs.`);
}

function clearCreateForm() {
  fillHeirForm(createForm, null);
  createError.textContent = "";
  createForm.elements.nombre.focus();
}

/* ---------- R — READ ---------- */

function createCell(text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
}

// Celda con una píldora de Path/Elemento: el atributo data-* le da el
// color de ese Path/Elemento (mismas reglas CSS que el proyecto
// principal). Sin valor se muestra un guion.
function createPillCell(className, dataName, value) {
  const cell = document.createElement("td");
  if (!value) {
    cell.textContent = "—";
    return cell;
  }
  const pill = document.createElement("span");
  pill.className = className;
  pill.dataset[dataName] = value;
  pill.textContent = value;
  cell.appendChild(pill);
  return cell;
}

function createTableRow(heir) {
  const row = document.createElement("tr");

  const nameCell = createCell(heir.isDeliverer ? `${heir.nombre} ★` : heir.nombre);
  nameCell.className = "cell-name";
  row.appendChild(nameCell);
  row.appendChild(createPillCell("path-tag", "path", heir.path));
  row.appendChild(createPillCell("element-tag", "element", heir.elemento));
  row.appendChild(createCell(Number.isFinite(heir.version) ? heir.version.toFixed(1) : "—"));

  const actions = document.createElement("td");
  actions.className = "cell-actions";

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.className = "btn";
  editBtn.textContent = "Edit";
  editBtn.setAttribute("aria-label", `Edit ${heir.nombre}`);
  editBtn.addEventListener("click", () => selectForUpdate(heir.id));
  actions.appendChild(editBtn);

  const rowDeleteBtn = document.createElement("button");
  rowDeleteBtn.type = "button";
  rowDeleteBtn.className = "btn btn-danger";
  rowDeleteBtn.textContent = "Delete";
  rowDeleteBtn.setAttribute("aria-label", `Delete ${heir.nombre}`);
  rowDeleteBtn.addEventListener("click", () => selectForDelete(heir.id));
  actions.appendChild(rowDeleteBtn);

  row.appendChild(actions);
  return row;
}

function renderTable() {
  bodyEl.replaceChildren();
  const visible = heirs.filter(matchesQuery);
  visible.forEach((heir) => bodyEl.appendChild(createTableRow(heir)));
  emptyEl.hidden = visible.length > 0;
  countEl.textContent = `(${visible.length}${visible.length === heirs.length ? "" : ` of ${heirs.length}`})`;
  refreshDatalists(heirs);
  refreshSelects();
}

/* ---------- Selectores de U y D ---------- */

// Rellena un <select> con todos los herederos conservando la opción
// que estaba elegida. Devuelve true si esa opción ya no existe (por
// ejemplo, el heredero se borró): el llamador debe limpiar lo que
// dependía de ella.
function fillSelect(select, placeholder) {
  const previous = select.value;
  select.replaceChildren(new Option(placeholder, ""));
  heirs.forEach((heir) => select.appendChild(new Option(heir.nombre, heir.id)));
  const stillThere = heirs.some((heir) => heir.id === previous);
  select.value = stillThere ? previous : "";
  return previous !== "" && !stillThere;
}

function refreshSelects() {
  // El formulario de Update solo se recarga si el heredero elegido
  // desapareció: si no, se respetan los cambios sin guardar que la
  // persona esté escribiendo (por ejemplo al buscar en la tabla).
  if (fillSelect(updateSelect, "— Choose an heir —")) loadUpdateForm();
  fillSelect(deleteSelect, "— Choose an heir —");
  renderDeletePreview();
}

// Lleva la pantalla hasta un panel y deja el foco en su selector.
function goTo(panel, control) {
  panel.scrollIntoView({ block: "nearest" });
  control.focus();
}

/* ---------- U — UPDATE ---------- */

// Vuelca el heredero elegido en el formulario, o lo vacía y bloquea
// si no hay ninguno elegido.
function loadUpdateForm() {
  const heir = findHeir(updateSelect.value);
  fillHeirForm(updateForm, heir);
  updateFieldset.disabled = !heir;
  updateSubmit.disabled = !heir;
  updateError.textContent = "";
}

// Botón "Edit" de la tabla.
function selectForUpdate(id) {
  updateSelect.value = id;
  loadUpdateForm();
  goTo(updatePanel, updateForm.elements.nombre);
}

function handleUpdate(event) {
  event.preventDefault();
  const id = updateSelect.value;
  if (!findHeir(id)) return;

  const { heir, error } = readHeirForm(updateForm, heirs, id);
  if (error) {
    updateError.textContent = error;
    return;
  }

  // Se reemplaza el objeto conservando su id.
  heirs = heirs.map((other) => (other.id === id ? { ...heir, id } : other));
  commit(`${heir.nombre} updated.`);
  // El heredero sigue elegido: se recarga con lo ya guardado.
  loadUpdateForm();
}

/* ---------- D — DELETE (con Undo) ---------- */

// Resumen del heredero elegido, para saber qué se va a borrar.
function renderDeletePreview() {
  const heir = findHeir(deleteSelect.value);
  deleteBtn.disabled = !heir;
  if (!heir) {
    deletePreview.textContent = "No heir selected.";
    return;
  }
  const version = Number.isFinite(heir.version) ? `v${heir.version.toFixed(1)}` : "no version";
  deletePreview.textContent =
    `${heir.nombre}${heir.isDeliverer ? " ★" : ""} — ` +
    `${heir.path || "no path"} · ${heir.elemento || "no element"} · ${version}`;
}

// Botón "Delete" de la tabla.
function selectForDelete(id) {
  deleteSelect.value = id;
  renderDeletePreview();
  goTo(deletePanel, deleteSelect);
}

// Sin confirm(): borrar es reversible durante UNDO_MS con el botón
// Undo, que molesta menos que preguntar siempre.
function deleteHeir(heir) {
  const index = heirs.findIndex((other) => other.id === heir.id);
  heirs = heirs.filter((other) => other.id !== heir.id);
  commit(`${heir.nombre} deleted.`);
  // Va DESPUÉS de commit, porque commit cancela cualquier Undo previo.
  deleteMessage.textContent = `${heir.nombre} deleted.`;
  lastDeleted = { heir, index };
  undoBtn.hidden = false;
  undoTimer = setTimeout(clearUndo, UNDO_MS);
}

function undoDelete() {
  if (!lastDeleted) return;
  const { heir, index } = lastDeleted;
  // Si mientras tanto se creó otro heredero con el mismo nombre,
  // restaurar dejaría dos iguales.
  if (heirs.some((other) => other.nombre.toLowerCase() === heir.nombre.toLowerCase())) {
    clearUndo();
    deleteMessage.textContent = `Cannot restore ${heir.nombre}: another heir has that name now.`;
    return;
  }
  heirs = [...heirs.slice(0, index), heir, ...heirs.slice(index)];
  commit(`${heir.nombre} restored.`);
}

/* ---------- S — STORAGE ---------- */

const storageMessage = document.getElementById("storage-message");
document.getElementById("storage-key").textContent = STORAGE_KEY;

function setStorageMessage(message) {
  storageMessage.textContent = message;
}

// Pinta la foto del estado de localStorage (getStorageInfo de store.js).
function renderStorage() {
  const info = getStorageInfo();
  const status = document.getElementById("storage-status");
  status.textContent = info.available ? "Available" : "Blocked — changes last only until reload";
  status.className = info.available ? "storage-ok" : "storage-blocked";

  document.getElementById("storage-count").textContent =
    info.count > 0 ? `${info.count}` : "Nothing saved yet (showing data.js)";
  document.getElementById("storage-memory").textContent = `${heirs.length}`;
  document.getElementById("storage-size").textContent =
    info.bytes > 0 ? `${(info.bytes / 1024).toFixed(1)} KB` : "—";
  document.getElementById("storage-time").textContent = info.savedAt
    ? new Date(info.savedAt).toLocaleString()
    : "—";
}

// Descarga un archivo .json con los herederos actuales: se crea un
// Blob, se le pide al navegador una URL temporal y se "clickea" un
// enlace de descarga invisible.
function exportHeirs() {
  const payload = buildExportPayload(heirs);
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `chrysos-heirs-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setStorageMessage(`Exported ${heirs.length} heirs.`);
}

// Lee el archivo elegido, lo valida entero (normalizeHeirs) y solo
// entonces, con confirmación, reemplaza los datos actuales. Si algo
// falla no se toca nada.
async function importHeirs(file) {
  let raw;
  try {
    raw = JSON.parse(await file.text());
  } catch (error) {
    setStorageMessage("Import failed: the file is not valid JSON.");
    return;
  }
  const { heirs: imported, error } = normalizeHeirs(raw);
  if (error) {
    setStorageMessage(`Import failed: ${error}`);
    return;
  }
  if (!window.confirm(`Replace your ${heirs.length} heirs with the ${imported.length} in "${file.name}"?`)) {
    setStorageMessage("Import cancelled.");
    return;
  }
  heirs = imported;
  commit(`Imported ${imported.length} heirs.`);
  setStorageMessage(`Imported ${imported.length} heirs from "${file.name}".`);
}

// Borra lo guardado en el navegador y vuelve a mostrar los datos de
// data.js SIN guardarlos: queda "nothing saved" hasta el próximo
// cambio. Distinto de "Reset data", que restaura Y guarda.
function clearStorage() {
  if (!isAuthenticated) return;
  if (!window.confirm("Delete the saved data from this browser? The Chrysos Heirs site will go back to its original list.")) return;
  clearUndo();
  const cleared = clearSavedHeirs();
  heirs = seedHeirs();
  renderTable();
  renderStorage();
  statusEl.textContent = "";
  setStorageMessage(cleared ? "Saved data cleared." : "Could not clear: storage is blocked.");
}

/* ---------- Eventos y arranque ---------- */

buildFields(document.getElementById("create-fields"));
buildFields(document.getElementById("update-fields"));

createForm.addEventListener("submit", handleCreate);
document.getElementById("create-clear").addEventListener("click", clearCreateForm);

updateSelect.addEventListener("change", loadUpdateForm);
updateForm.addEventListener("submit", handleUpdate);
// Cancel: suelta el heredero elegido y deja el formulario vacío.
document.getElementById("update-cancel").addEventListener("click", () => {
  updateSelect.value = "";
  loadUpdateForm();
});

deleteSelect.addEventListener("change", renderDeletePreview);
deleteBtn.addEventListener("click", () => {
  const heir = findHeir(deleteSelect.value);
  if (heir) deleteHeir(heir);
});
undoBtn.addEventListener("click", undoDelete);

document.getElementById("export-btn").addEventListener("click", exportHeirs);
document.getElementById("clear-storage-btn").addEventListener("click", clearStorage);
const importFile = document.getElementById("import-file");
document.getElementById("import-btn").addEventListener("click", () => importFile.click());
importFile.addEventListener("change", () => {
  if (importFile.files[0]) importHeirs(importFile.files[0]);
  // Se vacía para poder importar dos veces el mismo archivo seguido.
  importFile.value = "";
});

document.getElementById("reset-btn").addEventListener("click", () => {
  if (!window.confirm("Discard all your changes and restore the original data?")) return;
  heirs = seedHeirs();
  commit("Original data restored.");
});

document.getElementById("search").addEventListener("input", (event) => {
  query = event.target.value.trim().toLowerCase();
  renderTable();
});

setupThemeToggle();
renderTable();
renderStorage();

/* ---------- Sidebar: pestañas ---------- */

const tabs = [...document.querySelectorAll(".sidebar-tab")];

// Muestra el panel de "tab" y esconde los demás. Solo la pestaña
// activa queda con tabindex 0: así Tab entra al sidebar una sola vez
// y entre pestañas se navega con las flechas (patrón estándar de tabs).
function selectTab(tab) {
  tabs.forEach((other) => {
    const isActive = other === tab;
    other.setAttribute("aria-selected", String(isActive));
    other.tabIndex = isActive ? 0 : -1;
    document.getElementById(other.getAttribute("aria-controls")).hidden = !isActive;
  });
  // La lista de usuarios se pide recién cuando se abre su pestaña.
  if (tab.id === "tab-users") loadUsers();
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", (event) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = tabs[(index + step + tabs.length) % tabs.length];
    next.focus();
    selectTab(next);
  });
});

/* ---------- Pestaña Users ---------- */

const usersBody = document.getElementById("users-body");
const usersEmpty = document.getElementById("users-empty");
const usersStatus = document.getElementById("users-status");
const usersCount = document.getElementById("users-count");

// Celda del hash: <details> muestra los primeros 12 caracteres y, al
// hacer click, el salt y el hash completos (sin JS extra: <details> ya
// sabe abrirse y cerrarse solo).
function createHashCell(user) {
  const cell = document.createElement("td");
  // El usuario Guest (invitados) no tiene contraseña.
  if (!user.passwordHash) {
    cell.textContent = "—";
    return cell;
  }
  const details = document.createElement("details");
  details.className = "hash";

  const summary = document.createElement("summary");
  const preview = document.createElement("code");
  preview.textContent = `${user.passwordHash.slice(0, 12)}…`;
  summary.appendChild(preview);
  details.appendChild(summary);

  [
    ["salt", user.salt],
    ["hash", user.passwordHash],
  ].forEach(([label, value]) => {
    const line = document.createElement("p");
    const code = document.createElement("code");
    code.textContent = value;
    line.append(`${label}: `, code);
    details.appendChild(line);
  });

  cell.appendChild(details);
  return cell;
}

// Celda del id: se muestran los primeros 8 caracteres; el id completo
// aparece al pasar el mouse (title).
function createIdCell(id) {
  const cell = document.createElement("td");
  const code = document.createElement("code");
  // "…" solo si de verdad se recortó (el id "guest" es corto).
  code.textContent = !id ? "—" : id.length > 8 ? `${id.slice(0, 8)}…` : id;
  if (id) code.title = id;
  cell.appendChild(code);
  return cell;
}

// Celda de partidas: "3 games · best 9" y, al hacer click, la lista de
// cada partida con su fecha, intentos, tiempo, rango e id.
function createGamesCell(attempts = []) {
  const cell = document.createElement("td");
  if (attempts.length === 0) {
    cell.textContent = "—";
    return cell;
  }

  // Mejor partida: menos intentos; si empatan, menos tiempo.
  const best = attempts.reduce((a, b) =>
    b.attempts < a.attempts || (b.attempts === a.attempts && b.timeSeconds < a.timeSeconds) ? b : a
  );

  const details = document.createElement("details");
  details.className = "hash games";
  const summary = document.createElement("summary");
  summary.textContent = `${attempts.length} game${attempts.length === 1 ? "" : "s"} · best ${best.attempts} / ${best.time}`;
  details.appendChild(summary);

  const list = document.createElement("ol");
  attempts.forEach((attempt) => {
    const item = document.createElement("li");
    const id = document.createElement("code");
    id.textContent = attempt.id.slice(0, 8);
    id.title = attempt.id;
    item.append(
      `${new Date(attempt.date).toLocaleString()} — ${attempt.attempts} attempts, ` +
        `${attempt.time}, ${attempt.pairsFound}/${attempt.totalPairs} pairs, ${attempt.rank} · id `,
      id
    );
    list.appendChild(item);
  });
  details.appendChild(list);

  cell.appendChild(details);
  return cell;
}

function createUserRow(user) {
  const row = document.createElement("tr");
  row.appendChild(createIdCell(user.id));
  const name = createCell(user.name);
  name.className = "cell-name";
  row.appendChild(name);
  row.appendChild(createCell(user.alias));
  // Guest no tiene email: se muestra "(guest)" en vez de una celda vacía.
  row.appendChild(createCell(user.email || "(guest)"));
  row.appendChild(createHashCell(user));
  // toLocaleString: la fecha en el formato de tu computadora.
  row.appendChild(createCell(new Date(user.createdAt).toLocaleString()));
  row.appendChild(createGamesCell(user.attempts));
  return row;
}

async function loadUsers() {
  if (!isAuthenticated) return;
  usersStatus.textContent = "Loading…";
  try {
    const response = await fetch("/api/users");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const { users } = await response.json();

    usersBody.replaceChildren(...users.map(createUserRow));
    usersEmpty.hidden = users.length > 0;
    usersCount.textContent = `(${users.length})`;
    usersStatus.textContent = "";
  } catch (error) {
    // Pasa cuando server.js no está corriendo o la página se abrió
    // con doble click (file://) en vez de desde localhost.
    usersBody.replaceChildren();
    usersEmpty.hidden = true;
    usersCount.textContent = "";
    usersStatus.textContent =
      'Can\'t reach the server. Run "node server.js" and open http://localhost:5050/proyecto%201/gestion.html';
  }
}

document.getElementById("users-refresh").addEventListener("click", loadUsers);

/* ---------- Login ----------
   Gate del lado del cliente: usuario/contrasena vienen en texto plano
   de credenciales.js, visibles para cualquiera que abra las
   herramientas de desarrollador. No protege los datos, solo evita
   mostrar el panel CRUD sin loguearse antes. Mientras no haya sesión
   válida, #admin-main se queda con "hidden" y el diálogo no se puede
   cerrar con Escape. */

const LOGIN_SESSION_KEY = "chrysos-heirs-admin-session";
const adminMain = document.getElementById("admin-main");
const loginDialog = document.getElementById("login-dialog");
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");

function grantAccess() {
  isAuthenticated = true;
  adminMain.hidden = false;
  document.body.classList.remove("login-locked");
  if (loginDialog.open) loginDialog.close();
}

function requireLogin() {
  isAuthenticated = false;
  adminMain.hidden = true;
  document.body.classList.add("login-locked");
  loginError.textContent = "";
  loginForm.reset();
  loginDialog.showModal();
  loginForm.elements.usuario.focus();
}

loginDialog.addEventListener("cancel", (event) => {
  if (adminMain.hidden) event.preventDefault();
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = loginForm.elements;
  const isValid = verifyLogin(fields.usuario.value.trim(), fields.contrasena.value);
  if (!isValid) {
    loginError.textContent = "Incorrect username or password.";
    fields.contrasena.value = "";
    fields.contrasena.focus();
    return;
  }
  try {
    sessionStorage.setItem(LOGIN_SESSION_KEY, "1");
  } catch (error) {
    // sin storage: el acceso de ahora vale igual, solo no se recuerda
  }
  grantAccess();
});

let hasSession = false;
try {
  hasSession = sessionStorage.getItem(LOGIN_SESSION_KEY) === "1";
} catch (error) {
  hasSession = false;
}
hasSession ? grantAccess() : requireLogin();

})();
