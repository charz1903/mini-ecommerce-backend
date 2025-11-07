const Product = require('../models/Product');

// @desc    Crear producto
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
  const { name, price, description, stock } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: 'Nombre y precio requeridos' });
  }

  const product = await Product.create({
    name,
    price,
    description,
    stock: stock || 10,
    createdBy: req.user.id,
    image: `https://picsum.photos/300/300?random=${Date.now()}`
  });

  res.status(201).json(product);
};

// @desc    Listar productos
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  const products = await Product.find().populate('createdBy', 'name email');
  res.json(products);
};

// @desc    Ver un producto
// @route   GET /api/products/:id
// @access  Public
const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('createdBy', 'name');
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(product);
};

// @desc    Actualizar producto
// @route   PUT /api/products/:id
// @access  Private (dueño)
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

  if (product.createdBy.toString() !== req.user.id) {
    return res.status(403).json({ message: 'No autorizado' });
  }

  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// @desc    Eliminar producto
// @route   DELETE /api/products/:id
// @access  Private (dueño)
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

  if (product.createdBy.toString() !== req.user.id) {
    return res.status(403).json({ message: 'No autorizado' });
  }

  await Product.deleteOne({ _id: req.params.id });
  res.json({ message: 'Producto eliminado' });
};

// En productController.js
const getMyProducts = async (req, res) => {
  try {
    // LOG PARA DEBUG
    console.log('getMyProducts llamado');
    console.log('req.user:', req.user);

    // VERIFICACIÓN CLAVE
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'No autorizado: usuario no válido' });
    }

    const products = await Product.find({ createdBy: req.user._id })
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });

    console.log(`Productos encontrados: ${products.length}`);
    res.json(products);
  } catch (error) {
    console.error('Error en getMyProducts:', error.message);
    res.status(500).json({ 
      message: 'Error interno',
      error: error.message 
    });
  }
};
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getMyProducts
};