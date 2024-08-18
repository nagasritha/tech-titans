let {objectLogicAnd,objectLogicOr} = require('./list.js');

function take(n, criteria, requirement="all") {
    let count = 0;

    // Ensure criteria is not undefined and is an object
    if (!criteria || typeof criteria !== 'object') {
        criteria = {};
    }

    let condition = requirement === 'all' ? objectLogicAnd : objectLogicOr

    return value => {
        if (n && count === n) return; // break the loop

        let matched = condition(criteria, { value });
        if (matched) count++;

        return matched;
    };
}



try{
    module.exports={
        take
    }
}catch(e){
    
}