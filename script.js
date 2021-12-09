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

Book.prototype.toggleRead = function() {
    if (this.status === "Have read") {
        this.status = "Not read";
    }
    else {
        this.status = "Have read";
    }
    displayBooks();
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
        card.dataset.index = i;
        card.textContent = `Title: ${book.title} \r\nAuthor: ${book.author} \r\nPages: ${book.pages} \r\nStatus: ${book.status}`;
        library.appendChild(card);
    }
    addButtons();
    let removes = document.querySelectorAll('.remove');
    removes.forEach((remove) => {
        remove.addEventListener('click', (event) => {
            let target = event.currentTarget;
            let parent = target.parentNode;
            let div = parent.parentNode;
            let index = parseInt(div.dataset.index);
            removeBook(index);
        })
    });
    let toggles = document.querySelectorAll('.toggle');
    toggles.forEach((toggle) => {
        toggle.addEventListener('click', (event) => {
            let target = event.currentTarget;
            let parent = target.parentNode;
            let div = parent.parentNode;
            let index = parseInt(div.dataset.index);
            myLibrary[index].toggleRead();
        })
    });
};

function addButtons() {
    let cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        let container = document.createElement('div');
        container.classList.add('button-container');
        card.appendChild(container);
        let button1 = document.createElement('button');
        let button2 = document.createElement('button');
        button1.classList.add('remove');
        button2.classList.add('toggle');
        button1.innerHTML = 'X';
        button2.innerHTML = 'Read';
        container.appendChild(button1);
        container.appendChild(button2);
    })
};

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
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