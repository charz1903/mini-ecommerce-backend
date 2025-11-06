// src/server.js
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

// Mensaje: Backend funcionando!
app.get('/', (req, res) => {
  res.json({ message: '¡Backend MERN funcionando! 🚀' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});