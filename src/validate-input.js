const constants = require('./constants');

module.exports = (vscode) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage(constants.NO_EDITOR);
        return false;
    }

    const selections = editor.selections;
    if(selections.length < 2) {
        vscode.window.showInformationMessage(constants.NOT_ENOUGH_SELECTIONS);
        return false;
    }

    if(isNaN(parseInt(editor.document.getText(selections[0])))) {
        vscode.window.showInformationMessage(constants.NOT_FIRST_SELECTION_NUMBER);
        return false;
    }

    return true;
};
