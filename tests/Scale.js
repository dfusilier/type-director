var mocha  = require('mocha');
var assert = require('assert');
var _ = require('underscore');

var Scale = require('../src/Scale.js');

describe('Scale', function () {
    
  it('Derive ratio from base and max', function () {
    var scale = Scale({
      fontSize: {
        base: 16,
        max: 48,
        unit: 'px',
        precision: undefined
      },
      lineHeight: {
        base: 1.45,
        max: 1.25,
        unit: '',
        precision: undefined
      }
    }, 3);
    assert(scale.fontSize.ratio && scale.lineHeight.ratio);
  });

  it('Derive max from base and ratio', function () {
    var scale = Scale({
      fontSize: {
        base: 16,
        ratio: 1.25,
        unit: 'px',
      },
      lineHeight: {
        base: 1.45,
        ratio: 1.1,
        unit: '',
      }
    }, 3);
    assert(scale.fontSize.max && scale.lineHeight.max);
  });

});

