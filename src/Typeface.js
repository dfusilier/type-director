var _ = require('underscore');


exports = module.exports = function (opts) {

  opts = _.extend({
    name: 'new',
    fontFamily: 'Times',
    fontFamilyFallbacks: [],
    fontFamilyGeneric: 'serif',
    fontSizeAdjustment: 1.00,
    lineHeightAdjustment: 1.00,
    uppercaseAdjustment: 1.00
  }, opts);

  return opts;
}