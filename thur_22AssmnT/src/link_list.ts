import { convertToObject } from "typescript";

class Node <T> {
  constructor(public value : T, public next:Node <T>|null=null){
  }
  
}


export class Linklist <T>{
    private first: Node<T> | null = null;
    private last: Node<T> | null = null;
    private size = 0;
    private _current: Node<T> | null = null;
    private _currentIndex = 0;

 constructor(...value: T[]){
    value.forEach((v) => this.append(v));
 }



 _append (v :T){
 let newNode  =  new Node(v)
    if(this.first === null){
        this.first = newNode;
       
    }else{
        if(this.last)
            {this.last.next =newNode}
       

    }
    this.size++
    this.last = newNode
 }

 append(...value: T[]){

    for (var i of value){
        this._append(i)
    } 
         
    }
isEmpty(){
  return  this.size === 0;
}

toString() {
    let str = "LinkedList(\t";
    this.forEach((v) => {
      str += v + "\t";
    });
    return str + ")";
  }

  _validateIndex(index: number) {
    if (typeof index !== 'number') {
      throw new TypeError(`Index must be a number: "${index}"`);
    }

    if (index < 0) {
      index += this.size;
    }

    if (index < 0 || index >= this.size) {
      throw new RangeError(`Index out of range: ${index}. Valid range=(0-${this.size - 1})`);
    }

    return index;
  }

_locate(index: number) {
    
   index =  this._validateIndex(index)
    let current = this.first
    let startIndex = 0;

    
    if (this._current && this._currentIndex <= index) {
        startIndex = this._currentIndex;
        current = this._current;
    }

  
    let steps = index - startIndex;
    while (steps > 0 && current) {
        current = current.next;
        steps--;
    }

    this._current = current;
    this._currentIndex = index;

    return current!;
}


set(index: number, value: T) {
    this. _locate(index).value = value;
    return this;
}

insert(index:number, value:T ){
    index =  this._validateIndex(index)
    let newNode  =  new Node(value)
   let node  =  this. _locate(index-1) 
 
   if (index === 0) {
    newNode.next = this.first;
    this.first = newNode;
} else {
    var n = this._locate(index - 1);
    newNode.next = n.next;
    n.next = newNode;
}
   this.size++;
return this;
} 


forEach(callback: (v: T, index:number) => void | boolean) {
    let current = this.first;
     let count = 0
    while (current) {
      const result = callback(current.value,count) ;
      if (result === false) break;
      current = current.next;
      count++
    }
  }



}

var list  = new Linklist()

list.append(1,2,3,4,5,6,7,8)
list.set(3, 50)
console.log(list._validateIndex(9))
console.log(list.toString())
// console.log(list.forEach())