#!/bin/node
import * as typeforce from '../src'
import createTypes from '../test/types'
import VALUES from '../test/values'
import * as fs from 'fs'
import * as path from 'path'
import * as util from 'util'
import { Fixture, Invalid } from '../test/fixtures/fixture'

const TYPES2 = [
  'Array',
  'Boolean',
  'Buffer',
  'Function',
  'Nil',
  'Null',
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

let fixtures: {
  valid: Fixture[]
  invalid: Invalid[]
} = {
  valid: [],
  invalid: []
}
const TYPES = createTypes(typeforce)
function addFixture (type: any, value: any): void {
  const atype = type in TYPES ? TYPES[type] : type
  const avalue = value in VALUES ? VALUES[value] : value
  const f: Fixture = value in VALUES
    ? { valueId: value }
    : { value: value }

  try {
    typeforce.assert(atype, avalue, true)
    fixtures.valid.push(f)
    fixtures.valid.push({
      strict: true,
      ...f
    })
  } catch (e) {
    let message = (e as Error).message
      .replace(/([.*+?^=!:${}[\]/\\()])/g, '\\$&')

    try {
      typeforce.assert(atype, avalue, false)
      fixtures.valid.push(f)

      if (message.includes('asciiSlice')) return
      fixtures.invalid.push({
        exception: message,
        strict: true,
        ...f
      })
    } catch (e2) {
      message = (e2 as Error).message
        .replace(/([.*+?^=!:${}[\]/\\()])/g, '\\$&')

      if (message.includes('asciiSlice')) return
      fixtures.invalid.push({
        exception: message,
        ...f
      })
    }
  }
}

const ALLTYPES = TYPES2.map((type, index) => ({ type, id: `2_${index}` })).concat(Object.keys(TYPES).map((type, index) => ({ type, id: `1_${index}` }))) as Array<{ type: any, id: string }>
const ALLVALUES = (VALUES2 as any[]).concat(Object.keys(VALUES))

// Safe(r) inspect variant that indents by 2
const inspect = (val: any): any => util.inspect(val, {
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
  const file = path.join(__dirname, '..', 'test', 'fixtures', `${id}.ts`)
  fs.writeFileSync(file, `import fixture from './fixture'

const fix = fixture('${id} - ${JSON.stringify(type)}', ${type in TYPES ? `(types: { [key: string]: any }) => types['${String(type)}']` : `() => (${String(inspect(type))})`}, ({ ${['valid', 'invalid'].filter((entry): boolean => fixtures[entry as keyof typeof fixtures].length > 0).join(', ')} }) => {
${
  fixtures.valid.map(valid => `  valid(${String(inspect(valid))})\n`).join('')}${
  fixtures.invalid.map(invalid => `  invalid(${String(inspect(invalid))})\n`).join('')
}})

export default fix
`)
})

fs.writeFileSync(path.join(__dirname, '..', 'test', 'fixtures', 'index.ts'), `import type { RunFixture } from './fixture'
${ALLTYPES.map(({ id }) => `import fix${id} from './${id}'`).join('\n')}

const fixtures = ((compile, run, types, opts) => {
  new Array<RunFixture>(${ALLTYPES.map(({ id }) => `
    fix${id}`).join(',')}
  ).forEach(fixture => fixture(compile, run, types, opts))
}) as RunFixture

export default fixtures
`)
