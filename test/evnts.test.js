

const { describe } = require('node:test');
var assert = require('assert');
//require('mocha')
var { expect, should } = require('chai');
should();

var {isPrimeSync}=require('../src/duplicate') 
var{findPrimes}=require('../src/findprimesevents')


describe('findPrimes Events',function(){
    it('should return error on invalid range',function (done){
        let event=findPrimes(10,1) 
        event.on('ERROR',response=>{
            response.error.should.equal('Invalid Range'); 
            done()
        })
    })

    it('should return a prime with message="prime"',function(done){
        let event=findPrimes(0,100); 
        event.on('PRIME',response=>{
            expect(response.prime).to.not.be.undefined; 
            expect(typeof response.prime).to.equal('number');
            isPrimeSync(response.prime).should.be.true;
        })
        event.on('DONE',()=>done())
    }) 

    it('Should called message="prime" for every prime found',function(done){
        findPrimes(0,100).on('DONE',(response)=>{
            response.primes.should.equal(25) 
            done();
        })
    })

    it('should call message:"progress" in a batch of 1000',done=>{
        var count=0 
        findPrimes(0,20000)
        .on('PROGRESS',()=>count++) 
        .on('DONE',response=>{
            count.should.equal(Math.ceil(response.max/1000));
            done()
        })

    })

    it('should abort the process and return message:"abort" received abort request from the client', done => {
        let aborted=false 
        var event=findPrimes(2,20000); 

        event.on('PRIME',(response)=>{
            if(response.index===100){
                event.emit('PAUSE')
            }
        })

        event.on('ABORTED',()=>{
            done()
        });

        event.on('DONE',()=>{
            done(new Error('ABORT REQUEST FAILED'))
        })
    })

    it('should pause the process when PAUSE event is triggered', function(done) {
        let event = findPrimes(2, 20000);

        event.on('PRIME', (response) => {
            if (response.index === 1000) {
                event.emit('PAUSE');
            }
        });

        event.on('PAUSED', (response) => {
            expect(response.paused).to.be.true;
            done();
        });

        event.on('DONE', () => {
            done(new Error('PAUSE REQUEST FAILED'));
        });
    });

    it('should resume the process when RESUME event is triggered', function(done) {
        let event = findPrimes(2, 20000);

        event.on('PRIME', (response) => {
            if (response.index === 50) {
                event.emit('PAUSE');
            }
        });
        event.on('PAUSED', () => {
            setTimeout(() => {
                event.emit('RESUME');
            }, 100); 
        });

        event.on('RESUMED', (response) => {
            expect(response.paused).to.be.false;
            done()
        });

        event.on('DONE', () => {
            done('Resume Requested Failed');
        });
    });


})