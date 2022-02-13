
module.exports = {
  typeId: '(Number|String)',
  valid: [
    { value: 'foobar' },
    { value: [ 0 ] },
    { value: [ 'foobar' ] },
    { valueId: 'Array5' },
    { valueId: 'Array6' },
    { valueId: 'Array7-N' },
    { valueId: 'Array6-S' },
    { valueId: 'Array7' },
    { valueId: 'Buffer3' },
    { valueId: 'Buffer10' },
    { valueId: 'String4' },
    { value: 'fff' },
    { value: 'cafe1122deadbeef' },
    {
      value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
    }
  ],
  invalid: [
    {
      exception: 'Expected property "0" of type Number|String, got undefined',
      value: ''
    },
    {
      exception: 'Expected \\(Number|String\\), got String "foobar"',
      strict: true,
      value: 'foobar'
    },
    {
      exception: 'Expected \\(Number|String\\), got Number 0',
      value: 0
    },
    {
      exception: 'Expected \\(Number|String\\), got Number 1',
      value: 1
    },
    {
      exception: 'Expected \\(Number|String\\), got Number 1\\.5',
      value: 1.5
    },
    {
      exception: 'Expected \\(Number|String\\), got Number 10',
      value: 10
    },
    {
      exception: 'Expected property "0" of type Number|String, got undefined',
      value: []
    },
    {
      exception: 'Expected property "0" of type Number|String, got Object',
      value: [ { a: 0 } ]
    },
    {
      exception: 'Expected property "0" of type Number|String, got null',
      value: [ null ]
    },
    {
      exception: 'Expected \\(Number|String\\), got Boolean false',
      value: false
    },
    {
      exception: 'Expected \\(Number|String\\), got Boolean true',
      value: true
    },
    {
      exception: 'Expected \\(Number|String\\), got undefined',
      value: undefined
    },
    {
      exception: 'Expected \\(Number|String\\), got null',
      value: null
    },
    {
      exception: 'Expected \\(Number|String\\), got Object',
      value: {}
    },
    {
      exception: 'Expected \\(Number|String\\), got Object',
      value: { a: null }
    },
    {
      exception: 'Expected \\(Number|String\\), got Object',
      value: { a: 0 }
    },
    {
      exception: 'Expected \\(Number|String\\), got Object',
      value: { a: 0, b: 0 }
    },
    {
      exception: 'Expected \\(Number|String\\), got Object',
      value: { b: 0 }
    },
    {
      exception: 'Expected \\(Number|String\\), got Object',
      value: { a: { b: 0 } }
    },
    {
      exception: 'Expected \\(Number|String\\), got Object',
      value: { a: { b: null } }
    },
    {
      exception: 'Expected \\(Number|String\\), got Object',
      value: { a: { b: { c: 0 } } }
    },
    {
      exception: 'Expected \\(Number|String\\), got Object',
      value: { a: { b: { c: null } } }
    },
    {
      exception: 'Expected \\(Number|String\\), got Object',
      value: { a: { b: { c: 0, d: 0 } } }
    },
    {
      exception: 'Expected \\(Number|String\\), got Object',
      value: { a: 'foo', b: 'bar' }
    },
    {
      exception: 'Expected \\(Number|String\\), got Object',
      value: { a: 'foo', b: { c: 'bar' } }
    },
    {
      exception: 'Expected property "0" of type Number|String, got undefined',
      valueId: 'function'
    },
    {
      exception: 'Expected \\(Number|String\\), got EmptyType',
      valueId: 'emptyType'
    },
    {
      exception: 'Expected \\(Number|String\\), got CustomType',
      valueId: 'customType'
    },
    {
      exception: 'Expected \\(Number|String\\), got Object',
      valueId: '{ a: undefined }'
    },
    {
      exception: 'Expected \\(Number|String\\), got Object',
      valueId: '{ a: Buffer3 }'
    },
    {
      exception: 'Expected \\(Number|String\\), got Object',
      valueId: '{ a: Buffer10 }'
    },
    {
      exception: 'Expected \\(Number|String\\), got Object',
      valueId: '{ a: { b: Buffer3 } }'
    },
    {
      exception: 'Expected \\(Number|String\\), got Object',
      valueId: '{ a: { b: Buffer10 } }'
    },
    {
      exception: 'Expected \\(Number|String\\), got Object',
      valueId: '{ x: 1 }'
    },
    {
      exception: 'Expected \\(Number|String\\), got Object',
      valueId: '{ y: 2 }'
    },
    {
      exception: 'Expected \\(Number|String\\), got Object',
      valueId: '{ x: 1, y: 2 }'
    },
    {
      exception: 'Expected \\(Number|String\\), got Array',
      strict: true,
      valueId: 'Array5'
    },
    {
      exception: 'Expected \\(Number|String\\), got Array',
      strict: true,
      valueId: 'Array6'
    },
    {
      exception: 'Expected \\(Number|String\\), got Array',
      strict: true,
      valueId: 'Array7-N'
    },
    {
      exception: 'Expected \\(Number|String\\), got Array',
      strict: true,
      valueId: 'Array6-S'
    },
    {
      exception: 'Expected \\(Number|String\\), got Array',
      strict: true,
      valueId: 'Array7'
    },
    {
      exception: 'Expected property "0" of type Number|String, got undefined',
      valueId: 'Buffer'
    },
    {
      exception: 'Expected \\(Number|String\\), got Buffer',
      strict: true,
      valueId: 'Buffer3'
    },
    {
      exception: 'Expected \\(Number|String\\), got Buffer',
      strict: true,
      valueId: 'Buffer10'
    },
    {
      exception: 'Expected \\(Number|String\\), got String "boop"',
      strict: true,
      valueId: 'String4'
    },
    {
      exception: 'Expected \\(Number|String\\), got String "fff"',
      strict: true,
      value: 'fff'
    },
    {
      exception: 'Expected \\(Number|String\\), got String "cafe1122deadbeef"',
      strict: true,
      value: 'cafe1122deadbeef'
    },
    {
      exception: 'Expected \\(Number|String\\), got String "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"',
      strict: true,
      value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
    },
    {
      exception: 'Expected \\(Number|String\\), got Number -1',
      value: -1
    },
    {
      exception: 'Expected \\(Number|String\\), got Number 127',
      value: 127
    },
    {
      exception: 'Expected \\(Number|String\\), got Number 128',
      value: 128
    },
    {
      exception: 'Expected \\(Number|String\\), got Number 255',
      value: 255
    },
    {
      exception: 'Expected \\(Number|String\\), got Number 256',
      value: 256
    },
    {
      exception: 'Expected \\(Number|String\\), got Number -128',
      value: -128
    },
    {
      exception: 'Expected \\(Number|String\\), got Number -129',
      value: -129
    },
    {
      exception: 'Expected \\(Number|String\\), got Number 65534',
      value: 65534
    },
    {
      exception: 'Expected \\(Number|String\\), got Number 65535',
      value: 65535
    },
    {
      exception: 'Expected \\(Number|String\\), got Number 65536',
      value: 65536
    },
    {
      exception: 'Expected \\(Number|String\\), got Number 4294967295',
      value: 4294967295
    },
    {
      exception: 'Expected \\(Number|String\\), got Number 9007199254740991',
      value: 9007199254740991
    },
    {
      exception: 'Expected \\(Number|String\\), got Number 9007199254740994',
      value: 9007199254740994
    },
    {
      exception: 'Expected \\(Number|String\\), got Number -9007199254740991',
      value: -9007199254740991
    },
    {
      exception: 'Expected \\(Number|String\\), got Number -9007199254740994',
      value: -9007199254740994
    }
  ]
}
