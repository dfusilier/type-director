exports = module.exports = Scale;

var _ = require('underscore');

function Scale(opts) {

  var opts = _.defaults(opts, {
    base: 12,
    max: 48, 
    unit: "px", 
    smallerSizes: 1, 
    largerSizes: 5
  });

  // The ratio we'll use to calculate the values.
  var ratio = Math.pow(opts.max / opts.base,  1 / opts.largerSizes);
  var values = {};

  for (var i = -opts.smallerSizes; i <= opts.largerSizes; i++) {
    values[i] = opts.base * Math.pow(ratio, i);
  }

  return values;
}

