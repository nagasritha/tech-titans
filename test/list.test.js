var {expect} = require('chai');
var {LinkedList} = require('../MatcherFramework/list');
describe("list-test.js",function(){
    let list ;
    this.beforeEach(function(){
        list = new LinkedList();
    })

    describe('map', function() {
        it('should map each value to a new value using the mapper function', function() {
            const list = new LinkedList();
            list.append(1,2,3,4);
    
            let resultYeilded = list.map((v) => v + 1); 
            let result = [...resultYeilded]; 
            let expectedResult = [2, 3, 4, 5];
    
            expect(result).to.deep.equal(expectedResult);
        });
    });
})