window.onload = () => {
  getBooks();
};

const row = document.getElementById("myBooks");
let myCartBooks = document.getElementById("myCartBooks");
let arrayOfBooks;
let outerBooks = [];
let filteredBooks = [];

const getBooks = async () => {
  try {
    let response = await fetch("https://striveschool-api.herokuapp.com/books");
    let bookList = await response.json();
    // console.log(bookList);
    displayBooks(bookList);
    outerBooks = bookList;
  } catch (err) {
    console.error(err);
  }
};

function displayBooks(bookList) {
  arrayOfBooks = bookList.map((book) => {
    return `
          <div class="d-flex col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div class="card mb-4 shadow-sm w-100">
                  <img src="${book.img}" class="card-img-top" alt="..." width="90px" height="300px">
                  <div class="card-body p-3">
                      <h5 class="card-title">${book.title} </h5>
                  </div>
                  <div class="d-flex card-body justify-content-between align-items-center p-3">
                      <span  class="card-text"><b>Price:</b>${book.price}</span>
                      <div class="d-flex">
                          <button class="btn btn-secondary px-1 mr-1" >Skip</button>
                          <a href="#" onclick="addBooksToCart(event)" class="btn btn-primary px-1" style="background-color: purple;border-color:transparent">Add to cart</a>
                      </div>
                </div>
              </div> 
           </div>`;
  });

  const stringOfBooks = arrayOfBooks.join("");
  // console.log(stringOfBooks);
  row.innerHTML = stringOfBooks;
  row
    .querySelectorAll(".btn.btn-secondary") // finds the second button of type outline-secondary
    .forEach((btn) => {
      btn.onclick = (event) => {
        event.preventDefault();
        event.currentTarget
          .closest(".d-flex.col-12.col-sm-6.col-md-4.col-lg-3.mb-4")
          .remove();
      };
    });
}

let cartCount = 0;
let bookCounter = document.getElementById("book-counter");

const addBooksToCart = (event) => {
  let clickedBook = event.target.closest(
    ".d-flex.col-12.col-sm-6.col-md-4.col-lg-3.mb-4"
  ).innerHTML;
  //   console.log(clickedBook);
  myCartBooks.innerHTML += `<div class="d-flex col-12 col-sm-6 col-md-4 col-lg-3 mb-4">${clickedBook}</div>`;

  //   console.log(myCartBooks);
  event.preventDefault();
  event.currentTarget
    .closest(".d-flex.col-12.col-sm-6.col-md-4.col-lg-3.mb-4")
    .remove();
  myCartBooks.querySelectorAll(".btn.btn-secondary").forEach((btn) => {
    btn.innerText = "Delete";
    btn.classList.add("btn-danger");
    btn.onclick = (event) => {
      event.preventDefault();
      event.currentTarget
        .closest(".d-flex.col-12.col-sm-6.col-md-4.col-lg-3.mb-4")
        .remove();
      cartCount--;
      bookCounter.innerHTML = cartCount;
    };
  });
  myCartBooks
    .querySelectorAll(".btn.btn-primary.px-1")
    .forEach((btn) => (btn.style.display = "none"));
  cartCount += 1;
  bookCounter.innerHTML = cartCount;
  //   let counter = myCartBooks.reduce((cartCount, currentElementOfBook) => {
  //     return cartCount + currentElementOfBook;
  //   }, 0);
  //   console.log(counter);
};

const countTheBookInCart = () => {};

let searchQuery;

const handleSearchQuery = (e) => {
  //   console.log(outerBooks);
  //   console.log(arrayOfBooks);
  if (e.length > 2) {
    row.innerHTML = "";
    filteredBooks = outerBooks.filter((book) =>
      book.title.toLowerCase().includes(e.toLowerCase())
    );
    // console.log("filter", filteredBooks);
    displayBooks(filteredBooks);
  } else {
    displayBooks(outerBooks);
  }
};

const emptyCart = () => {
  //   console.log(myCartBooks.hasChildNodes());
  if (myCartBooks.hasChildNodes()) {
    myCartBooks.innerHTML = "";
    cartCount = 0;
    bookCounter.innerHTML = cartCount;
  } else {
    alert("Your cart is already empty.");
  }
};
