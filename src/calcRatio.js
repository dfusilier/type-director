exports = module.exports = calcRatio;

// The ratio needed to make a modular scale between values 
// a and b, resulting in the specified number of values.

function calcRatio(a, b, numbValues) {
  return Math.pow(b / a,  1 / numbValues);
}


