const mongoose = require('mongoose');

const currentYear = new Date().getFullYear();

const BookSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'id is required'],
      unique: true,
      trim: true,
      minlength: [1, 'id is required'],
      maxlength: [30, 'id must be at most 30 characters']
    },
    title: {
      type: String,
      required: [true, 'title is required'],
      trim: true,
      minlength: [3, 'title must be at least 3 characters'],
      maxlength: [100, 'title must be at most 100 characters']
    },
    author: {
      type: String,
      required: [true, 'author is required'],
      trim: true,
      minlength: [3, 'author must be at least 3 characters'],
      maxlength: [60, 'author must be at most 60 characters']
    },
    year: {
      type: Number,
      required: [true, 'year is required'],
      min: [1450, 'year must be 1450 or later'],
      max: [currentYear, `year cannot be greater than ${currentYear}`],
      validate: {
        validator: Number.isInteger,
        message: 'year must be an integer'
      }
    },
    genre: {
      type: String,
      required: [true, 'genre is required'],
      trim: true,
      minlength: [3, 'genre must be at least 3 characters'],
      maxlength: [40, 'genre must be at most 40 characters']
    },
    summary: {
      type: String,
      required: [true, 'summary is required'],
      trim: true,
      minlength: [10, 'summary must be at least 10 characters'],
      maxlength: [500, 'summary must be at most 500 characters']
    },
    price: {
      type: mongoose.Schema.Types.Decimal128,
      required: [true, 'price is required'],
      validate: {
        validator: function (value) {
          const num = parseFloat(value.toString());
          return !isNaN(num) && num >= 0 && num <= 1000;
        },
        message: 'price must be a number between 0 and 1000'
      },
      get: v => (v ? v.toString() : v)
    }
  },
  {
    toJSON: { getters: true },
    versionKey: false
  }
);

module.exports = mongoose.model('Book', BookSchema);