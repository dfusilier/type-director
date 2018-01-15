exports = module.exports = Metrics;

var _ = require('underscore');



function Metrics(environment, typeface, size) {

  var fontSize = calcModularSize(environment.fontSize.base, environment.fontSize.ratio, size);
  var lineHeight = calcModularSize(environment.lineHeight.base, environment.lineHeight.ratio, size);

  // Additionally, create a tigher line height halfway between normal
  // line height and 'set solid' (meaning, 1.0 or 14px over 14px)
  var lineHeightTight = ((lineHeight - 1.0) / 2) + 1;

  // Calculate a metric on a modular scale
  function calcModularSize(base, ratio, size) {
    return base * Math.pow(ratio, size);
  }

  // Adjust a font size
  var adjustFontSize = function (value) {
    return value * typeface.fontSizeAdjustment;
  }

  // Adjust a line height. When line heights are ratios, the 
  // font size and its adjustments must be taken into account.
  var adjustLineHeight = function (value) {
    if(!environment.lineHeight.unit) {
      return value * typeface.lineHeightAdjustment / typeface.fontSizeAdjustment;
    } else {
      return value * typeface.lineHeightAdjustment;
    }
  }

  // Round the value to a given increment
  function round(val, precision) {
    var result = Math.round(val / precision) * precision;

    // floating point does weird stuff in js. fixed like so:
    var decimalPlaces = precision.toString().split('.')[1].length;
    result = result.toFixed(decimalPlaces);

    return result;
  }

  // Rounds value to appropriate precision and appends unit
  var prepValue = function (val, precision, unit) {
    var result = val;
    result = precision ? round(result, precision) : result;
    result = unit ? result + unit : result;
    return result;
  }  

  fontSize = adjustFontSize(fontSize);
  lineHeight = adjustLineHeight(lineHeight);
  lineHeightTight = adjustLineHeight(lineHeightTight);

  return {
    fontSize: prepValue(fontSize, environment.fontSize.precision, environment.fontSize.unit),
    lineHeight: prepValue(lineHeight, environment.lineHeight.precision, environment.lineHeight.unit),
    lineHeightTight: prepValue(lineHeightTight, environment.lineHeight.precision, environment.lineHeight.unit),
  }
}

