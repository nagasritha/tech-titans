var CLI = require('./cli');
var {getAllAuthors,getAuthorById,deleteAuthorById,updateAuthorById,addNewAuthor,getAuthorByName} = require('./authors');
var {disconnect} = require('./connection');
    


var app = new CLI("Author's CLI",{close:disconnect});
app.addCommand(getAllAuthors, "authors","Get a list of all authors", "get-authors","authors-list");
app.addCommand(getAuthorById, "author","Get an author by ID", "get-author","author-info");
app.addCommand(getAuthorByName, "authorbyName","Get an author by Name", "get-author","author-info");
app.addCommand(deleteAuthorById,"deleteAuthor","Deletes an author by ID","delete-author","deleted-author-info")
app.addCommand(updateAuthorById,"updateAuthor","updates an author by ID","update-author","updated-author-info")
app.addCommand(addNewAuthor, "addAuthor", "Adds a new author", "add-author", "new-author");



app.run(); 