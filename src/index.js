var beautify = require('js-beautify');
// var beautifyHtml = require('./beautifyHtml');

/**
 * beautify html/js/css
 * @param {string} text the source code
 * @param {boolean} [isTabIndent=false] indent with tab? default: false
 * @param {number} [indentSize=2] indent size, default: 2
 * @return {string} beautify the code
 */
module.exports = function (text, isTabIndent, indentSize, isRootIndent) {

  if (isTabIndent === undefined) {
    isTabIndent = false;
  }
  if (indentSize === undefined) {
    indentSize = 2;
  }

  // options
  var options = {
    indentSize: indentSize,
    isTabIndent: isTabIndent
  }

  // find template 
  text = text.replace(/([ \t]*<template[\s\S]*?>)([\s\S]*?)([ \t]*<\/template>[ \t]*)/g, function (match, tagStart, code, tagEnd) {
    tagStart = beautifyTagStart(tagStart);
    tagEnd = beautifyTagEnd(tagEnd);

    // beautify code
    code = beautifyTemplate(code, options);

    // is root tag indent
    if (isRootIndent) {
      code = rootTagIndent(code, options);
    }

    return tagStart + '\n' + code + '\n' + tagEnd;
  });

  // find script
  text = text.replace(/([ \t]*<script[\s\S]*?>)([\s\S]*?)([ \t]*<\/script>[ \t]*)/g, function (match, tagStart, code, tagEnd) {
    tagStart = beautifyTagStart(tagStart);
    tagEnd = beautifyTagEnd(tagEnd);

    // beautify code
    code = beautifyScript(code, options);

    // is root tag indent
    if (isRootIndent) {
      code = rootTagIndent(code, options);
    }

    return tagStart + '\n' + code + '\n' + tagEnd;

  });

  // find style
  text = text.replace(/([ \t]*<style[\s\S]*?>)([\s\S]*?)([ \t]*<\/style>[ \t]*)/g, function (match, tagStart, code, tagEnd) {
    tagStart = beautifyTagStart(tagStart);
    tagEnd = beautifyTagEnd(tagEnd);
    var lang = getLang(tagStart);
    lang = lang ? lang.toLowerCase() : 'css';

    // not beautify stylus
    if (lang === 'stylus' || lang === 'sass') {
      return tagStart + code + tagEnd;
    }

    // beautify code
    code = beautifyStyle(code, options);

    // is root tag indent
    if (isRootIndent) {
      code = rootTagIndent(code, options);
    }

    return tagStart + '\n' + code + '\n' + tagEnd;
  });

  return text
    // add new line on vue root end tags
    .replace(/(<\/template>|<\/script>|<\/style>)[ \t]*[\r\n]?</g, '$1\n\n<');
}

// beautify tagStart
function beautifyTagStart(str) {
  return str
    // remove any enpty lines at the top
    .replace(/^\s*/, '')
    // make template tag in a single line
    .replace(/\s+/g, ' ')
    // remove blank before '>'
    .replace(/\s*>$/, '>');

}

// beautify tagEnd
function beautifyTagEnd(str) {
  return str
    // remove blank
    .replace(/\s*/g, '');

}

// get lang
function getLang(str) {
  // get all lang attributes
  var langs = str.match(/lang=(['"])(\w+)\1/g);
  var lang = undefined;
  if (langs !== null) {
    lang = langs[langs.length - 1];
    lang = lang.replace(/lang=(['"])(\w+)\1/, '$2');
  }
  return lang;

}

// beautify template
function beautifyTemplate(str, options) {

  return beautify.html(str, {
    indent_char: ' ',
    indent_size: options.indentSize,
    indent_with_tabs: options.isTabIndent
  });

}

// beautify script
function beautifyScript(str, options) {
  return beautify(str, {
    indent_char: ' ',
    indent_size: options.indentSize,
    indent_with_tabs: options.isTabIndent,
  });

}

// beautify style
function beautifyStyle(str, options) {
  return beautify.css(str, {
    indent_char: ' ',
    indent_size: options.indentSize,
    indent_with_tabs: options.isTabIndent
  });

}

// root tag indent
function rootTagIndent(str, options) {
  var indent = getIndentString(options);
  return str.split(/[\r\n]/).map(function (line) {
    return indent + line;
  }).join('\n');

}

// get indent string
function getIndentString(options) {
  var indent = '';
  if (options.isTabIndent) {
    indent = '\t';
  } else {
    for (var i = 0; i < options.indentSize; i++) {
      indent += ' ';
    }
  }
  return indent;

}