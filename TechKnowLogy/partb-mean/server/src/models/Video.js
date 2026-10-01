const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  courseId: {
    type: Number
  },
  src: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Video', VideoSchema);
