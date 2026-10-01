# Changelog

Format based on [Keep a Changelog](https://keepachangelog.com/). Dates are `YYYY-MM-DD`.

## [Unreleased]

### Fixed

- Paths for the nested layout (`proyecto 1` inside `Chrysos Heirs`): the "View Chrysos Heirs" button, the character images (`MEDIA_BASE`) and the background art pointed to `../Chrysos Heirs/...`, which does not exist from inside the folder. Now they use `../`.
- `../scripts/script.js` really reads the CRUD list (`getHeirsToRender`) and an heir without version no longer breaks the page (`formatMeta`).

### Added (site)

- "Gestionar herederos" button in the footer of the Chrysos Heirs site that opens `proyecto 1/gestion.html`.
- "Jugar" button (top left) on the Chrysos Heirs site that opens the memory game.

### Added (game)

- The game is reachable: "Play" link in the manager pages, and the game page has the same navigation back.
- Without a server (GitHub Pages, `file://`) games are saved in this browser (`localStorage`, key `chrysos-heirs-partidas`) with the count and best score per alias.

### Added

- CRUD over `chrysosHeirs`: create, read (with search), update and delete, saved in `localStorage`.
- `gestion.html` + `gestion.js`: management panel with one section per operation. **C** create form generated from `HEIR_FIELDS` (one field per heir property, with its expected data type) and an "Accept and add" button; **R** table with search; **U** update form (choose an heir, edit, save); **D** delete panel with summary and Undo. The Edit/Delete buttons of each table row select the heir in the U/D panel.
- Connection with the original site: the CRUD list is read by `Chrysos Heirs/scripts/script.js`, so what you add appears there.
- Gold "View Chrysos Heirs" button in both pages.
- Storage panel: status, size and last saved date, Export JSON, Import JSON (validated) and Clear saved data.
- Undo for the last deleted heir (8 seconds).
- Dark/light mode button that remembers the choice.
- `store.js`: shared data layer (moved out of `app.js`).
- README, `.gitignore` and this changelog.

### Changed

- `index.html` rewritten: it was a copy of the Chrysos Heirs page pointing to files that did not exist here.
- `styles.css` was empty; now copies the visual system of the original site.
- Images are read from `../Chrysos Heirs/media/` instead of duplicating the folder.
- Deleting in the management panel no longer asks for confirmation (Undo replaces it).

### Also changed in `Chrysos Heirs/scripts/script.js`

- Reads the CRUD list from `localStorage` (`getHeirsToRender`), falling back to the built-in array.
- `formatMeta`: an heir without version no longer crashes the collection (`null.toFixed`).
