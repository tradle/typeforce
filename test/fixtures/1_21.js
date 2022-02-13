
module.exports = {
  typeId: '{ String: Number }',
  valid: [
    { value: [] },
    { value: [ 0 ] },
    { value: {} },
    { value: { a: 0 } },
    { value: { a: 0, b: 0 } },
    { value: { b: 0 } },
    { valueId: 'emptyType' },
    { valueId: 'customType' },
    { valueId: '{ x: 1 }' },
    { valueId: '{ y: 2 }' },
    { valueId: '{ x: 1, y: 2 }' },
    { valueId: 'Array5' },
    { valueId: 'Array6' },
    { valueId: 'Array7-N' }
  ],
  invalid: [
    {
      exception: 'Expected \\{String\\: Number\\}, got String ""',
      value: ''
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got String "foobar"',
      value: 'foobar'
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got Number 0',
      value: 0
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got Number 1',
      value: 1
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got Number 1\\.5',
      value: 1.5
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got Number 10',
      value: 10
    },
    {
      exception: 'Expected property "0" of type Number, got String "foobar"',
      value: [ 'foobar' ]
    },
    {
      exception: 'Expected property "0" of type Number, got Object',
      value: [ { a: 0 } ]
    },
    {
      exception: 'Expected property "0" of type Number, got null',
      value: [ null ]
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got Boolean false',
      value: false
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got Boolean true',
      value: true
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got undefined',
      value: undefined
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got null',
      value: null
    },
    {
      exception: 'Expected property "a" of type Number, got null',
      value: { a: null }
    },
    {
      exception: 'Expected property "a" of type Number, got Object',
      value: { a: { b: 0 } }
    },
    {
      exception: 'Expected property "a" of type Number, got Object',
      value: { a: { b: null } }
    },
    {
      exception: 'Expected property "a" of type Number, got Object',
      value: { a: { b: { c: 0 } } }
    },
    {
      exception: 'Expected property "a" of type Number, got Object',
      value: { a: { b: { c: null } } }
    },
    {
      exception: 'Expected property "a" of type Number, got Object',
      value: { a: { b: { c: 0, d: 0 } } }
    },
    {
      exception: 'Expected property "a" of type Number, got String "foo"',
      value: { a: 'foo', b: 'bar' }
    },
    {
      exception: 'Expected property "a" of type Number, got String "foo"',
      value: { a: 'foo', b: { c: 'bar' } }
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got Function',
      valueId: 'function'
    },
    {
      exception: 'Expected property "a" of type Number, got undefined',
      valueId: '{ a: undefined }'
    },
    {
      exception: 'Expected property "a" of type Number, got Buffer',
      valueId: '{ a: Buffer3 }'
    },
    {
      exception: 'Expected property "a" of type Number, got Buffer',
      valueId: '{ a: Buffer10 }'
    },
    {
      exception: 'Expected property "a" of type Number, got Object',
      valueId: '{ a: { b: Buffer3 } }'
    },
    {
      exception: 'Expected property "a" of type Number, got Object',
      valueId: '{ a: { b: Buffer10 } }'
    },
    {
      exception: 'Expected property "0" of type Number, got String "a"',
      valueId: 'Array6-S'
    },
    {
      exception: 'Expected property "0" of type Number, got String "a"',
      valueId: 'Array7'
    },
    {
      exception: 'Expected property "readBigUInt64LE" of type Number, got Function',
      valueId: 'Buffer'
    },
    {
      exception: 'Expected property "readBigUInt64LE" of type Number, got Function',
      valueId: 'Buffer3'
    },
    {
      exception: 'Expected property "readBigUInt64LE" of type Number, got Function',
      valueId: 'Buffer10'
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got String "boop"',
      valueId: 'String4'
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got String "fff"',
      value: 'fff'
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got String "cafe1122deadbeef"',
      value: 'cafe1122deadbeef'
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got String "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"',
      value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got Number -1',
      value: -1
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got Number 127',
      value: 127
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got Number 128',
      value: 128
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got Number 255',
      value: 255
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got Number 256',
      value: 256
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got Number -128',
      value: -128
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got Number -129',
      value: -129
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got Number 65534',
      value: 65534
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got Number 65535',
      value: 65535
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got Number 65536',
      value: 65536
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got Number 4294967295',
      value: 4294967295
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got Number 9007199254740991',
      value: 9007199254740991
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got Number 9007199254740994',
      value: 9007199254740994
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got Number -9007199254740991',
      value: -9007199254740991
    },
    {
      exception: 'Expected \\{String\\: Number\\}, got Number -9007199254740994',
      value: -9007199254740994
    }
  ]
}