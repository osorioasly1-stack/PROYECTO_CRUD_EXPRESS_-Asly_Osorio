const app = require("./app");
const MIPUERTO = process.env.MIPUERTO || 3000;

app.listen(MIPUERTO, () => {
    console.log(`Servidor funcionando http://localhost:${MIPUERTO}`);
});