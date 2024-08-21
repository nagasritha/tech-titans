var EventEmitter=require('events');
const { isPrimeSync } = require('./duplicate');



var instancecount=0

function findPrimes(min,max){
    var event=new EventEmitter() ;
     
    var low =min 
    var high=Math.min(max,min+1000) 

    var index=0
    var id=++instancecount 
    var batch=0

    const iid=setInterval(function(){
        if(min>max){
            event.emit('ERROR', {id,max,min,error:`Invalid Range`}) 
            clearInterval(iid)
            return;
        } 

        for(let i=low;i<high;i++){
            if(isPrimeSync(i)){
                index++
                event.emit('PRIME',{id,min,max,index,prime:i})
            }
        }
        batch++ 
        event.emit('PROGRESS',{id,min,max,high,primes:index})

        low=high 
        high=Math.min(max,low+1000); 
        if(low>=high){
            event.emit('DONE',{id,min,max,primes:index})
            clearInterval(iid)
        }
    },1) 

    // event.on('ABORT',function(){
    //     clearInterval(iid); 
    //     event.emit('ABORTED',{id,min,max,primes:index,high});
    // })

    event.on('PAUSE', function() {
        event.emit('PAUSED', { id, min, max, primes: index, high,paused : true });
    });

    event.on('RESUME', function() {
        
        event.emit('RESUMED', { id, min, max, primes: index, high ,paused : false});
    }); 

    return event
    
}