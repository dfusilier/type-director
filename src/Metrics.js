var _ = require('underscore');
var round = require('./utils/round');


exports = module.exports = function (scale, typeface, size) {

  // Calculate a metric on a modular scale
  var calcModularSize = function (base, ratio, size) {
    return base * Math.pow(ratio, size);
  }

  var fontSize = calcModularSize(scale.fontSize.base, scale.fontSize.ratio, size);
  var lineHeight = calcModularSize(scale.lineHeight.base, scale.lineHeight.ratio, size);


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
    if(!scale.lineHeight.unit) {
      return value * typeface.lineHeightAdjustment / typeface.fontSizeAdjustment;
    } else {
      return value * typeface.lineHeightAdjustment;
    }
  }  

  // Adjust a line height. When line heights are ratios, the 
  // font size and its adjustments must be taken into account.
  var adjustUppercaseLineHeight = function (value) {
    if(!scale.lineHeight.unit) {
      return value * typeface.lineHeightAdjustment / (typeface.fontSizeAdjustment * typeface.uppercaseAdjustment);
    } else {
      return value * typeface.lineHeightAdjustment;
    }
  }

  // Rounds value to appropriate precision and appends unit
  var prepValue = function (val, precision, unit) {
    var result = round(val, precision);
    if (!result) { 
      return result;
    } else {
      return unit ? result + unit : result;
    }
  }  

  adjustedFontSize = adjustFontSize(fontSize);
  adjustedLineHeight = adjustLineHeight(lineHeight);
  adjustedLineHeightTight = adjustLineHeight(lineHeightTight);
  adjustedUppercaseFontSize = adjustUppercaseFontSize(fontSize);
  adjustedUppercaseLineHeight = adjustUppercaseLineHeight(lineHeight);
  adjustedUppercaseLineHeightTight = adjustUppercaseLineHeight(lineHeightTight);

  return {
    fontSize: prepValue(adjustedFontSize, scale.fontSize.precision, scale.fontSize.unit),
    lineHeight: prepValue(adjustedLineHeight, scale.lineHeight.precision, scale.lineHeight.unit),
    lineHeightTight: prepValue(adjustedLineHeightTight, scale.lineHeight.precision, scale.lineHeight.unit),
    uppercaseFontSize: prepValue(adjustedUppercaseFontSize, scale.fontSize.precision, scale.fontSize.unit),
    uppercaseLineHeight: prepValue(adjustedUppercaseLineHeight, scale.lineHeight.precision, scale.lineHeight.unit),
    uppercaseLineHeightTight: prepValue(adjustedUppercaseLineHeightTight, scale.lineHeight.precision, scale.lineHeight.unit),
  }
}

