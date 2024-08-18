const { BookManager } = require("./book"); // Import BookManager from book.js
var {distinct,skip,take,filterbymutipleoption} =require("./utils")

const bookManager = new BookManager(); // Instantiate BookManager

// const allBooks = bookManager.getBooks(); // Get all books Vivek Dutta Mishra , Paulo Coelho

var k = bookManager.FindbyObjId({ "author": "Vivek Dutta Mishra" });

// console.log(k)
