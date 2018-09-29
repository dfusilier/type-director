var _ = require('underscore');


exports = module.exports = function (opts) {

  opts = _.extend({
    smaller: 1,
    larger: 5
  }, opts);

  var sizes = []

  // Create an array containing each size.
  for (var i = -opts.smaller; i <= opts.larger; i++) {
    sizes.push(i)
  }

  return sizes;
}