var _ = require('underscore');
var theo = require('theo');


var isAbsolute = function(str) {
  var absoluteUnits = ['px', 'pt', 'sp']
  return absoluteUnits.some(unit => str.includes(unit))
}

var swapUnit = function (prop, unit) {
  return unit ? parseFloat(prop.get("value")) + unit
}

var relativeToAbsolute = function (prop, unit) {
  var base = prop.meta.base ? parseFloat(prop.meta.base) : 16
  var value = parseFloat(prop.get("value"))
  var result = base * value
  return result + unit
}

var absoluteToRelative = function (prop) {
  var base = prop.meta.base ? parseFloat(prop.meta.base) : 16
  var value = parseFloat(prop.get("value"))
  var result = value / base
  return result + unit
}


exports = module.exports = {

  // FONT SIZE => ABSOLUTE

  "font-size/pt": {
    predicate: function (prop) {
      return prop.get("type") === "font-size"
    },
    transform: function (prop) {
      return isAbsolute(prop) ? swapUnit(prop, "pt") : relativeToAbsolute(prop, "pt")
    }
  }

  "font-size/sp": {
    predicate: function (prop) {
      return prop.get("type") === "font-size"
    },
    transform: function (prop) {
      return isAbsolute(prop) ? swapUnit(prop, "sp") : relativeToAbsolute(prop, "sp")
    }
  }

  "font-size/px": {
    predicate: function (prop) {
      return prop.get("type") === "font-size"
    },
    transform: function (prop) {
      return isAbsolute(prop) ? swapUnit(prop, "px") : relativeToAbsolute(prop, "px")
    }
  }

  // FONT SIZE => RELATIVE

  "font-size/relative": {
    predicate: function (prop) {
      return prop.get("type") === "font-size"
    },
    transform: function (prop) {
      return isAbsolute(prop) ? absoluteToRelative(prop) : swapUnit(prop, "")
    }
  }

  "font-size/em": {
    predicate: function (prop) {
      return prop.get("type") === "font-size"
    },
    transform: function (prop) {
      return isAbsolute(prop) ? absoluteToRelative(prop) : swapUnit(prop, "em")
    }
  }

  "font-size/rem": {
    predicate: function (prop) {
      return prop.get("type") === "font-size"
    },
    transform: function (prop) {
      return isAbsolute(prop) ? absoluteToRelative(prop) : swapUnit(prop, "rem")
    }
  }
}


  // Register transforms

  theo.registerTransform("web", []);
  theo.registerTransform("ios", ["font-size/ios"]);
  theo.registerTransform("android", ["font-size/android"]);

  // Create sass tokens

  var sassPromise = theo.convert({
    transform: {
      type: 'web',
      file: 'typography.json',
      data: JSON.stringify(tokens)
    },
    format: { type: 'map.scss' } 
  })

  var iosPromise = theo.convert({
    transform: {
      type: 'ios',
      file: 'typography.json',
      data: JSON.stringify(tokens)
    },
    format: { type: 'ios.json' } 
  })

  var androidPromise = theo.convert({
    transform: {
      type: 'android',
      file: 'typography.json',
      data: JSON.stringify(tokens)
    },
    format: { type: 'android.xml' } 
  })

  return {
    sass: sassPromise,
    ios: iosPromise,
    android: androidPromise
  };
