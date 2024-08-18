let {BinarySearchTree} = require('./index.js')

let binaryList = new BinarySearchTree(1,2,3,4,1,2,3,4,0);


console.log(binaryList.root);
console.log(binaryList.size); 
console.log(binaryList.contain(1));
console.log(binaryList.OrderTraversal('desc'));
