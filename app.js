const bookContainer = document.querySelector('.bookContainer');

const myLibrary = [
  {
    author: 'David Goggins',
    id: '5257d7d7-6d0e-4327-859e-8c5f402fb290',
    pages: 250,
    read: true,
    title: "Can't hurt us",
  },
  {
    author: 'David Goggins',
    id: '5257d7d7-6d0e-4327-859e-8c5f402fb292',
    pages: 250,
    read: true,
    title: "Can't hurt us",
  },
  {
    author: 'David Goggins',
    id: '5257d7d7-6d0e-4327-859e-8c5f402fb293',
    pages: 250,
    read: true,
    title: "Can't hurt us",
  },
  {
    author: 'David Goggins',
    id: '5257d7d7-6d0e-4327-859e-8c5f402fb298',
    pages: 250,
    read: false,
    title: "Can't hurt us",
  },
];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${
      read ? 'read' : 'not read yet'
    }`;
  };
}

const cantHurtUs = new Book("Can't hurt us", 'David Goggins', 250, true);

myLibrary.push(cantHurtUs);

const addBook = document.querySelector('.addBook');
const submitButton = document.querySelector('#submitButton');
const cancelButton = document.querySelector('#cancelButton');
const dialogOverlay = document.querySelector('.dialogOverlay');

const titleInput = document.querySelector('#titleInput');
const authorInput = document.querySelector('#authorInput');
const pagesInput = document.querySelector('#pagesInput');
const readCheckbox = document.querySelector('#readCheckbox');

addBook.addEventListener('click', () => {
  dialogOverlay.classList.remove('hidden');
});

cancelButton.addEventListener('click', (e) => {
  e.preventDefault();
  dialogOverlay.classList.add('hidden');
});

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  let title = titleInput.value;
  let author = authorInput.value;
  let pages = pagesInput.value;
  let read = readCheckbox.checked;
  myLibrary.push(new Book(title, author, pages, read));

  const bookCard = document.createElement('div');
  bookCard.classList.add('bookCard');
  bookCard.id.add(`${id}`);
  const bookTitle = document.createElement('h3');
  bookTitle.textContent = title;
  const bookAuthor = document.createElement('p');
  bookAuthor.textContent = `by ${author}`;
  const bookPages = document.createElement('p');
  bookPages.textContent = `Has ${pages} pages`;
  const readBook = document.createElement('p');
  readBook.textContent = read ? 'Has read this book' : 'Has not read this book';

  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookPages);
  bookCard.appendChild(readBook);
  bookContainer.appendChild(bookCard);

  console.log(myLibrary);

  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  readCheckbox.checked = false;

  dialogOverlay.classList.add('hidden');
});

myLibrary.map((books) => {
  const bookCard = document.createElement('div');
  bookCard.classList.add('bookCard');
  bookCard.setAttribute('id', `${books.id}`);

  const bookTitle = document.createElement('h3');
  bookTitle.textContent = books.title;
  const bookAuthor = document.createElement('p');
  bookAuthor.textContent = `by ${books.author}`;
  const bookPages = document.createElement('p');
  bookPages.textContent = `Has ${books.pages} pages`;
  const readBook = document.createElement('p');
  readBook.textContent = books.read
    ? 'Has read this book'
    : 'Has not read this book';
  console.log(books);

  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookPages);
  bookCard.appendChild(readBook);
  bookContainer.appendChild(bookCard);
});
