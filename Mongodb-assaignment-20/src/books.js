

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
    const book = await booksCollection.findOne({ author: /`${author}`/ });
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
