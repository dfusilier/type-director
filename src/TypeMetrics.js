exports = module.exports = TypeMetrics;

var _ = require('underscore');
var calcModularSize = require('./calcModularSize.js');
var round = require('./round.js');

function TypeMetrics(environment, typeface, size) {

  var fontSize = calcModularSize(environment.fontSize.base, environment.fontSize.ratio, size);
  var lineHeight = calcModularSize(environment.lineHeight.base, environment.lineHeight.ratio, size);

  // Additionally, create a tigher line height halfway between normal
  // line height and 'set solid' (meaning, 1.0 or 14px over 14px)
  var lineHeightTight = ((lineHeight - 1.0) / 2) + 1;

  var adjustFontSize = function (value) {
    return value * typeface.fontSizeAdjustment;
  }

  var adjustLineHeight = function (value) {

    if(!environment.lineHeight.unit) {
      return value * typeface.lineHeightAdjustment / typeface.fontSizeAdjustment;
    } else {
      return value * typeface.lineHeightAdjustment;
    }
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

