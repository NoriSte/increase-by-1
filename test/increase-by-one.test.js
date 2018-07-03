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

const subject = require('./../src/increase-by-one');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// const vscode = require('vscode');
// const myExtension = require('../extension');

const getFakeVSCode = (selections, replaceMock) => {
    const builder = {
        replace: replaceMock
    };
    const fakeVSCodeEditor = {
        edit: callback => callback.apply(null, [builder]),
        selections: selections,
        document: {
            getText: el => el
        }
    };
    const fakeVSCode = {
        window: {
            activeTextEditor: fakeVSCodeEditor,
            showInformationMessage: () => undefined
        }
    };
    return fakeVSCode;
};


// Defines a Mocha test suite to group tests of similar kind together
suite("increase-by-one tests", function() {
    test("Falsy values", function() {
        const replaceMock = chai.spy();
        let fakeVSCode;

        fakeVSCode = getFakeVSCode(undefined, replaceMock);
        subject(fakeVSCode);
        expect(replaceMock).to.not.have.been.called();

        fakeVSCode = getFakeVSCode(null, replaceMock);
        subject(fakeVSCode);
        expect(replaceMock).to.not.have.been.called();

        fakeVSCode = getFakeVSCode([], replaceMock);
        subject(fakeVSCode);
        expect(replaceMock).to.not.have.been.called();
    });

    test("Working replace", function() {
        const replaceMock = chai.spy();
        let fakeVSCode;

        fakeVSCode = getFakeVSCode(['1', '1', '1'], replaceMock);
        subject(fakeVSCode);
        expect(replaceMock).to.have.been.first.called.with('1', '1');
        expect(replaceMock).to.have.been.second.called.with('1', '2');
        expect(replaceMock).to.have.been.third.called.with('1', '3');
    });
});
