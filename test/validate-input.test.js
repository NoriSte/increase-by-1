/* global suite, test */

//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
const chai = require('chai')
  , spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;

const subject = require('./../src/validate-input');
const constants = require('./../src/constants');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// const vscode = require('vscode');
// const myExtension = require('../extension');

// Defines a Mocha test suite to group tests of similar kind together
suite("validate-input tests", function() {
    test("No opened editor", function() {
        const fakeVSCode = {window: {showInformationMessage: chai.spy()}};
        subject(fakeVSCode);
        expect(fakeVSCode.window.showInformationMessage).to.have.been.called.with(constants.NO_EDITOR);
    });
    test("Selections must be at least two", function() {
        const fakeVSCode = {window: {activeTextEditor: {selections: [{}]}, showInformationMessage: chai.spy()}};
        subject(fakeVSCode);
        expect(fakeVSCode.window.showInformationMessage).to.have.been.called.with(constants.NOT_ENOUGH_SELECTIONS);
    });
    test("The first selection isn't a number", function() {
        const fakeVSCode = {window: {activeTextEditor: {selections: [{}, {}], document: {getText: el => el}}, showInformationMessage: chai.spy()}};
        subject(fakeVSCode);
        expect(fakeVSCode.window.showInformationMessage).to.have.been.called.with(constants.NOT_FIRST_SELECTION_NUMBER);
    });
});
