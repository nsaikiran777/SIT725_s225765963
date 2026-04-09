const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/bookDB");

const BookSchema = new mongoose.Schema({
  name: String,
  image: String,
  author: String,
  summary: String
});

const Book = mongoose.model("Book", BookSchema);

const books = [
  {
    name: "The Alchemist",
    image: "images/alchemist.jpg",
    author: "Paulo Coelho",
    summary: "A novel about following dreams and discovering purpose."
  },
  {
    name: "Atomic Habits",
    image: "images/atomic.jpg",
    author: "James Clear",
    summary: "A practical book about building good habits and breaking bad ones."
  },
  {
    name: "Deep Work",
    image: "images/deepwork.jpg",
    author: "Cal Newport",
    summary: "A book that explains the value of focused work without distraction."
  },
  {
    name: "Ikigai",
    image: "images/ikigai.jpg",
    author: "Hector Garcia and Francesc Miralles",
    summary: "A book about finding meaning, balance, and long life."
  },
  {
    name: "Rich Dad Poor Dad",
    image: "images/richdad.jpg",
    author: "Robert T. Kiyosaki",
    summary: "A personal finance book about money mindset and financial education."
  }
];

async function seedData() {
  try {
    await Book.deleteMany({});
    await Book.insertMany(books);
    console.log("Book data inserted successfully");
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
}

seedData();