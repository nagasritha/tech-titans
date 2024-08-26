const CLI = require('./cliFramework');

const cli = new CLI();

const books = [
    { id: 'manas', title: 'Manas Book', author: 'Author A' },
    { id: 'example', title: 'Example Book', author: 'Author B' }
];



cli.registerCommand('get-all-books', () => {
    console.log("Books list:");
    books.forEach(book => console.log(`ID: ${book.id}, Title: ${book.title}, Author: ${book.author}`));
}, 'Gives a list of all books');

cli.registerCommand('get-book-by-id', (args) => {
    const book = books.find(book => book.id === args[0]);
    if (book) {
        console.log(`ID: ${book.id}, Title: ${book.title}, Author: ${book.author}`);
    } else {
        console.log(`Book with ID "${args[0]}" not found.`);
    }
}, 'Gives book by id', ['find-book-by-id', 'lookup-book-by-id']);

cli.run(process.argv);
