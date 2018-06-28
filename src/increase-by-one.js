const validateInput = require('./validate-input');
const incrementIntegers = require('./increment-integers');
const replaceSelections = require('./replace-selections');

const main = vscode => {
    if(!validateInput(vscode)) {
        return;
    }

    const editor = vscode.window.activeTextEditor;
    const selections = editor.selections;
    const selectedTexts = selections.map(selection => editor.document.getText(selection));
    const newTexts = incrementIntegers(selectedTexts);
    replaceSelections(editor, selections, newTexts);
}

module.exports = main;
