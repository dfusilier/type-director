exports = module.exports = Metrics;

var _ = require('underscore');



function Metrics(environment, typeface, size) {

  // Calculate a metric on a modular scale
  var calcModularSize = function (base, ratio, size) {
    return base * Math.pow(ratio, size);
  }

  var fontSize = calcModularSize(environment.fontSize.base, environment.fontSize.ratio, size);
  var lineHeight = calcModularSize(environment.lineHeight.base, environment.lineHeight.ratio, size);

  // Additionally, create a tigher line height halfway between normal
  // line height and 'set solid' (meaning, 1.0 or 14px over 14px)
  var lineHeightTight = ((lineHeight - 1.0) / 2) + 1;

  // Adjust a font size
  var adjustFontSize = function (value) {
    return value * typeface.fontSizeAdjustment;
  }

  var adjustUppercaseFontSize = function (value) {
    return value * typeface.fontSizeAdjustment * typeface.uppercaseAdjustment;
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

  // Adjust a line height. When line heights are ratios, the 
  // font size and its adjustments must be taken into account.
  var adjustUppercaseLineHeight = function (value) {
    if(!environment.lineHeight.unit) {
      return value * typeface.lineHeightAdjustment / (typeface.fontSizeAdjustment * typeface.uppercaseAdjustment);
    } else {
      return value * typeface.lineHeightAdjustment;
    }
  }

  // Round the value to a given increment
  var round = function (val, precision) {
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

  adjustedFontSize = adjustFontSize(fontSize);
  adjustedLineHeight = adjustLineHeight(lineHeight);
  adjustedLineHeightTight = adjustLineHeight(lineHeightTight);
  adjustedUppercaseFontSize = adjustUppercaseFontSize(fontSize);
  adjustedUppercaseLineHeight = adjustUppercaseLineHeight(lineHeight);
  adjustedUppercaseLineHeightTight = adjustUppercaseLineHeight(lineHeightTight);

  return {
    fontSize: prepValue(adjustedFontSize, environment.fontSize.precision, environment.fontSize.unit),
    lineHeight: prepValue(adjustedLineHeight, environment.lineHeight.precision, environment.lineHeight.unit),
    lineHeightTight: prepValue(adjustedLineHeightTight, environment.lineHeight.precision, environment.lineHeight.unit),
    uppercaseFontSize: prepValue(adjustedUppercaseFontSize, environment.fontSize.precision, environment.fontSize.unit),
    uppercaseLineHeight: prepValue(adjustedUppercaseLineHeight, environment.lineHeight.precision, environment.lineHeight.unit),
    uppercaseLineHeightTight: prepValue(adjustedUppercaseLineHeightTight, environment.lineHeight.precision, environment.lineHeight.unit),
  }
}

