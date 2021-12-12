class Book {

    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.status}`;
    }

    toggleRead() {
        if (this.status === "Have read") {
            this.status = "Not read";
        }
        else {
            this.status = "Have read";
        }
    }
}

class Library {

    constructor(library = []) {
        this.library = library;
    }

    addBookToLibrary(title, author, pages, status) {
        let book = new Book(title, author, pages, status);
        this.library.push(book);
        this.displayBooks();
    }

    removeBook(index) {
        this.library.splice(index, 1);
        this.displayBooks();
    }

    displayBooks() {
        const library = document.querySelector('#container');
        while (library.firstChild) {
            library.removeChild(library.firstChild);
        }
        for (let i = 0; i < this.library.length; i++) {
            let book = this.library[i];
            let card = document.createElement('div');
            card.classList.add('card');
            card.dataset.index = i;
            card.textContent = `Title: ${book.title} \r\nAuthor: ${book.author} \r\nPages: ${book.pages} \r\nStatus: ${book.status}`;
            library.appendChild(card);
        }
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
        let removes = document.querySelectorAll('.remove');
        removes.forEach((remove) => {
            remove.addEventListener('click', (event) => {
                let target = event.currentTarget;
                let parent = target.parentNode;
                let div = parent.parentNode;
                let index = parseInt(div.dataset.index);
                this.removeBook(index);
            })
        })
        let toggles = document.querySelectorAll('.toggle');
        toggles.forEach((toggle) => {
            toggle.addEventListener('click', (event) => {
                let target = event.currentTarget;
                let parent = target.parentNode;
                let div = parent.parentNode;
                let index = parseInt(div.dataset.index);
                this.library[index].toggleRead();
                this.displayBooks();
            })
        })
    }
};

let myLibrary = new Library();
myLibrary.addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295', 'Have read')
myLibrary.addBookToLibrary('Dune', 'Frank Herbert', '450', 'Not read');
myLibrary.addBookToLibrary('The Count of Monte Cristo', 'Alexandre Dumas', '900', 'Have read');
myLibrary.displayBooks();

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
        myLibrary.addBookToLibrary(title, author, pages, status);
    }
}

const form = document.querySelector('#open-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    retrieveFormInput();
    form.reset();
});