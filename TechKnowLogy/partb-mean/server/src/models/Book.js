const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  pages: { type: Number, required: true },
  available: { type: Boolean, default: true },
  courseId: { type: Number }
});

module.exports = mongoose.model('Book', BookSchema);
