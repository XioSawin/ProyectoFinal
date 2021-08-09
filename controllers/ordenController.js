const ordenModel = require('../models/ordenes');
const carritoModel = require('../models/carritos');
const userModel = require('../models/users');
const enviarEthereal = require('../email/ethereal');

const getTimestamp = () => {
    let date = new Date();

    let d = date.getDate();
    let mo = date.getMonth() + 1;
    let y = date.getFullYear();
    let h = date.getHours();
    let mi = date.getMinutes();
    let s = date.getSeconds();

    let today = d + '/' + mo + '/' + y + ' ' + h + ':' + mi + ':' + s;

    return today;
};

const getOrden = (req, res, next) => {
    const { numOrden } = req.params;

    if(numOrden) {
        ordenModel.find({numOrden})
        .then(orders => res.json(orders));
    } else {
        res.status(500).send("No se encontró el número de orden.")
    }
};

const getOrdenesByID = (req, res, next) => {
    const { userID } = req.params;

    if(userID) {
        ordenModel.find({userID})
        .then(orders => res.json(orders));
    } else {
        res.status(500).send("No se encontraron ordenes con el userID ingresado..")
    }
};

const checkout = (req, res, next) => {
    const {userID} = req.params;

    let cart = carritoModel.findOne({userID});
    let user = userModel.findOne({_id: userID});

    const email = user.username;

    const numOrden = ordenModel.count() + 1;

    if(cart){
        const order = new ordenModel({
            userEmail: email,
            numOrden,
            productos: cart.productos,
            estado: 'generado',
            userID,
            timestamp: getTimestamp(),
            total: cart.total
        })

        const data = carritoModel.findByIdAndDelete({_id: cart.id});
        enviarEthereal(process.env.EMAIL_ADMIN, `Nueva order - user ID: ${userID}`, JSON.stringify(order));
        enviarEthereal(email, `¡Gracias por tu orden ${user.name}! - Te enviamos el detalle`, JSON.stringify(order));

        return res.status(201).send(order);
    }

};

const complete = (req, res, next) => {
    const { numOrden } = req.body;

    if(numOrden) {
        ordenModel.updateOne({numOrden}, {
            $set: {estado: 'completado'}
        });
        
    } else {
        res.status(500).send("No se encontró el número de orden.")
    }
};

module.exports = {
    getOrden,
    getOrdenesByID,
    checkout,
    complete
};