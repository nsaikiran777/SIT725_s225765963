const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    image: "images/atomic.jpg",
    description: "Atomic Habits explains how small daily improvements can lead to remarkable long-term results."
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    image: "images/richdad.jpg",
    description: "This book teaches the importance of financial education, investing, and building wealth."
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    image: "images/alchemist.jpg",
    description: "A novel about following dreams, finding purpose, and listening to your heart."
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    image: "images/deepwork.jpg",
    description: "Deep Work focuses on the value of concentration and distraction-free productivity."
  },
  {
    title: "Ikigai",
    author: "Héctor García and Francesc Miralles",
    image: "images/ikigai.jpg",
    description: "Ikigai explores the Japanese idea of living with purpose, balance, and joy."
  }
];

app.get('/api/books', (req, res) => {
  res.json({ statusCode: 200, data: books, message: "Books fetched successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});