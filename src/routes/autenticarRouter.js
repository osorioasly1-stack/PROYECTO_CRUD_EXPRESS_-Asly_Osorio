const { Router }  = require("express");

const enrutadorAuth = Router();
// importaciones del controlador 
const {inciarSesion, registrarse}= require("../controllers/autenticarController")
//const registrarse = require("node:module")

// Ruta de registro en el sistema 
enrutadorAuth.post("/registro", registrarse)

// Ruta de incio de sesion
enrutadorAuth.post("/login", inciarSesion)

// se realizan todas las rutas, con (post, put, delete)
module.exports = enrutadorAuth;
