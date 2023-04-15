
const form = document.querySelector('form');
const input = document.querySelector('input');
const results = document.querySelector('#results');
const searchDiv = document.getElementById('search-div');

form.addEventListener('submit', event => {
  event.preventDefault();
  const searchTerm = input.value;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      results.innerHTML = '';
      data.items.forEach(item => {
        const book = document.createElement('div');
        book.classList.add('book');

        const previewLink = item.volumeInfo.previewLink;

        const img = document.createElement('img');
        img.src = item.volumeInfo.imageLinks.thumbnail;

        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-info');

        const title = document.createElement('div');
        title.classList.add('book-title');
        title.textContent = item.volumeInfo.title;

        const author = document.createElement('div');
        author.classList.add('book-author');
        author.textContent = item.volumeInfo.authors.join(', ');

        const link = document.createElement('a');
        link.href = previewLink;
        link.target = '_blank';
        link.appendChild(img);

        bookInfo.appendChild(title);
        bookInfo.appendChild(author);

        book.appendChild(link);
        book.appendChild(bookInfo);

        results.appendChild(book);
      });
    });

  searchDiv.style.display = "none";
  results.style.display = "block";
  
});


