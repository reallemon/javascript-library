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

  myLibrary.forEach((book) => {
    const newBook = document.createElement('div');
    newBook.classList.add('book');

    const title = createTitle(book);
    const author = createAuthor(book);
    const pages = createPages(book);
    const readStatus = createReadStatus(book);

    assembleBook(newBook, title, author, pages, readStatus);

    library.appendChild(newBook);
  });

  function assembleBook(newBook, title, author, pages, readStatus) {
    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);
    newBook.appendChild(readStatus);
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
