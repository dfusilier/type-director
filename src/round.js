exports = module.exports = round;

var _ = require('underscore');

function round(val, precision) {
  var result = Math.round(val / precision) * precision;

  // floating point does weird stuff in js. fixed like so:
  var decimalPlaces = precision.toString().split('.')[1].length;
  result = result.toFixed(decimalPlaces);

  return result;
}

