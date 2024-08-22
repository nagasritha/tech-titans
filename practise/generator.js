function * generator(){
    
    yield(1);
    console.log("first call");
    let result = yield(2);
    console.log('second call', result);
    yield(3);
    console.log('third call');
    result = yield(4);
    console.log(result);
}
let resultNew = generator();
console.log(resultNew.next());
console.log(resultNew.next(4));
// console.log(resultNew.next(3));

function * generator2(){
    for(var i=0;i<10;i++){
    let result = yield(i);
    console.log(result);
    if(result == 'abort'){
        return;
    }
}
}

function returnValues(){
    let a = 10;
    function b(){
        return 1;
    }
    let c =10;
    return (value === "hello")
        
    
}

let value = returnValues();
console.log(value[0]);