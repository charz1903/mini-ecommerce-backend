// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getMyProducts  // ← ¡IMPORTADO!
} = require('../controllers/productController');

// RUTAS PÚBLICAS Y PROTEGIDAS
router.route('/')
  .post(protect, createProduct)
  .get(getProducts);

router.route('/:id')
  .get(getProduct)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

// NUEVA RUTA: Mis productos (protegida)
router.get('/my-products', protect, getMyProducts);

module.exports = router;  // ← ¡SOLO UN module.exports!