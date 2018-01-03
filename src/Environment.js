exports = module.exports = Environment;

var _ = require('underscore');
var calcRatio = require('./calcRatio.js');

function Environment(opts, largerSizes) {

  var environment = _.extend({
    name: 'new',
    mediaQuery: '',
    fontSize: {
      base: 14,
      max: 36,
      precision: 0.01,
      unit: 'px',
    },
    lineHeight: {
      base: 1.45,
      max: 1.23,
      precision: 0.01,
      unit: null,
    }
  }, opts);


  // Calculate fontSize and lineHeight ratios 
  // used to produce metrics for each size.
  environment.fontSize.ratio = calcRatio(environment.fontSize.base, environment.fontSize.max, largerSizes)
  environment.lineHeight.ratio = calcRatio(environment.lineHeight.base, environment.lineHeight.max, largerSizes)

  return environment;
}

