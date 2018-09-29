var mocha  = require('mocha');
var assert = require('assert');
var Typography = require('../index.js');


describe('Typography', function () {

  var opts = {
    typefaces: [
      {
        name: 'georgia',
        fontFamily: 'Georgia',
        fontFamilyFallbacks: ['Times', 'Times New Roman'], 
        fontFamilyGeneric: 'serif',
        fontSizeAdjustment: 1.00,
        lineHeightAdjustment: 1.00,
        uppercaseAdjustment: 1.00
      },
      {
        name: 'verdana',
        fontFamily: 'Verdana',
        fontFamilyFallbacks: [],
        fontFamilyGeneric: 'sans-serif',
        fontSizeAdjustment: 0.89,
        lineHeightAdjustment: 0.94,
        uppercaseAdjustment: 1.00
      },
      {
        name: 'menlo',
        fontFamily: 'Menlo',
        fontFamilyFallbacks: ['Consolas'],
        fontFamilyGeneric: 'monospace',
        fontSizeAdjustment: 0.90,
        lineHeightAdjustment: 1.00,
        uppercaseAdjustment: 1.00
      }
    ],

    sizes: {
      smaller: 1,
      larger: 3
    },

    scales: [{},
      {
        name: 'phone',
        mediaQuery: '',
        fontSize: {
          base: 14,
          max: 36,
          precision: 0.1,
          unit: 'px',
          root: 14
        },
        lineHeight: {
          base: 1.45,
          max: 1.23,
          precision: 0.01,
          unit: undefined,
        }
      },
      {
        name: 'tablet',
        mediaQuery: '@media (min-width: 768px)',
        fontSize: {
          base: 14,
          max: 48,
          precision: 0.01,
          unit: 'px',
          root: 14
        },
        lineHeight: {
          base: 1.45,
          max: 1.23,
          precision: 0.01,
          unit: undefined,
        }
      }
    ]  
  };

  describe('with default opts', function () {
    var typography = Typography(opts);

    it('has scales', function () {
      assert(typography.scales.length >= 1);
    });

    it('has typefaces', function () {
      assert(typography.typefaces.length >= 1);
    });

    it('has scales', function () {
      assert(typography.scales.length >= 1);
    });
    
    it('has flat metrics', function () {
      assert(typography.metrics.flat.length >= 1);
    });
    
    it('has nested metrics', function () {
      assert(Object.keys(typography.metrics.nested).length >= 1);
    });
    
    it('has token metrics', function () {
      assert(Object.keys(typography.metrics.tokens.props).length >= 1);
    });

    // Opts
    // console.log(opts);

    // Pretty format json
    // console.log(JSON.stringify(typography.metrics, undefined, 4));
    console.log(JSON.stringify(typography.metrics, undefined, 4));

    // Theo output
    // console.log(typography.convertTokens())

  });
});



