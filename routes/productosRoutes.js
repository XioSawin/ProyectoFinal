// required
//const mongoose = require('mongoose');
const express = require('express');
// const app = express();

const router = express.Router();

const productsController = require('../controllers/productsController');
const auth = require('../middleware/auth');


// administrador
//bconst administrador = true;

// routes

router.get('/:id?', productsController.getProducts);

router.get('/:categoria', productsController.getByCategory);

router.post('/', auth, productsController.addProduct);

router.patch('/:id', auth, productsController.updateProduct);

router.delete('/:id', auth, productsController.deleteProduct);

module.exports = {
    router
}

