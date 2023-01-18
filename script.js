const row = document.getElementById("myBooks");
const getBooks = async () => {
  try {
    let response = await fetch("https://striveschool-api.herokuapp.com/books");
    let bookList = await response.json();
    // console.log(bookList);

    const arrayOfBooks = bookList.map((book) => {
      return `
        <div class="d-flex col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div class="card mb-4 shadow-sm w-100">
                <img src="${book.img}" class="card-img-top" alt="..." width="100px" height="300px">
                <div class="card-body p-3">
                    <h5 class="card-title">${book.title} </h5>
                </div>
                <div class="d-flex card-body justify-content-between align-items-center p-3">
                    <span  class="card-text">${book.price}</span>
                    <div class="d-flex">
                    <a href="#" class="btn btn-secondary px-1 mr-1" >Skip</a>
                    <a href="#" onclick="addBooksToCart(event)" class="btn btn-primary px-1" style="background-color: purple;border-color:transparent">Add to cart</a>
                    </div>
              </div>
            </div> 
         </div>`;
    });

    const stringOfBooks = arrayOfBooks.join("");
    // console.log(stringOfBooks);
    row.innerHTML = arrayOfBooks;
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
  } catch (err) {
    console.error(err);
  }
};

let cartCount = 0;

const addBooksToCart = (event) => {
  let clickedBook = event.target.closest(
    ".d-flex.col-12.col-sm-6.col-md-4.col-lg-3.mb-4"
  ).innerHTML;
  //   console.log(clickedBook);
  let myCartBooks = document.getElementById("myCartBooks");
  myCartBooks.innerHTML += `<div class="d-flex col-12 col-sm-6 col-md-4 col-lg-3 mb-4">${clickedBook}</div>`;
  //   console.log(myCartBooks);;
  event.preventDefault();
  event.currentTarget
    .closest(".d-flex.col-12.col-sm-6.col-md-4.col-lg-3.mb-4")
    .remove();
  cartCount += 1;
  let bookCounter = document.getElementById("book-counter");
  bookCounter.innerHTML = cartCount;
};

window.onload = () => {
  getBooks();
};
