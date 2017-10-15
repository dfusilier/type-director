exports = module.exports = Environment;

var _ = require('underscore');

function Environment(props) {

  var props = _.defaults(props, {
    mediaQuery: null,
    fontSize: {
      base: 14,
      max: 48,
      precision: null,
      unit: 'px',
      ratio:
    },
    lineHeight: {
      base: 1.45,
      max: 1.25,
      precision: null,
      unit: null,
    }
  });


  var calculateRatio = function () {
    var ratio = Math.pow(opts.max / opts.base,  1 / opts.largerSizes);
  }

  return _.extend({
    mediaQuery: null,
    fontSize: {
      base: 14,
      max: 48,
      precision: null,
      unit: 'px',
      ratio:
    },
    lineHeight: {
      base: 1.45,
      max: 1.25,
      precision: null,
      unit: null,
    }
  }, props);
}



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
