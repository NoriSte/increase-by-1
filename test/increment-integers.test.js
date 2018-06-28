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
        assert.deepEqual(subject(), undefined);
        assert.deepEqual(subject(null), undefined);
        assert.deepEqual(subject(undefined), undefined);
        assert.deepEqual(subject(''), undefined);
        assert.deepEqual(subject({}), undefined);
        assert.deepEqual(subject([]), undefined);
        assert.deepEqual(subject(['a']), undefined);
        assert.deepEqual(subject([1]), [1]);
        assert.deepEqual(subject([10]), [10]);
    });
    test("Integers increasing", function() {
        assert.deepEqual(subject([1, 1, 1]), [1, 2, 3]);
        assert.deepEqual(subject([1, 2, 2]), [1, 2, 3]);
        assert.deepEqual(subject([1, 2, 3]), [1, 2, 3]);
        assert.deepEqual(subject([1, 2, 4]), [1, 2, 3]);
        assert.deepEqual(subject([1, 100, 100]), [1, 2, 3]);
        assert.deepEqual(subject([9, 9, 9]), [9, 10, 11]);
        assert.deepEqual(subject([9, '9', 9]), [9, 10, 11]);
        assert.deepEqual(subject([9, {}, []]), [9, 10, 11]);
        assert.deepEqual(subject([9, null, undefined]), [9, 10, 11]);
        assert.deepEqual(subject([100, 100, 100]), [100, 101, 102]);
        assert.deepEqual(subject([-5, 0, 0]), [-5, -4, -3]);
        assert.deepEqual(subject([-1, 0, 0]), [-1, 0, 1]);
    });
});
