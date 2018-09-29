var _ = require('underscore');
var theo = require('theo');


var swapUnit = function (prop, unit) {
  return unit ? parseFloat(prop.get("value")) + unit
}

var isAbsolute = function(str) {
  var absoluteUnits = ['px', 'pt', 'sp']
  return absoluteUnits.some(unit => str.includes(unit))
}

var relativeToAbsolute = function (value, base, unit) {
  var result = value * base
  return result + unit
}

var absoluteToRelative = function (value, base, unit) {
  var result = value / base
  return result + unit
}


var relativeToAbsoluteFS = function (prop, unit) {
  var base = prop.meta.rootFontSize ? parseFloat(prop.meta.rootFontSize) : 16
  var value = parseFloat(prop.get("value"))
  return relativeToAbsolute(value, base, unit)
}

var relativeToAbsoluteLH = function (prop, unit) {
  var rootFontSize = prop.meta.rootFontSize ? parseFloat(prop.meta.rootFontSize) : 16 
  var fontSize = parseFloat(prop.meta.fontSize)
  var base = prop.meta.fontSize * prop.meta.rootFontSize
  var value = parseFloat(prop.get("value"))
  return relativeToAbsolute(value, base, unit)
}

var absoluteToRelative = function (prop) {
  var base = prop.meta.base ? parseFloat(prop.meta.base) : 16
  var value = parseFloat(prop.get("value"))
  var result = value / base
  return result + unit
}


exports = module.exports = {

  // FONT SIZES

  "font-size/pt": {
    predicate: function (prop) {
      return prop.get("type") === "font-size"
    },
    transform: function (prop) {
      return swapUnit(prop, "pt")
    }
  }

  "font-size/sp": {
    predicate: function (prop) {
      return prop.get("type") === "font-size"
    },
    transform: function (prop) {
      return swapUnit(prop, "sp")
    }
  }

  "font-size/px": {
    predicate: function (prop) {
      return prop.get("type") === "font-size"
    },
    transform: function (prop) {
      return swapUnit(prop, "px")
    }
  }

  // LINE HEIGHTS 

  "line-height/px": {
    predicate: function (prop) {
      return prop.get("type") === "line-height"
    },
    transform: function (prop) {
      return isAbsolute(prop) ? swapUnit(prop, "px") : absoluteToRelative(prop, "px")
    }
  }

  "line-height/pt": {
    predicate: function (prop) {
      return prop.get("type") === "font-size"
    },
    transform: function (prop) {
      return isAbsolute(prop) ? absoluteToRelative(prop) : swapUnit(prop, "pt")
    }
  }

  "line-height/relative": {
    predicate: function (prop) {
      return prop.get("type") === "font-size"
    },
    transform: function (prop) {
      return isAbsolute(prop) ? absoluteToRelative(prop) : swapUnit(prop, "")
    }
  }
}

