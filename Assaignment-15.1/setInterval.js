

// function findPrimes(min,max){
//     let result = [];
//     let count = min;
//     let interval = setInterval(()=>{
//         let prev = count;
//         if((count-max)<1000){
//             count = max;
//         }else{
//         count += 1000;
//         }
//         if(count===max){
//             clearInterval(interval);
//             return result;
//         }else{
//             for (var i = prev; i <=count; i++) {
//                             let isPrime = true;
//                             for (var j = 2; j <= (i ** 0.5); j++) {
//                                 if (i % j === 0) {
//                                     isPrime = false;
//                                     break;
//                                 }
//                             }
//                             if (isPrime) {
//                                 result.push(i);
//                             }
//                         }
//         }
//     },1000);
// }

// let primes = async function getResult(){
//     let result = await findPrimes(2,10);
//     return result};
// console.log(primes);

