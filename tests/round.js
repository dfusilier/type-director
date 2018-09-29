var mocha  = require('mocha');
var assert = require('assert');
var _ = require('underscore');

var round = require('../src/utils/round.js');

describe('Round', function () {

  describe('0.1', function () {
    var precision = 0.1;

    it('Round down', function () {
      assert.equal(round(1.03, precision), 1.0);
    });

    it('Round up even', function () {
      assert.equal(round(1.05, precision), 1.1);
    });
    
    it('Round up', function () {
      assert.equal(round(1.07, precision), 1.1);
    });
  });

  describe('0.3333', function () {
    var precision = 0.3333;

    it('Round down', function () {
      assert.equal(round(0.3334, precision), 0.3333);
    });

    it('Round up on half increment', function () {
      assert.equal(round(0.3333 + (0.3333 / 2), precision), 0.6666);
    });

    it('Round up', function () {
      assert.equal(round(0.6664, precision), 0.6666);
    });
  });

  describe('0.5', function () {
    var precision = 0.5;

    it('Round down', function () {
      assert.equal(round(1.12, precision), 1.0);
    });
    
    it('Round up on half increment', function () {
      assert.equal(round(1.25, precision), 1.5);
    });
    
    it('Round up', function () {
      assert.equal(round(1.37, precision), 1.5);
    });
  });

  describe('1', function () {
    var precision = 1;

    it('Round down', function () {
      assert.equal(round(1.2, precision), 1.0);
    });
    
    it('Round up on half increment', function () {
      assert.equal(round(1.5, precision), 2.0);
    });
    
    it('Round up', function () {
      assert.equal(round(1.7, precision), 2.0);
    });
  });

  describe('1.5', function () {
    var precision = 1.5;

    it('Round down', function () {
      assert.equal(round(2, precision), 1.5);
    });
    
    it('Round up on half increment', function () {
      assert.equal(round(2.25, precision), 3.0);
    });
    
    it('Round up', function () {
      assert.equal(round(2.5, precision), 3.0);
    });
  });  

  describe('10', function () {
    var precision = 10;

    it('Round down', function () {
      assert.equal(round(12.5, precision), 10);
    });
    
    it('Round up on half increment', function () {
      assert.equal(round(15, precision), 20);
    });
    
    it('Round up', function () {
      assert.equal(round(17.5, precision), 20);
    });
  });

});

