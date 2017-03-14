# vue-beautify for vscode

## Features

Beautify Vue code in Visual Studio Code.

![preview](source/preview.gif)

## Usage

1. Keyboard Shortcut: `ctrl+shift+f` ;
2. Open context menu in vue, choose `Beautify Vue` ;
3. Type `F1`, search `Beautify Vue`, and click the item.

## Settings

1. open `settings.json` , and search `vueBeautify` ;
2. default settings: 
    ```json
    // Indent with Tabs, if false, with spaces.
    "vueBeautify.isTabIndent": false,

    // Indent size, default 2.
    "vueBeautify.indentSize": 2,
    ```

3. copy into user's `settings.json` , and modify.

## Keyboard Shortcut

Use the following to embed a beautify shortcut in keybindings.json. Replace with your preferred key bindings.

```json
    {
      "key": "ctrl+shift+f",          
      "command": "extension.vueBeautify",
      "when": "editorTextFocus && !editorReadonly" 
    }
```

## Github
[https://github.com/peakchen90/vue-beautify](https://github.com/peakchen90/vue-beautify)