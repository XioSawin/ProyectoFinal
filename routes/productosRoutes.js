// required
const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');
const auth = require('../middleware/auth');


// routes

router.get('/:id?', productsController.getProducts);

router.get('/:categoria?', productsController.getByCategory);

router.post('/', auth, productsController.addProduct);

router.patch('/:id', auth, productsController.updateProduct);

router.delete('/:id', auth, productsController.deleteProduct);

module.exports = {
    router
}

