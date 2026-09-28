require('dotenv').config();
const express = require("express")
// debemos importar los enrutadores de la carpeta router
const enrutadorGeneral =require ("./routes")
const app = express();


// impotar los middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importamos el enrutador general
app.use("/api", enrutadorGeneral);

// endpoint de la ruta raiz de bienvenida a la API
app.get("/", (req, res) => {
    res.send("API REST 3407182 en funcionamiento");
});
module.exports = app;
