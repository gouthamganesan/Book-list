// Book Constructor
function Book(book, author, isbn) {
  this.book = book;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor

function UI() {}

// Adding Book to UI
UI.prototype.addBookToUI = function (book) {
// Create a row element
  const row = document.createElement("tr");

  row.innerHTML = `
  <td>${book.book}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>`

  document.querySelector("#book-data > tbody").appendChild(row);
}

UI.prototype.clearFields = function () {
  uiBookName.value = "";
  uiAuthorName.value = "";
  uiISBN.value = "";
}

// UI Elements

const uiForm = document.getElementById("book-input"),
  uiBookName = document.getElementById("book-name"),
  uiAuthorName = document.getElementById("author-name"),
  uiISBN = document.getElementById("isbn"),
  uiButton = document.getElementById("submit-button");

// Event listeners

// Allow to submit only if all the fields are not empty
uiForm.addEventListener("keyup", function (event) {
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

  // Clear fields after adding to UI
  ui.clearFields();

  event.preventDefault();
});

document.getElementById("book-data").addEventListener("click", function (event) {
  if (event.target.classList.contains("delete")) {
    event.target.parentElement.parentElement.remove();
  }
})