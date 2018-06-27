// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "increase-by-1" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.increaseByOne', function () {
        // The code you place here will be executed every time your command is executed

        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage(`There isn't any opened editor`);
            return; // No open text editor
        }

        var selections = editor.selections;
        var selectedTexts = selections.map(selection => editor.document.getText(selection));
        console.log(selectedTexts);
        var replacedTexts;
        if(selectedTexts && selectedTexts.length) {
            if(!isNaN(parseInt(selectedTexts[0]))) {
                replacedTexts = incrementIntegers(selectedTexts);
            }
        }
        console.log(replacedTexts);
        if(replacedTexts && replacedTexts.length === selectedTexts.length) {
            editor.edit(builder => {
                selections.forEach((selection, i) => {
                    builder.replace(selection, replacedTexts[i].toString());
                });
            });
        }
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;


function incrementIntegers(list) {
    var result = [];
    var start = parseInt(list[0]);
    result.push(start);
    for(var i = 1, n = list.length; i < n; i++) {
        result.push(start + i);
    }
    return result;
}
