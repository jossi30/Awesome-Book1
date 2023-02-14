const bookList = document.querySelector('.bookList');
const form = document.querySelector('.formInput');
const [title, author] = form.elements;

const bookInput = {}; // empty object
let books = []; // empty array


// Storing Books //
if (localStorage.bookSaved) {
  books = JSON.parse(localStorage.getItem('bookSaved'));
}

author.addEventListener('change', () => {
  bookInput.author = author.value;
});

title.addEventListener('change', () => {
  bookInput.title = title.value;
});

function Book(title, author) {
  this.title = title;
  this.author = author;
}

const populateFields = () => {
  localStorage.setItem('bookSaved', JSON.stringify(books));
};

// Add Book
const addBooks = (add) => {
  books.push(add);
  populateFields();
  displayBooks();
};

// Display Books //
const displayBooks = () => {
  bookList.innerHTML = '';
  books.map((book) => {
    const divBook = document.createElement('div');
    const titleBook = document.createElement('p');
    const authorBook = document.createElement('p');
    const delButton = document.createElement('button');
    const hrTag = document.createElement('hr');

    delButton.textContent = 'Remove';
    titleBook.textContent = book.title;
    authorBook.textContent = book.author;

    divBook.appendChild(titleBook);
    divBook.appendChild(authorBook);
    divBook.appendChild(delButton);
    divBook.appendChild(hrTag);

    bookList.appendChild(divBook);

    delButton.addEventListener('click', () => {
      removeBook(book);
      bookList.removeChild(divBook);
    });
    return bookList;
  });
};

// Submit Form //
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBooks(new Book(bookInput.title, bookInput.author));
  form.submit();
});

// Remove Book //
function removeBook(book) {
    const result = books.filter((b) => b !== book);
    books = result;
    populateFields();
  }
displayBooks();
populateFields();