
const mongoose = require('mongoose');
//ορισμός σχήματος Course μαθημάτων
const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String
  },
  available: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Course', CourseSchema);
