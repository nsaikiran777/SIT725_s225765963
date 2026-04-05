const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// sample data
const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    image: "images/book1.jpg",
    description: "A practical book about building good habits and breaking bad ones."
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    image: "images/book2.jpg",
    description: "A novel about following dreams and discovering one’s purpose."
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    image: "images/book3.jpg",
    description: "A personal finance book that explains money mindset and wealth building."
  }
];

// serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// REST endpoint
app.get('/api/books', (req, res) => {
  res.json(books);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
