var { connect, disconnect } = require("./connection");

var url = "mongodb+srv://Kiran_66:Kiran@atlascluster.i4zc8.mongodb.net/";

async function getAllAuthors() {
  var connection = await connect(url);
  var db = connection.db("g7");
  var authors = db.collection("authors");

  var authors = await authors.find({}, { biography: 0, _id: 0 }).toArray();

  return authors;
}

async function getAuthorById(id) {
  var connection = await connect(url);
  var db = connection.db("g7");
  var authors = db.collection("authors");
  var author = await authors.findOne({ id });
  return author;
}

module.exports = {
  getAllAuthors,
  getAuthorById,
};
