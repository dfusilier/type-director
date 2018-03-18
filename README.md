
# Type Director

Type Director generates a responsive, modular, nuanced typographic system from only a few key variables. Metrics are exported as json and cross-platform Theo tokens.



## Features

1. Modular. Typographic measurements are based on proportional lists of values. 
2. Responsive. Typography adjusts to the unique constraints of each breakpoint.
3. Nuanced. Various properties allow detail-oriented typographers to align additional fonts or uppercase styles to a modular scale.



## Install 

* Terminal: `npm install type-director --save`



## Usage

### Defining typefaces

Easily apply various typeface-specific adjustments: 

```js
const typefaces = [
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
]

```

Oftentimes two typfaces set to the same font-size do not appear to be. This is because the heights of their lowercase letters are not equal. Use the `fontSizeAdjustment` property to normalize additional typefaces to the default typeface, ensuring they align to the modular scale.

For example, Verdana appears 11% larger than Georgia. To normalize it with Georgia, we can set a `fontSizeAdjustment: 0.89`. This will cause Verdana to be 11% smaller than Georgia when set to the same "size".

Similarly, you can also apply an adjustment to line-height on a typeface-by-typeface basis by specifying a `lineHeightAdjustment`.


### Define your modular scales

Easily create a modular scales that adapt to each environment:

```js

const scales = [ 
  {
    name: 'phone',
    fontSize: {
      base: 16,
      max: 28,
      unit: 'px'
    },
    lineHeight: {
      base: 1.45,
      max: 1.35,
      unit: ''
    }
  },
  {
    name: 'tablet',
    fontSize: {
      base: 18,
      max: 42,
      unit: 'px'
    },
    lineHeight: {
      base: 1.4,
      max: 1.25,
      unit: ''
    }
  }
]
```
For each scale, provide a font size and line height for both your base size and max size. The other sizes will be interpolated from these constraints.



### Build typography

```js
const typography = TypeDirector({
  typefaces: typefaces,
  scales: scales,
  sizes: {
    smaller: 1,
    larger: 3
  },
})
```

That's it! The returned object will include Theo tokens for font size, line height, and font family.

If you need a bit of typographic guidance, [Responsive Typography: The Basics](https://ia.net/know-how/responsive-typography-the-basics 'Responsive Typography: The Basics') by Information Architects is an excellent read.


## Advanced Usage

### Rounding 

Rounding to any precision is supported. 

```js

const scales = [ 
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
      precision: 0.01
    }
  },
  ...
]
```

### Tight line-heights

Oftentimes you may need to set very narrow lines of text, causing your line-height to look too loose. For a tighter line-height, use the `"line-height": "tight"` option.

```scss
.caption-tight { 
  @include td-responsive-type-size("verdana", -1, $opts: ("line-height": "tight"));
}
```
