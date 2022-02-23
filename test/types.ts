import { TypeforceForTest } from './run-tests'

export default function createTypes (typeforce: TypeforceForTest): { [type: string]: any } {
  function Unmatchable (): boolean { return false }
  function Letter (value: any): value is string {
    return /^[a-z]$/i.test(value)
  }
  function isNumber (value: any): asserts value is number {
    if (typeof value !== 'number') {
      throw new Error('not a number')
    }
  }
  isNumber.toJSON = () => 'Number'

  function cached <T extends { [key: string]: any }> (input: T): T {
    const result = {}
    Object.keys(input).forEach(key => {
      let cached: any
      Object.defineProperty(result, key, {
        enumerable: true,
        get () {
          if (cached === undefined) {
            cached = input[key]
          }
          return cached
        }
      })
    })
    return result as T
  }

  return cached({
    get '(Boolean, Number)' () { return typeforce.tuple('Boolean', 'Number') },
    get '(Number|String)' () { return typeforce.tuple(typeforce.anyOf('Number', 'String')) },
    get '(Number)' () { return typeforce.tuple('Number') },
    get '[?{ a: Number }]' () { return [typeforce.maybe({ a: 'Number' })] },
    get 'Boolean|Number|String' () { return typeforce.anyOf('Boolean', 'Number', 'String') },
    get '?Boolean|Number' () { return typeforce.maybe(typeforce.anyOf('Boolean', 'Number')) },
    get '?{ a: ?Number }' () { return typeforce.maybe({ a: '?Number' }) },
    get '?{ a: Number }' () { return typeforce.maybe({ a: 'Number' }) },
    get '{ a: Number|Nil }' () { return { a: typeforce.anyOf('Number', typeforce.Nil) } },
    get '{ x: Number|Nil }' () { return { a: typeforce.anyOf('Number', typeforce.Nil) } },
    get '{ a: Number|{ b: Number } }' () { return { a: typeforce.anyOf('Number', { b: 'Number' }) } },
    get '{ a: ?{ b: Number } }' () { return { a: typeforce.maybe({ b: 'Number' }) } },
    get '{ a: ?{ b: ?{ c: Number } } }' () { return { a: typeforce.maybe({ b: typeforce.maybe({ c: 'Number' }) }) } },
    get '{ a: undefined }' () { return { a: undefined } },
    get '@{ a: undefined }' () { return typeforce.object({ a: undefined }) }, // DEPRECATED
    get Unmatchable () { return Unmatchable },
    get '?Unmatchable' () { return typeforce.maybe(Unmatchable) },
    get '{ a: ?Unmatchable }' () { return { a: typeforce.maybe(Unmatchable) } },
    get '{ a: { b: Unmatchable } }' () { return { a: { b: Unmatchable } } },
    get '>CustomType' () { return typeforce.quacksLike('CustomType') },
    get '{ String }' () { return typeforce.map('String') },
    get '{ String|Number }' () { return typeforce.map(typeforce.anyOf('String', 'Number')) },
    get '{ String: Number }' () { return typeforce.map('Number', 'String') },
    get '{ Letter: Number }' () { return typeforce.map('Number', Letter) },
    get '{ a: { b: Buffer3 } }' () { return { a: { b: typeforce.BufferN(3) } } },
    get '{ a: Buffer10|Number }' () { return { a: typeforce.anyOf(typeforce.BufferN(10), 'Number') } },
    get '{ a: { b: Buffer } }' () { return typeforce.allOf({ a: typeforce.Object }, { a: { b: typeforce.Buffer } }) },
    get '{ x: Number } & { y: Number }' () { return typeforce.allOf({ x: typeforce.Number }, { y: typeforce.Number }) },
    get '{ x: Number } & { z: Number }' () { return typeforce.allOf({ x: typeforce.Number }, { z: typeforce.Number }) },
    get 'Array6(Number)' () { return typeforce.arrayOf(typeforce.Number, { length: 6 }) },
    get 'Array>=6(Number)' () { return typeforce.arrayOf(typeforce.Number, { minLength: 6 }) },
    get 'Array<=6(Number)' () { return typeforce.arrayOf(typeforce.Number, { maxLength: 6 }) },
    get 'Array>=3<=6' () { return typeforce.arrayOf(typeforce.Number, { minLength: 3, maxLength: 6 }) },
    get Array6 () { return typeforce.ArrayN(6) },
    get Array7 () { return typeforce.ArrayN(7) },
    get Buffer0 () { return typeforce.BufferN(0) },
    get Buffer3 () { return typeforce.BufferN(3) },
    get Buffer10 () { return typeforce.BufferN(10) },
    get Hex () { return typeforce.Hex },
    get Hex64 () { return typeforce.HexN(64) },
    get String4 () { return typeforce.StringN(4) },
    get 'Range1-5' () { return typeforce.Range(1, 5) },
    get 'Int8Range0-100' () { return typeforce.Range(0, 100, typeforce.Int8) },
    get Int8 () { return typeforce.Int8 },
    get Int16 () { return typeforce.Int16 },
    get Int32 () { return typeforce.Int32 },
    get Int53 () { return typeforce.Int53 },
    get UInt8 () { return typeforce.UInt8 },
    get UInt16 () { return typeforce.UInt16 },
    get UInt32 () { return typeforce.UInt32 },
    get UInt53 () { return typeforce.UInt53 },
    get Finite () { return typeforce.Finite },
    get 'Range(assert)1-5' () { return typeforce.Range(1, 5, isNumber) }
  })
}
