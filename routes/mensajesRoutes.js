const express = require('express');
const router = express.Router();
const app = express();

app.use(express.json())

const mensajesController = require('../controllers/mensajesController');

router.get('/', mensajesController.getChat);

router.get('/:email', mensajesController.getMsgByEmail);

module.exports = router;
