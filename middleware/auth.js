const jwt = require('jsonwebtoken');

require('dotenv').config();

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).json({msg: 'No se encontró el token - autorización denegada'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(decoded.admin){
            req.user = decoded;
            next();
        } else {
            return res.status(401).send('Acceso denegado: ruta no autorizada.')
        }
    } catch(err) {
        res.status(400).json({msg: 'Token no es valido'});
    }
    
};

module.exports = {
    auth
};