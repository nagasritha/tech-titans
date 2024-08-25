"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
class NewNode {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}
class LinkedList {
    constructor(...values) {
        this.first = null;
        this.last = null;
        this._size = 0;
        for (let value of values) {
            this._append(value);
        }
    }
    append(...values) {
        for (const value of values) {
            this._append(value);
        }
    }
    isEmpty() {
        return this._size === 0;
    }
    _append(value) {
        const newNode = new NewNode(value);
        if (!this.isEmpty()) {
            this.first = newNode;
        }
        else {
            this.last.next = newNode;
        }
        this.last = newNode;
        this._size++;
    }
    validateIndex(index) {
        if (typeof index !== 'number') {
            throw new TypeError('Index must be a number');
        }
        if (index < 0 || index >= this._size) {
            index += this._size;
        }
        if (index < 0 || index >= this._size) {
            throw new RangeError(`Index out of range :${index}. valid range=`);
        }
        return index;
    }
    locate(index) {
        index = this.validateIndex(index);
        let current = this.first;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }
    ;
    size() {
        return this._size;
    }
    get(index) {
        return this.locate(index).data;
    }
    set(index, value) {
        this.locate(index).data = value;
    }
    insert(index, value) {
        index = this.validateIndex(index);
        const node = new NewNode(value);
        if (index === 0) {
            node.next = this.first;
            this.first = node;
        }
        else {
            const n = this.locate(index - 1);
            node.next = n.next;
            n.next = node;
        }
        this._size++;
    }
    remove(index) {
        var _a;
        this.validateIndex(index);
        if (index === 0) {
            const removeNode = this.first;
            this.first = ((_a = this.first) === null || _a === void 0 ? void 0 : _a.next) || null;
            if (this.first === null) {
                this.last = null;
            }
            this._size--;
            return removeNode === null || removeNode === void 0 ? void 0 : removeNode.data;
        }
        const previousNode = this.locate(index - 1);
        const removeNode = previousNode.next;
        previousNode.next = (removeNode === null || removeNode === void 0 ? void 0 : removeNode.next) || null;
        if (removeNode === this.last) {
            this.last = previousNode;
        }
        this._size--;
        return removeNode === null || removeNode === void 0 ? void 0 : removeNode.data;
    }
    forEach(execute) {
        let i = 0;
        for (let n = this.first; n; n = n.next) {
            if (execute(n.data, i) === false) {
                break;
            }
            i++;
        }
    }
    toString() {
        let str = 'LinkedList(\t';
        for (let n = this.first; n; n = n.next) {
            str += n.data + '\t';
        }
        return str + ')';
    }
    filter(matcher) {
        const result = new LinkedList();
        this.forEach(v => {
            if (matcher(v)) {
                result.append(v);
            }
        });
        return result;
    }
    find(matcher) {
        let result;
        this.forEach(v => {
            if (matcher(v)) {
                result = v;
                return false;
            }
        });
        return result;
    }
}
exports.LinkedList = LinkedList;
