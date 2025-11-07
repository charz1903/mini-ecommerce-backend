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
  getMyProducts
} = require('../controllers/productController');

// RUTAS ESPECÍFICAS PRIMERO
router.get('/my-products', protect, getMyProducts);  // ← PRIMERO

// RUTAS CON :id DESPUÉS
router.route('/:id')
  .get(getProduct)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

// RUTAS GENERALES AL FINAL
router.route('/')
  .post(protect, createProduct)
  .get(getProducts);

module.exports = router;