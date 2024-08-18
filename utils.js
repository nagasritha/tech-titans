function take(n, matcher) {
  var count = 0;
  
  if (!matcher) matcher = (v) => true;

  return (v) => {
    if (n && count === n) return; //break the loop
    var matched = matcher(v);
    if (matched) count++;
    return matched;
  };
}


function skip(n=0, skipper) {
    var count = 0;
    var skiplimit = n;
    // var stoplimit = count - skiplimit
    if (!skipper) skipper = () => true;
  
    return (v) => {
        var skipper_Val = skipper(v);
        if (skipper_Val) {
          count++;
          if(count > skiplimit ){
            return skipper_Val;
          }else{

            return false;
            
          }
      }

    };
  }
  

function distinct(matcher){
    let items=[]
    
    return b=>{
       var item=matcher(b)
        if(items.includes(b)){
            return false
       }else{
           items.push(item)
            return true
       }
      
    }
    
}



var gt = function (value) {
  const fn = (num) => num > value;
  fn.functionName = 'gt';
  return fn;
};

function lt(value) {
  const fn = (num) => num < value;
  fn.functionName = 'lt';
  return fn;
}

function contains(substring) {
  const fn = (str) => str.includes(substring);
  fn.functionName = 'contains';
  return fn;
}

function between(min, max) {
  const fn = (num) => num >= min && num <= max;
  fn.functionName = 'between';
  return fn;
}


try {
  module.exports = {
    contains,take,gt,lt,between
  };
} catch (e) {}
