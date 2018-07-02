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

const subject = require('./../src/replace-selections');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// const vscode = require('vscode');
// const myExtension = require('../extension');

const getFakeVSCodeEditor = replaceMock => {
    const builder = {
        replace: replaceMock
    };
    const fakeVSCodeEditor = {
        edit: callback => callback.apply(null, [builder])
    };
    return fakeVSCodeEditor;
};


// Defines a Mocha test suite to group tests of similar kind together
suite("replace-selections tests", function() {
    test("Falsy values", function() {
        const replaceMock = chai.spy();
        const fakeVSCodeEditor = getFakeVSCodeEditor(replaceMock);
        subject(fakeVSCodeEditor, null, null);
        expect(replaceMock).to.not.have.been.called();

        subject(fakeVSCodeEditor, [], null);
        expect(replaceMock).to.not.have.been.called();

        subject(fakeVSCodeEditor, null, []);
        expect(replaceMock).to.not.have.been.called();
    });

    test("Stop executing if the selections and the replace values haven\'t the same length", function() {
        const replaceMock = chai.spy();
        const fakeVSCodeEditor = getFakeVSCodeEditor(replaceMock);
        subject(fakeVSCodeEditor, [1, 2, 3], [1]);
        expect(replaceMock).to.not.have.been.called();

        subject(fakeVSCodeEditor, [], [1, 2, 3]);
        expect(replaceMock).to.not.have.been.called();
    });

    test("Working replace", function() {
        const replaceMock = chai.spy();
        const fakeVSCodeEditor = getFakeVSCodeEditor(replaceMock);
        subject(fakeVSCodeEditor, ['1', '1', '1'], ['1', '2', '3']);
        expect(replaceMock).to.have.been.first.called.with('1', '1');
        expect(replaceMock).to.have.been.second.called.with('1', '2');
        expect(replaceMock).to.have.been.third.called.with('1', '3');
    });
});
