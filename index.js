exports = module.exports = Typography;

var _ = require('underscore');

var Typeface = require('./src/Typeface.js');
var Environment = require('./src/Environment.js');
var TypeMetrics = require('./src/TypeMetrics.js');



function Typography(opts) {

  opts = _.extend({}, opts);

  var typefaces = opts.typefaces;
  var environments = [];
  var sizes = [];
  var scales = [];
  var metrics = {
    flat: [],
    nested: {}
  }

  environments = _.map(opts.environments, function (environment) {
    return Environment(environment, opts.sizes.largerSizes);
  });

  typefaces = _.map(opts.typefaces, function (typeface) {
    return Typeface(typeface);
  });

  // Create an array containing each size.
  for (var i = -opts.sizes.smallerSizes; i <= opts.sizes.largerSizes; i++) {
    sizes.push(i)
  }
  console.log()

  // Create metrics for each environment, 
  // size, and typeface combo.

  // Flatted array
  _.each(environments, function (environment) {
    _.each(sizes, function (size) {
      _.each(typefaces, function (typeface) {

        metrics.flat.push({
          environment: environment.name,
          typeface: typeface.name,
          size: size,
          values: TypeMetrics(environment, typeface, size)
        });

      });
    });
  });

  // Nested object
  _.each(environments, function (environment) {
    metrics.nested[environment.name] = {};

    _.each(sizes, function (size) {
      metrics.nested[environment.name][size] = {};

      _.each(typefaces, function (typeface) {
        metrics.nested[environment.name][size][typeface.name] = TypeMetrics(environment, typeface, size)
      });
    });
  });

  return {
    typefaces: opts.typefaces,
    environments: environments,
    sizes: sizes,
    metrics: metrics
  };

}

