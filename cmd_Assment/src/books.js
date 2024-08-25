var { LinkedList } = require("./list");
//require('./list-extension')

var books = new LinkedList(
  {
    id: 1,
    title: "The Accursed God",
    author: "Vivek Dutta Mishra",
    price: 299,
    rating: 4.6,
    tags: "mahabharata,fiction,best-seller",
  },
  {
    id: 2,
    title: "Rashmirathi",
    author: "Ramdhari Singh Dinkar",
    price: 99,
    rating: 4.4,
    tags: "mahabharata, hindi, classic, poetry",
  },
  {
    id: 3,
    title: "Urvashi",
    author: "Ramdhari Singh Dinkar",
    price: 99,
    rating: 4.5,
    tags: "romance, hindi, classic, poetry",
  },
  {
    id: 4,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 199,
    rating: 4.8,
    tags: "self-help, best-seller",
  },
  {
    id: 5,
    title: "Manas",
    author: "Vivek Dutta Mishra",
    price: 199,
    rating: 4.7,
    tags: "mahabharata, poetry, hindi",
  },
  {
    id: 6,
    title: "Ajaya",
    author: "Anant Neelkantha",
    price: 450,
    rating: 3.8,
    tags: "mahabharata,fiction",
  },
  {
    id: 7,
    title: "Jay",
    author: "Dev Dutt Pattanayak",
    price: 500,
    rating: 4.1,
    tags: "mahabharata,fiction",
  },
  {
    id: 8,
    title: "Kurukshetra",
    author: "Ramdhari Singh Dinkar",
    price: 119,
    rating: 4.6,
    tags: "mahabharata, poetry, hindi",
  },
  {
    id: 9,
    title: "Ashwatthama",
    author: "Deepak Kumar",
    price: 450,
    rating: 4.6,
    tags: "mahabharata, fiction",
  },
  {
    id: 10,
    title: "Ashwatthama2",
    author: "Deepak Kumar",
    price: 300,
    rating: 4.6,
    tags: "mahabharata, fiction",
  }
);

module.exports = {
  books,
};
