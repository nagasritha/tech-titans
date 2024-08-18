let {LinkedList} = require('./list.js');
let {take} = require('./utils.js');

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
//declared books linked list
let BookList = new LinkedList(
    new Book('The Accursed God', 'Vivek Dutta Mishra', 299, 4.6, 'https://m.media-amazon.com/images/I/41xektjU1NL._SY445_SX342_.jpg'),
    new Book('Manas', 'Vivek Dutta Mishra', 399, 4.2, 'https://m.media-amazon.com/images/I/71MvJTjRjPL._AC_UY545_FMwebp_QL65_.jpg'),
    new Book('Mahabharata', 'C Rajkopalachari', 349, 4.8, 'https://m.media-amazon.com/images/I/81rq4w91g0L._AC_UY545_FMwebp_QL65_.jpg'),
    new Book('The Alchemist', 'Paulo Coelho', 249, 4.5, 'https://m.media-amazon.com/images/I/61HAE8zahLL._AC_UY545_FMwebp_QL65_.jpg'),
    new Book('The Great Gatsby', 'F. Scott Fitzgerald', 399, 4.7, 'https://m.media-amazon.com/images/I/71qovngeOcL._AC_UY545_FMwebp_QL65_.jpg'),
    new Book('The Catcher in the Rye', 'J.D. Salinger', 299, 4.3, 'https://m.media-amazon.com/images/I/618XWn5fD5L._AC_UY545_FMwebp_QL65_.jpg'),
    new Book('To Kill a Mockingbird', 'Harper Lee', 299, 4.5, 'https://m.media-amazon.com/images/I/916YjOp3uyL._AC_UY545_FMwebp_QL65_.jpg')
);
//--------book find with title---------
console.log('--------book find with title---------');
let firstBook = BookList.find(take(null,{'title':"The Accursed God"}));
console.log(firstBook);
console.log('----------------------------------------');

//---------book filter with author and price------
console.log('----------------books filter by author and price----------');
function greaterThan(price){
    return function(value){
        return value>price;
    }
}

function includes(value){
    return function(item){
        return item.toLowerCase().includes(value.toLowerCase());
    }
}

let returnList = BookList.filter(take(null,{
    "author": includes('Dutta'),
    "price": greaterThan(300)
},'or'));
console.log(returnList.forEach(item => console.log("author: " + item.author+"  price:"+item.price)));
console.log("----------------------------------");
//--------------filter by rating range----------
console.log('--------------filter by rating range----------');

function range(min,max){
    return function(value){
        return value>=min && value<=max;
    }
}

let filterByRatingRange = BookList.filter(take(null,{"rating":range(1,4.5)}));
console.log(filterByRatingRange.forEach(item=>console.log("title: "+item.title+" rating: "+item.rating)));
console.log('----------------------------------------------------');

function endsWithcomparision(value){
    return function(item){
        return item.toLowerCase().endsWith(value.toLowerCase());
    }
}

 let filterByTitle = BookList.filter({'author':endsWithcomparision('Mishra'),'title':"The Accursed God"});
 console.log(filterByTitle.size());
