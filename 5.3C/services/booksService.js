const Book = require('../models/booksModel');

async function getAllBooks() {
  return await Book.find();
}

async function getBookById(id) {
  return await Book.findOne({ id });
}

module.exports = {
  getAllBooks,
  getBookById
};