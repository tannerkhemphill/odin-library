function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${this.haveRead()}`;
    };
};

Book.prototype.haveRead = function () {
    if (this.read) {
        return "have read"
    }
    else {
        return "not read yet"
    }
};

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
console.log(theHobbit.info());