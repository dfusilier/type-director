exports = module.exports = makeFontAdjustments;

var _ = require('underscore');

function makeFontAdjustments(opts) {

  var adjustedFontSize = _.extend({}, opts.fontSize);

  var adjustFontSize = function (value) {
    return value * opts.fontSizeAdjustment;
  }

  adjustedFontSize.base = adjustFontSize(opts.fontSize.base);
  adjustedFontSize.max = adjustFontSize(opts.fontSize.max);


  var adjustedLineHeight = _.extend({}, opts.lineHeight);

  var adjustLineHeight = function (value) {

    if(!opts.lineHeight.unit) {
      return value * opts.lineHeightAdjustment / opts.fontSizeAdjustment;
    } else {
      return value * opts.lineHeightAdjustment;
    }
  }

  adjustedLineHeight.base = adjustLineHeight(opts.lineHeight.base);
  adjustedLineHeight.max = adjustLineHeight(opts.lineHeight.max);
  
  var adjustedOpts = _.extend({}, opts, { fontSize: adjustedFontSize }, { lineHeight: adjustedLineHeight });
  
  return adjustedOpts;
}

