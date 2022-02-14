const fixture = require('./fixture.js')
const TYPES = require('../types')

const fix = fixture('"Finite"', TYPES['Finite'], ({ valid, invalid }) => {
  valid({ value: 0 })
  valid({ value: 1 })
  valid({ value: 1.5 })
  valid({ value: 10 })
  valid({ valueId: 'Finite' })
  valid({ value: -1 })
  valid({ value: 127 })
  valid({ value: 128 })
  valid({ value: 255 })
  valid({ value: 256 })
  valid({ value: -128 })
  valid({ value: -129 })
  valid({ value: 65534 })
  valid({ value: 65535 })
  valid({ value: 65536 })
  valid({ value: 4294967295 })
  valid({ value: 9007199254740991 })
  valid({ value: 9007199254740994 })
  valid({ value: -9007199254740991 })
  valid({ value: -9007199254740994 })
  invalid({ exception: 'Expected Finite, got String ""', value: '' })
  invalid({ exception: 'Expected Finite, got String "foobar"', value: 'foobar' })
  invalid({ exception: 'Expected Finite, got Array', value: [] })
  invalid({ exception: 'Expected Finite, got Array', value: [ 0 ] })
  invalid({ exception: 'Expected Finite, got Array', value: [ 'foobar' ] })
  invalid({ exception: 'Expected Finite, got Array', value: [ { a: 0 } ] })
  invalid({ exception: 'Expected Finite, got Array', value: [ null ] })
  invalid({ exception: 'Expected Finite, got Boolean false', value: false })
  invalid({ exception: 'Expected Finite, got Boolean true', value: true })
  invalid({ exception: 'Expected Finite, got undefined', value: undefined })
  invalid({ exception: 'Expected Finite, got null', value: null })
  invalid({ exception: 'Expected Finite, got Object', value: {} })
  invalid({ exception: 'Expected Finite, got Object', value: { a: null } })
  invalid({ exception: 'Expected Finite, got Object', value: { a: 0 } })
  invalid({ exception: 'Expected Finite, got Object', value: { a: 0, b: 0 } })
  invalid({ exception: 'Expected Finite, got Object', value: { b: 0 } })
  invalid({ exception: 'Expected Finite, got Object', value: { a: { b: 0 } } })
  invalid({ exception: 'Expected Finite, got Object', value: { a: { b: null } } })
  invalid({
    exception: 'Expected Finite, got Object',
    value: { a: { b: { c: 0 } } }
  })
  invalid({
    exception: 'Expected Finite, got Object',
    value: { a: { b: { c: null } } }
  })
  invalid({
    exception: 'Expected Finite, got Object',
    value: { a: { b: { c: 0, d: 0 } } }
  })
  invalid({ exception: 'Expected Finite, got Object', value: { a: 'foo', b: 'bar' } })
  invalid({ exception: 'Expected Finite, got Object', value: { a: 'foo', b: { c: 'bar' } } })
  invalid({ exception: 'Expected Finite, got Function', valueId: 'function' })
  invalid({ exception: 'Expected Finite, got EmptyType', valueId: 'emptyType' })
  invalid({ exception: 'Expected Finite, got CustomType', valueId: 'customType' })
  invalid({ exception: 'Expected Finite, got Object', valueId: '{ a: undefined }' })
  invalid({ exception: 'Expected Finite, got Object', valueId: '{ a: Buffer3 }' })
  invalid({ exception: 'Expected Finite, got Object', valueId: '{ a: Buffer10 }' })
  invalid({ exception: 'Expected Finite, got Object', valueId: '{ a: { b: Buffer3 } }' })
  invalid({ exception: 'Expected Finite, got Object', valueId: '{ a: { b: Buffer10 } }' })
  invalid({ exception: 'Expected Finite, got Object', valueId: '{ x: 1 }' })
  invalid({ exception: 'Expected Finite, got Object', valueId: '{ y: 2 }' })
  invalid({ exception: 'Expected Finite, got Object', valueId: '{ x: 1, y: 2 }' })
  invalid({ exception: 'Expected Finite, got Array', valueId: 'Array5' })
  invalid({ exception: 'Expected Finite, got Array', valueId: 'Array6' })
  invalid({ exception: 'Expected Finite, got Array', valueId: 'Array7-N' })
  invalid({ exception: 'Expected Finite, got Array', valueId: 'Array6-S' })
  invalid({ exception: 'Expected Finite, got Array', valueId: 'Array7' })
  invalid({ exception: 'Expected Finite, got Buffer', valueId: 'Buffer' })
  invalid({ exception: 'Expected Finite, got Buffer', valueId: 'Buffer3' })
  invalid({ exception: 'Expected Finite, got Buffer', valueId: 'Buffer10' })
  invalid({ exception: 'Expected Finite, got String "boop"', valueId: 'String4' })
  invalid({ exception: 'Expected Finite, got Number Infinity', valueId: '+Infinity' })
  invalid({ exception: 'Expected Finite, got Number -Infinity', valueId: '-Infinity' })
  invalid({ exception: 'Expected Finite, got String "fff"', value: 'fff' })
  invalid({ exception: 'Expected Finite, got String "cafe1122deadbeef"', value: 'cafe1122deadbeef' })
  invalid({
    exception: 'Expected Finite, got String "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"',
    value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
  })
})

if (require.main === module) {
  fix(require('../..').compile, require('fresh-tape'))
} else {
  module.exports = fix
}
