
module.exports = {
  typeId: '{ a: ?Unmatchable }',
  valid: [
    { value: [] },
    { value: [ 0 ] },
    { value: [ 'foobar' ] },
    { value: [ { a: 0 } ] },
    { value: [ null ] },
    { value: {} },
    { value: { a: null } },
    { value: { b: 0 } },
    { valueId: 'emptyType' },
    { valueId: 'customType' },
    { valueId: '{ a: undefined }' },
    { valueId: '{ x: 1 }' },
    { valueId: '{ y: 2 }' },
    { valueId: '{ x: 1, y: 2 }' },
    { valueId: 'Array5' },
    { valueId: 'Array6' },
    { valueId: 'Array7-N' },
    { valueId: 'Array6-S' },
    { valueId: 'Array7' },
    { valueId: 'Buffer' },
    { valueId: 'Buffer3' },
    { valueId: 'Buffer10' }
  ],
  invalid: [
    { exception: 'Expected Object, got String ""', value: '' },
    {
      exception: 'Expected Object, got String "foobar"',
      value: 'foobar'
    },
    { exception: 'Expected Object, got Number 0', value: 0 },
    { exception: 'Expected Object, got Number 1', value: 1 },
    { exception: 'Expected Object, got Number 1\\.5', value: 1.5 },
    { exception: 'Expected Object, got Number 10', value: 10 },
    {
      exception: 'Unexpected property "0"',
      strict: true,
      value: [ 0 ]
    },
    {
      exception: 'Unexpected property "0"',
      strict: true,
      value: [ 'foobar' ]
    },
    {
      exception: 'Unexpected property "0"',
      strict: true,
      value: [ { a: 0 } ]
    },
    {
      exception: 'Unexpected property "0"',
      strict: true,
      value: [ null ]
    },
    { exception: 'Expected Object, got Boolean false', value: false },
    { exception: 'Expected Object, got Boolean true', value: true },
    { exception: 'Expected Object, got undefined', value: undefined },
    { exception: 'Expected Object, got null', value: null },
    {
      exception: 'Expected property "a" of type \\?Unmatchable, got Number 0',
      value: { a: 0 }
    },
    {
      exception: 'Expected property "a" of type \\?Unmatchable, got Number 0',
      value: { a: 0, b: 0 }
    },
    {
      exception: 'Unexpected property "b"',
      strict: true,
      value: { b: 0 }
    },
    {
      exception: 'Expected property "a" of type \\?Unmatchable, got Object',
      value: { a: { b: 0 } }
    },
    {
      exception: 'Expected property "a" of type \\?Unmatchable, got Object',
      value: { a: { b: null } }
    },
    {
      exception: 'Expected property "a" of type \\?Unmatchable, got Object',
      value: { a: { b: { c: 0 } } }
    },
    {
      exception: 'Expected property "a" of type \\?Unmatchable, got Object',
      value: { a: { b: { c: null } } }
    },
    {
      exception: 'Expected property "a" of type \\?Unmatchable, got Object',
      value: { a: { b: { c: 0, d: 0 } } }
    },
    {
      exception: 'Expected property "a" of type \\?Unmatchable, got String "foo"',
      value: { a: 'foo', b: 'bar' }
    },
    {
      exception: 'Expected property "a" of type \\?Unmatchable, got String "foo"',
      value: { a: 'foo', b: { c: 'bar' } }
    },
    { exception: 'Expected Object, got Function', valueId: 'function' },
    {
      exception: 'Unexpected property "x"',
      strict: true,
      valueId: 'customType'
    },
    {
      exception: 'Expected property "a" of type \\?Unmatchable, got Buffer',
      valueId: '{ a: Buffer3 }'
    },
    {
      exception: 'Expected property "a" of type \\?Unmatchable, got Buffer',
      valueId: '{ a: Buffer10 }'
    },
    {
      exception: 'Expected property "a" of type \\?Unmatchable, got Object',
      valueId: '{ a: { b: Buffer3 } }'
    },
    {
      exception: 'Expected property "a" of type \\?Unmatchable, got Object',
      valueId: '{ a: { b: Buffer10 } }'
    },
    {
      exception: 'Unexpected property "x"',
      strict: true,
      valueId: '{ x: 1 }'
    },
    {
      exception: 'Unexpected property "y"',
      strict: true,
      valueId: '{ y: 2 }'
    },
    {
      exception: 'Unexpected property "x"',
      strict: true,
      valueId: '{ x: 1, y: 2 }'
    },
    {
      exception: 'Unexpected property "0"',
      strict: true,
      valueId: 'Array5'
    },
    {
      exception: 'Unexpected property "0"',
      strict: true,
      valueId: 'Array6'
    },
    {
      exception: 'Unexpected property "0"',
      strict: true,
      valueId: 'Array7-N'
    },
    {
      exception: 'Unexpected property "0"',
      strict: true,
      valueId: 'Array6-S'
    },
    {
      exception: 'Unexpected property "0"',
      strict: true,
      valueId: 'Array7'
    },
    {
      exception: 'Unexpected property "readBigUInt64LE"',
      strict: true,
      valueId: 'Buffer'
    },
    {
      exception: 'Unexpected property "0"',
      strict: true,
      valueId: 'Buffer3'
    },
    {
      exception: 'Unexpected property "0"',
      strict: true,
      valueId: 'Buffer10'
    },
    {
      exception: 'Expected Object, got String "boop"',
      valueId: 'String4'
    },
    { exception: 'Expected Object, got String "fff"', value: 'fff' },
    {
      exception: 'Expected Object, got String "cafe1122deadbeef"',
      value: 'cafe1122deadbeef'
    },
    {
      exception: 'Expected Object, got String "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"',
      value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
    },
    { exception: 'Expected Object, got Number -1', value: -1 },
    { exception: 'Expected Object, got Number 127', value: 127 },
    { exception: 'Expected Object, got Number 128', value: 128 },
    { exception: 'Expected Object, got Number 255', value: 255 },
    { exception: 'Expected Object, got Number 256', value: 256 },
    { exception: 'Expected Object, got Number -128', value: -128 },
    { exception: 'Expected Object, got Number -129', value: -129 },
    { exception: 'Expected Object, got Number 65534', value: 65534 },
    { exception: 'Expected Object, got Number 65535', value: 65535 },
    { exception: 'Expected Object, got Number 65536', value: 65536 },
    {
      exception: 'Expected Object, got Number 4294967295',
      value: 4294967295
    },
    {
      exception: 'Expected Object, got Number 9007199254740991',
      value: 9007199254740991
    },
    {
      exception: 'Expected Object, got Number 9007199254740994',
      value: 9007199254740994
    },
    {
      exception: 'Expected Object, got Number -9007199254740991',
      value: -9007199254740991
    },
    {
      exception: 'Expected Object, got Number -9007199254740994',
      value: -9007199254740994
    }
  ]
}
