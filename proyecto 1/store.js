/* ============================================================
   store.js — datos y utilidades compartidas
   ============================================================
   Lo usan index.html (app.js) y gestion.html (gestion.js), así que
   los dos trabajan sobre los mismos datos guardados en localStorage.
   Tiene que cargarse DESPUÉS de data.js y ANTES del script de cada
   página.
   ============================================================ */

const STORAGE_KEY = "chrysos-heirs-crud";
const META_KEY = "chrysos-heirs-crud-meta";
const THEME_KEY = "chrysos-heirs-manager-theme";
// Las imágenes y videos viven en el otro proyecto; así no se duplican
// los archivos pesados. Las rutas de data.js ("media/...") se
// completan con este prefijo al mostrarlas.
const MEDIA_BASE = "../";

/* ---------- Datos y persistencia ---------- */

// Cada heredero necesita un id propio: el nombre podría cambiar al
// editar, así que no sirve para identificarlo. Los de data.js ya
// traen el suyo; nextId sigue la cuenta para los que se creen después,
// arrancando después del id más alto que exista (en data.js o en lo
// guardado en localStorage) para no repetir ninguno.
function computeNextId() {
  const ids = chrysosHeirs.map((heir) => Number(heir.id) || 0);
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) {
      saved.forEach((heir) => {
        const id = heir && Number(heir.id);
        if (Number.isFinite(id)) ids.push(id);
      });
    }
  } catch (error) {
    // storage ilegible o bloqueado: se sigue solo con lo de data.js
  }
  return ids.length ? Math.max(...ids) + 1 : 1;
}

let nextId = computeNextId();

// Se devuelve como string: los <select> del panel de gestión siempre
// entregan strings (updateSelect.value), y el resto del código compara
// ids con ===, así que todos tienen que tener el mismo tipo.
function newId() {
  return String(nextId++);
}

// Copia los datos de data.js para no mutar el array original: así
// "Reset data" siempre puede volver a él. Los ids se conservan tal
// cual vienen de data.js.
function seedHeirs() {
  return chrysosHeirs.map((heir) => ({ ...heir, rasgos: [...heir.rasgos] }));
}

// localStorage puede lanzar error (modo privado, almacenamiento
// bloqueado) o traer basura; en cualquiera de esos casos se cae a los
// datos de data.js en vez de romper la página.
function loadHeirs() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved) && saved.every((heir) => heir && heir.id && heir.nombre)) {
      return saved;
    }
  } catch (error) {
    // se ignora a propósito: se usan los datos iniciales
  }
  return seedHeirs();
}

// Devuelve false si no pudo guardar, para avisarle a la persona que
// los cambios se perderán al recargar. Además de los herederos guarda
// la fecha del guardado (clave aparte, para no cambiar el formato del
// array principal).
function saveHeirs(heirs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(heirs));
    localStorage.setItem(META_KEY, JSON.stringify({ savedAt: new Date().toISOString() }));
    return true;
  } catch (error) {
    return false;
  }
}

// Borra lo guardado (herederos y fecha). No toca el tema elegido.
function clearSavedHeirs() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(META_KEY);
    return true;
  } catch (error) {
    return false;
  }
}

// Foto del estado del almacenamiento para el panel de Storage:
// si el navegador deja guardar, cuántos herederos hay guardados, cuánto
// pesa y cuándo fue el último guardado.
function getStorageInfo() {
  const info = { available: false, count: 0, bytes: 0, savedAt: null };
  // Prueba real de escritura: leer no basta, algunos navegadores
  // dejan leer pero lanzan error al escribir.
  try {
    localStorage.setItem("__probe__", "1");
    localStorage.removeItem("__probe__");
    info.available = true;
  } catch (error) {
    return info;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      info.bytes = new Blob([raw]).size;
      const saved = JSON.parse(raw);
      info.count = Array.isArray(saved) ? saved.length : 0;
    }
    const meta = JSON.parse(localStorage.getItem(META_KEY));
    if (meta && meta.savedAt) info.savedAt = meta.savedAt;
  } catch (error) {
    // datos ilegibles: se dejan los valores en cero
  }
  return info;
}

/* ---------- Helpers ---------- */

// "media/x.jpg" -> "../media/x.jpg" (proyecto 1 vive dentro de Chrysos Heirs). Las URLs completas o
// rutas que la persona escriba distintas se dejan tal cual.
function mediaUrl(src) {
  if (!src) return "";
  return src.startsWith("media/") ? encodeURI(MEDIA_BASE + src) : src;
}

function parseList(text) {
  return text
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

// Un solo clip se guarda como string y varios como array, igual que
// en data.js.
function parseClip(text) {
  const clips = parseList(text);
  if (clips.length === 0) return "";
  return clips.length === 1 ? clips[0] : clips;
}

function clipToText(clip) {
  if (!clip) return "";
  return Array.isArray(clip) ? clip.join(", ") : clip;
}

// Las sugerencias de Path/Element salen de los valores que ya existen,
// para no tener que inventar una lista fija.
function fillDatalist(id, values) {
  const datalist = document.getElementById(id);
  datalist.replaceChildren();
  [...new Set(values.filter(Boolean))].sort().forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    datalist.appendChild(option);
  });
}

function refreshDatalists(heirs) {
  fillDatalist("path-options", heirs.map((heir) => heir.path));
  fillDatalist("element-options", heirs.map((heir) => heir.elemento));
}

/* ---------- Formulario (lo comparten el diálogo y el panel) ---------- */

// Vuelca un heredero en los campos del formulario; con null lo deja
// vacío (modo "crear").
function fillHeirForm(form, heir) {
  const fields = form.elements;
  fields.nombre.value = heir ? heir.nombre : "";
  fields.titulo.value = heir ? heir.titulo : "";
  fields.path.value = heir ? heir.path : "";
  fields.elemento.value = heir ? heir.elemento : "";
  fields.version.value = heir && Number.isFinite(heir.version) ? heir.version : "";
  fields.isDeliverer.checked = heir ? heir.isDeliverer : false;
  fields.descripcion.value = heir ? heir.descripcion : "";
  fields.rasgos.value = heir ? heir.rasgos.join(", ") : "";
  fields.imagen.value = heir ? heir.imagen : "";
  fields.sticker.value = heir ? heir.sticker : "";
  fields.clip.value = heir ? clipToText(heir.clip) : "";
}

// Lee el formulario y devuelve { heir } si es válido o { error } si no.
// "editingId" es el id del que se está editando (o null al crear): se
// necesita para que un heredero no choque consigo mismo al comprobar
// nombres repetidos.
function readHeirForm(form, heirs, editingId) {
  const fields = form.elements;
  const nombre = fields.nombre.value.trim();
  if (!nombre) return { error: "Name is required." };

  const duplicated = heirs.some(
    (other) => other.id !== editingId && other.nombre.toLowerCase() === nombre.toLowerCase()
  );
  if (duplicated) return { error: `There is already an heir named "${nombre}".` };

  const versionText = fields.version.value.trim();
  const version = versionText === "" ? null : Number(versionText);
  if (version !== null && (!Number.isFinite(version) || version < 0)) {
    return { error: "Version must be a positive number." };
  }

  return {
    heir: {
      nombre,
      titulo: fields.titulo.value.trim(),
      path: fields.path.value.trim(),
      elemento: fields.elemento.value.trim(),
      version,
      isDeliverer: fields.isDeliverer.checked,
      descripcion: fields.descripcion.value.trim(),
      rasgos: parseList(fields.rasgos.value),
      imagen: fields.imagen.value.trim(),
      clip: parseClip(fields.clip.value),
      sticker: fields.sticker.value.trim(),
    },
  };
}

/* ---------- Exportar / importar ---------- */

// Contenido del archivo de respaldo. Los ids no se exportan: son
// internos y se generan de nuevo al importar.
function buildExportPayload(heirs) {
  return {
    app: "chrysos-heirs",
    version: 1,
    exportedAt: new Date().toISOString(),
    heirs: heirs.map(({ id, ...heir }) => heir),
  };
}

// Valida y limpia lo que venga de un archivo importado. Acepta el
// formato del export ({ heirs: [...] }) o directamente un array.
// Devuelve { heirs } listo para usar o { error } con el motivo, sin
// haber tocado los datos actuales.
function normalizeHeirs(raw) {
  const list = Array.isArray(raw) ? raw : raw && Array.isArray(raw.heirs) ? raw.heirs : null;
  if (!list) return { error: "the file must contain a list of heirs." };
  if (list.length === 0) return { error: "the file has no heirs." };

  const text = (value) => (typeof value === "string" ? value.trim() : "");
  const textList = (value) =>
    Array.isArray(value) ? value.map(text).filter(Boolean) : [];
  const names = new Set();
  const heirs = [];

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const nombre = item && typeof item === "object" ? text(item.nombre) : "";
    if (!nombre) return { error: `item ${i + 1} has no valid "nombre".` };
    if (names.has(nombre.toLowerCase())) return { error: `the name "${nombre}" is repeated.` };
    names.add(nombre.toLowerCase());

    // version puede venir como número o como texto numérico ("3.4").
    const version = typeof item.version === "string" && item.version.trim() ? Number(item.version) : item.version;
    const clips = Array.isArray(item.clip) ? textList(item.clip) : [text(item.clip)].filter(Boolean);

    heirs.push({
      id: newId(),
      nombre,
      titulo: text(item.titulo),
      path: text(item.path),
      elemento: text(item.elemento),
      version: typeof version === "number" && Number.isFinite(version) && version >= 0 ? version : null,
      isDeliverer: item.isDeliverer === true,
      descripcion: text(item.descripcion),
      rasgos: textList(item.rasgos),
      imagen: text(item.imagen),
      clip: clips.length === 0 ? "" : clips.length === 1 ? clips[0] : clips,
      sticker: text(item.sticker),
    });
  }
  return { heirs };
}

/* ---------- Tema oscuro / claro ---------- */

// Mismo mecanismo que el proyecto principal: data-theme en <html>, que
// el CSS usa para cambiar las variables de color.
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const button = document.getElementById("theme-toggle");
  if (!button) return;
  const isDark = theme === "dark";
  // El texto describe la ACCIÓN que hará el botón, no el estado actual.
  button.textContent = isDark ? "Light mode" : "Dark mode";
  button.setAttribute("aria-pressed", String(isDark));
}

// Arranca con el tema guardado; si no hay (o el storage está
// bloqueado) usa la preferencia del sistema. El try/catch importa: sin
// él, un storage bloqueado tumbaría todo el script de la página.
function setupThemeToggle() {
  const button = document.getElementById("theme-toggle");
  if (!button) return;

  let saved = null;
  try {
    saved = localStorage.getItem(THEME_KEY);
  } catch (error) {
    // sin storage: se usa la preferencia del sistema
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved === "dark" || saved === "light" ? saved : prefersDark ? "dark" : "light");

  button.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (error) {
      // el tema cambia igual, solo que no se recordará
    }
  });
}
