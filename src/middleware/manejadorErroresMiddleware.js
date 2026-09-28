const manejadorErroresMiddleware = (error, req, res, next) => {
    const codigoError = error.statusCode || 500;
    const mensajeError = error.message || "Error inesperado.";

    console.error(`[Error] ${new Date().toISOString()} - ${req.method} ${req.url} - ${req.ip}`);

    if (error.stack) {
        console.error(error.stack);
    }

    res.status(codigoError).json({
        ok: false,
        codigoError,
        mensajeError,
        ...(process.env.NODE_ENV === "development" && { stack: error.stack })
    });
};

//export default manejadorErroresMiddleware;
module.exports = manejadorErroresMiddleware