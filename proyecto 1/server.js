/* ============================================================
   server.js — servidor local del juego (Node, sin librerías)
   ============================================================
   Cómo usarlo, desde la carpeta "proyecto 1":
       node server.js
   y abrir http://localhost:5050/proyecto%201/game.html

   Hace dos cosas:
   1. Sirve los archivos de la carpeta "objetos" (HTML, CSS, JS,
      imágenes). Sirve la carpeta de ARRIBA, no solo "proyecto 1",
      porque styles.css usa el fondo de ../media (proyecto 1 vive dentro
      de la carpeta Chrysos Heirs).
   2. Tiene rutas de API que leen y escriben users.json:
      POST /api/login     { email, password }
      POST /api/register  { name, alias, email, password }
      POST /api/attempts  { userId, attempts, timeSeconds, pairsFound,
                            totalPairs, rank }  (una partida ganada)
      GET  /api/users     lista para la pestaña Users de gestion.html

   Forma de cada usuario en users.json:
     { id, name, alias, email, salt, passwordHash, createdAt,
       attempts: [ { id, date, attempts, timeSeconds, time,
                     pairsFound, totalPairs, rank }, ... ] }

   ¿Por qué hace falta un servidor? El JS del navegador puede LEER
   archivos con fetch(), pero nunca escribir en tu disco. Node sí
   puede (con el módulo fs), así que el navegador le pide a este
   servidor que guarde, y el servidor escribe users.json.
   ============================================================ */

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// 5050 y no 3000/3001: la extensión Live Preview de VS Code ya usa
// esos dos (y 5500 es el de Live Server).
const PORT = 5050;
// __dirname = la carpeta donde está este archivo (proyecto 1).
const USERS_FILE = path.join(__dirname, "users.json");
const STATIC_ROOT = path.join(__dirname, "..");

// Las mismas reglas que game.js. Se repiten acá a propósito: la
// validación del navegador se puede saltar (con DevTools o mandando
// el pedido a mano), así que el servidor tiene que revisar de nuevo.
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{6,}$/;

/* ---------- users.json ---------- */

function readUsers() {
  let users;
  try {
    users = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
  } catch (error) {
    // Si el archivo no existe todavía (o está vacío), se arranca sin
    // usuarios.
    return [];
  }
  // Usuarios guardados antes de que existieran los id y los intentos:
  // se les completa lo que falta, así todo el resto del código puede
  // contar con user.id y user.attempts. Se guarda en el archivo la
  // próxima vez que alguien escriba (writeUsers).
  users.forEach((user) => {
    if (!user.id) user.id = crypto.randomUUID();
    if (!Array.isArray(user.attempts)) user.attempts = [];
  });
  return users;
}

function writeUsers(users) {
  // null, 2 -> JSON con sangría de 2 espacios, para poder leerlo a mano.
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2) + "\n");
}

// Los emails no distinguen mayúsculas: Emily@Gmail.com y
// emily@gmail.com son el mismo usuario.
function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

/* ---------- Contraseñas: hash con salt ---------- */
// Nunca se guarda la contraseña real. Se guarda un "hash": el
// resultado de pasarla por una función (scrypt) que no se puede
// deshacer. Para comprobar un login, se vuelve a calcular el hash de
// lo que escribió la persona y se compara con el guardado.
//
// El "salt" es un texto al azar distinto para cada usuario: así, dos
// personas con la misma contraseña quedan con hashes distintos.
function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

function passwordMatches(password, user) {
  const attempt = Buffer.from(hashPassword(password, user.salt), "hex");
  const saved = Buffer.from(user.passwordHash, "hex");
  // timingSafeEqual tarda lo mismo aunque los hashes difieran en el
  // primer byte o en el último: así no se puede adivinar "cuánto se
  // acertó" midiendo el tiempo de respuesta.
  return attempt.length === saved.length && crypto.timingSafeEqual(attempt, saved);
}

// Lo que se le devuelve al navegador: nunca el hash ni el salt. El id
// sí: game.js lo necesita para decir de quién es cada partida.
function publicUser(user) {
  return { id: user.id, name: user.name, alias: user.alias, email: user.email };
}

// 75 -> "01:15" (mismo formato que el HUD del juego)
function formatTime(totalSeconds) {
  const mm = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const ss = String(totalSeconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

/* ---------- Rutas de la API ---------- */

function handleLogin(body) {
  const email = normalizeEmail(body.email);
  const user = readUsers().find((candidate) => candidate.email === email);
  if (!user) return [404, { error: "not-registered" }];
  if (!passwordMatches(String(body.password || ""), user)) return [401, { error: "wrong-password" }];
  return [200, { user: publicUser(user) }];
}

function handleRegister(body) {
  const name = String(body.name || "").trim();
  const alias = String(body.alias || "").trim();
  const email = normalizeEmail(body.email);
  const password = String(body.password || "");

  if (!name || !alias) return [400, { error: "missing-fields" }];
  if (!EMAIL_REGEX.test(email)) return [400, { error: "invalid-email" }];
  if (!PASSWORD_REGEX.test(password)) return [400, { error: "weak-password" }];

  const users = readUsers();
  if (users.some((user) => user.email === email)) return [409, { error: "already-registered" }];

  const salt = crypto.randomBytes(16).toString("hex");
  const user = {
    // randomUUID(): un id único al azar, tipo "3f2b9c1e-8a4d-4c1b-…".
    // Nunca se repite, aunque se borren usuarios (con números
    // correlativos habría que calcular "el siguiente" con cuidado).
    id: crypto.randomUUID(),
    name,
    alias,
    email,
    salt,
    passwordHash: hashPassword(password, salt),
    createdAt: new Date().toISOString(),
    attempts: [],
  };
  users.push(user);
  writeUsers(users);
  return [201, { user: publicUser(user) }];
}

// Guarda una partida ganada del Memory dentro del usuario que la jugó.
// Se revisa todo lo que llega: el navegador podría mandar cualquier
// cosa (un número negativo, un texto, un usuario que no existe).
const RANKS = ["Chrysos Heir", "Flame-Chaser", "Okhema Citizen", "Traveler"];

// Invitados: todos comparten un mismo usuario con id fijo "guest", sin
// email ni contraseña (así nunca puede usarse para hacer login). Se
// crea solo la primera vez que un invitado gana una partida.
const GUEST_ID = "guest";

function createGuestUser() {
  return {
    id: GUEST_ID,
    name: "Guest",
    alias: "Guest",
    email: null,
    isGuest: true,
    createdAt: new Date().toISOString(),
    attempts: [],
  };
}
const isCount = (value) => Number.isInteger(value) && value >= 0;

function handleAttempt(body) {
  const users = readUsers();
  let user = users.find((candidate) => candidate.id === body.userId);
  if (!user && body.userId !== GUEST_ID) return [404, { error: "user-not-found" }];

  const { attempts, timeSeconds, pairsFound, totalPairs, rank } = body;
  const isValid =
    isCount(attempts) && attempts > 0 &&
    isCount(timeSeconds) &&
    isCount(pairsFound) && isCount(totalPairs) && pairsFound <= totalPairs &&
    RANKS.includes(rank);
  if (!isValid) return [400, { error: "invalid-attempt" }];

  // Primera partida de invitado: se crea el usuario Guest (después de
  // validar, para no crearlo por un pedido con datos inválidos).
  if (!user) {
    user = createGuestUser();
    users.push(user);
  }

  const attempt = {
    id: crypto.randomUUID(),
    // toISOString(): fecha y hora en UTC, formato estándar
    // "2026-09-25T20:14:03.512Z". El navegador la muestra en tu hora
    // local con toLocaleString().
    date: new Date().toISOString(),
    attempts,
    timeSeconds,
    time: formatTime(timeSeconds),
    pairsFound,
    totalPairs,
    rank,
  };
  user.attempts.push(attempt);
  writeUsers(users);
  return [201, { attempt }];
}

// Para la pestaña "Users" de gestion.html. A propósito devuelve el
// salt y el hash (nunca la contraseña real, que no existe en ningún
// lado): es un ejercicio para ver qué guarda el servidor.
function handleListUsers() {
  return [200, { users: readUsers() }];
}

// Rutas POST (reciben un cuerpo JSON) y GET (solo leen).
const API_ROUTES = {
  "/api/login": handleLogin,
  "/api/register": handleRegister,
  "/api/attempts": handleAttempt,
};
const API_GET_ROUTES = {
  "/api/users": handleListUsers,
};

/* ---------- Archivos estáticos ---------- */

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".svg": "image/svg+xml",
};

function serveStatic(req, res) {
  const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const filePath = path.join(STATIC_ROOT, urlPath);

  // Seguridad: sin esto, alguien podría pedir /../../Windows/... y leer
  // archivos de afuera de la carpeta. También se bloquea users.json:
  // tiene los hashes y solo lo debe leer el servidor.
  if (!filePath.startsWith(STATIC_ROOT + path.sep) || filePath === USERS_FILE) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const type = CONTENT_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  });
}

/* ---------- Servidor ---------- */

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

const server = http.createServer((req, res) => {
  const getRoute = API_GET_ROUTES[req.url];
  if (getRoute) {
    if (req.method !== "GET") {
      sendJson(res, 405, { error: "method-not-allowed" });
      return;
    }
    const [status, payload] = getRoute();
    sendJson(res, status, payload);
    return;
  }

  const route = API_ROUTES[req.url];

  if (!route) {
    serveStatic(req, res);
    return;
  }
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "method-not-allowed" });
    return;
  }

  // El cuerpo del pedido llega en pedazos ("chunks"); se juntan y,
  // cuando termina ("end"), se interpreta como JSON.
  let raw = "";
  req.on("data", (chunk) => {
    raw += chunk;
    // Límite de 10 KB: un login nunca pesa más que eso.
    if (raw.length > 10_000) req.destroy();
  });
  req.on("end", () => {
    let body;
    try {
      body = JSON.parse(raw || "{}");
    } catch (error) {
      sendJson(res, 400, { error: "invalid-json" });
      return;
    }
    const [status, payload] = route(body);
    sendJson(res, status, payload);
  });
});

// "127.0.0.1": solo se puede entrar desde esta misma computadora. Sin
// esto, cualquiera en tu misma red wifi podría abrir el servidor (y
// /api/users muestra los emails y hashes de todos).
// Si el puerto ya está ocupado (otro servidor, u otra copia de este
// que quedó abierta), se explica en vez de mostrar el error crudo.
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Close the other server (or change PORT in server.js).`);
    process.exit(1);
  }
  throw error;
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Game server running: http://localhost:${PORT}/proyecto%201/game.html`);
});
