const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  coverImage: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true,
    maxlength: 300
  }
});

module.exports = mongoose.model('Book', BookSchema);