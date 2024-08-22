function findPrimesByCallback(min, max, cb) {
    console.log('function callback1 called');
    setTimeout(function(){
        if (min >= max) {
            return cb(new Error("Invalid parameters"));
        }
        result = [];
        for (var i = min; i <= max; i++) {
            let isPrime = true;
            for (var j = 2; j <= (i ** 0.5); j++) {
                if (i % j === 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                result.push(i);
            }
        }
        cb(null, result);
    },1000);
}

function cb(error, result) {
    if (error) {
        console.log(error.message);
    } else {
        console.log(result);
    }
}
findPrimesByCallback(1, 100, cb);
findPrimesByCallback(1, 20, cb);

function findPrimesByPromise(min, max) {
    let promiseResult = new Promise((resolve, reject) => {
        // setTimeout(() => {
        //     if (min >= max) {
        //         reject(new Error('invalid parameters'));
        //     }
        //     else {
        //         let result = [];
        //         for (var i = min; i <= max; i++) {
        //             let isPrime = true;
        //             for (var j = 2; j <= (i ** 0.5); j++) {
        //                 if (i % j === 0) {
        //                     isPrime = false;
        //                     break;
        //                 }
        //             }
        //             if (isPrime) {
        //                 result.push(i);
        //             }
        //         }
        //         resolve(result);
        //     }
        // }
        //     , 1000)
        if(min>=max){
            reject(new Error("Invalid parameters"));
        }else{
        let result = [];
        let count = min;
        let interval = setInterval(() => {
            let prev = count;
            if ((max - count) < 1000) {
                count = max;
            } else {
                count += 1000;
            }

            for (let i = prev; i <= count; i++) {
                let isPrime = true;
                if (i < 2) {
                    isPrime = false;
                }
                for (let j = 2; j <= Math.sqrt(i); j++) {
                    if (i % j === 0) {
                        isPrime = false;
                        break;
                    }
                }
                if (isPrime) {
                    result.push(i);
                }
            }

            if (count === max) {
                clearInterval(interval);
                resolve(result);
            }
        }, 1000);
    }
    })
    return promiseResult;
}
//promise => console.log(promise));
// let promiseResult2 = findPrimesByPromise(2,2000);
// let promiseResult = findPrimesByPromise(2, 10);

// promiseResult2.then(promise => console.log(promise));
// promiseResult.then(pr

try {
    module.exports = { findPrimesByCallback, findPrimesByPromise, cb }
} catch (e) {

}