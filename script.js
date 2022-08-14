const library = document.querySelector("#library")
const addButton = document.querySelector("#add")
const modal = document.querySelector(".modal")
const closeButton = document.querySelector("#cancel")
const confirmButton = document.querySelector("#submit")
const form = document.getElementById("form")
const res = document.querySelector("#res")
let myLibrary = []


class Book {
    constructor(title, author, pages , read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
    changeRead() {
        if (this.read === "read") {
            this.read = "not read"
        }else {
            this.read = "read"
        }
    }
    removeBook(book) {
        myLibrary.splice(book.dataset.index, 1)
        library.removeChild(book)
    }
}


// function Book(title, author, pages , read) {    
//     this.title = title
//     this.author = author
//     this.pages = pages
//     this.read = read
// }

// Book.prototype.changeRead = function() {
//     if (this.read === "read") {
//         this.read = "not read"
//     }else {
//         this.read = "read"
//     }
// }



// Book.prototype.removeBook = function(book) {
//     myLibrary.splice(book.dataset.index, 1)
//     library.removeChild(book)
// }


function showBooks() {
    removeAllChildNodes(library)
    for(let i =0; i < myLibrary.length ; i++) {
        let Book = document.createElement("div")
        Book.dataset.index = i
        let BookTitle = document.createElement("h1")
        let BookAuthor = document.createElement("h2")
        let BookPages = document.createElement("h2")
        let ButtonGrp = document.createElement("div")
        let ReadStatus = document.createElement("button")
        let Delete = document.createElement("button")
        Book.classList.add("book")
        BookTitle.classList.add("book-title")
        BookAuthor.classList.add("book-author")
        BookPages.classList.add("book-pages")
        ButtonGrp.classList.add("button-grp")
        ReadStatus.classList.add("read-status")
        Delete.classList.add("delete")
        library.appendChild(Book)
        BookTitle.innerText = `${myLibrary[i].title}`
        Book.appendChild(BookTitle)
        BookAuthor.innerText= `Made by ${myLibrary[i].author}`
        Book.appendChild(BookAuthor)
        BookPages.innerText = `${myLibrary[i].pages} pages`
        Book.appendChild(BookPages)
        Book.appendChild(ButtonGrp)
        ReadStatus.innerText = `${myLibrary[i].read}`
        ButtonGrp.appendChild(ReadStatus)
        Delete.innerText = "delete"
        ButtonGrp.appendChild(Delete)

        ReadStatus.addEventListener("click", function() {
            myLibrary[i].changeRead()
            ReadStatus.innerText = `${myLibrary[i].read}`
        } )

        Delete.addEventListener("click", function() {
            myLibrary[i].removeBook(Book)
        })
    }
}




function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


function addBooktoLibrary(){
    let title = document.querySelector("#title").value
    let author = document.querySelector("#author").value
    let pages = parseInt(document.querySelector("#pages").value)
    let read = document.querySelector('input[name="read-status"]:checked');
    if (title.length == 0 ){
        res.textContent = "please enter a valid title!"
    } else if (author.length == 0 ) {
        res.textContent = "please enter a valid author name!"
    } else if (isNaN(pages) || pages == 0) {
        res.textContent = "please enter the number of pages!"
    } else if ( read == null) {
        res.textContent = "please select an option!"
    } else if (exist(title)) {
        res.textContent = "The book is already in the library!"
    } else {
        let book = new Book(title, author, pages, read.value)
        myLibrary.push(book)
        modal.style.display = "none"
        form.reset()
        showBooks()
    }
}


function exist(title) {
    for (let i = 0; i < myLibrary.length ; i++) {
        if (myLibrary[i].title == title) {
            return true
        }
    }
    return false
}

addButton.addEventListener("click", function() {
    modal.style.display = "flex"
})

window.addEventListener("click", function(e) {
    if (e.target == modal) {
        modal.style.display = "none"
        form.reset()
    }

})

closeButton.addEventListener("click", function() {
    modal.style.display = "none"
    form.reset()
})



confirmButton.addEventListener("click", addBooktoLibrary)



let book1 = new Book("The hobbit", "Tolkien", 485, "read")
myLibrary.push(book1)
showBooks()


