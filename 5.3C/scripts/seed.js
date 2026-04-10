const mongoose = require('mongoose');
const Book = require('../models/booksModel');

mongoose.connect('mongodb://localhost:27017/booksdb');

const books = [
  {
    id: "1",
    title: "The Three-Body Problem",
    author: "Cixin Liu",
    year: 2008,
    genre: "Sci-Fi",
    summary: "Alien contact story",
    price: 29.99
  },
  {
    id: "2",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    year: 1847,
    genre: "Classic",
    summary: "Romantic novel",
    price: 22.00
  },
  {
    id: "3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Romance",
    summary: "Love and society",
    price: 22.00
  },
  {
    id: "4",
    title: "The English Patient",
    author: "Michael Ondaatje",
    year: 1992,
    genre: "Drama",
    summary: "War story",
    price: 25.39
  },
  {
    id: "5",
    title: "Small Gods",
    author: "Terry Pratchett",
    year: 1992,
    genre: "Fantasy",
    summary: "Philosophical satire",
    price: 31.99
  }
];

(async () => {
  await Book.deleteMany({});
  await Book.insertMany(books);
  console.log("Seeded successfully");
  process.exit();
})();