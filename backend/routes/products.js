const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');

// public
router.get('/', productCtrl.getProducts);
router.get('/:id', productCtrl.getProductById);

// admin-only
router.post('/', protect, admin, productCtrl.createProduct);
router.put('/:id', protect, admin, productCtrl.updateProduct);
router.delete('/:id', protect, admin, productCtrl.deleteProduct);

module.exports = router;
