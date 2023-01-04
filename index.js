const myLibrary = [];

function Book(title, author, numPages, haveRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.haveRead = haveRead;
}

Book.prototype.info = function info() {
  const isItRead = this.haveRead ? 'already read' : 'not read yet';
  return `${this.title} by ${this.author}, ${this.numPages} pages, ${isItRead}.`;
};

function addBookToLibrary(book) {
  if (!(book instanceof Book)) throw new TypeError("That's no book!");

  myLibrary.push(book);
}

function addBooksToPage() {
  const library = document.querySelector('.library');
  library.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const newBook = document.createElement('div');
    newBook.classList.add('book');

    const title = createTitle(book);
    const author = createAuthor(book);
    const pages = createPages(book);
    const readStatus = createReadStatus(book);
    const removeButton = createRemoveButton(index);

    assembleBook(newBook, title, author, pages, readStatus, removeButton);

    library.appendChild(newBook);
  });

  function createRemoveButton(index) {
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    const removeButtonText = document.createTextNode('Remove');
    removeButton.appendChild(removeButtonText);
    removeButton.setAttribute('type', 'button');
    removeButton.setAttribute('data-library-index', index);

    removeButton.addEventListener('click', () => {
      const bookIndex = removeButton.getAttribute('data-library-index');
      myLibrary.splice(bookIndex, 1);
      addBooksToPage();
    });

    return removeButton;
  }

  function assembleBook(
    newBook,
    title,
    author,
    pages,
    readStatus,
    removeButton
  ) {
    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);
    newBook.appendChild(readStatus);
    newBook.appendChild(removeButton);
  }

  function createReadStatus(book) {
    const readStatus = document.createElement('p');
    readStatus.classList.add('readStatus');
    const isItRead = book.haveRead ? 'Aleady read' : 'Not read yet';
    const status = book.haveRead ? 'read' : 'unread';
    readStatus.classList.add(status);
    const readText = document.createTextNode(isItRead);
    readStatus.appendChild(readText);
    return readStatus;
  }

  function createPages(book) {
    const pages = document.createElement('small');
    pages.classList.add('pages');
    const pagesText = document.createTextNode(book.numPages);
    pages.appendChild(pagesText);
    return pages;
  }

  function createAuthor(book) {
    const author = document.createElement('p');
    author.classList.add('author');
    const authorText = document.createTextNode(book.author);
    author.appendChild(authorText);
    return author;
  }

  function createTitle(book) {
    const title = document.createElement('h3');
    title.classList.add('title');
    const titleText = document.createTextNode(book.title);
    title.appendChild(titleText);
    return title;
  }
}

const newBook = document.querySelector('.newBook');
const newBookForm = document.querySelector('.bookSubmission');

function toggleForm() {
  newBookForm.classList.toggle('hidden');

  if (newBook.textContent === 'New Book') {
    newBook.textContent = 'Cancel Book';
  } else {
    newBook.textContent = 'New Book';
    newBookForm.reset();
  }
}

newBook.addEventListener('click', () => {
  toggleForm();
});

const addBook = document.querySelector('.submit');
addBook.addEventListener('click', () => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const hasRead = document.querySelector('#read').checked;

  const submittedBook = new Book(title, author, pages, hasRead);
  myLibrary.push(submittedBook);

  addBooksToPage();
  toggleForm();
});

// ======= Placeholder Content for testing

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const theHobbit3 = new Book('The Hobbitter', 'J.R.R. Tolkien', 295, true);

addBookToLibrary(theHobbit);
addBookToLibrary(theHobbit3);

addBooksToPage();
