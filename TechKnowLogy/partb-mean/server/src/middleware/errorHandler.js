module.exports = (err, req, res, next) => {// Middleware για την κεντρική διαχείριση σφαλμάτων (error handling)
  console.error(err.stack);

  res.status(err.status || 500).json({
    message: err.message || 'Server error'
  });
};
