const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Book = require('./models/Book');

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bookLibraryDB');

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

// GET all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find({});
    res.json({
      statusCode: 200,
      data: books,
      message: 'Books fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'Error fetching books',
      error: error.message
    });
  }
});

// POST new book
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, genre, rating, coverImage, summary } = req.body;

    const newBook = new Book({
      title,
      author,
      genre,
      rating,
      coverImage,
      summary
    });

    await newBook.save();

    res.status(201).json({
      statusCode: 201,
      data: newBook,
      message: 'Book added successfully'
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      message: 'Error adding book',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});