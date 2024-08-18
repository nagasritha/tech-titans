let{LinkedList}=require('./list')

class Book{
    constructor(title, author, price, rating, cover) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.rating = rating;
        this.cover = cover;

    }
}
let list=new LinkedList() 
list.append(
    new Book('The Accursed God', 'Vivek Dutta Mishra', 299, 4.6, 'https://m.media-amazon.com/images/I/41xektjU1NL._SY445_SX342_.jpg'),
            new Book('Manas', 'Vivek Dutta Mishra', 399, 4.2, 'https://m.media-amazon.com/images/I/71MvJTjRjPL._AC_UY545_FMwebp_QL65_.jpg'),
            new Book('Mahabharata', 'C Rajkopalachari', 349, 4.8, 'https://m.media-amazon.com/images/I/81rq4w91g0L._AC_UY545_FMwebp_QL65_.jpg'),
            new Book('The Alchemist', 'Paulo Coelho', 249, 4.5, 'https://m.media-amazon.com/images/I/61HAE8zahLL._AC_UY545_FMwebp_QL65_.jpg'),
            new Book('The Great Gatsby', 'F. Scott Fitzgerald', 399, 4.7, 'https://m.media-amazon.com/images/I/71qovngeOcL._AC_UY545_FMwebp_QL65_.jpg'),
            new Book('The Catcher in the Rye', 'J.D. Salinger', 299, 4.3, 'https://m.media-amazon.com/images/I/618XWn5fD5L._AC_UY545_FMwebp_QL65_.jpg'),
            new Book('To Kill a Mockingbird', 'Harper Lee', 299, 4.5, 'https://m.media-amazon.com/images/I/916YjOp3uyL._AC_UY545_FMwebp_QL65_.jpg')
        

)


//console.log(list.findPrimes(2,100).toString()) 

function checkFunction(){
    //list.findPrimes(2,100)
    list.fill('string',100,2).toString()
}

//console.log(list.fill('string',10,'prime').toString())

console.log('Sum of books price of respective author',list.groupBy('author','avg','price'))

//console.log(list.checkPerformance(checkFunction))


 