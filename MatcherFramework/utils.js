let {objectLogicAnd,objectLogicOr} = require('./list.js');

function take(n, criteria, requirement="all") {
    let count = 0;

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

function takeFunction(n,matcher,...matcherParams){
    var count=0;
    if(!matcher)
        matcher= v=>true;
    return v =>{
        if(n && count===n)
            return ; //break the loop
        var matched = matcher(v,...matcherParams);
        if(matched)
            count++;
        return matched;
    }
}



try{
    module.exports={
        take,takeFunction
    }
}catch(e){
    
}