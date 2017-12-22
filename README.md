> Notice: This project is no longer maintained. 注意：这个项目已经不在维护了

# vue-beautify for vscode

## Features

Beautify Vue code in Visual Studio Code.

![preview](source/preview.gif)

## Usage

1. Keyboard Shortcut: `ctrl+shift+f` ;
2. Open context menu in vue, choose `Beautify Vue` ;
3. Press `F1`, search `Beautify Vue`, and click the item.

## Indent Option

The vue-beautify's indent option according to the textEditor's indent option, like this: 

![indent option](source/indent-option.png)

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
