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
        var smallv = 0 
        // if ( matchfull.length()=== 1) {
        //   console.log(1)
        // }
        //  for (var i of  matchfull){
        //      if (i[condition] > smallv){
               
        //      }
        //  }
      
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

// getMatchingitems(valu){
//  var currentInput = valu;
//  var currentNode = this._first
// var list = new LinkedList()

// if(typeof(currentInput) === Object){
//   var obj = Object.keys(currentInput)

// }
// else if(typeof(currentInput) === "string"){
//  v = getdatau(currentInput)
//   var k = v.find(v=> v.v  === currentInput)
//   list.append(k)
//   console.log(k)

// }

// }

// filterbymutipleoption(obj) {
//   var { author = null, price = null, rating = null } = obj;
//   price = price === "" ? null : price;

//   var min = null;
//   var max = null;

//   if (rating) {
//     var km = rating.split(",");
//     min = km[0] ? parseFloat(km[0]) : null;
//     max = km[1] ? parseFloat(km[1]) : null;
//   }

//   var result = this._books.filter((v) => {
//     var res =
//       (author === null
//         ? true
//         : v.author.toLowerCase().includes(author.toLowerCase())) &&
//       (price === null ? true : v.price <= price) &&
//       (rating === null
//         ? true
//         : (min === null || v.rating >= min) &&
//           (max === null || v.rating <= max));

//     return res;
//   });

//   return result;
// }

//end tag

// var lis = new LinkedList()

// lis.append(20)
// lis.append(90)
// lis.append(30)
// lis.append(50)
// lis.append(80)
// lis.append(90)

// lis.sortThebook()
// console.log(lis)

// try {
//   module.exports.LinkedList = LinkedList;
//   module.exports.Node = Node;
// } catch (e) {}

// var count = 50000

// var start=performance.now();
// var  result  = sortbyitem(count)
// var end=performance.now();

// console.log('total time taken', end-start);

// var start=performance.now();
// var  resul2  = sumList(list)
// var end=performance.now();

// console.log('total time taken', end-start);

// sortTheitems(getthesortone) {
//   for (var i = 0; i < this._size; ++i) {
//     let current = this._first;
//     for (var j = 0; j < this._size - i; ++j) {
//       if (getthesortone(current.value, current.next.value)) {
//         let abc= current.value
//         current.value = current.next.value;
//         current.next.value = abc
//       }
//     }

//   }
// }

// getMatchingitems(criteria, operator = "AND") {
//   const result = new LinkedList();

//   const matchCondition = (value, criterion) => {
//     if (typeof criterion === "function") return criterion(value);
//     if (typeof criterion === "object") {
//       if (criterion.contains) return contains(criterion.contains)(value);
//       if (criterion.lt) return lt(criterion.lt)(value);
//       if (criterion.between) return between(...criterion.between)(value);
//     }
//     return value === criterion;
//   };

//   this.forEach((book) => {
//     let match = operator === "AND";
//     for (let key in criteria) {
//       const criterion = criteria[key];
//       const value = book[key];
//       const conditionMatch = matchCondition(value, criterion);

//       match = operator === "AND" ? match && conditionMatch : match || conditionMatch;
//     }
//     if (match) result.append(book);
//   });

//   return result;
// }

//   groupBy_(container) {
//   var result = new LinkedList();
//    let count = 0
//     //matching with each book
//     var groupbyMatches = (item, container) => {
//       var temp_result = []

//       for (var key in container) {
//           var condition = container[key];
//           var value = item[key];

//           if (condition.functionName ==="contains" ) {
//               if (condition(value)) {
//                 temp_result.push(item)
//                 count ++
//               }
//           }

//           if ( key.toLowerCase() ==="sum" ){
//                condition  = item[key]
//            var result =  temp_result.every((item)=> sum(item[condition]))
//            console.log(result)
//           }

//           // console.log(`${key}:`, condition.functionName || "anonymous");

//           // if (condition.toLowerCase() === "sum"){

//           //   condition.every((item)=>  groupbyMatches(item ,condition))
//           // }

//           // if (condition.functionName ==="contains" ) {
//           //     if (condition(value)) {
//           //       count ++
//           //         return true;
//           //     }
//           // }
//       }

//       return false;

//   };

//end class
