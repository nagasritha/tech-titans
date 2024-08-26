// const { connect, disconnect } = require('./connection');

// const url = 'mongodb://localhost/';
// async function connection(){
//     const connection  = await connect(url);
//     const db = connection.db('g7_cr_20240826');
//     const booksCollection = db.collection('books');
//     return booksCollection;
// }


// async function getAllBooks() {
//     let booksCollection = await connection();
    
//     const books = await booksCollection.find({}).toArray();
//     return books;
// }

// async function getAllBooksByAuthor(author){
//     let connection = await connect(url);
//     let db = connection.db('g7_cr_20240826');
//     let booksCollection = db.collection('books');
//     let result = await booksCollection.findOne({author});
//     return result;
// }

// async function getAllBooksByAuthorCaseInsensitive(author) {
//     let connection = await connect(url);
//     let db = connection.db('g7_cr_20240826');
//     let booksCollection = db.collection('books');
//     const book = await booksCollection.findOne({ author: new RegExp(author, 'i') });
//     return book;
// }

// async function addNewBook(title,isbn,author,price,description,tags,cover,authorId,reviews){
//     let newBook = {title,isbn,author,price,description,tags,cover,authorId,reviews};
//     const connection = await connect(url);
//     const db = connection.db('g7_cr_20240826');
//     const booksCollection = db.collection('books');
//     const result = await booksCollection.insertOne(newBook);
//     return result.insertedId;
// }

// async function deleteBookByTitle(title){
//     const connection = await connect(url);
//     const db = connection.db('g7_cr_20240826');
//     const booksCollection = db.collection('books');
//     const book =await booksCollection.deleteOne({title});
//     return "book with title \""+title+"\" deleted"
// }

// async function updateTitle(title,newTitle){
//     const connection = await connect(url);
//     const db = connection.db('g7_cr_20240826');
//     const booksCollection = db.collection('books');
//     const result = await booksCollection.updateMany({title},
//                                                     {$set : {title : newTitle}}
//                                                     );
//     if(result.matchedCount > 0){
//         return ("sucsessfully updates");
//     }else{
//         return ("No bok Found with iven title");
//     }
// }

// async function getBooksByTitle(title){
//     //let booksCollection = connection();
//     const connection  = await connect(url);
//     const db = connection.db('g7_cr_20240826');
//     const booksCollection = db.collection('books');
//     let result =await booksCollection.findOne({title});
//     return result;
// }

// module.exports = {
//     getAllBooks,
//     getAllBooksByAuthor,
//     getAllBooksByAuthorCaseInsensitive,
//     addNewBook,
//     deleteBookByTitle,
//     updateTitle,
//     getBooksByTitle
// };
















const { connect, disconnect } = require('./connection');

const url = 'mongodb://localhost/';
const dbName = 'g7_cr_20240826';
const collectionName = 'books';

// Function to connect to the database and get the books collection
async function getBooksCollection() {
    const connection = await connect(url);
    const db = connection.db(dbName);
    return db.collection(collectionName);
}

// Function to get all books
async function getAllBooks() {
    const booksCollection = await getBooksCollection();
    const books = await booksCollection.find({}).toArray();
    return books;
}

// Function to get books by author (case-sensitive)
async function getAllBooksByAuthor(author) {
    const booksCollection = await getBooksCollection();
    const book = await booksCollection.findOne({ author });
    return book;
}

// Function to get books by author (case-insensitive)
async function getAllBooksByAuthorCaseInsensitive(author) {
    const booksCollection = await getBooksCollection();
    const book = await booksCollection.findOne({ author: new RegExp(author, 'i') });
    return book;
}

// Function to add a new book
async function addNewBook(title, isbn, author, price, description, tags, cover, authorId, reviews) {
    const newBook = { title, isbn, author, price, description, tags, cover, authorId, reviews };
    const booksCollection = await getBooksCollection();
    const result = await booksCollection.insertOne(newBook);
    return result.insertedId;
}

// Function to delete a book by title
async function deleteBookByTitle(title) {
    const booksCollection = await getBooksCollection();
    await booksCollection.deleteOne({ title });
    let getBook = await booksCollection.findOne({title}).length;
    if(getBook==0){
        return `Book with title "${title}" deleted`;
    }else{
        return `No book found with title ${title}`;
    }
}

// Function to update a book's title
async function updateTitle(oldTitle, newTitle) {
    const booksCollection = await getBooksCollection();
    const result = await booksCollection.updateOne(
        { title: oldTitle },
        { $set: { title: newTitle } }
    );
    if (result.matchedCount > 0) {
        return "Successfully updated the title.";
    } else {
        return "No book found with the given title.";
    }
}

// Function to get a book by title
async function getBooksByTitle(title) {
    const booksCollection = await getBooksCollection();
    const book = await booksCollection.findOne({ title });
    return book;
}

module.exports = {
    getAllBooks,
    getAllBooksByAuthor,
    getAllBooksByAuthorCaseInsensitive,
    addNewBook,
    deleteBookByTitle,
    updateTitle,
    getBooksByTitle
};
