const addCards = (items) => {
  items.forEach(item => {
    let itemToAppend = `
      <div class="col s12 m6 l4">
        <div class="card medium">
          <div class="card-image">
            <img src="${item.image}" alt="${item.name}" class="book-img">
          </div>
          <div class="card-content">
            <span class="card-title">${item.name}</span>
            <p><strong>Author:</strong> ${item.author}</p>
            <p>${item.summary}</p>
          </div>
        </div>
      </div>
    `;
    $("#card-section").append(itemToAppend);
  });
};

const getBooks = () => {
  $.get("/api/books", (response) => {
    if (response.statusCode == 200) {
      addCards(response.data);
    }
  });
};

$(document).ready(function () {
  getBooks();
});