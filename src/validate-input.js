module.exports = (vscode) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage(`There isn't any opened editor`);
        return false;
    }

    const selections = editor.selections;
    if(selections.length < 2) {
        vscode.window.showInformationMessage(`Select at least two occurrencies`);
        return false;
    }

    if(isNaN(parseInt(editor.document.getText(selections[0])))) {
        vscode.window.showInformationMessage(`The first selection must be a number`);
        return false;
    }

    return true;
};
