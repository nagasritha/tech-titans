var { expect } = require('chai');
let { findPrimesByPromise, findPrimesByCallback } = require('../Assaignment-15.1/promiseVSCallback');
let {tryCatchBlokLogic} = require('./testUtils.js');

describe("Asynchronous functions", function () {

    describe("callback function", function () {
        it('should return the primes list for correct parameters', function (done) {
            findPrimesByCallback(2, 10, (error, result) => {
                // try {
                //     expect(error).to.be.null;
                //     expect(result).to.deep.equal([2, 3, 5, 7]);
                //     done();
                // } catch (err) {
                //     done(err);
                // }
                tryCatchBlokLogic(()=>{
                    expect(error).to.be.null;
                    expect(result).to.deep.equal([2, 3, 5, 7]);
                },done);
            });
        });

        it('should give an error on invalid parameters', function (done) {
            findPrimesByCallback(11, 1, (error, result) => {
                try {
                    expect(error).to.be.an('error');
                    expect(result).to.be.undefined;
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });
    });

    describe('promise function', function () {
        it('should give the array of primes for correct parameters', function () {
            return findPrimesByPromise(2, 10).then(result => {
                expect(result).to.deep.equal([2, 3, 5, 7]);
            });
        });

        it('should give an error on invalid parameters', function () {
            return findPrimesByPromise(11, 1).catch(error => {
                expect(error).to.be.an('error');
            });
        });
    });
});
