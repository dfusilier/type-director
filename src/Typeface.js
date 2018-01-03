exports = module.exports = Typeface;

var _ = require('underscore');

function Typeface(opts) {

  opts = _.extend({
    name: "new",
    fontFamily: "Times",
    fontFamilyFallbacks: [],
    fontFamilyGeneric: 'serif',
    fontSizeAdjustment: 1.00,
    lineHeightAdjustment: 1.00,
    uppercaseAdjustment: 0.8
  }, opts);

  return opts;
}