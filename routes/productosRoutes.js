// import clase producto
const Producto = require('../producto');

const { Router } = require("express");
const router = Router();

// ruta

// app.use('/productos', router);

// Lista de productos
const productList = [];

// administrador
const administrador = true;

// Routes

router.get('/listar/:id?', (req, res)=>{ // get info by id if given - listar productos
    if(id){
        const { id } = req.params;

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

    const producto = new Producto(id, nombre, descripcion, codigo, foto, precio, stock);
    producto.setTimestamp();

    productList.push(producto);
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

module.exports = router;
module.exports = productList;