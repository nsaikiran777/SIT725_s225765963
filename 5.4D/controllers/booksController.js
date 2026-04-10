const Book = require("../models/booksModel");

const allowedFields = ["id", "title", "author", "year", "genre", "summary", "price"];
const allowedUpdateFields = ["title", "author", "year", "genre", "summary", "price"];

function hasUnknownFields(body, allowed) {
  const keys = Object.keys(body);
  return keys.filter((key) => !allowed.includes(key));
}

function formatValidationError(error) {
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((e) => e.message);
    return messages.join(", ");
  }
  return error.message || "Invalid request";
}

function normalizeBook(book) {
  return {
    _id: book._id,
    id: book.id,
    title: book.title,
    author: book.author,
    genre: book.genre,
    year: book.year,
    summary: book.summary,
    price: parseFloat(book.price.toString()),
    developedBy: "s225765963"
  };
}

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    const formatted = books.map(normalizeBook);
    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ id: req.params.id });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(normalizeBook(book));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch book" });
  }
};

exports.createBook = async (req, res) => {
  try {
    const unknownFields = hasUnknownFields(req.body, allowedFields);

    if (unknownFields.length > 0) {
      return res.status(400).json({
        error: `Unexpected fields are not allowed: ${unknownFields.join(", ")}`
      });
    }

    const book = new Book(req.body);
    const savedBook = await book.save();

    res.status(201).json(normalizeBook(savedBook));
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "Duplicate id is not allowed" });
    }

    res.status(400).json({ error: formatValidationError(error) });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const targetId = req.params.id;

    if ("id" in req.body) {
      return res.status(400).json({ error: "id is immutable and cannot be changed" });
    }

    const unknownFields = hasUnknownFields(req.body, allowedUpdateFields);

    if (unknownFields.length > 0) {
      return res.status(400).json({
        error: `Unexpected fields are not allowed: ${unknownFields.join(", ")}`
      });
    }

    const existingBook = await Book.findOne({ id: targetId });

    if (!existingBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    const updatedBook = await Book.findOneAndUpdate(
      { id: targetId },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json(normalizeBook(updatedBook));
  } catch (error) {
    res.status(400).json({ error: formatValidationError(error) });
  }
};