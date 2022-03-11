// This class is used to create book objects with titles, author names,
// page numbers, and read statuses
class Book {

    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
    // This method returns a string of a book's information
    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.status}`;
    }
    // This method toggles the read status of a book
    toggleRead() {
        if (this.status === "Have read") {
            this.status = "Not read";
        }
        else {
            this.status = "Have read";
        }
    }
}

// This class is used to create library objects that store associated 
// books in an array
class Library {

    constructor(library = []) {
        this.library = library;
    }
    // This method adds a new book to the library array
    addBookToLibrary(title, author, pages, status) {
        let book = new Book(title, author, pages, status);
        this.library.push(book);
        this.displayBooks();
    }
    // This method removes a book by index from the library array
    removeBook(index) {
        this.library.splice(index, 1);
        this.displayBooks();
    }
    // This method displays the books in the library on the page via DOM
    displayBooks() {
        const library = document.querySelector('#container');
        while (library.firstChild) {
            library.removeChild(library.firstChild);
        }
        // Loop to display container for each book and link to its index
        for (let i = 0; i < this.library.length; i++) {
            let book = this.library[i];
            let card = document.createElement('div');
            card.classList.add('card');
            card.dataset.index = i;
            card.textContent = `Title: ${book.title} \r\nAuthor: ${book.author} \r\nPages: ${book.pages} \r\nStatus: ${book.status}`;
            library.appendChild(card);
        }
        // Add buttons to remove and toggle read status to each book container
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
        // Add event listeners to each remove book button
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
        // Add event listeners to each toggle read status button
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

// Create library obbject and add a few books by default
let myLibrary = new Library();
myLibrary.addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295', 'Have read')
myLibrary.addBookToLibrary('Dune', 'Frank Herbert', '450', 'Not read');
myLibrary.addBookToLibrary('The Count of Monte Cristo', 'Alexandre Dumas', '900', 'Have read');
myLibrary.displayBooks();

// The following code displays a form to add a new book to the library 
// when the new book button is clicked
const toggleModal = () => {
    document.querySelector('.modal').classList.toggle('modal--hidden');
};
   
document.querySelector('#show-modal').addEventListener('click', toggleModal);

document.querySelector('#hide-modal').addEventListener('click', toggleModal);
   
document.querySelector('#open-form').addEventListener('submit', (event) => {
    event.preventDefault();
    toggleModal(); 
});

// Function to retrieve information from new book form and create new book
function retrieveFormInput() {
    let title = form.elements['title'].value;
    let author = form.elements['author'].value;
    let pages = form.elements['pages'].value;
    let status = form.elements['status'].value;
    if (title !== "" && author != "" && pages !== "" && status != "") {
        myLibrary.addBookToLibrary(title, author, pages, status);
    }
}

// Add event listener to the submit button of the new book form
const form = document.querySelector('#open-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    retrieveFormInput();
    form.reset();
});
