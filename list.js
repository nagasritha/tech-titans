const { gt, lt, contains, between, sum } = require("./utils");

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
    this._current = null;

    for (const value of values) {
      this._append(value);
    }
  }

  _append(value) {
    const newNode = new Node(value);

    if (this._size === 0) {
      this._first = newNode;
    } else {
      this._last.next = newNode;
    }

    this._last = newNode;
    this._size++;
  }

  forEach(callback) {
    let current = this._first;
    let index = 0;

    while (current) {
      const result = callback(current.value, index);
      if (result === false) break;
      current = current.next;
      index++;
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

  toString() {
    let str = "LinkedList(\t";
    this.forEach((v) => {
      str += v + "\t";
    });
    return str + ")";
  }

  ///starta

  getMatchingitems(matchCateria) {
    let result = new LinkedList();

    var specify = function (value, condition) {
      if (typeof condition === "function") {
        return condition(value);
      }
      if (typeof condition === "object") {
        if (condition.contains) return contains(condition.contains)(value);
        if (condition.gt) return gt(condition.gt)(value);
        if (condition.lt) return lt(condition.lt)(value);
        if (condition.between) return between(...condition.between)(value);
      }
      return false;
    };

    let match = function (item, matchCateria) {
      for (var key in matchCateria) {
        var condition = matchCateria[key];

        // handle 'or'
        if (key.toLowerCase() === "or") {
        

          if (condition.some((eachone) => match(item, eachone))) {
            return true;
          }
          return false;
        }

        // handle 'and'
        if (key.toLowerCase() === "and") {
          if (condition.every((each0ne) => match(item, each0ne))) {
            return true;
          }
          return false;
        }

        //single Mtch
        var value = item[key];
        if (!specify(value, condition)) {
          return false;
        }
      }
      return true;
    };

    //calling for each to get each item from book or anything
    this.forEach((item) => {
      if (match(item, matchCateria)) {
        result.append(item);
      }
    });

    return result;
  }



  

  //GROUP by
  groupBy_(container) {
    var result = new LinkedList();
    var matchedItems = {};
     var matchfull =[]
     let countv=0
    var groupbyMatches = (item, container) => {
      //itertaing on the simple 
      for (var key in container) {
        var condition = container[key];
        var value = item[key];
        // console.log(condition)

       if ((typeof condition === "function") && (condition(value))){
        countv = countv + 1
            matchfull.push(item)
            matchedItems[value] = countv  
            // for total
       }

       if( key.toLowerCase() ==="sum" ){ 
        var total = 0 
          for (var i  of matchfull){
            total += i[condition]
          }
          matchedItems[`total${condition}`] = total
       }

       if( key.toLowerCase() ==="avg" ){ 
         var  total = 0
         var numitems = 0
          for (var i of  matchfull){
            total +=  i[condition]
            numitems ++
          }
       
          matchedItems[`Average${condition}`]= total /numitems
       }
       if( key.toLowerCase() ==="min" ){ 
        
        // if ( matchfull.length()=== 1) {
        //   console.log(1)
        // }
      
         matchedItems[`Average${condition}`]= total /numitems
      }




      }
     
    };
  
    this.forEach((item) => {
      if (groupbyMatches(item, container)) {
        matchedItems.push(item);
        // result.append(item);
      }
    });
   
    
    return matchedItems
  }
  
}




try {
  module.exports.LinkedList = LinkedList;
  module.exports.Node = Node;
} catch (e) {}

