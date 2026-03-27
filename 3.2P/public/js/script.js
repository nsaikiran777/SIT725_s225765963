$(document).ready(function () {
  $('.modal').modal();

  fetchBooks();
});

function fetchBooks() {
  fetch('/api/books')
    .then(response => response.json())
    .then(result => {
      if (result.statusCode === 200) {
        addCards(result.data);
      }
    })
    .catch(error => {
      console.log('Error fetching books:', error);
    });
}

function addCards(items) {
  items.forEach((item, index) => {
    let card = `
      <div class="col s12 m6 l4">
        <div class="card hoverable">
          <div class="card-image">
            <img src="${item.image}" alt="${item.title}">
          </div>
          <div class="card-content">
            <span class="card-title">${item.title}</span>
            <p><strong>Author:</strong> ${item.author}</p>
          </div>
          <div class="card-action">
            <a href="#book-modal" class="modal-trigger book-details" data-index="${index}">View Details</a>
          </div>
        </div>
      </div>
    `;
    $('#card-section').append(card);
  });

  $('.book-details').click(function () {
    const index = $(this).data('index');
    showModal(items[index]);
  });
}

function showModal(book) {
  $('#modal-content').html(`
    <h4>${book.title}</h4>
    <p><strong>Author:</strong> ${book.author}</p>
    <p>${book.description}</p>
    <img src="${book.image}" alt="${book.title}">
  `);

  const modal = M.Modal.getInstance(document.getElementById('book-modal'));
  modal.open();
}