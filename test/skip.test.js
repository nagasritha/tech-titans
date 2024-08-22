const { expect } = require('chai');
const { findPrimesSync } = require('../Assaignment-17/skip-function'); // Adjust the path as needed

describe('findPrimesSync Generator Function', function() {
    
    it('should yield the correct prime numbers without skipping', function() {
        let result = findPrimesSync(2, 20);
        let expectedResult = [2,3,5,7,11,13,17,19];
        for(var i=0;i<expectedResult.length;i++){
            expect(result.next().value).to.equal(expectedResult[i]);
        }
    });

    it('should skip specified number of iterations based on the value passed to next()', function() {
        let result = findPrimesSync(2, 30);
        let expectedResult = [2,3,5,7,11,13,17,19];
        result.next();
        expect(result.next(2).value).to.equal(expectedResult[3]);
    });

    it('should yield no values when the range is invalid', function() {
        let result = findPrimesSync(20, 10);

        expect(result.next().done).to.be.true; 
    });

});
