/* ============================================================
   login.js — verificación de credenciales del panel de gestión
   ============================================================
   La comparación real vive dentro del IIFE de credenciales.js, así
   que usuario/contrasena no quedan expuestos; acá solo se envuelve
   checkCredentials() con el nombre que usa gestion.js. Tiene que
   cargarse DESPUÉS de credenciales.js y ANTES de gestion.js.
   ============================================================ */

function verifyLogin(inputUsuario, inputContrasena) {
  return checkCredentials(inputUsuario, inputContrasena);
}
