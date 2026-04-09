const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mongodb connection
mongoose.connect("mongodb://127.0.0.1:27017/bookDB");

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// schema and model
const BookSchema = new mongoose.Schema({
  name: String,
  image: String,
  author: String,
  summary: String
});

const Book = mongoose.model("Book", BookSchema);

// api
app.get("/api/books", async (req, res) => {
  const books = await Book.find({});
  res.json({
    statusCode: 200,
    data: books,
    message: "Success"
  });
});

// start server
app.listen(port, () => {
  console.log("App listening on port " + port);
});