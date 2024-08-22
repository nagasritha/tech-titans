function tryCatchBlokLogic(logic,done){
    try{
        logic();
        done();
    }catch(err){
        done(err);
    }
}
try{
module.exports = {tryCatchBlokLogic}
}catch(e){

}