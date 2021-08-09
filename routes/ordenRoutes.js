const { Router } = require('express');
const ordenController = require('../controllers/ordenController');

const router = Router();

router.get('/order/:userID', ordenController.getOrdenesByID);
router.get('/order/:numOrden', ordenController.getOrden);
router.post('/order/:userID', ordenController.checkout);
router.post('/order/complete', ordenController.complete);

module.exports = router;