const mongoose = require('mongoose');
const Book = require('./models/Book');

mongoose.connect('mongodb://127.0.0.1:27017/bookLibraryDB');

const sampleBooks = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-help",
    rating: 5,
    coverImage: "images/atomic.jpg",
    summary: "A practical book about building good habits and breaking bad ones through small daily improvements."
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Productivity",
    rating: 4,
    coverImage: "images/deepwork.jpg",
    summary: "This book explains how focused work helps people produce better results in a distracted world."
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    rating: 5,
    coverImage: "images/alchemist.jpg",
    summary: "A story about dreams, purpose, and following one’s personal legend."
  },
  {
    title: "Ikigai",
    author: "Héctor García and Francesc Miralles",
    genre: "Lifestyle",
    rating: 4,
    coverImage: "images/ikigai.jpg",
    summary: "A book that talks about purpose, balance, and living a meaningful life."
  }
];

async function seedData() {
  try {
    await Book.deleteMany({});
    await Book.insertMany(sampleBooks);
    console.log('Sample books inserted successfully');
    mongoose.connection.close();
  } catch (error) {
    console.log('Error seeding data:', error);
  }
}

seedData();