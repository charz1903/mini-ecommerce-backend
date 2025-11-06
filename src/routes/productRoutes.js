const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

router.route('/')
  .post(protect, createProduct)
  .get(getProducts);

router.route('/:id')
  .get(getProduct)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;