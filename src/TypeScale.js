exports = module.exports = TypeScale;

var _ = require('underscore');
var Scale = require('./Scale.js');

function TypeScale(opts) {

  var fontSizeScale = Scale(_.extend({}, opts.fontSize, opts.sizes));
  var lineHeightScale = Scale(_.extend({}, opts.lineHeight, opts.sizes));
  var typeScale = {};

  fontSizeScale = _.mapObject(fontSizeScale, function (val) {
    return {
      fontSize: val + opts.fontSize.unit
    }
  });

  lineHeightScale = _.mapObject(lineHeightScale, function (val) {
    return {
      lineHeight: val + opts.lineHeight.unit,
      lineHeightTight: (((val - 1.0) / 2) + 1) + opts.lineHeight.unit,
      lineHeightSolid: 1.0 + opts.lineHeight.unit
    }
  });

  typeScale = _.mapObject(fontSizeScale, function (val, key) {
    return _.extend(val, lineHeightScale[key])
  });

  return typeScale;
}

