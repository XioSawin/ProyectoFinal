const express = require('express');
const router = express.Router();

const mensajesController = require('../controllers/mensajesController');

router.get('/', mensajesController.getChat);

router.get('/:email', mensajesController.getMsgByEmail);

//router.post('/', productsController.addProduct);

//router.patch('/:id', auth, productsController.updateProduct);

//router.delete('/:id', auth, productsController.deleteProduct);

module.exports = {
    router
}
