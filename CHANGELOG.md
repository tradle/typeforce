# `2.0.0`

## Features

### match/assert on compiled types

Any type compiled with `typeforce.compile()` now has a `.match` and a `.assert` function that is faster than using the `typeforce()` method.

## Breaking Changes

### Main export

The main export is an object instead of a function now. 

```javascript
// OLD
const tf = require('typeforce')
tf(tf.String, 1)

// NEW
const tf = require('typeforce')
tf.assert(tf.String, 1)
```

### "noThrows" has become match

Where previously you needed to import `nothrow`
now you can simply use `.match` to get the same operation.

```javascript
// OLD
const tf = require('typeforce/nothrow')
tf(tf.String, 1)

// NEW
const tf = require('typeforce')
tf.match(tf.String, 1)
```
