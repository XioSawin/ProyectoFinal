// required
const { POINT_CONVERSION_COMPRESSED } = require('constants');
const Producto = require('../producto.js');
const { Router } = require("express");
const router = Router();

// timestamp

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


// Lista de productos
let productList =[];

// administrador
const administrador = true;

// routes

router.get('/listar/:id?', (req, res)=>{ // get info by id if given - listar productos
    const { id } = req.params;

    if(id){
        const producto = productList.find(producto => producto.id == id);

        if(!producto){ 
            res.json({error: 'producto no encontrado'});
        }

        res.json(producto);
    }
    
    res.json(productList);
})

router.post('/agregar', (req, res) => { // post new product

    if (!administrador){
        res.json({error: -1, descripcion: "ruta no autorizada"});
    }

    const {nombre, descripcion, codigo, foto, precio, stock} = req.body;

    let id = (productList.length)+1;
    let timestamp = getTimestamp();

    const producto = new Producto(id, nombre, descripcion, codigo, foto, precio, stock);
    producto.setTimestamp();
    console.log(producto);

    productList.push(producto);
    //console.log(productList);

    res.sendStatus(201);
})

router.patch('/actualizar/:id', (req, res) => { // actualizar producto x id

    if (!administrador){
        res.json({error: -1, descripcion: "ruta no autorizada"});
    }

    const { id } = req.params;

    const producto = productList.find(producto => producto.id == id);

    if(!productList){ 
        res.sendStatus(404);
    }

    const {nombre, descripcion, codigo, foto, precio, stock} = req.body;

    producto.update(nombre, descripcion, codigo, foto, precio, stock);
    
    res.sendStatus(204);
})

router.delete('/borrar/:id', (req, res) => { // borrar producto x id

    if (!administrador){
        res.json({error: -1, descripcion: "ruta no autorizada"});
    }

    const { id } = req.params;

    const producto = productList.find(producto => producto.id == id);

    if(!producto){ 
        res.sendStatus(404);
    }

    productList = productList.filter((producto) => producto.id != id)
})

module.exports = {
    router, 
    productList
}
