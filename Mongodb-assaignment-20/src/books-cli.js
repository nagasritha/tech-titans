const CLI = require('./cli.js');
const { getAllBooks, 
        getAllBooksByAuthor, 
        getAllBooksByAuthorCaseInsensitive , 
        addNewBook, 
        deleteBookByTitle, 
        updateTitle,
        getBooksByTitle} = require('./books.js');
const { disconnect } = require('./connection.js');

const app = new CLI("Books' CLI", { close: disconnect });

// Add command to get all books
app.addCommand(getAllBooks, 'books', 'Get a list of books');

// Add command to get books that match author name approximately
app.addCommand(getAllBooksByAuthor, 'get', 'Get books that match author name approximately');

app.addCommand(getAllBooksByAuthorCaseInsensitive,'getByAuthor','retreive the books written by given author');

app.addCommand(addNewBook, 'add','addes new Item in to the existing books collection');

app.addCommand(deleteBookByTitle, 'delete', 'Delete books by Title');

app.addCommand(updateTitle,'update','updates the book old title with new Title');

app.addCommand(getBooksByTitle,'getBookByTitle', 'retreives the bok that matches given title');

app.run();
