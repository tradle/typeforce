#!/bin/node
const typeforce = require('../')
const TYPES = require('../test/types')
const VALUES = require('../test/values')
const fs = require('fs')
const path = require('path')
const util = require('util')

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

// Safe(r) inspect variant that indents by 2
const inspect = val => util.inspect(val, {
  depth: Infinity,
  maxArrayLength: Infinity,
  maxStringLength: Infinity,
  breakLength: 100
}).split('\n').map((line, i) => `${i > 0 ? '  ' : ''}${line}`).join('\n')

ALLTYPES.forEach(({ type, id }) => {
  fixtures = {
    valid: [],
    invalid: []
  }
  ALLVALUES.forEach(value => addFixture(type, value))
  VALUESX.forEach(value => addFixture(type, value))
  const file = path.join(__dirname, '..', 'test', 'fixtures', `${id}.js`)
  fs.writeFileSync(file, `const tests = require('./tests.js')
const tape = require('tape')${
  TYPES[type] ? `\nconst TYPES = require('../types')` : ''
}

tape('type: ${JSON.stringify(type)}', t => {
  const { ${
    ['valid', 'invalid'].filter(entry => fixtures[entry].length > 0).join(', ')
  } } = tests(t, ${TYPES[type] ? `TYPES['${type}']` : inspect(type)})${
    fixtures.valid.map(valid => `\n  valid(${inspect(valid)})`)}${
    fixtures.invalid.map(invalid => `\n  invalid(${inspect(invalid)})`)}
  t.end()
})
`)
})

fs.writeFileSync(path.join(__dirname, '..', 'test', 'fixtures.js'), `${ALLTYPES.map(({ id }) => `require('./fixtures/${id}.js')`).join('\n')}
`)
