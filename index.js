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
