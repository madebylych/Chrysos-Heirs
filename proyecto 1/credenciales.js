/* ============================================================
   credenciales.js — credenciales del panel de administración
   ============================================================
   usuario y contrasena quedan dentro de este IIFE: no son variables
   globales, así que no se pueden leer escribiendo su nombre en la
   consola del navegador. Lo único que se expone hacia afuera es
   checkCredentials(), que solo devuelve true/false, nunca los valores.
   ============================================================ */
(function () {
  const usuario = "admin";
  const contrasena = "khaslanax";

  window.checkCredentials = function (inputUsuario, inputContrasena) {
    return inputUsuario === usuario && inputContrasena === contrasena;
  };
})();
