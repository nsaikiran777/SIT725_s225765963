const booksService = require("../services/books.Service");

const getAllBooks = (req, res) => {
  const books = booksService.getAllBooks();

  res.status(200).json({
    statusCode: 200,
    data: books,
    message: "Books retrieved successfully"
  });
};

const getBookById = (req, res) => {
  const { id } = req.params;
  const book = booksService.getBookById(id);

  if (!book) {
    return res.status(404).json({
      statusCode: 404,
      message: "Book not found"
    });
  }

  res.status(200).json({
    statusCode: 200,
    data: book,
    message: "Book retrieved successfully"
  });
};

module.exports = {
  getAllBooks,
  getBookById
};