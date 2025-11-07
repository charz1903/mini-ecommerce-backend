const protect = async (req, res, next) => {
  let token;

  if (!req.headers.authorization?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token faltante' });
  }

  try {
    token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    req.user = user;  // ← ESTO ES CLAVE
    next();
  } catch (error) {
    console.error('Error en protect:', error.message);
    res.status(401).json({ message: 'Token inválido' });
  }
};