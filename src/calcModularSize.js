exports = module.exports = calcModularSize;

// The value of a size on a modular scale, 
// given a base size and ratio.

function calcModularSize(base, ratio, size) {
  return base * Math.pow(ratio, size);
}


