/* ============================================================
   game.js — login del juego
   ============================================================
   Tres campos: nombre, alias y contraseña. Si alguno no es válido,
   el formulario no se envía (event.preventDefault) y se muestra el
   error debajo del campo. Si todo está bien, se esconde el login y
   aparece la tarjeta de bienvenida.
   ============================================================ */

/* ---------- Reglas de la contraseña ---------- */
// Una expresión regular por requisito: sirven para marcar en vivo cada
// punto de la lista mientras se escribe.
//   [A-Z]            -> cualquier letra mayúscula
//   [a-z]            -> cualquier letra minúscula
//   \d               -> cualquier dígito (0–9)
//   [^A-Za-z\d\s]    -> el ^ ADENTRO de [] significa "NO": cualquier
//                       caracter que no sea letra, número ni espacio
//                       (o sea, un caracter especial)
//   .{6,}            -> cualquier caracter, 6 veces o más
const PASSWORD_RULES = {
  length: /.{6,}/,
  upper: /[A-Z]/,
  lower: /[a-z]/,
  number: /\d/,
  special: /[^A-Za-z\d\s]/,
};

// La misma validación en UNA sola expresión regular:
//   ^ ... $          -> tiene que cumplirse en toda la contraseña, de
//                       principio a fin
//   (?=.*[a-z])      -> "lookahead": mira hacia adelante y exige que en
//                       algún lugar haya una minúscula, sin "consumir"
//                       caracteres. Por eso se pueden poner varios
//                       seguidos: cada uno revisa la contraseña entera.
//   (?=.*[A-Z])      -> ...una mayúscula
//   (?=.*\d)         -> ...un número
//   (?=.*[^A-Za-z\d\s]) -> ...un caracter especial
//   .{6,}            -> y en total, 6 caracteres o más
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{6,}$/;

/* ---------- Regla del email ---------- */
// nombre @ dominio . extensión
//   ^[A-Za-z0-9._%+-]+  -> la parte antes de la @: letras, números y
//                          . _ % + -  (el + final: "1 o más")
//   @                   -> una @ obligatoria
//   [A-Za-z0-9.-]+      -> el dominio (gmail, uni.edu, mi-sitio…)
//   \.                  -> un punto de verdad: sin la \ , el . de una
//                          regex significa "cualquier caracter"
//   [A-Za-z]{2,}$       -> la extensión: solo letras, 2 o más (com, co,
//                          art…), y ahí termina el texto
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

/* ---------- Elementos del DOM ---------- */
const form = document.getElementById("login-form");
const nameInput = document.getElementById("login-name");
const aliasInput = document.getElementById("login-alias");
const emailInput = document.getElementById("login-email");
const passwordInput = document.getElementById("login-password");
const nameError = document.getElementById("name-error");
const aliasError = document.getElementById("alias-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const ruleItems = document.querySelectorAll("#password-rules li");

const loginCard = document.getElementById("login-card");
const welcomeCard = document.getElementById("welcome-card");
const submitBtn = document.getElementById("login-submit");
const loginStatus = document.getElementById("login-status");
const registerDialog = document.getElementById("register-dialog");

/* ---------- Validación ---------- */

// Muestra (o borra, si message es "") el error de un campo.
// aria-invalid le avisa al lector de pantalla que el campo está mal.
function setFieldError(input, errorEl, message) {
  errorEl.textContent = message;
  input.setAttribute("aria-invalid", String(Boolean(message)));
}

// Marca con .is-met cada requisito que la contraseña ya cumple.
function updatePasswordRules() {
  const password = passwordInput.value;
  ruleItems.forEach((item) => {
    const rule = PASSWORD_RULES[item.dataset.rule];
    item.classList.toggle("is-met", rule.test(password));
  });
}

// Revisa los tres campos, muestra los errores y devuelve true solo si
// todo está bien.
function validateForm() {
  // trim(): "   " no cuenta como nombre.
  const name = nameInput.value.trim();
  const alias = aliasInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  const nameMessage = name ? "" : "Write your name.";
  const aliasMessage = alias ? "" : "Choose an alias.";
  // Dos mensajes distintos: vacío vs. escrito pero con mal formato.
  let emailMessage = "";
  if (!email) emailMessage = "Write your email.";
  else if (!EMAIL_REGEX.test(email)) emailMessage = "That doesn't look like an email (name@example.com).";
  const passwordMessage = PASSWORD_REGEX.test(password)
    ? ""
    : "Your password doesn't meet all the requirements above.";

  setFieldError(nameInput, nameError, nameMessage);
  setFieldError(aliasInput, aliasError, aliasMessage);
  setFieldError(emailInput, emailError, emailMessage);
  setFieldError(passwordInput, passwordError, passwordMessage);

  // Lleva el foco al primer campo con error, para no tener que buscarlo.
  const firstInvalid = [
    [nameInput, nameMessage],
    [aliasInput, aliasMessage],
    [emailInput, emailMessage],
    [passwordInput, passwordMessage],
  ].find(([, message]) => message);
  if (firstInvalid) firstInvalid[0].focus();

  return !firstInvalid;
}

/* ---------- Pedidos al servidor (server.js) ---------- */

// Manda "data" como JSON a una ruta de la API y devuelve el status
// (200, 404…) junto con la respuesta ya convertida a objeto.
// async/await: fetch tarda (va y vuelve del servidor), y "await"
// espera la respuesta sin congelar la página mientras tanto.
async function postJson(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return { status: response.status, body: await response.json() };
}

// Abre el modal "¿Registrarse?" y devuelve una Promise que se resuelve
// con true (Yes) o false (No / Escape) cuando se cierra.
function askToRegister(email) {
  document.getElementById("register-text").textContent =
    `There's no player with ${email} yet. Do you want to register?`;
  registerDialog.returnValue = "";
  registerDialog.showModal();
  return new Promise((resolve) => {
    registerDialog.addEventListener("close", () => resolve(registerDialog.returnValue === "yes"), {
      once: true,
    });
  });
}

async function handleLogin() {
  const player = {
    name: nameInput.value.trim(),
    alias: aliasInput.value.trim(),
    email: emailInput.value.trim(),
    password: passwordInput.value,
  };

  const login = await postJson("/api/login", { email: player.email, password: player.password });

  // 200: el email existe y la contraseña coincide.
  if (login.status === 200) {
    const { user } = login.body;
    showWelcome(user.name, user.alias, user.id);
    return;
  }

  // 401: el email existe pero la contraseña no es la registrada.
  if (login.status === 401) {
    setFieldError(passwordInput, passwordError, "Wrong password for this email.");
    passwordInput.focus();
    return;
  }

  // 404: no hay nadie con ese email -> se pregunta si quiere registrarse.
  if (login.status === 404) {
    const wantsToRegister = await askToRegister(player.email);
    if (!wantsToRegister) return;

    const register = await postJson("/api/register", player);
    if (register.status === 201) {
      const { user } = register.body;
      showWelcome(user.name, user.alias, user.id);
    } else {
      loginStatus.textContent = `Could not register (${register.body.error}).`;
    }
    return;
  }

  loginStatus.textContent = `Something went wrong (${login.body.error}).`;
}

/* ---------- Guardar partidas ---------- */

// id (de users.json) del jugador que entró. null = modo sin servidor:
// se juega igual pero no hay dónde guardar.
let currentUserId = null;

// memory.js la llama al ganar (ver startMemoryGame). Manda la partida
// a server.js, que le agrega su propio id y la fecha, y la guarda
// dentro del usuario en users.json. Devuelve el texto para el modal.
async function saveAttempt(result) {
  if (!currentUserId) return "Offline: this game was not saved.";
  try {
    const saved = await postJson("/api/attempts", { userId: currentUserId, ...result });
    return saved.status === 201
      ? `Saved to your history ✓ (${saved.body.attempt.time})`
      : `Could not save this game (${saved.body.error}).`;
  } catch (error) {
    // El servidor se apagó en medio de la partida.
    return "Can't reach the server: this game was not saved.";
  }
}

/* ---------- Entrar / salir ---------- */

// userId es opcional: sin él (modo sin servidor) no se guarda nada.
function showWelcome(name, alias, userId = null) {
  currentUserId = userId;
  document.getElementById("welcome-title").textContent = `Welcome, ${alias}`;
  document.getElementById("welcome-text").textContent = `Player: ${name}`;
  loginCard.hidden = true;
  welcomeCard.hidden = false;
  startMemoryGame(saveAttempt); // memory.js
}

function logout() {
  currentUserId = null;
  stopMemoryGame(); // memory.js: frena el reloj y vacía el tablero
  form.reset();
  updatePasswordRules();
  [nameError, aliasError, emailError, passwordError, loginStatus].forEach((el) => (el.textContent = ""));
  [nameInput, aliasInput, emailInput, passwordInput].forEach((input) => input.removeAttribute("aria-invalid"));
  welcomeCard.hidden = true;
  loginCard.hidden = false;
  nameInput.focus();
}

/* ---------- Eventos ---------- */

form.addEventListener("submit", async (event) => {
  // Siempre se frena el envío normal: sin esto el navegador recargaría
  // la página. Si hay errores, simplemente no se sigue.
  event.preventDefault();
  loginStatus.textContent = "";
  if (!validateForm()) return;

  // Se desactiva el botón mientras se espera al servidor, para que un
  // doble click no mande dos pedidos.
  submitBtn.disabled = true;
  try {
    await handleLogin();
  } catch (error) {
    // fetch falla cuando server.js no está corriendo, o la página se
    // abrió con doble click (file://) o con Live Preview. En ese caso
    // se entra igual en "modo sin servidor": el formulario ya pasó la
    // validación, pero no se revisa ni se guarda nada en users.json.
    showWelcome(nameInput.value.trim(), aliasInput.value.trim());
    document.getElementById("welcome-text").textContent += " · offline (not saved)";
  } finally {
    submitBtn.disabled = false;
  }
});

passwordInput.addEventListener("input", () => {
  updatePasswordRules();
  // Si ya había un error y ahora la contraseña es válida, se borra solo.
  if (passwordError.textContent && PASSWORD_REGEX.test(passwordInput.value)) {
    setFieldError(passwordInput, passwordError, "");
  }
});

document.getElementById("logout-btn").addEventListener("click", logout);

// Invitado: entra sin formulario con el id fijo "guest". server.js
// guarda sus partidas en un usuario Guest compartido de users.json
// (si el servidor está apagado, el modal avisa que no se guardó).
document.getElementById("guest-btn").addEventListener("click", () => {
  showWelcome("Guest", "Guest", "guest");
});

setupThemeToggle();
