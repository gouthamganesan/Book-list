// UI Elements

const uiForm = document.getElementById("book-input"),
  uiBookName = document.getElementById("book-name"),
  uiAuthorName = document.getElementById("author-name"),
  uiISBN = document.getElementById("isbn"),
  uiButton = document.getElementById("submit-button");

// Book Object class
class Book {
  constructor(book, author, isbn) {
    this.book = book;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Object class
class UI {
  addBookToUI(book) {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${book.book}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`;

    document.querySelector("#book-data > tbody").appendChild(row);
  }

  clearFields() {
    uiBookName.value = "";
    uiAuthorName.value = "";
    uiISBN.value = "";
  }

  deleteBook(book) {
    if (book.classList.contains("delete")) {
      book.parentElement.parentElement.remove();
    }
  }
}

// Store
class Store {
  static getBooks() {
    let books;

    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => {
      const ui = new UI();

      ui.addBookToUI(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn == isbn) {
        books.splice(index);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Event listeners

// Load and display books
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Allow to submit only if all the fields are not empty
uiForm.addEventListener("keyup", function () {
  if (
    uiBookName.value != "" &&
    uiAuthorName.value != "" &&
    uiISBN.value != ""
  ) {
    uiButton.removeAttribute("disabled");
  } else {
    uiButton.setAttribute("disabled", "true");
  }
});

// Submit the values
uiForm.addEventListener("submit", function (event) {
  // Get values
  const bookTitle = document.getElementById("book-name").value,
    author = document.getElementById("author-name").value,
    isbn = document.getElementById("isbn").value;

  // Instantiate Book Object
  const book = new Book(bookTitle, author, isbn);

  // Instantiate UI object
  const ui = new UI();

  // Add the values to the UI
  ui.addBookToUI(book);

  // Adding to LS
  Store.addBook(book);

  // Clear fields after adding to UI
  ui.clearFields();

  event.preventDefault();
});

// Delete book entries
document
  .getElementById("book-data")
  .addEventListener("click", function (event) {
    // Instantiate new UI object
    const ui = new UI();

    ui.deleteBook(event.target);

    // Remove book from LS
    Store.removeBook(
      event.target.parentElement.previousElementSibling.textContent
    );
  });
