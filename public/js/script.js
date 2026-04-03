fetch('/api/books')
  .then(res => res.json())
  .then(result => {
    console.log(result);

    const books = result.data; // important
    const section = document.getElementById('card-section');

    section.innerHTML = ""; // clear before adding

    books.forEach(book => {
      const card = `
        <div class="card medium">
          <div class="card-image">
            <img src="${book.coverImage}" class="stadium-img">
          </div>
          <div class="card-content">
            <span class="card-title">${book.title}</span>
            <p>${book.summary}</p>
          </div>
        </div>
      `;
      section.innerHTML += card;
    });
  })
  .catch(err => console.log(err));