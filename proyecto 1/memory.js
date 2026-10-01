/* ============================================================
   memory.js — juego de Memory con los Chrysos Heirs
   ============================================================
   Adaptado de "cardGame" de Julian Bejarano (ejemplo juego/cardgame),
   con licencia MIT:
     Copyright (c) 2026 Julian Bejarano
     https://codepen.io/julianbejarano/pen/myrzjBG
     Permission is hereby granted, free of charge, to any person
     obtaining a copy of this software... (texto completo en
     ejemplo juego/cardgame/LICENSE.txt)

   Cambios respecto del original:
   - Las cartas son Chrysos Heirs (loadHeirs() de store.js: lo que
     editaste en el CRUD, o data.js si no hay nada guardado), no
     productos de una tienda. Cada partida usa 8 heirs al azar.
   - Las cartas se arman con createElement/textContent en vez de
     innerHTML: los nombres vienen del CRUD y podrían traer HTML.
   - La cantidad de pares se calcula con los datos (no un "8" fijo).
   - El premio es un rango según el desempeño, no un descuento.
   - Cada carta es un <button>: se puede jugar con teclado (Tab +
     Enter/Espacio).

   game.js llama a startMemoryGame(onFinish) después del login y a
   stopMemoryGame() al cambiar de jugador. onFinish(result) se llama
   al ganar, con los datos de la partida, y devuelve (con una Promise)
   el texto que se muestra en el modal: "Saved" o por qué no se guardó.
   memory.js no sabe nada del servidor: eso es trabajo de game.js.
   ============================================================ */

// Todo va adentro de un IIFE (como gestion.js) para no llenar el
// scope global; solo se exponen startMemoryGame y stopMemoryGame.
(function () {
  const MAX_PAIRS = 8;
  const MISMATCH_DELAY_MS = 900;

  /* ---------- Estado de la partida ---------- */
  let firstCard = null; // primera carta dada vuelta en este turno
  let isChecking = false; // true mientras se comparan dos cartas
  let pairsFound = 0;
  let totalPairs = 0;
  let attempts = 0;
  let seconds = 0;
  let timerId = null;
  let onFinish = null; // función de game.js que guarda la partida

  const board = document.getElementById("memory-board");
  const hudTime = document.getElementById("hud-time");
  const hudAttempts = document.getElementById("hud-attempts");
  const hudPairs = document.getElementById("hud-pairs");
  const victoryDialog = document.getElementById("victory-dialog");

  /* ---------- Utilidades ---------- */

  // Fisher-Yates: recorre el array de atrás hacia adelante e
  // intercambia cada elemento con otro al azar de los que quedan.
  // Todas las posiciones terminan con la misma probabilidad (a
  // diferencia de sort(() => Math.random() - 0.5), que está sesgado).
  function shuffle(array) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // 75 -> "01:15"
  function formatTime(totalSeconds) {
    const mm = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const ss = String(totalSeconds % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  /* ---------- Cronómetro ---------- */
  // Arranca con la primera carta que se da vuelta, no al cargar: así
  // no cuenta el tiempo que uno tarda en leer la pantalla.

  function startTimer() {
    if (timerId) return;
    timerId = setInterval(() => {
      seconds++;
      hudTime.textContent = formatTime(seconds);
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerId);
    timerId = null;
  }

  /* ---------- HUD ---------- */

  function updateHud() {
    hudAttempts.textContent = attempts;
    hudPairs.textContent = `${pairsFound}/${totalPairs}`;
    hudTime.textContent = formatTime(seconds);
  }

  /* ---------- Cartas ---------- */

  // Cara visible al darla vuelta: retrato (o la inicial si no hay
  // imagen), nombre y píldora del Path con su color.
  function createCardFace(heir) {
    const face = document.createElement("div");
    face.className = "memory-face memory-face-front";

    const portrait = document.createElement("div");
    portrait.className = "memory-portrait";
    const initial = document.createElement("span");
    initial.className = "memory-initial";
    initial.textContent = heir.nombre.charAt(0);
    initial.setAttribute("aria-hidden", "true");
    portrait.appendChild(initial);

    if (heir.imagen) {
      const img = document.createElement("img");
      img.src = mediaUrl(heir.imagen);
      img.alt = "";
      // Si la imagen no existe, se ve la inicial que está debajo.
      img.addEventListener("error", () => img.remove(), { once: true });
      portrait.appendChild(img);
    }
    face.appendChild(portrait);

    const info = document.createElement("div");
    info.className = "memory-info";
    const name = document.createElement("p");
    name.className = "memory-name";
    name.textContent = heir.nombre;
    info.appendChild(name);
    if (heir.path) {
      const path = document.createElement("span");
      path.className = "path-tag";
      path.textContent = heir.path;
      info.appendChild(path);
    }
    face.appendChild(info);

    return face;
  }

  function createCard(heir) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "memory-card";
    // data-id: con esto se compara si dos cartas son el mismo heir.
    // data-path / data-nombre: el CSS de styles.css pinta la píldora
    // con el color del Path (y la excepción de Phainon).
    card.dataset.id = heir.id;
    card.dataset.path = heir.path || "";
    card.dataset.nombre = heir.nombre;
    card.dataset.heirName = heir.nombre;
    card.setAttribute("aria-label", "Hidden card");

    const inner = document.createElement("div");
    inner.className = "memory-inner";

    // Reverso: el mismo para todas (el arte de Amphoreus, ver game.css).
    const back = document.createElement("div");
    back.className = "memory-face memory-face-back";
    back.setAttribute("aria-hidden", "true");
    back.textContent = "✦";

    inner.append(back, createCardFace(heir));
    card.appendChild(inner);

    card.addEventListener("click", () => handleCardClick(card));
    return card;
  }

  // Elige hasta 8 heirs al azar, duplica cada uno (el par) y mezcla.
  function buildDeck() {
    const heirs = loadHeirs();
    const chosen = shuffle(heirs).slice(0, MAX_PAIRS);
    totalPairs = chosen.length;
    return shuffle([...chosen, ...chosen]);
  }

  /* ---------- Turnos ---------- */

  function reveal(card) {
    card.classList.add("is-flipped");
    card.setAttribute("aria-label", card.dataset.heirName);
  }

  function hide(card) {
    card.classList.remove("is-flipped");
    card.setAttribute("aria-label", "Hidden card");
  }

  function handleCardClick(card) {
    // Se ignora el click si se están comparando dos cartas, o si esta
    // carta ya está boca arriba (dada vuelta o ya encontrada).
    if (isChecking || card.classList.contains("is-flipped")) return;

    startTimer();
    reveal(card);

    // Primera carta del turno: se guarda y se espera la segunda.
    if (!firstCard) {
      firstCard = card;
      return;
    }

    // Segunda carta: se cuenta el intento y se comparan los id.
    const secondCard = card;
    attempts++;
    updateHud();

    if (firstCard.dataset.id === secondCard.dataset.id) {
      [firstCard, secondCard].forEach((matched) => {
        matched.classList.add("is-matched");
        // Ya no se puede volver a elegir: disabled lo saca del Tab.
        matched.disabled = true;
      });
      firstCard = null;
      pairsFound++;
      updateHud();
      if (pairsFound === totalPairs) {
        stopTimer();
        setTimeout(showVictory, 500);
      }
      return;
    }

    // No coinciden: se dejan ver un momento y se vuelven a tapar.
    isChecking = true;
    const pending = firstCard;
    firstCard = null;
    setTimeout(() => {
      hide(pending);
      hide(secondCard);
      isChecking = false;
    }, MISMATCH_DELAY_MS);
  }

  /* ---------- Victoria ---------- */

  // Rango según intentos y tiempo (mismos cortes que el juego
  // original, pensados para 8 pares).
  function getRank() {
    if (attempts <= 10 && seconds <= 60) {
      return ["Chrysos Heir", "You remember like Mem herself. The Coreflame is yours."];
    }
    if (attempts <= 14) return ["Flame-Chaser", "A sharp memory worthy of the Flame-Chase."];
    if (attempts <= 20) return ["Okhema Citizen", "The city of Okhema would be proud."];
    return ["Traveler", "Every Heir started somewhere. Try again!"];
  }

  function showVictory() {
    const [rank, message] = getRank();
    document.getElementById("victory-rank").textContent = rank;
    document.getElementById("victory-message").textContent = message;
    document.getElementById("victory-time").textContent = formatTime(seconds);
    document.getElementById("victory-attempts").textContent = attempts;
    document.getElementById("victory-pairs").textContent = `${pairsFound}/${totalPairs}`;
    victoryDialog.showModal();
    saveResult(rank);
  }

  // Le pasa el resultado a game.js (onFinish) y muestra en el modal si
  // se guardó. async/await: guardar va y vuelve del servidor.
  async function saveResult(rank) {
    const savedEl = document.getElementById("victory-saved");
    if (!onFinish) {
      savedEl.textContent = "";
      return;
    }
    savedEl.textContent = "Saving…";
    savedEl.textContent = await onFinish({
      attempts,
      timeSeconds: seconds,
      pairsFound,
      totalPairs,
      rank,
    });
  }

  /* ---------- Arrancar / parar ---------- */

  // finishHandler es opcional: si no se pasa (Restart, Play again), se
  // sigue usando el que dio game.js al entrar.
  function startMemoryGame(finishHandler) {
    if (finishHandler) onFinish = finishHandler;
    stopTimer();
    firstCard = null;
    isChecking = false;
    pairsFound = 0;
    attempts = 0;
    seconds = 0;
    if (victoryDialog.open) victoryDialog.close();

    board.replaceChildren(...buildDeck().map(createCard));
    updateHud();
  }

  function stopMemoryGame() {
    onFinish = null;
    stopTimer();
    if (victoryDialog.open) victoryDialog.close();
    board.replaceChildren();
  }

  // () => startMemoryGame(), no startMemoryGame directo: addEventListener
  // le pasaría el evento del click como si fuera finishHandler.
  document.getElementById("memory-restart").addEventListener("click", () => startMemoryGame());
  document.getElementById("victory-again").addEventListener("click", () => startMemoryGame());

  window.startMemoryGame = startMemoryGame;
  window.stopMemoryGame = stopMemoryGame;
})();
