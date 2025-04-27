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
}

const loadBooks = (book) => {
  const bookCard = document.createElement('div');
  bookCard.classList.add('bookCard');
  bookCard.setAttribute('id', `${book.id}`);
  const bookTitle = document.createElement('h3');
  bookTitle.textContent = book.title;
  const bookAuthor = document.createElement('p');
  bookAuthor.classList.add('bookAuthor');
  bookAuthor.textContent = `by ${book.author}`;
  const bookPages = document.createElement('p');
  bookPages.textContent = `Has ${book.pages} pages`;
  const readDiv = document.createElement('div');
  const readBook = document.createElement('p');
  const readYorN = document.createElement('p');
  readBook.textContent = 'Read: ';
  readYorN.textContent = book.read ? 'Yes' : 'No';
  readYorN.classList.add(book.read ? 'yesRead' : 'noRead');

  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookPages);
  readDiv.appendChild(readBook);
  readDiv.appendChild(readYorN);
  bookCard.appendChild(readDiv);
  bookContainer.appendChild(bookCard);
};

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
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  readCheckbox.checked = false;
  dialogOverlay.classList.add('hidden');
});

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  let title = titleInput.value;
  let author = authorInput.value;
  let pages = pagesInput.value;
  let read = readCheckbox.checked;
  myLibrary.push(new Book(title, author, pages, read));

  loadBooks({ title, author, pages, read });
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  readCheckbox.checked = false;

  dialogOverlay.classList.add('hidden');
});

myLibrary.map((books) => {
  loadBooks(books);
});
