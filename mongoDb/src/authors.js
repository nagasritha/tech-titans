var {connect,disconnect} =require('./connection');

var url='mongodb+srv://ShivaPatel:Shiva@shivapatel.z9rhive.mongodb.net/';

async function getAllAuthors(){
    var connection= await connect(url);

    var db= connection.db('test');

    var authors= db.collection('books');

    var authors= await authors.find({},{biography:0,_id:0}).toArray();

    return authors;

}

async function getAuthorById(id){

    var connection= await connect(url);
    var db= connection.db('test');
    var authors= db.collection('books');
    var author=await authors.findOne({id});
    return author;

} 

async function getAuthorByName(name) {
    var connection=await connect(url) 
    var db=connection.db('test');
    var authors=db.collection('books')
    var authorsList=await authors.find({name:name})
    return authorsList
}

async function deleteAuthorById(id) {
    var connection= await connect(url);
    var db= connection.db('test');
    var authors= db.collection('books'); 
    var author=await authors.findOneAndDelete({id})
    return author
}

async function updateAuthorById(id,key,value){
    //console.log("Update Object:", object);
    // if (!object || typeof object !== 'object' || Object.keys(object).length === 0) {
    //     throw new Error("The update object is null, undefined, or empty. Please provide valid update data.");
    // }
    var connection= await connect(url);
    var db= connection.db('test');
    var authors= db.collection('books'); 
    var author=await authors.updateOne({id},{$set:{
        [key]:value
    }})
    return author
} 



async function addNewAuthor(name,id,photo,biography,tags){
    let authorObject={name,id,photo,biography,tags}
    var connection= await connect(url);
    var db= connection.db('test');
    var authors= db.collection('books'); 
    var author=await authors.insertOne(authorObject)
    return author
}


module.exports={
    getAllAuthors,
    getAuthorById,
    getAuthorByName,
    deleteAuthorById,
    updateAuthorById,
    addNewAuthor
}