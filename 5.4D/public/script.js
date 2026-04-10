async function getBooks() {
  const message = document.getElementById("message");
  const booksContainer = document.getElementById("booksContainer");

  message.textContent = "";
  message.className = "";
  booksContainer.innerHTML = "";

  try {
    const response = await fetch("/api/books");
    const books = await response.json();

    if (!response.ok) {
      message.textContent = "Failed to fetch books";
      message.className = "error";
      return;
    }

    if (!Array.isArray(books) || books.length === 0) {
      message.textContent = "No books found";
      message.className = "error";
      return;
    }

    message.textContent = "Books loaded successfully";
    message.className = "success";

    books.forEach((book) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>ID:</strong> ${book.id}</p>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Year:</strong> ${book.year}</p>
        <p><strong>Genre:</strong> ${book.genre}</p>
        <p><strong>Summary:</strong> ${book.summary}</p>
        <p><strong>Price:</strong> AUD ${book.price}</p>
      `;

      booksContainer.appendChild(card);
    });
  } catch (error) {
    message.textContent = "Server error while fetching books";
    message.className = "error";
    console.error(error);
  }
}

document.getElementById("bookForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    id: document.getElementById("id").value.trim(),
    title: document.getElementById("title").value.trim(),
    author: document.getElementById("author").value.trim(),
    year: Number(document.getElementById("year").value),
    genre: document.getElementById("genre").value.trim(),
    summary: document.getElementById("summary").value.trim(),
    price: document.getElementById("price").value
  };

  const message = document.getElementById("message");

  try {
    const response = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      message.textContent = "Book added successfully";
      message.className = "success";
      document.getElementById("bookForm").reset();
      getBooks();
    } else {
      message.textContent = data.error || "Failed to add book";
      message.className = "error";
    }
  } catch (error) {
    message.textContent = "Server error while adding book";
    message.className = "error";
    console.error(error);
  }
});