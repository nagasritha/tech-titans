var prompt = require('prompt-sync')();
let whileController=true
const booksList = [
    {
        id: 1,
        authorName: "George Orwell",
        title: "1984",
        genre: "Dystopian",
        publishedYear: 1949,
        price: 15.99
    },
    {
        id: 2,
        authorName: "Harper Lee",
        title: "To Kill a Mockingbird",
        genre: "Fiction",
        publishedYear: 1960,
        price: 10.99
    },
    {
        id: 3,
        authorName: "J.R.R. Tolkien",
        title: "The Hobbit",
        genre: "Fantasy",
        publishedYear: 1937,
        price: 12.99
    },
    {
        id: 4,
        authorName: "F. Scott Fitzgerald",
        title: "The Great Gatsby",
        genre: "Fiction",
        publishedYear: 1925,
        price: 14.99
    },
    {
        id: 5,
        authorName: "Jane Austen",
        title: "Pride and Prejudice",
        genre: "Romance",
        publishedYear: 1813,
        price: 9.99
    },
    {
        id: 6,
        authorName: "Markus Zusak",
        title: "The Book Thief",
        genre: "Historical Fiction",
        publishedYear: 2005,
        price: 11.99
    },
    {
        id: 7,
        authorName: "J.K. Rowling",
        title: "Harry Potter and the Sorcerer's Stone",
        genre: "Fantasy",
        publishedYear: 1997,
        price: 13.99
    },
    {
        id: 8,
        authorName: "Gabriel García Márquez",
        title: "One Hundred Years of Solitude",
        genre: "Magic Realism",
        publishedYear: 1967,
        price: 16.99
    },
    {
        id: 9,
        authorName: "Herman Melville",
        title: "Moby-Dick",
        genre: "Adventure",
        publishedYear: 1851,
        price: 17.99
    },
    {
        id: 10,
        authorName: "Leo Tolstoy",
        title: "War and Peace",
        genre: "Historical Fiction",
        publishedYear: 1869,
        price: 18.99
    }
];




console.log('Hello dude, welcome to terminal!!');

let commandsHelp = [{
    command: 'books',
    description: 'Gets all the available books '
}, {
    command: 'books by id "bookId"',
    description: "Gets the book matched with id"
}, {
    command: 'author',
    description: "Gets all the available authors"
}, {
    command: 'author "authorName"',
    description: "Gets the book matched with authorName"
}, {
    command: 'author csv"',
    description: "All authors separated by coma(,)"
}, {
    command: 'exit"',
    description: "exits from the terminal"
},]

let csvFormatter = (key) => {
    let result = ""
    booksList.map(book => result += book[key] + ", ")

    console.log(result)
}

let commands = {
    author: (cmdp) => {
        if (cmdp.length >= 2) {
            if (cmdp[1] === 'csv') {
                csvFormatter("authorName")
                return
            } else {
                let authorName = cmdp[1]
                let result = booksList.filter(b => b.authorName.toLowerCase().includes(authorName.toLowerCase()))
                console.log(result)
            }
        } else {
            for (let each of booksList) {
                console.log(each.authorName)
            }
        }

    },
    books: (cmdp) => {
        let bookId = cmdp[3] ? parseInt(cmdp[3]) : "all"
        let result = booksList.filter(b => b.id === bookId)
        if (typeof bookId === 'number') {
            console.log(result)
        } else {
            console.log(booksList)
        }
    },
    help: () => {
        console.log('Available commands:');
        for (let each of commandsHelp) {
            console.log(`${each.command} --->      ${each.description}`)
        }
        console.log('Type "exit" to quit.');
    },
    h: () => {
        commands.help()
    },
    exit: () => {
        console.log('see you again!');
         whileController=false
    },
    e: () => {
        commands.exit()
    }
}

let commandsList = []
for (let key in commands) {
    commandsList.push(key)
}

while (whileController) {
    var command = prompt('>');

    if (command) {
        command = command.toString().split(" ")
        if (commandsList.includes(command[0])) {
            let commandOutput = commands[command[0]]
            commandOutput(command)

        }
        else {
            // console.log('else commond', command)
            console.log(`Uncaught ReferenceError, ${command} not found!!`)

        }


    }
    else {
        whileController=false
    }
}


// let args=process.argv.slice(2)
// //console.log("args------------->",args) 




