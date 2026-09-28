const registroMiddleware = (req, res, next) => {
    console.log(`[MisTorial]: ${new Date().toISOString()}, ${req.method}, ${req.url}`);
    next();
};

//export default registroMiddleware
module.exports = registroMiddleware