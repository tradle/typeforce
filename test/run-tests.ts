import * as tape from 'fresh-tape'
import * as typeforceTs from '../src/index'
import * as typeforceAsyncTs from '../src/async'
import fixtures from './fixtures/index'
import createTypes from './types'

type OmitUnusedInTest <T> = Omit<T,
'Validator' | 'getTypeName' | 'tfJSON' | 'tfString' | 'tfErrorString' | 'getValueTypeName' | 'tfSubError' | 'tfCustomError' |
'tfPropertyErrorString' | 'assertType' | 'addAPI' | 'compileTypeName' | 'compileString' | 'Check' | 'assertAnyType'
>

export type TypeforceForTest = OmitUnusedInTest<typeof typeforceTs>
export type TypeforceAsyncForTest = OmitUnusedInTest<typeof typeforceAsyncTs>

export default function runTests (name: string, typeforce: TypeforceForTest, typeforceAsync: TypeforceAsyncForTest): void {
  const err = new typeforce.TfTypeError('mytype', undefined)
  function failType (): void { throw err }

  tape(name, ({ test }) => {
    test('fallback API', function (t) {
      t.equals(typeforce.assert(typeforce.String, '1'), true)
      t.end()
    })

    test('serialization', function (t) {
      t.equals(typeforce.maybe(typeforce.anyOf('String', 'Number'))?.toJSON(), '?String|Number')
      t.equals(typeforce.maybe(typeforce.tuple('String', 'Number'))?.toJSON(), '?(String, Number)')
      t.equals(typeforce.maybe(typeforce.arrayOf('String'))?.toJSON(), '?[String]')
      t.equals(typeforce.maybe(typeforce.map('String'))?.toJSON(), '?{String}')
      t.equals(typeforce.maybe(typeforce.object({ foo: 'String' }))?.toJSON(), '?Object')
      t.equals(typeforce.object({ foo: ['String'] }).toJSON(), 'Object')
      t.end()
    })

    test('assertDebug', function (t) {
      typeforce.assertTypeDebug(typeforce.String, 'hello')
      t.throws(() => typeforce.assertTypeDebug(typeforce.Number, 'hello'))
      /* eslint-disable @typescript-eslint/no-throw-literal */
      t.throws(() => typeforce.assertTypeDebug((val): asserts val is any => { throw new Error('foo') }, 'bar'))
      t.throws(() => typeforce.assertTypeDebug((val): asserts val is any => { throw 'foo' }, 'bar'))
      t.throws(() => typeforce.assertTypeDebug((val): asserts val is any => { throw 1 }, 'bar'))
      t.throws(() => typeforce.assertTypeDebug((val): asserts val is any => { throw null }, 'bar'))
      t.throws(() => typeforce.assertTypeDebug((val): asserts val is any => { throw { __error: new Error('foo') } }, 'bar'))
      /* eslint-enable @typescript-eslint/no-throw-literal */
      t.end()
    })

    test('custom Errors', function (t) {
      t.equals((new typeforce.TfTypeError('hello', undefined)).message, 'Expected hello, got undefined')
      t.equals((new typeforce.TfTypeError(['hello'], undefined)).message, 'Expected Array, got undefined')
      t.equals((new typeforce.TfTypeError(null, undefined)).message, 'Expected null, got undefined')
      t.equals((new typeforce.TfTypeError(undefined, undefined)).message, 'Expected , got undefined')
      t.equals((new typeforce.TfTypeError({ hello: 'world' }, undefined)).message, 'Expected Object, got undefined')
      t.equals((new typeforce.TfTypeError(function test () {}, undefined)).message, 'Expected test, got undefined')
      t.equals((new typeforce.TfPropertyTypeError('hello', 'foo.bar', 'key', 1)).message, 'Expected property "foo.bar" with key type hello, got Number 1')
      t.end()
    })

    test('match variants', function (t) {
      t.test('typeforce.match', function (t) {
        t.equals(typeforce.match(() => false, true), false, 'non match should result in false')
        t.equals(typeforce.match(() => true, 1), true, 'match is checked as well')
        t.equals(typeforce.match('String', 1), false, 'error is caught')
        t.match(typeforce.match.error?.message ?? '', /Expected String, got Number 1/, 'error is kept in global')
        typeforce.match(() => true, 1)
        t.match(typeforce.match.error?.message ?? '', /Expected String, got Number 1/, 'additional calls dont delete the error message')
        typeforce.match.error = null
        t.equals(typeforce.match.error, null, 'error can be cleared')
        t.end()
      })
      t.test('typeforce.compile().match', function (t) {
        t.equals(typeforce.compile(() => false).match(true), false, 'non match should result in false')
        t.equals(typeforce.compile(() => true).match(1), true, 'match is checked as well')
        const testError = new Error('test error ')
        const fn = typeforce.compile((input: any): input is null => { if (input === null) { throw testError } return true })
        t.equals(typeforce.compile(fn).match(null), false, 'error is caught')
        t.equals(fn.match.error, testError, 'error is kept in global')
        t.equals(fn.match('anything but null'), true, 'second run works too')
        t.equals(fn.match.error, testError, 'follow up run dont clear the error')
        fn.match.error = null
        t.equals(fn.match.error, null, 'error can be cleared')
        t.end()
      })
      t.test('typeforce.matchType(compile())', function (t) {
        const { matchType } = typeforce
        t.equals(matchType((val: any): val is false => false, true), false, 'non match should result in false')
        t.equals(matchType((val: any): val is true => true, 1), true, 'match is checked as well')
        const testError = new Error('test error ')
        t.equals(matchType((val: any): val is true => { throw testError }, null), false, 'error is caught')
        t.equals(matchType.error, testError, 'error is kept in global')
        t.equals(matchType((val: any): val is true => true, 1), true, 'second run works too')
        t.equals(matchType.error, testError, 'follow up run dont clear the error')
        matchType.error = null
        t.equals(matchType.error, null, 'error can be cleared')
        t.end()
      })
    })
    test('async', function (t) {
      t.test('pass', function (t) {
        typeforceAsync.assert(
          (value: any, strict?: boolean): value is string => {
            t.equals(strict, false, 'default strict is undefined in async')
            return typeof value === 'string'
          },
          '1',
          (err: Error | null, pass: boolean): void => {
            t.error(err)
            t.ok(pass)
            t.end()
          }
        )
      })
      t.test('pass (strict: true)', function (t) {
        typeforceAsync.assert(
          (value: any, strict?: boolean): value is string => {
            t.equals(strict, true, 'other strict value is passed through')
            return typeof value === 'string'
          },
          '1',
          true,
          (err: Error | null, pass: boolean): void => {
            t.error(err)
            t.ok(pass)
            t.end()
          }
        )
      })
      t.test('pass (strict: null)', function (t) {
        typeforceAsync.assert(
          (value: any, strict?: boolean): value is string => {
            t.equals(strict, false, 'other strict value is passed through')
            return typeof value === 'string'
          },
          '1',
          null,
          (err: Error | null, pass: boolean): void => {
            t.error(err)
            t.ok(pass)
            t.end()
          }
        )
      })
      t.test('fail (strict: null)', function (t) {
        typeforceAsync.assert(
          function customCheck (value: any, strict?: boolean): value is string {
            t.equals(strict, false, 'other strict value is passed through')
            return typeof value === 'string'
          },
          1,
          null,
          (err: Error | null, pass: boolean): void => {
            t.match(err?.message ?? '', /Expected customCheck, got Number 1/)
            t.equals(pass, false)
            t.end()
          }
        )
      })
    })

    test('TfTypeError is an Error', function (t) {
      t.plan(3)
      t.ok(err instanceof Error)
      t.equal(err.message, 'Expected mytype, got undefined')

      t.throws(function () {
        typeforce.assert(failType, 0xdeadbeef)
      }, /Expected mytype, got undefined/)
    })

    test('TfTypeError is caught by typeforce.anyOf', function (t) {
      t.plan(2)

      t.doesNotThrow(function () {
        typeforce.anyOf(failType)('value')
      })

      t.equals(typeforce.anyOf(failType, typeforce.String)('value'), true)
    })

    test('Error is thrown for bad compile parameters', function (t) {
      t.plan(2)

      t.throws(function () {
        typeforce.compile([])
      }, /Expected compile\(\) parameter of type Array of length 1/)

      t.throws(function () {
        typeforce.compile([typeforce.Number, typeforce.String])
      }, /Expected compile\(\) parameter of type Array of length 1/)
    })

    // Load fixtures test!
    fixtures(typeforce.compile, tape, createTypes(typeforce))
  })
}
