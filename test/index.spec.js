var { expect } = require('chai');
var { BinarySearchTree } = require('../Binarysearch/index.js');


describe("Binary searh tree", function () {
    let testTree;
    beforeEach(function () {
        testTree = new BinarySearchTree();
    })


    describe("adding values into the list", function () {
        it('initial set up with length 0', function () {
            expect(testTree.size).to.equal(0);
        })


        it('size increment after each Item insertion', function () {
            testTree.add(4);
            expect(testTree.getSize()).to.equal(1);
            testTree.add(3);
            expect(testTree.getSize()).to.equal(2);
            testTree.add(1, 2, 5);
            expect(testTree.getSize()).to.equal(5);
        })

        it('size phase on inserting same item', function () {
            testTree.add(1, 1);
            expect(testTree.getSize()).to.equal(1);
        })

        it('should add small item left to the root', function () {
            testTree.add(5);
            testTree.add(4);
            let checkItem = testTree.root.left
            expect(checkItem.value).to.equal(4);
        })
        it('should add large item right to the root', function () {
            testTree.add(5);
            testTree.add(6);
            let checkItem = testTree.root.right;
            expect(checkItem.value).to.equal(6);
        })
    })

    describe("finding Item in the list", function () {

        beforeEach(function () {
            testTree.add(1, 2, 3);
        })

        it('should give error for invalid value', function () {

            expect(() => testTree.contain("one").to.throw())
        })

        it('should give the valid search node if exists', function () {

            let searchValue = testTree.contain(2);
            expect(searchValue.value).to.equal(2);
        })

        it("should return null if value dosen't exist", function () {

            let searchValue = testTree.contain(4);
            expect(searchValue).to.equal(null);
        })
    })

    describe("sorting list", function(){
        beforeEach(function(){
            testTree.add(4,5,6,1,2,3);
        })

        it('should sort the items in ascending order by default',function(){
            let sortedList = testTree.sort();
            expect(sortedList).to.deep.equal([1,2,3,4,5,6]);
        })

        it('should sort the items in descending order with param "desc"',function(){
            let sortedList = testTree.sort("desc");
            expect(sortedList).to.deep.equal([6,5,4,3,2,1]);
        })
    })
})