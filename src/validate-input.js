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

    return true;
};
