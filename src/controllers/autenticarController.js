
const inciarSesion = async (req, res) => {

    // simular bd de un usuario resgistrado
    const userBd = {"usuario": "Asly", "clave": "1234"}

    try {
        const {usuario,clave} =req.body
        // comparar con UserBD
        if(userBd.usuario !== usuario || userBd.clave !== clave){
            res.json({mensaje: "Credenciales incorrectas"})
        }
        res.json ({mensaje: "usuario bienvenido"})
    } catch(error) {
        res.json({Error: error})
    }
}


const registrarse = async (req, res)=>{
    try{
        const datos = req.body
        res.json({datosRegistro: datos})
    } catch (error){
            res.json({error: error})
    }
}
module.exports ={inciarSesion, registrarse}