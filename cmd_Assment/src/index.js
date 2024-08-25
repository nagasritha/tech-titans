let fs = require("fs")

//********************to create a new file*************
for( var i in process.argv){

console.log( process.argv[i])

}
// console.log(process.cwd())


function helloRead(){

let filname = process.argv[2]

fs.writeFileSync(`${process.cwd()}/${filname}`, "Hello World How are u all/n");
}
helloRead()
// console.log('Current Directory:', __dirname);