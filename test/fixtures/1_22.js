
module.exports = {
  typeId: '{ Letter: Number }',
  valid: [
    { value: [] },
    { value: {} },
    { value: { a: 0 } },
    { value: { a: 0, b: 0 } },
    { value: { b: 0 } },
    { valueId: 'emptyType' },
    { valueId: 'customType' },
    { valueId: '{ x: 1 }' },
    { valueId: '{ y: 2 }' },
    { valueId: '{ x: 1, y: 2 }' }
  ],
  invalid: [
    {
      exception: 'Expected \\{Letter\\: Number\\}, got String ""',
      value: ''
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got String "foobar"',
      value: 'foobar'
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got Number 0',
      value: 0
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got Number 1',
      value: 1
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got Number 1\\.5',
      value: 1.5
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got Number 10',
      value: 10
    },
    {
      exception: 'Expected property "0" with key type Letter, got String "0"',
      value: [ 0 ]
    },
    {
      exception: 'Expected property "0" with key type Letter, got String "0"',
      value: [ 'foobar' ]
    },
    {
      exception: 'Expected property "0" with key type Letter, got String "0"',
      value: [ { a: 0 } ]
    },
    {
      exception: 'Expected property "0" with key type Letter, got String "0"',
      value: [ null ]
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got Boolean false',
      value: false
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got Boolean true',
      value: true
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got undefined',
      value: undefined
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got null',
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
      exception: 'Expected \\{Letter\\: Number\\}, got Function',
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
      exception: 'Expected property "0" with key type Letter, got String "0"',
      valueId: 'Array5'
    },
    {
      exception: 'Expected property "0" with key type Letter, got String "0"',
      valueId: 'Array6'
    },
    {
      exception: 'Expected property "0" with key type Letter, got String "0"',
      valueId: 'Array7-N'
    },
    {
      exception: 'Expected property "0" with key type Letter, got String "0"',
      valueId: 'Array6-S'
    },
    {
      exception: 'Expected property "0" with key type Letter, got String "0"',
      valueId: 'Array7'
    },
    {
      exception: 'Expected property "readBigUInt64LE" with key type Letter, got String "readBigUInt64LE"',
      valueId: 'Buffer'
    },
    {
      exception: 'Expected property "0" with key type Letter, got String "0"',
      valueId: 'Buffer3'
    },
    {
      exception: 'Expected property "0" with key type Letter, got String "0"',
      valueId: 'Buffer10'
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got String "boop"',
      valueId: 'String4'
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got String "fff"',
      value: 'fff'
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got String "cafe1122deadbeef"',
      value: 'cafe1122deadbeef'
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got String "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"',
      value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got Number -1',
      value: -1
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got Number 127',
      value: 127
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got Number 128',
      value: 128
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got Number 255',
      value: 255
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got Number 256',
      value: 256
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got Number -128',
      value: -128
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got Number -129',
      value: -129
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got Number 65534',
      value: 65534
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got Number 65535',
      value: 65535
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got Number 65536',
      value: 65536
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got Number 4294967295',
      value: 4294967295
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got Number 9007199254740991',
      value: 9007199254740991
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got Number 9007199254740994',
      value: 9007199254740994
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got Number -9007199254740991',
      value: -9007199254740991
    },
    {
      exception: 'Expected \\{Letter\\: Number\\}, got Number -9007199254740994',
      value: -9007199254740994
    }
  ]
}
