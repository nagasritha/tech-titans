const { connect, disconnect } = require('./connection');

const url = 'mongodb://localhost/';
async function connection(){
    const connection  = await connect(url);
    const db = connection.db('g7_cr_20240826');
    const booksCollection = db.collection('books');
    return booksCollection;
}


async function getAllBooks() {
    let booksCollection = await connection();
    
    const books = await booksCollection.find({}).toArray();
    return books;
}

async function getAllBooksByAuthor(author){
    let connection = await connect(url);
    let db = connection.db('g7_cr_20240826');
    let booksCollection = db.collection('books');
    let result = await booksCollection.findOne({author});
    return result;
}

async function getAllBooksByAuthorCaseInsensitive(author) {
    let connection = await connect(url);
    let db = connection.db('g7_cr_20240826');
    let booksCollection = db.collection('books');
    const book = await booksCollection.findOne({ author: new RegExp(author, 'i') });
    return book;
}

async function addNewBook(title,isbn,author,price,description,tags,cover,authorId,reviews){
    let newBook = {title,isbn,author,price,description,tags,cover,authorId,reviews};
    const connection = await connect(url);
    const db = connection.db('g7_cr_20240826');
    const booksCollection = db.collection('books');
    const result = await booksCollection.insertOne(newBook);
    return result.insertedId;
}

async function deleteBookByTitle(title){
    const connection = await connect(url);
    const db = connection.db('g7_cr_20240826');
    const booksCollection = db.collection('books');
    const book =await booksCollection.deleteOne({title});
    return "book with title \""+title+"\" deleted"
}

async function updateTitle(title,newTitle){
    const connection = await connect(url);
    const db = connection.db('g7_cr_20240826');
    const booksCollection = db.collection('books');
    const result = await booksCollection.updateMany({title},
                                                    {$set : {title : newTitle}}
                                                    );
    if(result.matchedCount > 0){
        return ("sucsessfully updates");
    }else{
        return ("No bok Found with iven title");
    }
}

async function getBooksByTitle(title){
    //let booksCollection = connection();
    const connection  = await connect(url);
    const db = connection.db('g7_cr_20240826');
    const booksCollection = db.collection('books');
    let result =await booksCollection.findOne({title});
    return result;
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
