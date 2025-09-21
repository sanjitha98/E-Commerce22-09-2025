const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

router.post('/', protect, orderCtrl.createOrder);
router.get('/', protect, orderCtrl.getOrders);

module.exports = router;
