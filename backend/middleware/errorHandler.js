// 404 handler — noma'lum route
function notFound(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Topilmadi: ${req.originalUrl}`,
  });
}

// Markaziy xato boshqaruvchi
function errorHandler(err, req, res, next) {
  // Mongoose validatsiya xatolari
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: messages.join(', ') });
  }

  // Mongoose cast xatosi (yaroqsiz ObjectId va h.k.)
  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: `Noto‘g‘ri qiymat: ${err.path}` });
  }

  console.error('💥 Server xatosi:', err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Ichki server xatosi',
  });
}

module.exports = { notFound, errorHandler };
