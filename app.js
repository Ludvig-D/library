const bookContainer = document.querySelector('.bookContainer');

const myLibrary = [];

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

myLibrary.push(
  new Book(
    (title = "Can't hurt me"),
    (author = 'David Goggins'),
    (pages = 364),
    (read = true)
  ),
  new Book(
    (title = 'Never Finished'),
    (author = 'David Goggins'),
    (pages = 312),
    (read = false)
  ),
  new Book(
    (title = 'Atomic Habits'),
    (author = 'James Clear'),
    (pages = 320),
    (read = true)
  ),
  new Book(
    (title = '48 Laws of Power'),
    (author = 'Robert Greene'),
    (pages = 452),
    (read = false)
  )
);

const loadBooks = (book, index = 0) => {
  const bookCard = document.createElement('div');
  bookCard.classList.add('bookCard');
  bookCard.setAttribute('data-index', `${index}`);
  const bookTitle = document.createElement('h3');
  bookTitle.textContent = book.title;
  const bookAuthor = document.createElement('p');
  bookAuthor.classList.add('bookAuthor');
  bookAuthor.textContent = `by ${book.author}`;
  const bookPages = document.createElement('p');
  bookPages.textContent = `Has ${book.pages} pages`;
  const readDiv = document.createElement('div');
  readDiv.classList.add('readDiv');
  const read = document.createElement('p');
  const readBook = document.createElement('p');
  read.textContent = 'Read: ';
  readBook.textContent = book.read ? 'Yes' : 'No';
  readBook.classList.add('clickRead');
  readBook.classList.add(book.read ? 'yesRead' : 'noRead');
  const delButton = document.createElement('button');
  delButton.textContent = 'Delete Book';
  delButton.classList.add('delButton');

  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookPages);
  readDiv.appendChild(read);
  readDiv.appendChild(readBook);
  bookCard.appendChild(readDiv);
  bookCard.appendChild(delButton);
  bookContainer.appendChild(bookCard);
};

myLibrary.map((books, index) => {
  loadBooks(books, index);
});

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

  () => {
    const clickReads = document.querySelectorAll('.clickRead');
    clickReads.forEach((clickRead) => {
      clickRead.removeEventListener('click', clickhandler);
    });
  };

  () => {
    const delButtons = document.querySelectorAll('.delButton');
    delButtons.forEach((delButton) => {
      delButton.removeEventListener('click', () => {
        delButton.parentElement.parentElement.removeChild(
          delButton.parentElement
        );
      });
    });
  };

  while (bookContainer.firstChild) {
    bookContainer.removeChild(bookContainer.firstChild);
  }
  myLibrary.map((books, index) => {
    loadBooks(books, index);
  });

  addReadUpdater();
  addDelButton();

  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  readCheckbox.checked = false;

  dialogOverlay.classList.add('hidden');
});

const clickhandler = (e) => {
  if (e.target.textContent === 'Yes') {
    e.target.textContent = 'No';
    e.target.classList.remove('yesRead');
    e.target.classList.add('noRead');
    readUpdater(e);
  } else {
    e.target.textContent = 'Yes';
    e.target.classList.remove('noRead');
    e.target.classList.add('yesRead');
    readUpdater(e);
  }
};

function readUpdater(e) {
  let index = e.target.parentElement.parentElement.dataset.index;
  myLibrary[index].read = !myLibrary[index].read;
}

function addReadUpdater() {
  const clickReads = document.querySelectorAll('.clickRead');
  clickReads.forEach((clickRead) => {
    clickRead.addEventListener('click', clickhandler);
  });
}

addReadUpdater();

function addDelButton() {
  const delButtons = document.querySelectorAll('.delButton');
  delButtons.forEach((delButton) => {
    delButton.addEventListener('click', () => {
      delButton.parentElement.parentElement.removeChild(
        delButton.parentElement
      );
      myLibrary.splice(delButton.parentElement.dataset.index, 1);
    });
  });
}

addDelButton();
