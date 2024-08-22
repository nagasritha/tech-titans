class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;

    }
}

class LinkedList {

    constructor(...values) {
        this._first = null;
        this._last = null;
        this._size = 0;
        this._currentIndex = undefined;
        this._current = null; //nothing located yet.


        // console.log('constructor', values);

        for (var value of values) {
            this._append(value);
        }



    }

    append(...values) {
        // console.log('append', values);

        for (var value of values) {
            this._append(value);
        }
    }

    isEmpty() {
        return this._size === 0;
    }

    _append(value) {
        // var newNode = {
        //     value: value,
        //     next: null
        // };

        var newNode = new Node(value);

        if (this.isEmpty())
            this._first = newNode;
        else
            this._last.next = newNode;


        this._last = newNode;
        this._size++;
    }

    _validateIndex(index) {

        if (typeof index !== 'number')
            throw new TypeError('Index must be a number');

        if (index < 0)
            index += this._size;

        if (index < 0 || index >= this._size)
            throw new RangeError(`Index out of range: ${index}. valid range=(0-${this._size - 1})`);

        return index;
    }

    _locate(index) {
        index = this._validateIndex(index);

        //default case. start from begining
        var current = this._first;
        var startIndex = 0;
        var steps = index;

        if (this._current && this._currentIndex < index) {
            startIndex = this._currentIndex;
            current = this._current;
            steps = index - this._currentIndex;

        }

        //console.log(`locating from start=${startIndex}\tsteps=${steps}`);

        for (var i = 0; i < steps; i++) {

            current = current.next;
        }


        this._current = current;
        this._currentIndex = index;
        return current;
    }

    size() {
        return this._size;
    }

    get(index) {
        return this._locate(index).value;
    }

    set(index, value) {
        this._locate(index).value = value;
    }

    insert(index, value) {
        index = this._validateIndex(index);

        var newNode = new Node(value);


        if (index === 0) {
            newNode.next = this._first;
            this._first = newNode;
        } else {
            var n = this._locate(index - 1);
            newNode.next = n.next;
            n.next = newNode;
        }
        this._size++;

    }

    remove(index) {
        if (index == 0) {
            let updatedList = this._first.next;
            this._first = updatedList;
        } else {
            let validIndex = this._validateIndex(index);
            let prev = this._locate(validIndex - 1);
            prev.next = prev.next.next;
        }
        this._size--;
    }


    removeMatchedItems(matcher, limit) {

    }


    toString() {
        var str = "LinkedList(\t";
        for (var n = this._first; n; n = n.next) {
            str += n.value + "\t";
        }

        return str + ")";
    }

    forEach(execute) {
        var i = 0;
        for (var n = this._first; n; n = n.next) {
            var result = execute(n.value, i);
            if (result !== undefined)
                return result;
            i++;

        }
    }

    // filter(matcher) {
    //     var result = new LinkedList();

    //     this.forEach(v => {
    //         if (matcher(v)) {
    //             result.append(v);
    //         }
    //     });

    //     return result;
    // }

    find(criteria) {
        let current = this._first;
        while (current) {
            if (criteria(current)) {
                return current.value;
            }
            current = current.next;
        }
        return null;
    }



    *map(mapper) {
        let current = this._first;
        while (current) {
            yield mapper(current.value); // Corrected to `yield`
            current = current.next;
        }
    }
    

    sum(property) {
        let result = 0;
        this.forEach(v => {
            result += property ? property(v) : v;
        });
        return result;
    }

    average(property) {
        let sum = this.sum(property);
        return sum / this.size();
    }

    clone() {
        const clonedList = new LinkedList();
        this.forEach(value => clonedList.append(value));
        return clonedList;
    }

    sort(returnValue, order = "asc",) {
        if (!["asc", "desc"].includes(order)) {
            throw new Error("Incorrect order, accepted order params are asc and desc");
        }

        let clonedList = this.clone();
        if (this.size() <= 1) return this._first;
        for (var n = this.size(); n >= 1; n--) {
            let current = clonedList._first;
            for (var i = 0; i < n - 1; i++) {

                let ascCondition = ((returnValue ? returnValue(current.value) : current.value) > (returnValue ? returnValue(current.next.value) : current.next.value))
                let descCondition = ((returnValue ? returnValue(current.value) : current.value) < (returnValue ? returnValue(current.next.value) : current.next.value))

                let condition = (order === "asc") ? ascCondition : descCondition
                if (condition) {
                    let temp = current.next.value;
                    current.next.value = current.value;
                    current.value = temp;
                }
                current = current.next;
            }
        }

        return clonedList;
    }

    getIndex(matcher) {
        let current = this._first;
        let result = -1;
        for (var i = 0; i < this.size(); i++) {
            if (matcher(current.value)) {
                result = i;
                break;
            }
            current = current.next;
        }
        return result;
    }

    filter(matcher,requirement="all") {
        let resultList = new LinkedList();
        let current = this._first;

        while (current) {
            let meetsCriteria;

            if (typeof matcher === 'function') {
                meetsCriteria = matcher(current.value);
            } else if (typeof matcher === 'object') {
                let condition = requirement==='all'? objectLogicAnd : objectLogicOr
                meetsCriteria = condition(matcher, current);
            } else {
                throw new TypeError("Matcher must be a function or an object");
            }

            if (meetsCriteria) {
                resultList._append(current.value);
            }

            current = current.next;
        }

        return resultList;
    }

    // objectLogic(object,current){
    //     let result = true;
    //     for (var item in object) {
    //         let value;
    //         if (typeof current.value !== 'object') {
    //             value = current.value;
    //         } else {
    //             value = current.value[item];
    //         }
    //         if (typeof object[item] === 'function') {

    //             if (!object[item](value)) {
    //                 result = false;
    //                 break;
    //             }
    //         } else {
    //             if (!(value === object[item])) {
    //                 result = false;
    //                 break;
    //             }
    //         }
    //     }
    //     return result;
    // }
}

class ExtendedLinkedList extends LinkedList {
    remove(param1, limit = Infinity) {
        if (typeof param1 !== "function") {
            // Case 1: Remove by index
            let index = param1;
            this._validateIndex(index);

            if (index === 0) {
                let removedValue = this._first.value;
                this._first = this._first.next;
                this._size--;
                return removedValue;
            }

            let prev = this._locate(index - 1);
            let removedValue = prev.next.value;
            prev.next = prev.next.next;
            this._size--;
            return removedValue;
        } else {
            // Case 2: Remove by matcher
            let matcher = param1;
            let count = 0;
            let current = this._first;

            // while (current) {
            //     if (matcher(current.value)) {
            //         count++;

            //         if (prev === null) {
            //             this._first = current.next;
            //             current = this._first;
            //         } else {
            //             prev.next = current.next;
            //             current = prev.next;
            //         }
            //         this._size--;

            //         if (count >= limit) {
            //             break;
            //         }
            //     } else {
            //         prev = current;
            //         current = current.next;
            //     }
            // }

            let removedListItems = new LinkedList;

            for (var i = 0; i < this.size(); i++) {
                let value = this.get(i);
                if (matcher(value)) {
                    removedListItems.append(value);
                    this.remove(i);
                }
            }
            return removedListItems;
        }
    }


}
function objectLogicAnd(criteria, current) {
    let result = true;

    for (let key in criteria) {
        let value = current.value;

        // Ensure value is an object if we are accessing properties
        if (typeof value === 'object' && value !== null) {
            value = value[key];
        }

        // Handle function criteria
        if (typeof criteria[key] === 'function') {
            if (!criteria[key](value)) {
                result = false;
                break;
            }
        } else {
            // Handle exact match criteria
            if (value !== criteria[key]) {
                result = false;
                break;
            }
        }
    }

    return result;
}


function objectLogicOr(criteria, current) {
    let result = false;

    for (let key in criteria) {
        let value = current.value;

        // Ensure value is an object if we are accessing properties
        if (typeof value === 'object' && value !== null) {
            value = value[key];
        }

        // Handle function criteria
        if (typeof criteria[key] === 'function') {
            if (criteria[key](value)) {
                result = true;
                break; // Exit loop as we found a matching condition
            }
        } else {
            // Handle exact match criteria
            if (value === criteria[key]) {
                result = true;
                break; // Exit loop as we found a matching condition
            }
        }
    }

    return result;
}





try {
    module.exports = {
        LinkedList,
        ExtendedLinkedList,
        Node,
        objectLogicAnd,
        objectLogicOr,
    };

} catch (e) {

}