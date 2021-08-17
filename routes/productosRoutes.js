const express = require('express');
const app = express();
const passport = require('passport');
const router = express.Router();

const productsController = require('../controllers/productsController');
const auth = require('../middleware/auth');


// routes

router.get('/:id?', productsController.getProducts);

router.get('/cat/:categoria', productsController.getByCategory);

router.post('/', productsController.addProduct);

router.patch('/:id', productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;

