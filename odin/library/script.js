var myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

Book.prototype.info = function(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.hasRead ? 'finished reading' : 'not read yet'}`;
}

function displayBooks() {
    var page = document.querySelector('#page');
    page.innerHTML = '';
    
    for(let i = 0; i < myLibrary.length; i++) {
        let div = document.createElement('div');
        div.classList.add('card');

        let buttons = document.createElement('div');

        let bookElement = document.createElement('p');
        bookElement.textContent = myLibrary[i].info();

        let removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove'
        removeBtn.onclick = function() {removeElement(i)};

        let toggleReadBtn = document.createElement('button');
        toggleReadBtn.textContent = 'Read'
        toggleReadBtn.onclick = function() {toggleRead(i)};

        div.appendChild(bookElement);
        buttons.appendChild(toggleReadBtn);
        buttons.appendChild(removeBtn);
        div.appendChild(buttons);
        page.appendChild(div);
    }
}

function removeElement(i){
    myLibrary.splice(i, 1);
    displayBooks();
}

function toggleRead(i){
    myLibrary[i].hasRead = !myLibrary[i].hasRead;
    displayBooks();
}

function addBookToLibrary(e) {
    let b = new Book(e.target.title.value, e.target.author.value, e.target.pages.value, e.target.hasRead.checked);
    myLibrary = [...myLibrary, b];
    displayBooks();
}

displayBooks();

var form = document.getElementById('form');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  addBookToLibrary(e);
});