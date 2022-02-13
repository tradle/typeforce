# typeforce
[![Version](https://img.shields.io/npm/v/typeforce.svg)](https://www.npmjs.org/package/typeforce)

Another biased type checking solution for Javascript.

Exception messages may change between patch versions,  as often the patch will change some behaviour that was unexpected and naturally it results in a different error message.

## Examples

``` javascript
const typeforce = require('typeforce')
const { assert } = typeforce

// supported primitives 'Array', 'Boolean', 'Buffer', 'Number', 'Object', 'String'
assert('Array', [])

assert('Number', [])
// TypeError: Expected Number, got Array

// array types
assert(['Object'], [{}])
assert(typeforce.arrayOf('Object'), [{}, {}, {}])

// enforces object properties 
assert({
  foo: 'Number'
}, {
  foo: 'bar'
})
// TypeError: Expected property "foo" of type Number, got String "bar"

// maybe types
assert('?Number', 2)
assert('?Number', null)
assert(typeforce.maybe(typeforce.Number), 2)
assert(typeforce.maybe(typeforce.Number), null)

// sum types
assert(typeforce.anyOf('String', 'Number'), 2)
assert(typeforce.allOf({ x: typeforce.Number }, { y: typeforce.Number }), {
  x: 1,
  y: 2
})

// value types
assert(typeforce.value(3.14), 3.14)

// custom types
function LongString (value, strict) {
  if (!typeforce.String(value)) return false
  if (value.length !== 32) return false
  return true
}

assert(LongString, '00000000000000000000000000000000')
// => OK!

assert(LongString, 'not long enough')
// TypeError: Expected LongString, got String 'not long enough'
```

**Pro**tips:
``` javascript
// use precompiled primitives for high performance
assert(typeforce.Array, array)

// or just precompile a template
const type = {
  foo: 'Number',
  bar: '?String'
}

const fastType = typeforce.compile(type)
// fastType => typeforce.object({
//   foo: typeforce.Number,
//   bar: typeforce.maybe(typeforce.String)
// })

// use strictness for recursive types to enforce whitelisting properties
assert({
  x: 'Number'
}, { x: 1 }, true)
// OK!

assert({
  x: 'Number'
}, { x: 1, y: 2 }, true)
// TypeError: Unexpected property 'y' of type Number
```

**Pro**tips (extended types):
``` javascript
assert(typeforce.tuple('String', 'Number'), ['foo', 1])
// OK!

assert(typeforce.tuple('Number', 'Number'), ['not a number', 1])
// TypeError: Expected property "0" of type Number, got String 'not a number'

assert(typeforce.map('Number'), {
  'anyKeyIsOK': 1
})
// OK!

assert(typeforce.map('Number', typeforce.HexN(8)), {
  'deadbeef': 1,
  'ffff0000': 2
})
// OK!

function Foo () {
  this.x = 2
}

assert(typeforce.quacksLike('Foo'), new Foo())
// OK!

// Note, any Foo will do
assert(typeforce.quacksLike('Foo'), new (function Foo() {}))
// OK!
```

**Pro**tips (no throw)
``` javascript
const typeforce = require('typeforce/nothrow')
const value = 'foobar'

if (typeforce(typeforce.Number, value)) {
  // didn't throw!
  console.log(`${value} is a number`) // never happens
} else {
  console.log(`Oops, ${typeforce.error.message}`)
  // prints 'Oops, Expected Number, got String foobar'
}
```

**Pro**tips (async)
``` javascript
const typeforce = require('typeforce/async')
const { assert } = typeforce

assert(typeforce.Number, value, function (err) {
  if (err) return console.log(`Oops, ${typeforce.error.message}`)

  console.log(`${value} is a number`) // never happens
})
```

**WARNING**: Be very wary of using the `quacksLike` type, as it relies on the `Foo.name` property.
If that property is mangled by a transpiler,  such as `uglifyjs`,  you will have a bad time.

## LICENSE [MIT](LICENSE)
