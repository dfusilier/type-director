
# Type Director

Type Director generates a responsive, modular, nuanced typographic system from only a few key variables.



## Features

1. Modular. Typographic measurements are based on proportional lists of values. 
2. Responsive. Typography adjusts to the unique constraints of each breakpoint.
3. Nuanced. Various properties allow detail-oriented typographers to align additional fonts or uppercase styles to a modular scale.



## Install 

* Terminal: `npm install type-director --save`



## Usage

### Declare your typefaces

Typefaces associate a font-family with various typeface-specific adjustments. Specify your typefaces in the options object like so:

```js
const typefaces = [
  {
    name: 'default',
    fontFamily: 'Georgia',
    fontFamilyFallbacks: ['Times', 'Times New Roman'],
    fontFamilyGeneric: 'serif',
    fontSizeAdjustment: 1.00,
    lineHeightAdjustment': 1.00
  },
  {
    name: 'display',
    fontFamily: 'Verdana',
    fontFamilyFallbacks: ['Helvetica', 'Helvetica Neue'],
    fontFamilyGeneric: 'sans-serif',
    fontSizeAdjustment: 0.89,
    lineHeightAdjustment: 0.94
  },
  {
    name: 'code',
    fontFamily: 'Monaco',
    fontFamilyFallbacks: ['Courier'],
    fontFamilyGeneric: 'monospace',
    fontSizeAdjustment: 0.89,
    lineHeightAdjustment: 0.94
  }
]

```

Oftentimes two typfaces set to the same font-size do not appear to be. This is because the heights of their lowercase letters are not equal. Use the `fontSizeAdjustment` property to normalize additional typefaces to the default typeface, ensuring they align to the modular scale.

For example, Verdana appears 11% larger than Georgia. To normalize it with Georgia, we can set a `fontSizeAdjustment: 0.89`. This will cause Verdana to be 11% smaller than Georgia when set to the same size.

Similarly, you can also apply an adjustment to line-height on a typeface-by-typeface basis by specifying a `lineHeightAdjustment`.



### Declare your environments

Environments associate a media query with a modular type scale. Specify your environments in the options object like so:

```js

const environments = [ 
  {
    name: 'phone',
    fontSize: {
      base: 16,
      max: 28,
      unit: 'px',
      precision: 0.1
    },
    lineHeight: {
      base: 1.45,
      max: 1.35,
      unit: '',
      precision: 0.1
    }
  },
  {
    name: 'tablet',
    mediaQuery: 'screen and (min-width: 768px)',
    fontSize: {
      base: 18,
      max: 42,
      unit: 'px',
      precision: 0.1
    },
    lineHeight: {
      base: 1.4,
      max: 1.25,
      unit: '',
      precision: 0.01
    }
  }
]
```
For each environment, you'll need to specify font-size and line-height for both your base and max size. The type scale for each environment will be interpolated from these constraints.

A `mediaQuery` property should also be set for each environment, except for the environment you'd like to be default.



### Build typography

```js
const typography = TypeDirector({
  typefaces: typefaces,
  environments: environments,
  sizes: {
    smaller: 1,
    larger: 3
  },
})
```

That's it! The returned object will include Theo tokens for font size, line height, and font family.

If you need a bit of typographic guidance, [Responsive Typography: The Basics](https://ia.net/know-how/responsive-typography-the-basics 'Responsive Typography: The Basics') by Information Architects is an excellent read.

