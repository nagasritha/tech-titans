#!/usr/bin/env node

const { before } = require("node:test");
var { LinkedList } = require("./list");
var books = require("./books");
var { Command } = require("commander");
var li = books.books; // Assuming books is an object containing the LinkedList

let prom = new Command();
var p = process.argv;
const [, , command, ...args] = process.argv;
// Function to print each book's details

prom
  .command("authors")
  .alias("a-")
  .description("Print all authors")
  .action(() => {
    li.forEach((v) => {
      console.log(v.author);
    });
  });

prom
  .command("author")
  .description("Get the author by id")
  .option("-a, --id <id>", "Specify the author ID")
  // Convert id to a number if necessa
  .action((cmdObj) => {
    var id = parseInt(cmdObj.id, 10);
    li.forEach((v) => {
      if (v.id === id) {
        console.log(`This ID ${id} belong to ${v.author}`);
      }
    });
  });

prom
  .command("books-by-author <authorName>")
  .description("Get all books by author")
  .action((authorName) => {
    var authrTolowerC = authorName.toLowerCase();
    li.forEach((v) => {
      var bookAuthLowerC = v.author.toLowerCase();

      if (bookAuthLowerC.includes(authrTolowerC)) {
        console.log(v);
      }
    });
  });

prom
  .command("book-by-id <id>")
  .description("Get the book by the given ID")
  .action((id) => {
    id = parseInt(id);

    li.forEach((v) => {
      if (v.id === id) {
        console.log(v);
      }
    });
  });

prom
  .command("books-by-price <compare> <min>")
  .description("get the books by price lessthan or greaterthan")
  .action((lt, min) => {
    let minValue = parseInt(min);
    let obj = {
      gt: (num) => num > minValue,
      lt: (num) => num <= minValue,
    };
    li.forEach((v) => {
      if (obj[lt](v.price)) {
        console.log(v);
      }
    });
  });

prom
  .command("books-btw-price <min> </min>")
  .description("get all the books in between price")
  .action((min, max) => {
    let minValue = parseInt(min);
    let maxValue = parseInt(max);

    li.forEach((v) => {
      if (v.price >= minValue && v.price <= maxValue) {
        console.log(v);
      }
    });
  });

prom.parse(process.argv);

//  function authors(){
//     li.forEach(v=>{
//     console.log(v.title)
// });
//  }

// var obj ={
//     author : authors()
// }

///*** another method  */
// prom.command("say")
// .action(function(){
//     console.log("jai Balaya ")
// })

// prom.parse(process.argv);
// li.forEach(book => {
//   console.log(book.title);
// });

// li.append({
//   title: "Accursed God",
//   author: "Vivek Dutta Mishra",
//   price: 299,
//   rating: 4.6,
//   tags: "mahabharata,fiction,best-seller",
// })

// li.append({  title: "Accursed God",
//   author: "Vivek Dutta Mishra",
//   price: 299,
//   rating: 4.6,
//   tags: "mahabharata,fiction,best-seller",

// }, {
//   title: "Rashmirathi",
//   author: "Ramdhari Singh Dinkar",
//   price: 99,
//   rating: 4.4,
//   tags: "mahabharata, hindi, classic, poetry",
// },
// {
//   title: "Urvashi",
//   author: "Ramdhari Singh Dinkar",
//   price: 99,
//   rating: 4.5,
//   tags: "romance, hindi, classic, poetry",
// }

// )

// var km = li.get(2)
// console.log("inndex of 2 is ", km)
// Extract command and arguments

// switch (command) {
//   case "Books".toLowerCase():
//     handleGreet(args);
//     break;
//   case "info":
//     handleInfo();
//     break;
//   case "echo":
//     handleEcho(args);
//     break;
//   case "calculate":
//     handleCalculate(args);
//     break;
//   default:
//     console.log(
//       "Unknown command. Available commands: greet, info, echo, calculate"
//     );
// }

// Function to handle 'greet' command

// Function to handle 'echo' command
// function handleEcho(args) {
//   console.log(args.join(" "));
// }

// Function to handle 'calculate' command
// function handleCalculate(args) {
//   if (args.length < 2) {
//     console.log("Usage: calculate <operation> <num1> <num2> ...");
//     return;
//   }

//   const [operation, ...numbers] = args;

//   if (operation === "add") {
//     const result = numbers.reduce((sum, num) => sum + parseFloat(num), 0);
//     console.log(`Sum: ${result}`);
//   } else if (operation === "multiply") {
//     const result = numbers.reduce(
//       (product, num) => product * parseFloat(num),
//       1
//     );
//     console.log(`Product: ${result}`);
//   } else {
//     console.log("Unknown operation. Use 'add' or 'multiply'.");
//   }
// }
