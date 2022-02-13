
module.exports = {
  typeId: '{ String }',
  valid: [
    { value: [] },
    { value: [ 'foobar' ] },
    { value: {} },
    { value: { a: 'foo', b: 'bar' } },
    { valueId: 'emptyType' },
    { valueId: 'Array6-S' },
    { valueId: 'Array7' }
  ],
  invalid: [
    { exception: 'Expected \\{String\\}, got String ""', value: '' },
    {
      exception: 'Expected \\{String\\}, got String "foobar"',
      value: 'foobar'
    },
    { exception: 'Expected \\{String\\}, got Number 0', value: 0 },
    { exception: 'Expected \\{String\\}, got Number 1', value: 1 },
    {
      exception: 'Expected \\{String\\}, got Number 1\\.5',
      value: 1.5
    },
    { exception: 'Expected \\{String\\}, got Number 10', value: 10 },
    {
      exception: 'Expected property "0" of type String, got Number 0',
      value: [ 0 ]
    },
    {
      exception: 'Expected property "0" of type String, got Object',
      value: [ { a: 0 } ]
    },
    {
      exception: 'Expected property "0" of type String, got null',
      value: [ null ]
    },
    {
      exception: 'Expected \\{String\\}, got Boolean false',
      value: false
    },
    {
      exception: 'Expected \\{String\\}, got Boolean true',
      value: true
    },
    {
      exception: 'Expected \\{String\\}, got undefined',
      value: undefined
    },
    { exception: 'Expected \\{String\\}, got null', value: null },
    {
      exception: 'Expected property "a" of type String, got null',
      value: { a: null }
    },
    {
      exception: 'Expected property "a" of type String, got Number 0',
      value: { a: 0 }
    },
    {
      exception: 'Expected property "a" of type String, got Number 0',
      value: { a: 0, b: 0 }
    },
    {
      exception: 'Expected property "b" of type String, got Number 0',
      value: { b: 0 }
    },
    {
      exception: 'Expected property "a" of type String, got Object',
      value: { a: { b: 0 } }
    },
    {
      exception: 'Expected property "a" of type String, got Object',
      value: { a: { b: null } }
    },
    {
      exception: 'Expected property "a" of type String, got Object',
      value: { a: { b: { c: 0 } } }
    },
    {
      exception: 'Expected property "a" of type String, got Object',
      value: { a: { b: { c: null } } }
    },
    {
      exception: 'Expected property "a" of type String, got Object',
      value: { a: { b: { c: 0, d: 0 } } }
    },
    {
      exception: 'Expected property "b" of type String, got Object',
      value: { a: 'foo', b: { c: 'bar' } }
    },
    {
      exception: 'Expected \\{String\\}, got Function',
      valueId: 'function'
    },
    {
      exception: 'Expected property "x" of type String, got Number 2',
      valueId: 'customType'
    },
    {
      exception: 'Expected property "a" of type String, got undefined',
      valueId: '{ a: undefined }'
    },
    {
      exception: 'Expected property "a" of type String, got Buffer',
      valueId: '{ a: Buffer3 }'
    },
    {
      exception: 'Expected property "a" of type String, got Buffer',
      valueId: '{ a: Buffer10 }'
    },
    {
      exception: 'Expected property "a" of type String, got Object',
      valueId: '{ a: { b: Buffer3 } }'
    },
    {
      exception: 'Expected property "a" of type String, got Object',
      valueId: '{ a: { b: Buffer10 } }'
    },
    {
      exception: 'Expected property "x" of type String, got Number 1',
      valueId: '{ x: 1 }'
    },
    {
      exception: 'Expected property "y" of type String, got Number 2',
      valueId: '{ y: 2 }'
    },
    {
      exception: 'Expected property "x" of type String, got Number 1',
      valueId: '{ x: 1, y: 2 }'
    },
    {
      exception: 'Expected property "0" of type String, got Number 1',
      valueId: 'Array5'
    },
    {
      exception: 'Expected property "0" of type String, got Number 1',
      valueId: 'Array6'
    },
    {
      exception: 'Expected property "0" of type String, got Number 1',
      valueId: 'Array7-N'
    },
    {
      exception: 'Expected property "readBigUInt64LE" of type String, got Function',
      valueId: 'Buffer'
    },
    {
      exception: 'Expected property "0" of type String, got Number 255',
      valueId: 'Buffer3'
    },
    {
      exception: 'Expected property "0" of type String, got Number 255',
      valueId: 'Buffer10'
    },
    {
      exception: 'Expected \\{String\\}, got String "boop"',
      valueId: 'String4'
    },
    {
      exception: 'Expected \\{String\\}, got String "fff"',
      value: 'fff'
    },
    {
      exception: 'Expected \\{String\\}, got String "cafe1122deadbeef"',
      value: 'cafe1122deadbeef'
    },
    {
      exception: 'Expected \\{String\\}, got String "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"',
      value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
    },
    { exception: 'Expected \\{String\\}, got Number -1', value: -1 },
    { exception: 'Expected \\{String\\}, got Number 127', value: 127 },
    { exception: 'Expected \\{String\\}, got Number 128', value: 128 },
    { exception: 'Expected \\{String\\}, got Number 255', value: 255 },
    { exception: 'Expected \\{String\\}, got Number 256', value: 256 },
    {
      exception: 'Expected \\{String\\}, got Number -128',
      value: -128
    },
    {
      exception: 'Expected \\{String\\}, got Number -129',
      value: -129
    },
    {
      exception: 'Expected \\{String\\}, got Number 65534',
      value: 65534
    },
    {
      exception: 'Expected \\{String\\}, got Number 65535',
      value: 65535
    },
    {
      exception: 'Expected \\{String\\}, got Number 65536',
      value: 65536
    },
    {
      exception: 'Expected \\{String\\}, got Number 4294967295',
      value: 4294967295
    },
    {
      exception: 'Expected \\{String\\}, got Number 9007199254740991',
      value: 9007199254740991
    },
    {
      exception: 'Expected \\{String\\}, got Number 9007199254740994',
      value: 9007199254740994
    },
    {
      exception: 'Expected \\{String\\}, got Number -9007199254740991',
      value: -9007199254740991
    },
    {
      exception: 'Expected \\{String\\}, got Number -9007199254740994',
      value: -9007199254740994
    }
  ]
}
