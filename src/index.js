var beautify = require('js-beautify');
var beautifyHtml = require('./beautifyHtml');

/**
 * beautify html/js/css
 * @param {string} text the source code
 * @param {boolean} [isTabIndent=false] indent with tab? default: false
 * @param {number} [indentSize=2] indent size, default: 2
 * @return {string} beautify the code
 */
module.exports = function (text, isTabIndent, indentSize) {

  if (isTabIndent === undefined) {
    isTabIndent = false;
  }
  if (indentSize === undefined) {
    indentSize = 2;
  }

  // var isRootIndent = true;

  // options
  var options = {
    indentSize: indentSize,
    isTabIndent: isTabIndent
  }

  return beautify.html(text, {
    indent_char: ' ',
    indent_size: indentSize,
    indent_with_tabs: isTabIndent,
    indent_inner_html: true,
    unformatted: ['code', 'pre', 'em', 'strong', 'span']
  });

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