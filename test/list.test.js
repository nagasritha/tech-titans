var { LinkedList, Node } = require('../src/list');
var { take } = require('../src/utils')
var assert = require('assert');
//require('mocha')
var { expect } = require('chai')


describe('Linked List', function () {

    var list;
    beforeEach(function () {
        list = new LinkedList()
    })

    var data = [1, 2, 3, 4]


    describe('When New', function () {

        it('should be empty intially', () => {
            //assert.equal(list.isEmpty(),true);
            expect(list.isEmpty()).to.equal(true)
        });

        it('should have size()=0 ', () => {
            //var list = new LinkedList();
            expect(list.size()).to.equal(0);
        }) 
        it('Should have null for first time', () => {
            expect(list._first).to.be.null;
        })
    });

    describe('on append', function () {
        it('Should return the list', () => {
            var returnList = list.append(1)
            expect(typeof returnList).to.equal('object')
        })
        describe('First Item', function () {
            it('should increase its size to 1', () => {
                list.append(1)
                expect(list.size()).to.equal(1)
            })

            it('should be the first item', () => {
                var value = 1
                list.append(1)
                expect(list._first.value).to.equal(value)
            })
            it('should be the last item', () => {
                list.append(1, 2, 4, 5)
                expect(list._last.value).to.equal(5)
            })
            it('should create a node object', () => {
                list.append(1)
                expect(list._first).to.be.an.instanceOf(Node)
            })
        })

        describe('To NonEmpty List', () => {
            it('should increase the size by 1', () => {
                list.append(1)
                expect(list.size()).to.equal(1)
            })
            it('should be added at the last', () => {
                list.append(1,2,3)
                

                expect(list._last.value).to.equal(3)
            })
            it('should add multiple values at once', () => {
                list.append(1, 2, 3, 4)
                expect(list.size()).to.equal(4)
            })
        })
    })

    describe('get', function () {
        var size;
        var data = [2, 3, 4, 5]
        beforeEach(function () {
            list.append(...data)
            size = list.size()
        })
        it('should return item with valid index', function () {
            for (var i = 0; i < data.length - 1; i++) {
                expect(list.get(i)).to.equal(data[i])
            }
        })
        it('should throw exception for invalid index', () => {
            var index = 20
            try {
                list.get(index)

            } catch (err) {
                //assert.fail('Index error was not thrown')
                // expect(err.message).to.contain(`${index}`)
                return
            }
            //expect(true)
            assert.fail('Index must be a number')
        })
        it('should throw exception for non-numeric index', () => {
           expect(()=>list.get('hi')).to.throw('Index must be a number')
        })
        it('should return last item with index-1', () => {
            var index = -1
            expect(list.get(index)).to.equal(5)
        })
    })

    describe('set', () => {
        it('should update item with valid index', () => {
            list.append(1, 2, 3, 4)
            list.set(1, 3)
            expect(list.get(1)).to.equal(3)
        })

        it('should throw exception for invalid index', () => {
            try {
                expect(list.set(5, 6))
            } catch (err) {

            }
        })

        it('should throw exception for non-numeric index', () => {
            try {
                expect(list.set('7', 7))
            } catch (err) {

            }
        })
        it('should not increase the list size', () => {
            list.append(1, 2, 3, 4)
            list.set(1, 2)
            expect(list.size()).to.equal(4)
        })
    })

    describe('Remove', () => {
        it('should remove item with valid index', () => {
            list.append(1, 2, 3, 4)
            list.remove(2)
            expect(list.get(2)).to.equal(4)
        })

        it('should throw exception for invalid index', () => {
            list.append(1, 2, 3, 4)
            try {
                expect(list.remove(5))
            } catch (err) {

            }
        })
        it('should remove last item -1 index', () => {
            list.append(1, 2, 3, 4)
            expect(list.remove(-1)).to.equal(4)
        })
    })

    describe('forEach', () => {
        it('should get each item one by one', () => {

            list.append(...data)
            list.forEach((v, i) => {
                expect(v).to.equal(data[i])
            })
        })
        it('Break after first item when callback return a value', () => {
            list.append(...data)
            expect(list.forEach(take(1, (v) => v % 2 === 0))).to.equal(false)
        })
        it('should foreach retruns the value returned callback', () => {
            list.append(...data)
            let result = list.forEach((v, i) => {
                if (v % 3 === 0) {
                    return v
                }
            }
            )
            expect(result).to.equal(3)
        })
    })

    describe('Filter', () => {
        it('should return matching value', () => {
            list.append(...data)
            expect(list.filter(v => v % 4 === 0)._first.value).to.equal(4)
        })
        it('should return empty list when no match is found', () => {
            list.append(...data)
            expect(list.filter(v => v > 50)._size).to.equal(0)
        })
        it('should return all values when no matcher is given', () => {
            list.append(...data)
            const result = list.filter(); 
            const comapreSet = [];

            result.forEach((v) => {
                comapreSet.push(v); 
            });

            expect(comapreSet.toString()).to.equal(data.toString());
        })
    })

    describe('Find', () => {
        it('should return the matching item', () => {
            list.append(...data)
            expect(list.find(v => v > 2)).to.equal(3)
        })
        it('should return undefined when no match found', () => {
            list.append(...data)
            expect(list.find(v => v > 7)).to.equal(undefined)
        })
        // it('should return n number of items when take(n) matcher is used',()=>{
        //     list.append(...data) 
        //     expect(list.find(take(3,v=>v>2))).to.equal(3)
        // })
        // it('should return less all items with take(n) if all items is les than n',()=>{
        //     list.append(...data) 
        //     expect(list.find(v=>v>2)).to.equal(3)
        // })
    })

});
 