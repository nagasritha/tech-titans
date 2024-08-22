class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    toString() {
        return `left-child: ${this.left ? this.left.value : 'null'}, `
             + `current value: ${this.value}, `
             + `right-child: ${this.right ? this.right.value : 'null'}`;
    }
}

class BinarySearchTree {
    constructor(...values) {
        this.root = null;
        this.size = 0;
        this.add(...values);
    }

    add(...values) {
        for (let value of values) {
            this.root = this._addNode(this.root, value);
        }
    }

    _addNode(node, value) {
        if (node === null) {
            this.size++;
            return new Node(value);
        }
        if (value < node.value) {
            node.left = this._addNode(node.left, value);
        } else if (value > node.value) {
            node.right = this._addNode(node.right, value);
        }
        return node;
    }
   
    contain(value){
        if(typeof value !== typeof this.root.value){
            throw new Error("type of the value dosen't match with the existing values type, valid type is "+(typeof this.root.value));
        }
        return this.containValue(this.root,value);
    }

    containValue(node,value){
        if(node==null || node.value === value){
            return node;
        }
        if(value > node.value){
            return this.containValue(node.right,value);
        }else if(value < node.value){
            return this.containValue(node.left,value);
        }
    }

    sort(order= 'asc') {
        const result = [];
        this._Order(this.root, result,order);
        return result;
    }

    _Order(node, result, order) {
        
            
        if (node !== null) {
            let firstVisitNode = order==='asc' ? node.left : node.right;
            let secondVisitNode = order==='asc' ? node.right : node.left;
        
            this._Order(firstVisitNode, result, order);
            result.push(node.value);
            this._Order(secondVisitNode, result, order);
        }
    }

    getSize() {
        return this.size;
    }

    getRoot() {
        return this.root;
    }
}

try {
    module.exports = { BinarySearchTree };
} catch (e) {
    }
