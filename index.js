exports = module.exports = Typography;

var _ = require('underscore');
var changeCase = require('change-case');

var Typeface = require('./src/Typeface.js');
var Scale = require('./src/Scale.js');
var Sizes = require('./src/Sizes.js');
var Metrics = require('./src/Metrics.js');
var convertTokens = require('./src/convertTokens.js');


function Typography(opts) {

  var typefaces = [];
  var scales = [];
  var sizes = [];
  var metrics = {
    flat: [],
    nested: {},
    tokens: { 
      props: [] 
    }
  };

  // Apply defaults, calculate ratio or max
  scales = _.map(opts.scales, function (scale) {
    return Scale(scale, opts.sizes.larger);
  });

  // Apply defaults
  typefaces = _.map(opts.typefaces, function (typeface) {
    return Typeface(typeface);
  });

  // Create array of sizes
  sizes = Sizes(opts.sizes)


  // Create metrics for each scale, 
  // size, and typeface combo.

  // Flatted array
  _.each(scales, function (scale) {
    _.each(sizes, function (size) {
      _.each(typefaces, function (typeface) {

        metrics.flat.push({
          scale: scale.name,
          typeface: typeface.name,
          size: size,
          values: Metrics(scale, typeface, size)
        });

      });
    });
  });

  // Nested object
  _.each(scales, function (scale) {
    metrics.nested[scale.name] = {};

    _.each(sizes, function (size) {
      metrics.nested[scale.name][size] = {};

      _.each(typefaces, function (typeface) {

        metrics.nested[scale.name][size][typeface.name] = Metrics(scale, typeface, size)
      });
    });
  });


  // Theo Design Tokens

  var fontSizeToken = (name, value) => {
    return {
      "name": name,
      "value": value,
      "type": "font-size",
      "category": "font-size"
    }
  }

  var lineHeightToken = (name, value, fontSize) => {
    return {
      "name": name,
      "value": value,
      "type": "line-height",
      "category": "line-height",
      "meta": {
        "fontSize": fontSize
      }
    }
  }

  _.each(typefaces, function (typeface) {

    // Create typeface tokens

    var fontStack = []

    // Merge font, font fallbacks, and font generic 
    // into font stack
    fontStack.push(typeface.fontFamily)
    fontStack = fontStack.concat(typeface.fontFamilyFallbacks) 
    fontStack.push(typeface.fontFamilyGeneric)

    metrics.tokens.props.push({
      "name": changeCase.constantCase('typeface ' + typeface.name),
      "value": String(fontStack),
      "type": "string",
      "category": "font-family"
    })

    _.each(scales, function (scale) {
      _.each(sizes, function (size) {

        // Append plus or minus to sizes. Necessary bc
        // case conversion doesnt handle neg signs well.
        var sizeString = function (size) {
          if (size === 0) { return size; } 
          else if (size > 0) { return `${size}` } 
          else { return `minus ${size}` }
        } 

        // Create font size and line height tokens
        var theseMetrics = Metrics(scale, typeface, size)
        var prefix = changeCase.constantCase(`type size ${sizeString(size)} ${typeface.name} ${scale.name}`)

        metrics.tokens.props.push(
          fontSizeToken(prefix + '_FONT_SIZE', theseMetrics.fontSize),
          lineHeightToken(prefix + '_LINE_HEIGHT', theseMetrics.lineHeight, theseMetrics.fontSize),
          lineHeightToken(prefix + '_LINE_HEIGHT_TIGHT', theseMetrics.lineHeightTight, theseMetrics.fontSize),
          fontSizeToken(prefix + '_UPPERCASE_FONT_SIZE', theseMetrics.uppercaseFontSize),
          lineHeightToken(prefix + '_UPPERCASE_LINE_HEIGHT', theseMetrics.uppercaseLineHeight, theseMetrics.uppercaseFontSize),
          lineHeightToken(prefix + '_UPPERCASE_LINE_HEIGHT_TIGHT', theseMetrics.uppercaseLineHeightTight, theseMetrics.uppercaseFontSize)
        )
      })
    })
  })

  return {
    typefaces: opts.typefaces,
    scales: scales,
    sizes: sizes,
    metrics: metrics,
    convertTokens: function () {
      return convertTokens(this.metrics.tokens)
    }
  }
}

