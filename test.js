var _ = require('underscore');


var opts = {

  typefaces: {
    georgia: {
      fontFamily: 'Georgia',
      fontFamilyFallbacks: [],
      fontFamilyGeneric: 'serif',
      fontSizeAdjustment: 1.00,
      lineHeightAdjustment: 1.00,
      uppercaseAdjustment: 0.82
    },
    verdana: {
      fontFamily: 'Verdana',
      fontFamilyFallbacks: [],
      fontFamilyGeneric: 'sans-serif',
      fontSizeAdjustment: 0.89,
      lineHeightAdjustment: 0.94,
      uppercaseAdjustment: 0.85
    },
    menlo: {
      fontFamily: 'Menlo',
      fontFamilyFallbacks: ['Consolas'],
      fontFamilyGeneric: 'monospace',
      fontSizeAdjustment: 1.00,
      lineHeightAdjustment: 1.00,
      uppercaseAdjustment: 0.85
    }
  },

  sizes: {
    smallerSizes: 2,
    largerSizes: 5
  },

  environments: {
    phone: {
      mediaQuery: null,
      fontSize: {
        base: 14,
        max: 48,
        precision: 0.01,
        unit: 'px',
      },
      lineHeight: {
        base: 1.45,
        max: 1.23,
        precision: 0.01,
        unit: null,
      }
    },
    tablet: {
      mediaQuery: null,
      fontSize: {
        base: 14,
        max: 48,
        precision: 0.01,
        unit: 'px',
      },
      lineHeight: {
        base: 1.45,
        max: 1.23,
        precision: 0.01,
        unit: null,
      }
    }
  },

  
};


var round = require('./src/round.js')
console.log(round(2.33, 0.5));

var Scale = require('./src/Scale.js')
var scale = Scale(_.extend({}, opts.environments.phone.lineHeight, opts.sizes));

var TypeScale = require('./src/TypeScale.js')
var typeScale = TypeScale(_.extend({}, opts.environments.phone, opts.sizes));

var makeFontAdjustments = require('./src/makeFontAdjustments.js')
var adjustedOpts = makeFontAdjustments(_.extend({}, opts.typefaces.verdana, opts.environments.phone, opts.sizes));
var adjustedTypeScale = TypeScale(adjustedOpts);

var Typography = require('./index.js')
var typography = Typography(opts);


console.log(JSON.stringify(typography, null, 4));

var round = require('./src/round.js')
console.log(round(2.33, 0.1));
