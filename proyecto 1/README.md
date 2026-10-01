# proyecto 1 — Chrysos Heirs Manager

A CRUD (create, read, update, delete) over the Chrysos Heirs data, in plain HTML, CSS and JavaScript. What you save here also shows up in the original Chrysos Heirs site.

## Run it

Open `index.html` (quick view) or `gestion.html` (management panel) in a browser. No build step. `proyecto 1` lives inside the `Chrysos Heirs` folder: the images, the background art and the shared data are read from the parent folder (`../media/`, `../index.html`).

The gold button **View Chrysos Heirs ↗** in the header opens the original site, and the original site has a **Gestionar herederos** button (top left) that opens this management panel.

## Structure

| File | What it does |
|---|---|
| `index.html` + `app.js` | Quick view: card list with the create/edit form in a pop-up `<dialog>` |
| `gestion.html` + `gestion.js` | Management panel: **C** create form (generated from the heir properties, with an "Accept and add" button), **R** table with search and counter, **U** update form (choose an heir, edit, save), **D** delete panel with Undo, **S** storage panel |
| `store.js` | Shared layer: load/save in `localStorage`, form reading and validation, export/import, theme |
| `data.js` | Initial data: array `chrysosHeirs` (14 items). Never modified by the app |
| `styles.css` | Styles for both pages, copied from the original site (variables, background, fonts, pills, dark mode) |

Script order in each HTML: `data.js`, `store.js`, then the page script.

## How it connects to the original site

`localStorage` is the bridge (a web page cannot write to files on disk):

1. The CRUD saves the whole list under the key `chrysos-heirs-crud`.
2. `../scripts/script.js` (`getHeirsToRender`) reads that key when the page loads. If it finds a valid list it renders it instead of its built-in array; otherwise it uses the built-in array as always.
3. So adding, editing or deleting in the CRUD changes the original site after you reload it. **Clear saved data** (panel S) makes the original site go back to its own 14 heirs.

Notes:

- Both pages must share the same browser storage. Chrome and Edge share it between local `file://` pages. Firefox may not; if the original site does not show your changes there, serve the parent folder with a local server (for example the VS Code "Live Server" extension) and open both from it.
- New heirs need their files (`media/<name>.jpg`, etc.) inside `../media/` (the `media` folder of Chrysos Heirs); without them the cards show the initial letter instead of the picture.
- `../codepen/JS.js` is a separate copy and does not have this connection.

## How the CRUD works

| Operation | Where |
|---|---|
| Create | Panel C, "Accept and add" button (`handleCreate`) |
| Read | Panel R (`renderTable`), with text search |
| Update | Panel U (`handleUpdate`): choose an heir, or press Edit in the table, and change it in a form with the same generated fields |
| Delete | Panel D (`deleteHeir`): choose an heir, or press Delete in the table, check the summary and press "Delete heir". An **Undo** link appears for 8 seconds (`undoDelete`) |

## Storage panel (S)

| Element | What it does |
|---|---|
| Status list | Whether the browser allows saving, key, saved heirs, heirs in memory, size in KB, last saved date |
| Export JSON | Downloads a backup file (`chrysos-heirs-YYYY-MM-DD.json`, without internal ids) |
| Import JSON… | Validates the whole file first (list of heirs, unique names, cleaned types) and asks before replacing anything |
| Clear saved data | Removes the saved list from the browser and shows `data.js` again (does not save it). The dark/light choice is kept |
| Dark/Light mode button | Top right; remembers your choice in `localStorage` (`chrysos-heirs-manager-theme`) |

If the browser blocks storage, everything still works but changes last only until you reload (a message says so).

## Validation

- `Name` is required and must be unique (case-insensitive).
- `Version` must be a positive number if provided (it can be left empty).

## Adding a property to the heirs

In `gestion.js`, `HEIR_FIELDS` lists one entry per heir property (name, expected data type, control). Both the Create form and the Update dialog are generated from it. A new property needs one entry there, plus a line in `fillHeirForm` and `readHeirForm` in `store.js` (and in `normalizeHeirs` if it should survive an import).
