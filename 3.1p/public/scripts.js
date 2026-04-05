fetch('/api/books')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('book-container');

    data.forEach(book => {
      const col = document.createElement('div');
      col.className = 'col s12 m6 l4';

      col.innerHTML = `
        <div class="card medium hoverable">
          <div class="card-image">
            <img src="${book.image}" alt="${book.title}">
            <span class="card-title">${book.title}</span>
          </div>
          <div class="card-content">
            <p><strong>Author:</strong> ${book.author}</p>
            <p>${book.description}</p>
          </div>
        </div>
      `;

      container.appendChild(col);
    });
  })
  .catch(error => {
    console.error('Error fetching books:', error);
  });