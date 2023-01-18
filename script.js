const row = document.getElementById("myBooks");
const getBooks = async () => {
  try {
    let response = await fetch("https://striveschool-api.herokuapp.com/books");
    let bookList = await response.json();
    console.log(bookList);

    const arrayOfBooks = bookList.map((book) => {
      return `
        <div class="d-flex col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div class="card mb-4 shadow-sm w-100">
                <img src="${book.img}" class="card-img-top" alt="..." width="100px" height="300px">
                <div class="card-body">
                    <h5 class="card-title">${book.title} </h5>
                </div>
                <div class="d-flex card-body justify-content-between align-items-center">
                    <span  class="card-text">${book.price}</span>
                    <a href="#" class="btn btn-primary" style="background-color: purple;border-color:transparent">Add to cart</a>
              </div>
            </div> 
         </div>`;
    });

    const stringOfBooks = arrayOfBooks.join("");
    // console.log(stringOfBooks);
    row.innerHTML = arrayOfBooks;
  } catch (err) {
    console.error(err);
  }
};

window.onload = () => {
  getBooks();
};
