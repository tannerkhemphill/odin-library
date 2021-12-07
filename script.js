let myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${status}`;
    };
};

function addBookToLibrary(title, author, pages, status) {
    let book = new Book(title, author, pages, status);
    myLibrary.push(book);
    displayBooks();
};

const library = document.querySelector('#container');

function displayBooks() {
    while (library.firstChild) {
        library.removeChild(library.firstChild);
    }
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        let card = document.createElement('div');
        card.classList.add('card');
        card.textContent = `Title: ${book.title} \r\nAuthor: ${book.author} \r\nPages: ${book.pages} \r\nStatus: ${book.status}`;
        library.appendChild(card);
    }
};

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295', 'Have read')
addBookToLibrary('Dune', 'Frank Herbert', '450', 'Not read');
addBookToLibrary('The Count of Monte Cristo', 'Alexandre Dumas', '900', 'Have read');
displayBooks();

const toggleModal = () => {
    document.querySelector('.modal').classList.toggle('modal--hidden');
};
   
document.querySelector('#show-modal').addEventListener('click', toggleModal);

document.querySelector('#hide-modal').addEventListener('click', toggleModal);
   
document.querySelector('#open-form').addEventListener('submit', (event) => {
    event.preventDefault();
    toggleModal(); 
});

function retrieveFormInput() {
    let title = form.elements['title'].value;
    let author = form.elements['author'].value;
    let pages = form.elements['pages'].value;
    let status = form.elements['status'].value;
    if (title !== "" && author != "" && pages !== "" && status != "") {
        addBookToLibrary(title, author, pages, status);
    }
}

const form = document.querySelector('#open-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    retrieveFormInput();
    form.reset();
});