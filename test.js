var _ = require('underscore');
var theo = require('theo');


var opts = {

  typefaces: [
    {
      name: 'georgia',
      fontFamily: 'Georgia',
      fontFamilyFallbacks: ['Times', 'Times New Roman'], 
      fontFamilyGeneric: 'serif',
      fontSizeAdjustment: 1.00,
      lineHeightAdjustment: 1.00,
      uppercaseAdjustment: 0.82
    },
    {
      name: 'verdana',
      fontFamily: 'Verdana',
      fontFamilyFallbacks: [],
      fontFamilyGeneric: 'sans-serif',
      fontSizeAdjustment: 0.89,
      lineHeightAdjustment: 0.94,
      uppercaseAdjustment: 0.85
    },
    {
      name: 'menlo',
      fontFamily: 'Menlo',
      fontFamilyFallbacks: ['Consolas'],
      fontFamilyGeneric: 'monospace',
      fontSizeAdjustment: 1.00,
      lineHeightAdjustment: 1.00,
      uppercaseAdjustment: 0.85
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
      },
      lineHeight: {
        base: 1.45,
        max: 1.23,
        precision: 0.01,
        unit: null,
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
      },
      lineHeight: {
        base: 1.45,
        max: 1.23,
        precision: 0.01,
        unit: null,
      }
    }
  ]  
};

var Typography = require('./index.js')
var typography = Typography(opts);

// Pretty format json
console.log(JSON.stringify(typography, null, 4));



// const output = theo.convert({
//   transform: {
//     type: 'web',
//     file: 'package.json',
//     data: JSON.stringify(typography.tokens)
//   },
//   format: {
//     type: 'scss'
//   }
// });

// console.log(output);