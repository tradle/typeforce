const fixture = require('./fixture.js')
const TYPES = require('../types')

const fix = fixture('"{ String }"', TYPES['{ String }'], ({ valid, invalid }) => {
  valid({ value: [] })
  valid({ value: [ 'foobar' ] })
  valid({ value: {} })
  valid({ value: { a: 'foo', b: 'bar' } })
  valid({ valueId: 'emptyType' })
  valid({ valueId: 'Array6-S' })
  valid({ valueId: 'Array7' })
  invalid({ exception: 'Expected \\{String\\}, got String ""', value: '' })
  invalid({ exception: 'Expected \\{String\\}, got String "foobar"', value: 'foobar' })
  invalid({ exception: 'Expected \\{String\\}, got Number 0', value: 0 })
  invalid({ exception: 'Expected \\{String\\}, got Number 1', value: 1 })
  invalid({ exception: 'Expected \\{String\\}, got Number 1\\.5', value: 1.5 })
  invalid({ exception: 'Expected \\{String\\}, got Number 10', value: 10 })
  invalid({ exception: 'Expected property "0" of type String, got Number 0', value: [ 0 ] })
  invalid({ exception: 'Expected property "0" of type String, got Object', value: [ { a: 0 } ] })
  invalid({ exception: 'Expected property "0" of type String, got null', value: [ null ] })
  invalid({ exception: 'Expected \\{String\\}, got Boolean false', value: false })
  invalid({ exception: 'Expected \\{String\\}, got Boolean true', value: true })
  invalid({ exception: 'Expected \\{String\\}, got undefined', value: undefined })
  invalid({ exception: 'Expected \\{String\\}, got null', value: null })
  invalid({ exception: 'Expected property "a" of type String, got null', value: { a: null } })
  invalid({ exception: 'Expected property "a" of type String, got Number 0', value: { a: 0 } })
  invalid({ exception: 'Expected property "a" of type String, got Number 0', value: { a: 0, b: 0 } })
  invalid({ exception: 'Expected property "b" of type String, got Number 0', value: { b: 0 } })
  invalid({ exception: 'Expected property "a" of type String, got Object', value: { a: { b: 0 } } })
  invalid({
    exception: 'Expected property "a" of type String, got Object',
    value: { a: { b: null } }
  })
  invalid({
    exception: 'Expected property "a" of type String, got Object',
    value: { a: { b: { c: 0 } } }
  })
  invalid({
    exception: 'Expected property "a" of type String, got Object',
    value: { a: { b: { c: null } } }
  })
  invalid({
    exception: 'Expected property "a" of type String, got Object',
    value: { a: { b: { c: 0, d: 0 } } }
  })
  invalid({
    exception: 'Expected property "b" of type String, got Object',
    value: { a: 'foo', b: { c: 'bar' } }
  })
  invalid({ exception: 'Expected \\{String\\}, got Function', valueId: 'function' })
  invalid({ exception: 'Expected property "x" of type String, got Number 2', valueId: 'customType' })
  invalid({
    exception: 'Expected property "a" of type String, got undefined',
    valueId: '{ a: undefined }'
  })
  invalid({
    exception: 'Expected property "a" of type String, got Buffer',
    valueId: '{ a: Buffer3 }'
  })
  invalid({
    exception: 'Expected property "a" of type String, got Buffer',
    valueId: '{ a: Buffer10 }'
  })
  invalid({
    exception: 'Expected property "a" of type String, got Object',
    valueId: '{ a: { b: Buffer3 } }'
  })
  invalid({
    exception: 'Expected property "a" of type String, got Object',
    valueId: '{ a: { b: Buffer10 } }'
  })
  invalid({ exception: 'Expected property "x" of type String, got Number 1', valueId: '{ x: 1 }' })
  invalid({ exception: 'Expected property "y" of type String, got Number 2', valueId: '{ y: 2 }' })
  invalid({
    exception: 'Expected property "x" of type String, got Number 1',
    valueId: '{ x: 1, y: 2 }'
  })
  invalid({ exception: 'Expected property "0" of type String, got Number 1', valueId: 'Array5' })
  invalid({ exception: 'Expected property "0" of type String, got Number 1', valueId: 'Array6' })
  invalid({ exception: 'Expected property "0" of type String, got Number 1', valueId: 'Array7-N' })
  invalid({
    exception: 'Expected property "readBigUInt64LE" of type String, got Function',
    valueId: 'Buffer'
  })
  invalid({ exception: 'Expected property "0" of type String, got Number 255', valueId: 'Buffer3' })
  invalid({ exception: 'Expected property "0" of type String, got Number 255', valueId: 'Buffer10' })
  invalid({ exception: 'Expected \\{String\\}, got String "boop"', valueId: 'String4' })
  invalid({ exception: 'Expected \\{String\\}, got Number 1', valueId: 'Finite' })
  invalid({ exception: 'Expected \\{String\\}, got Number Infinity', valueId: '+Infinity' })
  invalid({ exception: 'Expected \\{String\\}, got Number -Infinity', valueId: '-Infinity' })
  invalid({ exception: 'Expected \\{String\\}, got String "fff"', value: 'fff' })
  invalid({
    exception: 'Expected \\{String\\}, got String "cafe1122deadbeef"',
    value: 'cafe1122deadbeef'
  })
  invalid({
    exception: 'Expected \\{String\\}, got String "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"',
    value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
  })
  invalid({ exception: 'Expected \\{String\\}, got Number -1', value: -1 })
  invalid({ exception: 'Expected \\{String\\}, got Number 127', value: 127 })
  invalid({ exception: 'Expected \\{String\\}, got Number 128', value: 128 })
  invalid({ exception: 'Expected \\{String\\}, got Number 255', value: 255 })
  invalid({ exception: 'Expected \\{String\\}, got Number 256', value: 256 })
  invalid({ exception: 'Expected \\{String\\}, got Number -128', value: -128 })
  invalid({ exception: 'Expected \\{String\\}, got Number -129', value: -129 })
  invalid({ exception: 'Expected \\{String\\}, got Number 65534', value: 65534 })
  invalid({ exception: 'Expected \\{String\\}, got Number 65535', value: 65535 })
  invalid({ exception: 'Expected \\{String\\}, got Number 65536', value: 65536 })
  invalid({ exception: 'Expected \\{String\\}, got Number 4294967295', value: 4294967295 })
  invalid({
    exception: 'Expected \\{String\\}, got Number 9007199254740991',
    value: 9007199254740991
  })
  invalid({
    exception: 'Expected \\{String\\}, got Number 9007199254740994',
    value: 9007199254740994
  })
  invalid({
    exception: 'Expected \\{String\\}, got Number -9007199254740991',
    value: -9007199254740991
  })
  invalid({
    exception: 'Expected \\{String\\}, got Number -9007199254740994',
    value: -9007199254740994
  })
})

if (require.main === module) {
  fix(require('../..').compile, require('fresh-tape'))
} else {
  module.exports = fix
}
