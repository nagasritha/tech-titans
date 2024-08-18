var { LinkedList } = require("./list");

class Book {
  constructor(title, author, price, rating, cover) {
    this.title = title;
    this.author = author;
    this.price = price;
    this.rating = rating;
    this.cover = cover;
  }

  toString() {
    return `Title: ${this.title}, Author: ${this.author}, Price: ${this.price}, Rating: ${this.rating}, Cover: ${this.cover}`;
  }
}

class BookManager {
  constructor() {
    this._lastId = 0;
    this._books = new LinkedList(
      new Book(
        "The Accursed God",
        "Vivek Dutta Mishra",
        299,
        4.6,
        "https://m.media-amazon.com/images/I/41xektjU1NL._SY445_SX342_.jpg"
      ),
      new Book(
        "Manas",
        "Vivek Dutta Mishra",
        399,
        4.2,
        "https://m.media-amazon.com/images/I/71MvJTjRjPL._AC_UY545_FMwebp_QL65_.jpg"
      ),
      new Book(
        "Mahabharata",
        "C Rajkopalachari",
        349,
        4.8,
        "https://m.media-amazon.com/images/I/81rq4w91g0L._AC_UY545_FMwebp_QL65_.jpg"
      ),
      new Book(
        "The Alchemist",
        "Paulo Coelho",
        249,
        4.5,
        "https://m.media-amazon.com/images/I/61HAE8zahLL._AC_UY545_FMwebp_QL65_.jpg"
      ),
      new Book(
        "The Great Gatsby",
        "F. Scott Fitzgerald",
        399,
        4.7,
        "https://m.media-amazon.com/images/I/71qovngeOcL._AC_UY545_FMwebp_QL65_.jpg"
      ),
      new Book(
        "The Catcher in the Rye",
        "J.D. Salinger",
        299,
        4.3,
        "https://m.media-amazon.com/images/I/618XWn5fD5L._AC_UY545_FMwebp_QL65_.jpg"
      ),
      new Book(
        "To Kill a Mockingbird",
        "Harper Lee",
        299,
        4.5,
        "https://m.media-amazon.com/images/I/916YjOp3uyL._AC_UY545_FMwebp_QL65_.jpg"
      )
    );

    this._books.forEach((b) => {
      b._id = ++this._lastId;
    });
  }

  toArray(linkedList) {
    const array = [];
    linkedList.forEach((item) => array.push(item));
    return array;
  }

  makeToString() {
    return this._books.toString();
  }

  addBook(book) {
    book._id = ++this._lastId;
    console.log("book", book);
    this._books.append(book);
  }

  getBooks() {
    return this._books;
  }

  getBookById(id) {
    return this._books.find((b) => b._id == id);
  }

  getBooksByAuthor(author) {
    let result = this._books.filter((b) =>
      b.author.toLowerCase().includes(author.toLowerCase())
    );
    return result;
    //   this.sorttheBooks(result, "author", "asc");
  }

  getBooksByRatingRange(min, max) {
    let result = this._books.filter((b) => b.rating >= min && b.rating <= max);
    return result;
    //   this.sorttheBooks(result, "rating", "asc");
  }

  getBooksByTitle(title) {
    let result = this._books.filter((b) =>
      b.title.toLowerCase().includes(title.toLowerCase())
    );
    return result;
    //   this.sorttheBooks(result, "title", "asc");
  }

  getBooksByPriceRange(min, max) {
    let result = this._books.filter((b) => b.price >= min && b.price <= max);
    return result;
    //    this.sorttheBooks(result, "price", "asc");
  }

 

  sortbyitem(sor, keyY) {
    this._books.sortTheitems((book1, book2) => {
      if (sor === "asc") {
        return book1[keyY] - book2[keyY];
      } else if (sor === "desc") {
        return book2[keyY] - book1[keyY];
      }
    });
  }

  removeBook(id) {
    this._books = this._books.filter((b) => b._id !== id);
  }

  avgby() {
    let aveargeofItems = this._books.average((b) => b.price);
    console.log(aveargeofItems);
  }

  updateBook(book) {
    console.log("update book", book);
    this._books = this._books.map((b) => (b._id == book._id ? book : b));
    console.log("this._books", this._books);
  }

  each(action) {
    this._books.forEach(action);
  }

  getBooks() {
    return this._books;
  }

  //assment for the 14/Wed

  FindbyObjId(obj) {
    const key = Object.keys(obj)[0];
    var k = this._books.find((v) => {
      var valid = obj[key];
      var keyTostrng = key.toLowerCase();
      var expect = key === "id" ? v["_" + key] : v[keyTostrng];
      if (expect === valid) {
        return true;
      }
    });
    //end find

    if (k) {
      return k;
    } else {
      var errorMsg = "Please select the Valid details";
      return errorMsg;
    }
  }
///find end
  getMatchingbooks(obj){

   var km=  this._books.filter()
   

     return km
  }


}

try {
  module.exports.BookManager = BookManager;
} catch (err) {}
