require('dotenv').config();
const express = require('express');


const app = express();
const MIPUERTO = 3000;
const jwtoken = require("jsonwebtoken")


// Importar middlewares
const registroMiddleware = require("./src/middleware/registroMiddleware.js");
const manejadorErroresMiddleware = require('./src/middleware/manejadorErroresMiddleware.js');
const autenticacionMiddleware = require ("./src/middleware/autenticacionMiddleware.js")

// Librerías fs, path
const sistemaArchivos = require("fs"); 
const ruta = require("path");
const rutaMiArchivo = ruta.join(__dirname, "datos.json");

const multer = require("multer");
const almacen = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, "misimagenes/"); },
    filename: (req, file, cb) => {
        const extension = ruta.extname(file.originalname);
        cb(null, `${Date.now()}${extension}`);
    }
});

const subir = multer({ storage: almacen });
const { validarAprendiz, validarIdParametro } = require("./src/validaciones/validaciones.js");

// Genera un id autoincremental
const generarId = (listaAprendices) => {
    const idsExistentes = listaAprendices
        .filter((aprendiz) => aprendiz && aprendiz.id)
        .map((aprendiz) => aprendiz.id);

    const idMaximo = idsExistentes.length ? Math.max(...idsExistentes) : 0;
    return idMaximo + 1;
};

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(registroMiddleware)

// --- RUTAS GET ---
app.get("/", (_, res) => {
    res.send('API REST Full con Express');
});

app.get("/api/aprendices", (_, res) => {
    sistemaArchivos.readFile(rutaMiArchivo, "utf-8", (error, datos) => {
        if (error) return res.status(500).json({ Error: "No se puede leer el archivo" });
        const listaAprendices = JSON.parse(datos);
        res.status(200).json({ Listado: listaAprendices });
    });
});

app.get("/api/error", (req, res, next) => {
    next(new Error("Este es un error provocado"));
});

//ruta protegida, para acceder con token, permisos de usuario
app.get("/api/rutaprotegida", autenticacionMiddleware,(req, res) => {
    res.json({ mensaje: "Ruta Protegida, acceso con token" });
});

//endpoint o ruta de inicio de sesion para generar un token
// Endpoint de inicio de sesión
app.post("/api/login", (req, res) => {
    // capturar datos del usuario
    const { usuario, clave } = req.body;
    // simular datos de usuario en la bd
    const bdUsuario = {
        "usuario":"asly",
        "clave":"1234" };
        // validar datos
    if (usuario != bdUsuario.usuario || clave !==bdUsuario.clave) 
    {
        res.json({ mensaje: "Usuario o clave incorrectos" });
    }
    // verificacion y generacion del token
    const token = jwtoken.sign(
        { "user": req.usuario},
        process.env.JWT_SECRETO,{ 
            expiresIn: "1h"})
    res.json({token})
    });

    

// --- RUTAS POST, PUT, DELETE ---
app.post("/api/aprendices", subir.single("imagen"), validarAprendiz, (req, res) => {
    const datosAprendiz = req.body;
    datosAprendiz.imagen = req.file ? `/misImagenes/${req.file.filename}` : "sin Imagenes";
    
    sistemaArchivos.readFile(rutaMiArchivo, "utf-8", (error, datos) => {
        if (error) return res.status(500).json({ Error: "No se puede leer el archivo" });
        const listaAprendices = JSON.parse(datos);
        datosAprendiz.id = generarId(listaAprendices);
        listaAprendices.push(datosAprendiz);
        
        sistemaArchivos.writeFile(rutaMiArchivo, JSON.stringify(listaAprendices, null, 2), (error) => { 
            if (error) return res.status(500).json({ Error: "No se pudo escribir en el archivo" });
            res.status(200).json({ Mensaje: "creado", datos: datosAprendiz });
        });
    });
});

app.put("/api/aprendices/:id_aprendices", validarIdParametro, validarAprendiz, (_, res) => {
    res.status(200).json({ mensaje: 'Actualizar aprendiz' });
});

app.delete("/api/aprendices/:id_aprendices", validarIdParametro, (_, res) => {
    res.status(200).json({ mensaje: 'Eliminada' });
});

// --- MIDDLEWARE DE ERRORES (SIEMPRE AL FINAL) ---
app.use(manejadorErroresMiddleware);

app.listen(MIPUERTO, () => {
    console.log(`Servidor en funcionamiento en el puerto: http://localhost:${MIPUERTO}`);
});