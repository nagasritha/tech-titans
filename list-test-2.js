const { LinkedList } = require("./list");
const { contains, take, gt, lt, between } = require("./utils");

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

const booklist = new LinkedList(
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

const criteria1 = {
  author: contains("Vivek"),
  rating: lt(4.5),
};

   

const criteria4 = {
  author: contains("Vivek"),
  or: [{ rating: lt(5) }, { price: lt(300) }],
};
const criteria3 = {
  author: contains("Vivek"),
  and: [{ rating: lt(5) }],
};

const matchingBooks = booklist.getMatchingitems(criteria4);

matchingBooks.forEach((book) => {
  console.log(book.toString());
});

// const cons = {
// author : contains("Vivek"),sum:"price"

// }
// var matchingBooks2 = booklist.groupBy_(cons)
// // console.log(matchingBooks2)

// matchingBooks2.forEach(book => {
//   console.log(book.toString());
// });

const conta = {
  sum: "price",
  // Filter by author
  // sum: sum("price") // Sum prices
};

var matchingBooks2 = booklist.groupBy_();
