const Book = require("../models/booksModel");

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});

        const formatted = books.map(b => ({
            _id: b._id,
            title: b.title,
            author: b.author,
            genre: b.genre,
            year: b.year,
            summary: b.summary,
            price: parseFloat(b.price.toString())   // FIX
        }));

        res.json(formatted);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch books" });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: "Book not found" });

        const formatted = {
            _id: book._id,
            title: book.title,
            author: book.author,
            genre: book.genre,
            year: book.year,
            summary: book.summary,
            price: parseFloat(book.price.toString())   // FIX
        };

        res.json(formatted);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch book" });
    }
};