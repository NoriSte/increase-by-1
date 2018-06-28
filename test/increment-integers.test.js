/* global suite, test */

//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
const assert = require('assert');

const subject = require('./../src/increment-integers');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// const vscode = require('vscode');
// const myExtension = require('../extension');

// Defines a Mocha test suite to group tests of similar kind together
suite("increment-integers tests", function() {
    test("Wrong input tests", function() {
        assert.equal(undefined, subject());
        assert.equal(undefined, subject(null));
        assert.equal(undefined, subject(undefined));
        assert.equal(undefined, subject(''));
        assert.equal(undefined, subject({}));
        assert.equal(undefined, subject([]));
        assert.equal(undefined, subject(['a']));
        assert.equal([1], subject([1]));
        assert.equal([10], subject([10]));
    });
    test("Integers increasing", function() {
        assert.equal([1, 2, 3], subject([1, 1, 1]));
        assert.equal([1, 2, 3], subject([1, 2, 2]));
        assert.equal([1, 2, 3], subject([1, 2, 3]));
        assert.equal([1, 2, 3], subject([1, 2, 4]));
        assert.equal([1, 2, 3], subject([1, 100, 100]));
        assert.equal([9, 10, 11], subject([9,,]));
        assert.equal([9, 10, 11], subject([9, 9, 9]));
        assert.equal([9, 10, 11], subject([9, '9', 9]));
        assert.equal([9, 10, 11], subject([9, {}, []]));
        assert.equal([9, 10, 11], subject([9, null, undefined]));
        assert.equal([100, 101, 102], subject([100, 100, 100]));
        assert.equal([-5, -4, -3], subject([-5, 0, 0]));
        assert.equal([-1, 0, 1], subject([-1, 0, 0]));
    });
});
