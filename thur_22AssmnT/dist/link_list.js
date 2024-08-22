"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Linklist = void 0;
class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}
class Linklist {
    constructor(...value) {
        this.first = null;
        this.last = null;
        this.size = 0;
        this._current = null;
        this._currentIndex = 0;
        value.forEach((v) => this.append(v));
    }
    _append(v) {
        let newNode = new Node(v);
        if (this.first === null) {
            this.first = newNode;
        }
        else {
            if (this.last) {
                this.last.next = newNode;
            }
        }
        this.size++;
        this.last = newNode;
    }
    append(...value) {
        for (var i of value) {
            this._append(i);
        }
    }
    isEmtpy() {
        return this.size === 0;
    }
    toString() {
        let str = "LinkedList(\t";
        this.forEach((v) => {
            str += v + "\t";
        });
        return str + ")";
    }
    _validateIndex(index) {
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
    _locate(index) {
        index = this._validateIndex(index);
        let current = this.first;
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
        return current;
    }
    set(index, value) {
        this._locate(index).value = value;
        return this;
    }
    insert(index, value) {
        index = this._validateIndex(index);
        let newNode = new Node(value);
        let node = this._locate(index - 1);
        if (index === 0) {
            newNode.next = this.first;
            this.first = newNode;
        }
        else {
            var n = this._locate(index - 1);
            newNode.next = n.next;
            n.next = newNode;
        }
        this.size++;
        return this;
    }
    forEach(callback) {
        let current = this.first;
        let count = 0;
        while (current) {
            const result = callback(current.value, count);
            if (result === false)
                break;
            current = current.next;
            count++;
        }
    }
}
exports.Linklist = Linklist;
var list = new Linklist();
list.append(1, 2, 3, 4, 5, 6, 7, 8);
list.set(3, 50);
console.log(list._validateIndex(9));
console.log(list.toString());
// console.log(list.forEach())
