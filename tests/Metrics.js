var mocha  = require('mocha');
var assert = require('assert');
var _ = require('underscore');

var Metrics = require('../src/Metrics.js');
var Scale = require('../src/Scale.js');
var Typeface = require('../src/Scale.js');

var defaultTypeface = Typeface({
  name: 'georgia',
  fontFamily: 'Georgia',
  fontFamilyFallbacks: ['Times', 'Times New Roman'], 
  fontFamilyGeneric: 'serif',
  fontSizeAdjustment: 1.00,
  lineHeightAdjustment: 1.00,
  uppercaseAdjustment: 1.00
})

var adjustedTypeface = Typeface({
  name: 'verdana',
  fontFamily: 'Verdana',
  fontFamilyFallbacks: [],
  fontFamilyGeneric: 'sans-serif',
  fontSizeAdjustment: 0.5,
  lineHeightAdjustment: 0.5,
  uppercaseAdjustment: 0.5
})

var defaultScale = Scale({
  name: 'phone',
  mediaQuery: '',
  fontSize: {
    base: 10,
    max: 80,
    precision: 0.1,
    unit: 'px',
  },
  lineHeight: {
    base: 1,
    max: 8,
    precision: 0.01,
    unit: null,
  }
}, 3)

describe('Metrics', function () {

  describe('Calculations without typeface adjustments', function () {
    var metrics = Metrics(defaultScale, defaultTypeface, 1)

    it('fontSize', function () {
      assert.equal(metrics.fontSize, '20.0px');
    });

    it('lineHeight', function () {
      assert.equal(metrics.lineHeight, '2.00');
    });

    it('lineHeightTight', function () {
      assert.equal(metrics.lineHeightTight, '1.50');
    });

    it('upperCaseFontSize', function () {
      assert.equal(metrics.uppercaseFontSize, '20.0px');
    });

    it('upperCaseLineHeight', function () {
      assert.equal(metrics.uppercaseLineHeight, '2.00');
    });

    it('upperCaseLineHeightTight', function () {
      assert.equal(metrics.uppercaseLineHeightTight, '1.50');
    });
  });

  describe('Calculations with typeface adjustments', function () {
    var metrics = Metrics(defaultScale, adjustedTypeface, 1)

    it('fontSize', function () {
      assert.equal(metrics.fontSize, '10.0px');
    });

    it('lineHeight', function () {
      assert.equal(metrics.lineHeight, '2.00');
    });

    it('lineHeightTight', function () {
      assert.equal(metrics.lineHeightTight, '1.50');
    });

    it('upperCaseFontSize', function () {
      assert.equal(metrics.uppercaseFontSize, '5.0px');
    });

    it('upperCaseLineHeight', function () {
      assert.equal(metrics.uppercaseLineHeight, '4.00');
    });

    it('upperCaseLineHeightTight', function () {
      assert.equal(metrics.uppercaseLineHeightTight, '3.00');
    });
  });

});
