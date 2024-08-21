

function isPrimeSync(value) {
    if (value < 2)
        return false;

    for (var i = 2; i < value; i++) {
        if (value % i === 0)
            return false;
    }  

    return true;
}

function findPrimesSync(min, max) {
    var primes = [];
    for (let i = min; i < max; i++) {
        if (isPrimeSync(i))
            primes.push(i);
    }

    return primes;
}
function _findPrimesPromiseV1(min, max) {

    return new Promise((resolve, reject) => {
        if (max <= min) {
            reject(new Error(`Invalid Range (${min}-${max})`)); //error
            return;
        }

        var primes = [];
        for (let i = min; i < max; i++) {
            if (isPrimeSync(i))
                primes.push(i);
        }

        resolve(primes); //success
    });

}
function findPrimesPromise(min, max) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (max <= min) {
                reject(new Error(`Invalid Range (${min}-${max})`)); //error
                return;
            }

            var primes = [];
            for (let i = min; i < max; i++) {
                if (isPrimeSync(i))
                    primes.push(i);
            }

            resolve(primes); //success
        }, 1000);
    });

}


function _findPrimesV1(min, max, cb) {

    if (max <= min) {
        cb(new Error(`Invalid Range (${min}-${max})`)); //error
        return;
    }


    var primes = [];
    for (let i = min; i < max; i++) {
        if (isPrimeSync(i))
            primes.push(i);
    }

    //return primes;
    cb(null, primes); //success
}
function findPrimes(min, max, cb) {

    setTimeout(() => {

        if (max <= min) {
            cb(new Error(`Invalid Range (${min}-${max})`)); //error
            return;
        }


        var primes = [];
        for (let i = min; i < max; i++) {
            if (isPrimeSync(i))
                primes.push(i);
        }

        //return primes;
        cb(null, primes); //success
    }, 1000);


}

function handleTryCatch(expectCallBack,done){
    try{
        expectCallBack()
        done(); //success. no error
    }catch(e){
        done();
    }
}

function findPrimesMinimize(start,end,batch){
       let currStart=start 
       let currEnd=start+batch-2
       let result;

       let intervalId=setInterval(()=>{
        if(currStart>=end){
            clearInterval(intervalId)
            return 
        }

        let primes=findPrimesSync(currStart,currEnd) 
        //console.log(`Primes between ${currStart} and ${currEnd}:`, primes) 
        
        currStart=currEnd 
        currEnd=currStart+batch
        result=primes
       },1)
       return result
       
}

findPrimesMinimize(2,200,10)


module.exports = {
    isPrimeSync,
    findPrimesSync,
    findPrimes,
    findPrimesPromise,
    handleTryCatch,
    findPrimesMinimize
};