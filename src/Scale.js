exports = module.exports = Scale;

var _ = require('underscore');



function Scale(opts, numberSizes) {

  var scale = _.extend({
    name: 'newScale',
    fontSize: {
      base: 16,
      max: 48,
      precision: 0.1,
      unit: 'px',
    },
    lineHeight: {
      base: 1.45,
      max: 1.25,
      precision: 0.01,
      unit: '',
    }
  }, opts);

  // Calculate the ratio needed to make a modular scale between values 
  // a and b, resulting in the specified number of values.

  function calcRatio(a, b, numbValues) {
    return Math.pow(b / a,  1 / numbValues);
  }

  // Calculate the max size in a modular scale based on value a using the 
  // specified ratio and resulting in the specified number of values.

  function calcMax(a, ratio, numbValues) {
    return a * Math.pow(ratio, numbValues);
  }

  // Calculate fontSize and lineHeight ratios 
  // used to produce metrics for each size.

  scale.fontSize.ratio = calcRatio(scale.fontSize.base, scale.fontSize.max, numberSizes)
  scale.lineHeight.ratio = calcRatio(scale.lineHeight.base, scale.lineHeight.max, numberSizes)

  return scale;
}

