var fs=require('fs') 

var{expect,should}=require('chai') 

should() 

describe('fs tests',function(){
    describe('readfile',function(){
        it('should read a file content synchronously',function(){
            var data=fs.readFileSync('./test/hello.txt','utf8') 
            data.should.equal('Shiva kishna bandari')
        })
    })
}) 