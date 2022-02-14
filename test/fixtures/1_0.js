const fixture = require('./fixture.js')
const TYPES = require('../types')

const fix = fixture('"(Boolean, Number)"', TYPES['(Boolean, Number)'], ({ invalid }) => {
  invalid({ exception: 'Expected property "0" of type Boolean, got undefined', value: '' })
  invalid({ exception: 'Expected property "0" of type Boolean, got String "f"', value: 'foobar' })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Number 0', value: 0 })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Number 1', value: 1 })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Number 1\\.5', value: 1.5 })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Number 10', value: 10 })
  invalid({ exception: 'Expected property "0" of type Boolean, got undefined', value: [] })
  invalid({ exception: 'Expected property "0" of type Boolean, got Number 0', value: [ 0 ] })
  invalid({
    exception: 'Expected property "0" of type Boolean, got String "foobar"',
    value: [ 'foobar' ]
  })
  invalid({ exception: 'Expected property "0" of type Boolean, got Object', value: [ { a: 0 } ] })
  invalid({ exception: 'Expected property "0" of type Boolean, got null', value: [ null ] })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Boolean false', value: false })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Boolean true', value: true })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got undefined', value: undefined })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got null', value: null })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Object', value: {} })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Object', value: { a: null } })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Object', value: { a: 0 } })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Object', value: { a: 0, b: 0 } })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Object', value: { b: 0 } })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Object', value: { a: { b: 0 } } })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Object', value: { a: { b: null } } })
  invalid({
    exception: 'Expected \\(Boolean, Number\\), got Object',
    value: { a: { b: { c: 0 } } }
  })
  invalid({
    exception: 'Expected \\(Boolean, Number\\), got Object',
    value: { a: { b: { c: null } } }
  })
  invalid({
    exception: 'Expected \\(Boolean, Number\\), got Object',
    value: { a: { b: { c: 0, d: 0 } } }
  })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Object', value: { a: 'foo', b: 'bar' } })
  invalid({
    exception: 'Expected \\(Boolean, Number\\), got Object',
    value: { a: 'foo', b: { c: 'bar' } }
  })
  invalid({ exception: 'Expected property "0" of type Boolean, got undefined', valueId: 'function' })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got EmptyType', valueId: 'emptyType' })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got CustomType', valueId: 'customType' })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Object', valueId: '{ a: undefined }' })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Object', valueId: '{ a: Buffer3 }' })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Object', valueId: '{ a: Buffer10 }' })
  invalid({
    exception: 'Expected \\(Boolean, Number\\), got Object',
    valueId: '{ a: { b: Buffer3 } }'
  })
  invalid({
    exception: 'Expected \\(Boolean, Number\\), got Object',
    valueId: '{ a: { b: Buffer10 } }'
  })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Object', valueId: '{ x: 1 }' })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Object', valueId: '{ y: 2 }' })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Object', valueId: '{ x: 1, y: 2 }' })
  invalid({ exception: 'Expected property "0" of type Boolean, got Number 1', valueId: 'Array5' })
  invalid({ exception: 'Expected property "0" of type Boolean, got Number 1', valueId: 'Array6' })
  invalid({ exception: 'Expected property "0" of type Boolean, got Number 1', valueId: 'Array7-N' })
  invalid({ exception: 'Expected property "0" of type Boolean, got String "a"', valueId: 'Array6-S' })
  invalid({ exception: 'Expected property "0" of type Boolean, got String "a"', valueId: 'Array7' })
  invalid({ exception: 'Expected property "0" of type Boolean, got undefined', valueId: 'Buffer' })
  invalid({ exception: 'Expected property "0" of type Boolean, got Number 255', valueId: 'Buffer3' })
  invalid({ exception: 'Expected property "0" of type Boolean, got Number 255', valueId: 'Buffer10' })
  invalid({ exception: 'Expected property "0" of type Boolean, got String "b"', valueId: 'String4' })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Number 1', valueId: 'Finite' })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Number Infinity', valueId: '+Infinity' })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Number -Infinity', valueId: '-Infinity' })
  invalid({ exception: 'Expected property "0" of type Boolean, got String "f"', value: 'fff' })
  invalid({
    exception: 'Expected property "0" of type Boolean, got String "c"',
    value: 'cafe1122deadbeef'
  })
  invalid({
    exception: 'Expected property "0" of type Boolean, got String "0"',
    value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
  })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Number -1', value: -1 })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Number 127', value: 127 })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Number 128', value: 128 })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Number 255', value: 255 })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Number 256', value: 256 })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Number -128', value: -128 })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Number -129', value: -129 })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Number 65534', value: 65534 })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Number 65535', value: 65535 })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Number 65536', value: 65536 })
  invalid({ exception: 'Expected \\(Boolean, Number\\), got Number 4294967295', value: 4294967295 })
  invalid({
    exception: 'Expected \\(Boolean, Number\\), got Number 9007199254740991',
    value: 9007199254740991
  })
  invalid({
    exception: 'Expected \\(Boolean, Number\\), got Number 9007199254740994',
    value: 9007199254740994
  })
  invalid({
    exception: 'Expected \\(Boolean, Number\\), got Number -9007199254740991',
    value: -9007199254740991
  })
  invalid({
    exception: 'Expected \\(Boolean, Number\\), got Number -9007199254740994',
    value: -9007199254740994
  })
})

if (require.main === module) {
  fix(require('../..').compile, require('fresh-tape'))
} else {
  module.exports = fix
}
