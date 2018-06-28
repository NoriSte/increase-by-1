const validateInput = require('./validate-input');
const incrementIntegers = require('./increment-integers');

const main = vscode => {
    if(!validateInput(vscode)) {
        return;
    }

    const editor = vscode.window.activeTextEditor;
    const selections = editor.selections;
    const selectedTexts = selections.map(selection => editor.document.getText(selection));
    const newTexts = incrementIntegers(selectedTexts);

    if(newTexts && newTexts.length > 0 && newTexts.length === selectedTexts.length) {
        editor.edit(builder => {
            selections.forEach((selection, i) => {
                builder.replace(selection, newTexts[i].toString());
            });
        });
    }
}

module.exports = main;
