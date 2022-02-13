
module.exports = {
  typeId: 'Unmatchable',
  valid: [],
  invalid: [
    { exception: 'Expected Unmatchable, got String ""', value: '' },
    {
      exception: 'Expected Unmatchable, got String "foobar"',
      value: 'foobar'
    },
    { exception: 'Expected Unmatchable, got Number 0', value: 0 },
    { exception: 'Expected Unmatchable, got Number 1', value: 1 },
    { exception: 'Expected Unmatchable, got Number 1\\.5', value: 1.5 },
    { exception: 'Expected Unmatchable, got Number 10', value: 10 },
    { exception: 'Expected Unmatchable, got Array', value: [] },
    { exception: 'Expected Unmatchable, got Array', value: [ 0 ] },
    {
      exception: 'Expected Unmatchable, got Array',
      value: [ 'foobar' ]
    },
    {
      exception: 'Expected Unmatchable, got Array',
      value: [ { a: 0 } ]
    },
    { exception: 'Expected Unmatchable, got Array', value: [ null ] },
    {
      exception: 'Expected Unmatchable, got Boolean false',
      value: false
    },
    {
      exception: 'Expected Unmatchable, got Boolean true',
      value: true
    },
    {
      exception: 'Expected Unmatchable, got undefined',
      value: undefined
    },
    { exception: 'Expected Unmatchable, got null', value: null },
    { exception: 'Expected Unmatchable, got Object', value: {} },
    {
      exception: 'Expected Unmatchable, got Object',
      value: { a: null }
    },
    { exception: 'Expected Unmatchable, got Object', value: { a: 0 } },
    {
      exception: 'Expected Unmatchable, got Object',
      value: { a: 0, b: 0 }
    },
    { exception: 'Expected Unmatchable, got Object', value: { b: 0 } },
    {
      exception: 'Expected Unmatchable, got Object',
      value: { a: { b: 0 } }
    },
    {
      exception: 'Expected Unmatchable, got Object',
      value: { a: { b: null } }
    },
    {
      exception: 'Expected Unmatchable, got Object',
      value: { a: { b: { c: 0 } } }
    },
    {
      exception: 'Expected Unmatchable, got Object',
      value: { a: { b: { c: null } } }
    },
    {
      exception: 'Expected Unmatchable, got Object',
      value: { a: { b: { c: 0, d: 0 } } }
    },
    {
      exception: 'Expected Unmatchable, got Object',
      value: { a: 'foo', b: 'bar' }
    },
    {
      exception: 'Expected Unmatchable, got Object',
      value: { a: 'foo', b: { c: 'bar' } }
    },
    {
      exception: 'Expected Unmatchable, got Function',
      valueId: 'function'
    },
    {
      exception: 'Expected Unmatchable, got EmptyType',
      valueId: 'emptyType'
    },
    {
      exception: 'Expected Unmatchable, got CustomType',
      valueId: 'customType'
    },
    {
      exception: 'Expected Unmatchable, got Object',
      valueId: '{ a: undefined }'
    },
    {
      exception: 'Expected Unmatchable, got Object',
      valueId: '{ a: Buffer3 }'
    },
    {
      exception: 'Expected Unmatchable, got Object',
      valueId: '{ a: Buffer10 }'
    },
    {
      exception: 'Expected Unmatchable, got Object',
      valueId: '{ a: { b: Buffer3 } }'
    },
    {
      exception: 'Expected Unmatchable, got Object',
      valueId: '{ a: { b: Buffer10 } }'
    },
    {
      exception: 'Expected Unmatchable, got Object',
      valueId: '{ x: 1 }'
    },
    {
      exception: 'Expected Unmatchable, got Object',
      valueId: '{ y: 2 }'
    },
    {
      exception: 'Expected Unmatchable, got Object',
      valueId: '{ x: 1, y: 2 }'
    },
    { exception: 'Expected Unmatchable, got Array', valueId: 'Array5' },
    { exception: 'Expected Unmatchable, got Array', valueId: 'Array6' },
    {
      exception: 'Expected Unmatchable, got Array',
      valueId: 'Array7-N'
    },
    {
      exception: 'Expected Unmatchable, got Array',
      valueId: 'Array6-S'
    },
    { exception: 'Expected Unmatchable, got Array', valueId: 'Array7' },
    {
      exception: 'Expected Unmatchable, got Buffer',
      valueId: 'Buffer'
    },
    {
      exception: 'Expected Unmatchable, got Buffer',
      valueId: 'Buffer3'
    },
    {
      exception: 'Expected Unmatchable, got Buffer',
      valueId: 'Buffer10'
    },
    {
      exception: 'Expected Unmatchable, got String "boop"',
      valueId: 'String4'
    },
    {
      exception: 'Expected Unmatchable, got String "fff"',
      value: 'fff'
    },
    {
      exception: 'Expected Unmatchable, got String "cafe1122deadbeef"',
      value: 'cafe1122deadbeef'
    },
    {
      exception: 'Expected Unmatchable, got String "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"',
      value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
    },
    { exception: 'Expected Unmatchable, got Number -1', value: -1 },
    { exception: 'Expected Unmatchable, got Number 127', value: 127 },
    { exception: 'Expected Unmatchable, got Number 128', value: 128 },
    { exception: 'Expected Unmatchable, got Number 255', value: 255 },
    { exception: 'Expected Unmatchable, got Number 256', value: 256 },
    { exception: 'Expected Unmatchable, got Number -128', value: -128 },
    { exception: 'Expected Unmatchable, got Number -129', value: -129 },
    {
      exception: 'Expected Unmatchable, got Number 65534',
      value: 65534
    },
    {
      exception: 'Expected Unmatchable, got Number 65535',
      value: 65535
    },
    {
      exception: 'Expected Unmatchable, got Number 65536',
      value: 65536
    },
    {
      exception: 'Expected Unmatchable, got Number 4294967295',
      value: 4294967295
    },
    {
      exception: 'Expected Unmatchable, got Number 9007199254740991',
      value: 9007199254740991
    },
    {
      exception: 'Expected Unmatchable, got Number 9007199254740994',
      value: 9007199254740994
    },
    {
      exception: 'Expected Unmatchable, got Number -9007199254740991',
      value: -9007199254740991
    },
    {
      exception: 'Expected Unmatchable, got Number -9007199254740994',
      value: -9007199254740994
    }
  ]
}
