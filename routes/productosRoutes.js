// import clase producto
// const Producto = require('../producto');

const { Router } = require("express");
const router = Router();

// ruta

// app.use('/productos', router);

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
const productList = [];

// administrador
const administrador = true;

// Routes

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

    const producto = {
        id, 
        timestamp,
        nombre, 
        descripcion, 
        codigo,
        foto, 
        precio, 
        stock
    }

    productList.push(producto);
    res.sendStatus(201);
})

router.patch('/actualizar/:id', (req, res) => { // actualizar producto x id

    if (!administrador){
        res.json({error: 1, descripcion: "ruta no autorizada"});
    }

    const { id } = req.params;

    const producto = productList.find(producto => producto.id == id);

    if(!productList){ 
        res.sendStatus(404);
    }

    const {nombre, descripcion, codigo, foto, precio, stock} = req.body;

    producto.nombre = nombre;
    producto.descripcion = descripcion;
    producto.codigo = codigo;
    producto.foto = foto;
    producto.precio = precio;
    producto.stock = stock;
    
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
