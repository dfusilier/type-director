exports = module.exports = Typeface;

var _ = require('underscore');

function Typeface(props) {
  return _.extend({
    fontFamily: 'Times',
    fontFamilyFallbacks: [],
    fontFamilyGeneric: 'serif',
    fontSizeAdjustment: 1.00,
    lineHeightAdjustment: 1.00,
    uppercaseAdjustment: 0.85
  }, props);
}

/* Generic family names */
// font-family: serif;
// font-family: sans-serif;
// font-family: monospace;
// font-family: cursive;
// font-family: fantasy;
// font-family: system-ui;

