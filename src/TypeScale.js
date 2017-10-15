exports = module.exports = TypeScale;

var _ = require('underscore');
var Scale = require('./Scale.js');
var round = require('./round.js');

function TypeScale(opts) {

  var fontSizeScale = Scale(_.extend({}, opts.fontSize, opts.sizes));
  var lineHeightScale = Scale(_.extend({}, opts.lineHeight, opts.sizes));
  var typeScale = {};

  // Rounds value to appropriate precision and appends unit
  var prepValue = function (val, precision, unit) {
    var result = val;
    result = precision ? round(result, precision) : result;
    result = unit ? result + unit : result;
    return result;
  }

  fontSizeScale = _.mapObject(fontSizeScale, function (val) {
    return {
      fontSize: prepValue(val, opts.fontSize.precision, opts.fontSize.unit)
    }
  });

  lineHeightScale = _.mapObject(lineHeightScale, function (val) {
    return {
      lineHeight: prepValue(val, opts.lineHeight.precision, opts.lineHeight.unit),
      lineHeightTight: prepValue((((val - 1.0) / 2) + 1), opts.lineHeight.precision, opts.lineHeight.unit),
      lineHeightSolid: prepValue(1.0, opts.lineHeight.precision, opts.lineHeight.unit)
    }
  });

  typeScale = _.mapObject(fontSizeScale, function (val, key) {
    return _.extend(val, lineHeightScale[key])
  });

  return typeScale;
}

