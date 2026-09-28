// validaciones/validaciones.js

// Valida que el id exista y sea un identificador válido (numérico)
const validarId = (id) => {
    if (id === undefined || id === null || id === "") {
        return { valido: false, mensaje: "El id es obligatorio" };
    }

    if (isNaN(id)) {
        return { valido: false, mensaje: "El id debe ser un valor numérico" };
    }

    if (Number(id) <= 0) {
        return { valido: false, mensaje: "El id debe ser un número positivo" };
    }

    return { valido: true, mensaje: "Id válido" };
};

// Valida que el correo exista y tenga un formato correcto
const validarCorreo = (correo) => {
    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correo || correo.trim() === "") {
        return { valido: false, mensaje: "El correo es obligatorio" };
    }

    if (!expresionCorreo.test(correo)) {
        return { valido: false, mensaje: "El correo no tiene un formato válido" };
    }

    return { valido: true, mensaje: "Correo válido" };
};

// Valida que el nombre exista y tenga más de 3 letras
const validarNombre = (nombre) => {
    if (!nombre || nombre.trim() === "") {
        return { valido: false, mensaje: "El nombre es obligatorio" };
    }

    if (nombre.trim().length <= 3) {
        return { valido: false, mensaje: "El nombre debe tener más de 3 letras" };
    }

    return { valido: true, mensaje: "Nombre válido" };
};

// Middleware para validar correo y nombre al crear/actualizar un aprendiz
const validarAprendiz = (req, res, next) => {
    const { nombre, correo } = req.body;

    const resultadoNombre = validarNombre(nombre);
    if (!resultadoNombre.valido) {
        return res.status(400).json({ Error: resultadoNombre.mensaje });
    }

    const resultadoCorreo = validarCorreo(correo);
    if (!resultadoCorreo.valido) {
        return res.status(400).json({ Error: resultadoCorreo.mensaje });
    }

    next();
};

// Middleware para validar el id que llega por parámetro de ruta
const validarIdParametro = (req, res, next) => {
    const { id_aprendices } = req.params;

    const resultadoId = validarId(id_aprendices);
    if (!resultadoId.valido) {
        return res.status(400).json({ Error: resultadoId.mensaje });
    }

    next();
};

module.exports = {
    validarId,
    validarCorreo,
    validarNombre,
    validarAprendiz,
    validarIdParametro
};
