exports = module.exports = Typography;

var _ = require('underscore');
var changeCase = require('change-case');

var Typeface = require('./src/Typeface.js');
var Scale = require('./src/Scale.js');
var Sizes = require('./src/Sizes.js');
var Metrics = require('./src/Metrics.js');


function Typography(opts) {

  var typefaces = opts.typefaces;
  var scales = [];
  var sizes = [];
  var metrics = {
    flat: [],
    nested: {},
    tokens: { props: {} }
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

  var fontSizeToken = (value) => {
    return {
      "value": value,
      "type": "size",
      "category": "font-size"
    }
  }

  var lineHeightToken = (value) => {
    return {
      "value": value,
      "type": "size",
      "category": "line-height"
    }
  }

  _.each(typefaces, function (typeface) {

    var fontStack = []
    fontStack.push(typeface.fontFamily)
    fontStack = fontStack.concat(typeface.fontFamilyFallbacks) 
    fontStack.push(typeface.fontFamilyGeneric)


    metrics.tokens.props[changeCase.constantCase('typeface ' + typeface.name)] = {
      value: String(fontStack)
    }

    _.each(scales, function (scale) {
    _.each(sizes, function (size) {
      
        var theseMetrics = Metrics(scale, typeface, size)
        var prefix = changeCase.constantCase('type size') + '_' + size + '_' + changeCase.constantCase(typeface.name + ' '  + scale.name)

        metrics.tokens.props[prefix + '_FONT_SIZE'] = fontSizeToken(theseMetrics.fontSize)
        metrics.tokens.props[prefix + '_LINE_HEIGHT'] = lineHeightToken(theseMetrics.lineHeight)
        metrics.tokens.props[prefix + '_LINE_HEIGHT_TIGHT'] = lineHeightToken(theseMetrics.lineHeightTight)
      })
    })
  })

  return {
    typefaces: opts.typefaces,
    scales: scales,
    sizes: sizes,
    metrics: metrics
  }
}

