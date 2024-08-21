function findPrimes(min,max){
    let promise=new Promise((resolve,reject)=>{
        if(max<=min){
            reject(new Error('invalid range'))
        }else{
            let result=[] 
            for(let i=2;i<max;i++){
                let count=0
                for(let j=2;j<i;j++){
                    if(i%j===0){
                        count++ 
                    }
                }
                if(count===0){
                    result.push(i)
                }
            }
            resolve(result)
        }
    })

    return promise
}



function findPrimesCB(min, max, callback) {
    if (min > max) {
        return callback(new Error('enter valid range'))
    }
    let result = []
    for (let i = min; i < max; i++) {
        let count = 0
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                count++
                if (count > 0) {
                    break
                }
            }
        }
        if (count === 0) {
            result.push(i)
        }

    }
    callback(null,result)
}
 

// findPrimesCB(10, 50, (err, primes) => {
//     if (err) {
//         console.error(err.message);
//     } else {
//         console.log("Primes using nodejs:", primes);
//     }
// });

function isPrimeSync(value) {
    if (value < 2)
        return false;

    for (var i = 2; i < value; i++) {
        if (value % i === 0)
            return false;
    }  

    return true;
}



// var tasks=0

// function findPrimesInteractive(min,max,cb){
//     if(cb===undefined){
//         throw new Error('Callback is not defined')
//     }

//     let low=min 
//     let high=max 
//     let id=++tasks 

//     let index=0 
//     let primes=[] 

//     const intervalId=setInterval(()=>{
//         if(min>=max){
//             cb({message:'error',id,min,max,error:'Invalid Range'})
//             clearInterval(intervalId) 
//             return
//         } 

//         for(let i=low;i<high;i++){
//             if(isPrimeSync(i)){
//                 index++; 
//                 cb({message:'prime',id,min,max,index,prime:i})
//                 primes.push(i)
//             }
//         }
//         cb({message:"Progress",id,min,max,done:(high-min),primes:index})
        
//         low=high 
//         high=Math.min(max,low+1000); 
//         if(low>=high){
//             cb({message:'done',id,min,max,primes}); 
//             clearInterval(intervalId) 
//             return;
//         }
    
//     },1)   

//     return id;
// }

var tasks=0;
function findPrimesInteractive(min, max, cb) {
    var low = min;
    var high = Math.min(max, min + 1000);
    var id = ++tasks;
    var index = 0;
    var primes = []; // Initialize the primes array here
   
    const iid = setInterval(() => {
        if (max <= min) {
            cb({ message: "error", id, min, max, error: "Invalid Range" });
            clearInterval(iid);
            return;
        }
 
        for (let i = low; i < high; i++) {
            if (isPrimeSync(i)) {
                index++;
                primes.push(i); // Collect the primes
                cb({ message: "prime", id, min, max, index, prime: i });
            }
        }
        cb({ message: "progress", id, min, max, done: (high - min), primes: index });
 
        low = high;
        high = Math.min(max, low + 1000);
        if (low >= high) {
            // All done
            cb({ message: "done", id, min, max, primes });
            clearInterval(iid);
            return;
        }
 
    }, 1);
 
   
    const abort = () => {
        clearInterval(iid);
        cb({ message: "Aborted", id, min, max, primes });
    };
 
    return { id, abort };
}
 

// const gen = findPrimesGenerator(2, 15);

// for (let prime of gen) {
//     if (prime < 11) {
//         gen.next('continue');  // Abort if prime is greater than 5
        
//     } else {
//         console.log(prime);  // Output the prime number
//     }
// }

// function findPrimes(min,max){
// function findPrimes(min,max){
//onsole.log(findPrimes(2,20))
// console.log(...gen)
module.exports = {
    findPrimesCB,findPrimes,findPrimesInteractive
}