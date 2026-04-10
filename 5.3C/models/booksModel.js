const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  author: String,
  year: Number,
  genre: String,
  summary: String,
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    get: v => v.toString()
  }
}, {
  toJSON: { getters: true }
});

module.exports = mongoose.model('Book', BookSchema);