const { Router } = require("express");
const enrutadorGeneral = Router();

enrutadorGeneral.get("/rutaPersonal", (req, res) => {
    res.json({mensaje: "Ruta de Prueba, personal"});
});

module.exports = enrutadorGeneral;
