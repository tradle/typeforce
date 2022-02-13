#!/bin/node
const typeforce = require('../')
const TYPES = require('../test/types')
const VALUES = require('../test/values')
const fs = require('fs')
const path = require('path')

const TYPES2 = [
  'Array',
  'Boolean',
  'Buffer',
  'Function',
  'Nil',
  'Number',
  'Object',
  'String',
  '?Number',
  ['?Number'],
  ['Number'],
  [{ a: 'Number' }],
  {},
  { a: 'Number' },
  { a: { b: 'Number' } },
  { a: { b: { c: '?Number' } } },
  { a: { b: { c: 'Number' } } },
  { a: null },

  // these will resolve to typeforce.value(...)
  undefined,
  null,
  true,
  false,
  0
]

const VALUES2 = [
  '',
  'foobar',
  0,
  1,
  1.5,
  10,
  [],
  [0],
  ['foobar'],
  [{ a: 0 }],
  [null],
  false,
  true,
  undefined,
  null,
  {},
  { a: null },
  { a: 0 },
  { a: 0, b: 0 },
  { b: 0 },
  { a: { b: 0 } },
  { a: { b: null } },
  { a: { b: { c: 0 } } },
  { a: { b: { c: null } } },
  { a: { b: { c: 0, d: 0 } } },
  { a: 'foo', b: 'bar' },
  { a: 'foo', b: { c: 'bar' } }
]

const INT53_MAX = Math.pow(2, 53) - 1

// extra
const VALUESX = [
  'fff',
  'cafe1122deadbeef',
  '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20',
  -1,
  127,
  128,
  255,
  256,
  -128,
  -129,
  0xfffe,
  0xffff,
  0x10000,
  0xffffffff,
  INT53_MAX,
  INT53_MAX + 3,
  -INT53_MAX,
  -INT53_MAX - 3
]

let fixtures

function addFixture (type, value) {
  const f = {}
  let atype, avalue

  if (TYPES[type]) {
    atype = TYPES[type]
  } else {
    atype = type
  }

  if (VALUES[value]) {
    f.valueId = value
    avalue = VALUES[value]
  } else {
    f.value = value
    avalue = value
  }

  try {
    typeforce.assert(atype, avalue, true)
    fixtures.valid.push(f)
  } catch (e) {
    let message = e.message
      .replace(/([.*+?^=!:${}[\]/\\()])/g, '\\$&')

    try {
      typeforce.assert(atype, avalue, false)
      fixtures.valid.push(f)

      if (message.indexOf('asciiSlice') !== -1) return
      fixtures.invalid.push(Object.assign({ exception: message, strict: true }, f))
    } catch (e2) {
      message = e2.message
        .replace(/([.*+?^=!:${}[\]/\\()])/g, '\\$&')

      if (message.indexOf('asciiSlice') !== -1) return
      fixtures.invalid.push(Object.assign({ exception: message }, f))
    }
  }
}

const ALLTYPES = TYPES2.map((type, index) => ({ type, id: `2_${index}` })).concat(Object.keys(TYPES).map((type, index) => ({ type, id: `1_${index}` })))
const ALLVALUES = VALUES2.concat(Object.keys(VALUES))

ALLTYPES.forEach(({ type, id }) => {
  fixtures = {
  }
  if (TYPES[type]) {
    fixtures.typeId = type
  } else {
    fixtures.type = type
  }
  Object.assign(fixtures, {
    valid: [],
    invalid: []
  })
  ALLVALUES.forEach(value => addFixture(type, value))
  VALUESX.forEach(value => addFixture(type, value))
  const file = path.join(__dirname, '..', 'test', 'fixtures', `${id}.json`)
  fs.writeFileSync(file, JSON.stringify(fixtures, null, 2))
})

fs.writeFileSync(path.join(__dirname, '..', 'test', 'fixtures.js'), `module.exports = [
${ALLTYPES.map(({ id }) => `  require('./fixtures/${id}.json')`).join(',\n')}
].map(({ type, typeId, valid, invalid }) => ({
  valid: valid.map(entry => Object.assign(entry, { type, typeId })),
  invalid: invalid.map(entry => Object.assign(entry, { type, typeId }))
})).reduce(function (result, next) {
  return {
    valid: result.valid.concat(next.valid),
    invalid: result.invalid.concat(next.invalid)
  }
})
`)
