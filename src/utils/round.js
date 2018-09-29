

// Round the value to a given increment.


exports = module.exports = function (val, precision) {

  // If no precision, return original value.
  if (!precision) { return val }

  var result = Math.round(val / precision) * precision;

  // Floating point does weird stuff in js. fixed like so:
  var decimals = precision.toString().split('.')[1];
  result = result.toFixed(decimals ? decimals.length : 0);

  return result;
}