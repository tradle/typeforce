const fixture = require('./fixture.js')
const TYPES = require('../types')

const fix = fixture('"(Number|String)"', TYPES['(Number|String)'], ({ valid, invalid }) => {
  valid({ value: 'foobar' })
  valid({ value: [ 0 ] })
  valid({ value: [ 'foobar' ] })
  valid({ valueId: 'Array5' })
  valid({ valueId: 'Array6' })
  valid({ valueId: 'Array7-N' })
  valid({ valueId: 'Array6-S' })
  valid({ valueId: 'Array7' })
  valid({ valueId: 'Buffer3' })
  valid({ valueId: 'Buffer10' })
  valid({ valueId: 'String4' })
  valid({ value: 'fff' })
  valid({ value: 'cafe1122deadbeef' })
  valid({ value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20' })
  invalid({ exception: 'Expected property "0" of type Number|String, got undefined', value: '' })
  invalid({
    exception: 'Expected \\(Number|String\\), got String "foobar"',
    strict: true,
    value: 'foobar'
  })
  invalid({ exception: 'Expected \\(Number|String\\), got Number 0', value: 0 })
  invalid({ exception: 'Expected \\(Number|String\\), got Number 1', value: 1 })
  invalid({ exception: 'Expected \\(Number|String\\), got Number 1\\.5', value: 1.5 })
  invalid({ exception: 'Expected \\(Number|String\\), got Number 10', value: 10 })
  invalid({ exception: 'Expected property "0" of type Number|String, got undefined', value: [] })
  invalid({
    exception: 'Expected property "0" of type Number|String, got Object',
    value: [ { a: 0 } ]
  })
  invalid({ exception: 'Expected property "0" of type Number|String, got null', value: [ null ] })
  invalid({ exception: 'Expected \\(Number|String\\), got Boolean false', value: false })
  invalid({ exception: 'Expected \\(Number|String\\), got Boolean true', value: true })
  invalid({ exception: 'Expected \\(Number|String\\), got undefined', value: undefined })
  invalid({ exception: 'Expected \\(Number|String\\), got null', value: null })
  invalid({ exception: 'Expected \\(Number|String\\), got Object', value: {} })
  invalid({ exception: 'Expected \\(Number|String\\), got Object', value: { a: null } })
  invalid({ exception: 'Expected \\(Number|String\\), got Object', value: { a: 0 } })
  invalid({ exception: 'Expected \\(Number|String\\), got Object', value: { a: 0, b: 0 } })
  invalid({ exception: 'Expected \\(Number|String\\), got Object', value: { b: 0 } })
  invalid({ exception: 'Expected \\(Number|String\\), got Object', value: { a: { b: 0 } } })
  invalid({ exception: 'Expected \\(Number|String\\), got Object', value: { a: { b: null } } })
  invalid({
    exception: 'Expected \\(Number|String\\), got Object',
    value: { a: { b: { c: 0 } } }
  })
  invalid({
    exception: 'Expected \\(Number|String\\), got Object',
    value: { a: { b: { c: null } } }
  })
  invalid({
    exception: 'Expected \\(Number|String\\), got Object',
    value: { a: { b: { c: 0, d: 0 } } }
  })
  invalid({ exception: 'Expected \\(Number|String\\), got Object', value: { a: 'foo', b: 'bar' } })
  invalid({
    exception: 'Expected \\(Number|String\\), got Object',
    value: { a: 'foo', b: { c: 'bar' } }
  })
  invalid({
    exception: 'Expected property "0" of type Number|String, got undefined',
    valueId: 'function'
  })
  invalid({ exception: 'Expected \\(Number|String\\), got EmptyType', valueId: 'emptyType' })
  invalid({ exception: 'Expected \\(Number|String\\), got CustomType', valueId: 'customType' })
  invalid({ exception: 'Expected \\(Number|String\\), got Object', valueId: '{ a: undefined }' })
  invalid({ exception: 'Expected \\(Number|String\\), got Object', valueId: '{ a: Buffer3 }' })
  invalid({ exception: 'Expected \\(Number|String\\), got Object', valueId: '{ a: Buffer10 }' })
  invalid({ exception: 'Expected \\(Number|String\\), got Object', valueId: '{ a: { b: Buffer3 } }' })
  invalid({
    exception: 'Expected \\(Number|String\\), got Object',
    valueId: '{ a: { b: Buffer10 } }'
  })
  invalid({ exception: 'Expected \\(Number|String\\), got Object', valueId: '{ x: 1 }' })
  invalid({ exception: 'Expected \\(Number|String\\), got Object', valueId: '{ y: 2 }' })
  invalid({ exception: 'Expected \\(Number|String\\), got Object', valueId: '{ x: 1, y: 2 }' })
  invalid({ exception: 'Expected \\(Number|String\\), got Array', strict: true, valueId: 'Array5' })
  invalid({ exception: 'Expected \\(Number|String\\), got Array', strict: true, valueId: 'Array6' })
  invalid({ exception: 'Expected \\(Number|String\\), got Array', strict: true, valueId: 'Array7-N' })
  invalid({ exception: 'Expected \\(Number|String\\), got Array', strict: true, valueId: 'Array6-S' })
  invalid({ exception: 'Expected \\(Number|String\\), got Array', strict: true, valueId: 'Array7' })
  invalid({
    exception: 'Expected property "0" of type Number|String, got undefined',
    valueId: 'Buffer'
  })
  invalid({ exception: 'Expected \\(Number|String\\), got Buffer', strict: true, valueId: 'Buffer3' })
  invalid({
    exception: 'Expected \\(Number|String\\), got Buffer',
    strict: true,
    valueId: 'Buffer10'
  })
  invalid({
    exception: 'Expected \\(Number|String\\), got String "boop"',
    strict: true,
    valueId: 'String4'
  })
  invalid({ exception: 'Expected \\(Number|String\\), got Number 1', valueId: 'Finite' })
  invalid({ exception: 'Expected \\(Number|String\\), got Number Infinity', valueId: '+Infinity' })
  invalid({ exception: 'Expected \\(Number|String\\), got Number -Infinity', valueId: '-Infinity' })
  invalid({ exception: 'Expected \\(Number|String\\), got String "fff"', strict: true, value: 'fff' })
  invalid({
    exception: 'Expected \\(Number|String\\), got String "cafe1122deadbeef"',
    strict: true,
    value: 'cafe1122deadbeef'
  })
  invalid({
    exception: 'Expected \\(Number|String\\), got String "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"',
    strict: true,
    value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
  })
  invalid({ exception: 'Expected \\(Number|String\\), got Number -1', value: -1 })
  invalid({ exception: 'Expected \\(Number|String\\), got Number 127', value: 127 })
  invalid({ exception: 'Expected \\(Number|String\\), got Number 128', value: 128 })
  invalid({ exception: 'Expected \\(Number|String\\), got Number 255', value: 255 })
  invalid({ exception: 'Expected \\(Number|String\\), got Number 256', value: 256 })
  invalid({ exception: 'Expected \\(Number|String\\), got Number -128', value: -128 })
  invalid({ exception: 'Expected \\(Number|String\\), got Number -129', value: -129 })
  invalid({ exception: 'Expected \\(Number|String\\), got Number 65534', value: 65534 })
  invalid({ exception: 'Expected \\(Number|String\\), got Number 65535', value: 65535 })
  invalid({ exception: 'Expected \\(Number|String\\), got Number 65536', value: 65536 })
  invalid({ exception: 'Expected \\(Number|String\\), got Number 4294967295', value: 4294967295 })
  invalid({
    exception: 'Expected \\(Number|String\\), got Number 9007199254740991',
    value: 9007199254740991
  })
  invalid({
    exception: 'Expected \\(Number|String\\), got Number 9007199254740994',
    value: 9007199254740994
  })
  invalid({
    exception: 'Expected \\(Number|String\\), got Number -9007199254740991',
    value: -9007199254740991
  })
  invalid({
    exception: 'Expected \\(Number|String\\), got Number -9007199254740994',
    value: -9007199254740994
  })
})

if (require.main === module) {
  fix(require('../..').compile, require('fresh-tape'))
} else {
  module.exports = fix
}
