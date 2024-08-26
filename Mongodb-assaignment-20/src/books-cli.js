// const CLI = require('./cli.js');
// const { getAllBooks, 
//         getAllBooksByAuthor, 
//         getAllBooksByAuthorCaseInsensitive , 
//         addNewBook, 
//         deleteBookByTitle, 
//         updateTitle,
//         getBooksByTitle} = require('./books.js');
// const { disconnect } = require('./connection.js');

// const app = new CLI("Books' CLI", { close: disconnect });

// // Add command to get all books
// app.addCommand(getAllBooks, 'books', 'Get a list of books');

// // Add command to get books that match author name approximately
// app.addCommand(getAllBooksByAuthor, 'get', 'Get books that match author name approximately');

// app.addCommand(getAllBooksByAuthorCaseInsensitive,'getByAuthor','retreive the books written by given author');

// app.addCommand(addNewBook, 'add','addes new Item in to the existing books collection');

// app.addCommand(deleteBookByTitle, 'delete', 'Delete books by Title');

// app.addCommand(updateTitle,'update','updates the book old title with new Title');

// app.addCommand(getBooksByTitle,'getBookByTitle', 'retreives the bok that matches given title');

// app.run();




















const CLI = require('./cli.js');
const {
    getAllBooks,
    getAllBooksByAuthor,
    getAllBooksByAuthorCaseInsensitive,
    addNewBook,
    deleteBookByTitle,
    updateTitle,
    getBooksByTitle
} = require('./books.js');
const { disconnect } = require('./connection.js');

const app = new CLI("Books' CLI", { close: disconnect });

// Command to get all books
app.addCommand(getAllBooks, 'books', 'Get a list of all books');

// Command to get books by author (case-sensitive)
app.addCommand(getAllBooksByAuthor, 'getByAuthorWithPerfectMatch', 'Get books by a specific author (case-sensitive)');

// Command to get books by author (case-insensitive)
app.addCommand(getAllBooksByAuthorCaseInsensitive, 'getByAuthor', 'Retrieve books written by the given author (case-insensitive)');

// Command to add a new book
app.addCommand(addNewBook, 'add', 'Add a new book to the collection');

// Command to delete a book by title
app.addCommand(deleteBookByTitle, 'deletebyTitle', 'Delete a book by its title');

// Command to update a book's title
app.addCommand(updateTitle, 'updateTitle', 'Update the title of a book');

// Command to get a book by title
app.addCommand(getBooksByTitle, 'getBookByTitle', 'Retrieve a book by its title');

app.run();
