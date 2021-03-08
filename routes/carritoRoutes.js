// import clase producto
//import Carrito from '../carrito.js';
const productList = require('./productosRoutes');

const { Router } = require("express");
const router = Router();

// ruta

// app.use('/carrito', router);

// Productos en carrito

const cart = [];

function getTimestamp(){
    let date = new Date();

    let d = date.getDate();
    let mo = date.getMonth() + 1;
    let y = date.getFullYear();
    let h = date.getHours();
    let mi = date.getMinutes();
    let s = date.getSeconds();

    let today = d + '/' + mo + '/' + y + ' ' + h + ':' + mi + ':' + s;

    return today;
}

// Routes

router.get('/listar/:id?', (req, res)=>{ // get info by id if given - listar productos
    if(id){
        const { id } = req.params;

        const carrito = cart.find(carrito => carrito.id == id);

        if(!carrito){ 
            res.json({error: 'producto no encontrado'});
        }

        res.json(carrito);
    }
    
    res.json(cart);
})

router.post('/agregar/:id_producto', (req, res) => { // add product to cart

    const { id } = req.body;

    const producto = productList.find(producto => producto.id == id);

    let idCart = (cart.length)+1;

    let timestamp = getTimestamp();

    const item = {
        id: idCart,
        timestamp,
        producto
    }

    cart.push(item);
    res.sendStatus(201);
})

router.delete('/borrar/:id', (req, res) => { // borrar producto x id

    const { id } = req.params;

    const item = cart.find(item => item.id == id);

    if(!item){ 
        res.sendStatus(404);
    }

    cart = cart.filter((item) => item.id != id)
})

module.exports = router;
