// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var beautify = require('./src/index');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    var disposable = vscode.commands.registerTextEditorCommand('extension.vueBeautify', function (textEditor) {
        // The code you place here will be executed every time your command is executed

        // only for language of vue
        if (textEditor.document.languageId.toLowerCase() !== 'vue') {
            return;
        }

        var editorConfig = vscode.workspace.getConfiguration('vueBeautify');

        // is tab indent
        var isTabIndent = editorConfig.isTabIndent;

        // indent size
        var indentSize = editorConfig.indentSize;

        // editor text
        var text = textEditor.document.getText();

        // beautify code
        var code = beautify(text, isTabIndent, indentSize);

        // edit
        textEditor.edit(function (editBuilder) {
            var document = textEditor.document;
            var lastLine = document.lineAt(document.lineCount - 1);
            var start = new vscode.Position(0, 0);
            var end = new vscode.Position(document.lineCount - 1, lastLine.text.length);
            var range = new vscode.Range(start, end);
            editBuilder.replace(range, code);
        });

    });

    context.subscriptions.push(beautify);
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;