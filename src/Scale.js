var _ = require('underscore');


// From options provided, calculate parameters that will
// be used to define all metrics for all sizes in the scale.

// Typical scale examples include "phone", "tablet", "desktop", 
// "tv", "print", etc.

exports = module.exports = function (opts, numberSizes) {

  var fontSizeScale = _.extend({
    base: 16,
    max: 48,
    unit: 'px',
    ratio: undefined
  }, opts.fontSize)

  var lineHeightScale = _.extend({
    base: 1.45,
    max: 1.25,
    unit: '',
    ratio: undefined
  }, opts.lineHeight)

  var scale = _.extend({
    name: 'new scale'
  }, opts, {fontSize: fontSizeScale}, {lineHeight: lineHeightScale});

  if(scale.fontSize.unit != 'px' && 'em' && 'rem' && 'pt') {
    throw new Error(`Font size unit is ` + scale.fontSize.unit + `. Must be 'px', 'em', 'rem', or 'pt'.`)
  }
  if(scale.lineHeight.unit != '' && null && 'px' && 'em' && 'rem' && 'pt') {
    throw new Error(`Line height unit is ` + scale.lineHeight.unit + `. Must be '', null, 'px', 'em', 'rem', or 'pt'.`)
  }
  if(typeof scale.fontSize.base != 'number') {
    throw new Error(`Base font size is ` + scale.fontSize.base + `. It must be a number.`)
  }
  if(typeof scale.fontSize.max != 'number') {
    throw new Error(`Max font size is ` + scale.fontSize.max + `. It must be a number.`)
  }
  if(typeof scale.lineHeight.base != 'number') {
    throw new Error(`Base line height is ` + scale.lineHeight.base + `. It must be a number.`)
  }
  if(typeof scale.lineHeight.max != 'number') {
    throw new Error(`Max line height is ` + scale.lineHeight.max + `. It must be a number.`)
  }
  

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

  // If ratio is provided, use to calculate max.
  // If max is provided, use to calculate ratio.
  // Do for both fontSize and lineHeight. 
  // Will be used to produce metrics for each size.

  if (scale.fontSize.ratio) {
    scale.fontSize.max = calcMax(scale.fontSize.base, scale.fontSize.ratio, numberSizes);
  } else {
    scale.fontSize.ratio = calcRatio(scale.fontSize.base, scale.fontSize.max, numberSizes);
  }

  if (scale.lineHeight.ratio) {
    scale.lineHeight.max = calcMax(scale.lineHeight.base, scale.lineHeight.ratio, numberSizes);
  } else {
    scale.lineHeight.ratio = calcRatio(scale.lineHeight.base, scale.lineHeight.max, numberSizes);
  }

  return scale;
}

