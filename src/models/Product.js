const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String },
  image: { 
    type: String, 
    default: 'https://picsum.photos/300/300?random=' 
  },
  stock: { type: Number, default: 10, min: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// Índice para búsquedas rápidas
productSchema.index({ createdBy: 1 });

module.exports = mongoose.model('Product', productSchema);