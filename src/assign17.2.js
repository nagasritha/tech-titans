//assign 17.1 skip 
const { isPrimeSync } = require('./duplicate');

function * findPrimesSkip(min,max){
    let skipCount=0 

    for(let i=min;i<max;i++){
        if(isPrimeSync(i)){
            if(skipCount>0){
                skipCount--
            }
            else{
                result=yield i
                 if(result>0){
                    skipCount=result
                 }
            }
        }
    }
}


let skipGenerator=findPrimesSkip(2,50) 
// for(let value of skipGenerator){
//     console.log(skipGenerator.next())
// } 

console.log(skipGenerator.next());
console.log(skipGenerator.next());
console.log(skipGenerator.next());
console.log(skipGenerator.next(2));
console.log(skipGenerator.next());
