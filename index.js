exports = module.exports = Typography;

var _ = require('underscore');

var makeFontAdjustments = require('./src/makeFontAdjustments.js');
var TypeScale = require('./src/TypeScale.js');


function Typography(opts) {

  var typography = _.extend({}, opts);

  var environments = typography.environments;
  var typefaces = typography.typefaces;

  _.each(environments, function (environment) {

    environment.sizes = {};

    var typeScales = _.mapObject(typefaces, function (val, key) {
      var adustedOpts = makeFontAdjustments(_.extend({}, val, environment, { sizes: typography.sizes }));
      return TypeScale(adustedOpts);
    }); 

    var typefaceKeys = _.keys(typeScales);
    var sizeKeys = _.keys(_.values(typeScales)[0]);
    var sizes = {};

    _.each(sizeKeys, function (sizeKey) {
      var sizeValue = {}
      _.each(typefaceKeys, function (typefaceKey) {
        sizeValue[typefaceKey] = _.extend({}, typeScales[typefaceKey][sizeKey], { fontFamily: typefaces[typefaceKey].fontFamily }) 
      })
      sizes[sizeKey] = sizeValue
    });

    environment.sizes = sizes;

  });

  return typography;
}

