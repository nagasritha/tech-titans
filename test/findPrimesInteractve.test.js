const { expect } = require('chai');
const { findPrimesInteractive, isPrimeSync } = require('../Assaignment-17/primes');

describe('findPrimesInteractive', function() {

    it('should raise error if no callback is provided', function() {
        expect(() => findPrimesInteractive(0, 100)).to.throw('callback not specified');
    });

    it('should return a unique id for each findPrimesInteractive call', function() {
        const { id: id1 } = findPrimesInteractive(2, 10, () => {});
        const { id: id2 } = findPrimesInteractive(10, 20, () => {});

        expect(id1).to.be.a('number');
        expect(id2).to.be.a('number');
        expect(id2).to.equal(id1 + 1);
    });

    it('should return error on invalid range', function(done) {
        const { id } = findPrimesInteractive(10, 1, response => {
            expect(response.message).to.equal('error');
            expect(response.id).to.equal(id);
            expect(response.error).to.equal('Invalid Range');
            done();
        });
    });

    it('should return a prime with message="prime"', function(done) {
        findPrimesInteractive(0, 100, response => {
            if (response.message === 'prime') {
                expect(response.prime).to.not.be.undefined;
                expect(typeof response.prime).to.equal('number');
                expect(isPrimeSync(response.prime)).to.be.true;
            }
            if (response.message === 'done') {
                done();
            }
        });
    });

    it('should call message="prime" for every prime found', function(done) {
        let primesFound = 0;
        findPrimesInteractive(0, 100, response => {
            if (response.message === 'prime') {
                primesFound++;
            }
            if (response.message === 'done') {
                expect(primesFound).to.equal(response.primes.length);
                done();
            }
        });
    });

    it('should call message="progress" in batches of 1000', function(done) {
        let count = 0;
        findPrimesInteractive(0, 20000, response => {
            if (response.message === 'progress') {
                count++;
                expect(response.done).to.equal(count * 1000);
            }
            if (response.message === 'done') {
                expect(count).to.equal(Math.ceil(response.max / 1000));
                done();
            }
        });
    });

    it('sends one prime value at a time', function(done) {
        const primes = [];
        findPrimesInteractive(0, 100, response => {
            if (response.message === 'prime') {
                primes.push(response.prime);
            }
            if (response.message === 'done') {
                expect(primes.length).to.equal(25);
                done();
            }
        });
    });

    it('should abort the process and return message="aborted" on abort request', function(done) {
        this.timeout(10000); // Set timeout to 10 seconds

        const { id, abort } = findPrimesInteractive(2, 200000, response => {
            if (response.message === 'prime') {
                if (response.index === 1000) {
                    abort(); // Trigger abort
                }
            } else if (response.message === 'aborted') {
                done(); // Test is successful if we receive an "aborted" message
            } else if (response.message === 'done') {
                done(new Error('Process was NOT aborted'));
            }
        });

        // setTimeout(() => {
        //     done(new Error('Test timed out: abort was not called correctly'));
        // }, 5000); // Timeout after 5 seconds
    });

});
