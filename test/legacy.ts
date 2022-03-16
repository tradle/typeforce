import type {
  Compiled, Check, Tuple, TupleCompiled, AnyOfCompiled, MaybeCompiled,
  ObjectCompiled, Mapped, AllOfCompiled, ArrayOfOptions, ArrayCompiled,
  JITType, Raw, MatchCheck, TypeForCheck, AnyRaw, Match
} from '../src/interfaces'
import type { TypeforceForTest, TypeforceAsyncForTest } from './run-tests'
import { Callback } from '../src/async'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const npm = require('../bench/node_modules/typeforce')

function addAPI (fn: Check<any>): Check<any> {
  if (!('toJSON' in fn)) {
    fn.toJSON = () => fn.name
  }
  fn.assert = (value, strict): asserts value is any => {
    return npm(fn, value, strict)
  }
  fn.match = ((value, strict): boolean => {
    try {
      return (npm(fn, value, strict) as boolean)
    } catch (err) {
      fn.match.error = err as Error
      return false
    }
  }) as Match<any>
  return fn
}

export const sync: TypeforceForTest = {
  assert: npm,
  assertTypeDebug: npm,
  matchType: (<T extends Raw> (type: T, value: any, strict?: boolean): value is TypeForCheck<T> => {
    try {
      return npm(type, value, strict)
    } catch (err) {
      sync.matchType.error = err as Error
      return false
    }
  }) as (<T extends Raw> (type: T, value: any, strict?: boolean) => value is TypeForCheck<T>) & {
    error: Error | null | undefined
  },
  match: (<Type> (type: Type, value: any, strict?: boolean): value is JITType<Type> => {
    try {
      return npm(type, value, strict)
    } catch (err) {
      sync.match.error = err as Error
      return false
    }
  }) as (<Type> (type: Type, value: any, strict?: boolean) => value is JITType<Type>) & {
    error: Error | null | undefined
  },
  compile: <T> (type: T): Compiled<T> => addAPI(npm.compile(type)) as Compiled<T>,
  value: <T> (expected: T): Check<T> => addAPI(npm.value(expected)) as Check<T>,
  Array: addAPI(npm.Array) as MatchCheck<any[]>,
  Boolean: addAPI(npm.Boolean) as MatchCheck<boolean>,
  Function: addAPI(npm.Function) as MatchCheck<Function>,
  Buffer: addAPI(npm.Buffer) as MatchCheck<Buffer>,
  Nil: addAPI(npm.Nil) as MatchCheck<null | undefined>,
  Null: addAPI(npm.Null) as MatchCheck<null | undefined>,
  String: addAPI(npm.String) as MatchCheck<string>,
  Number: addAPI(npm.Number) as MatchCheck<number>,
  Object: addAPI(npm.Object) as MatchCheck<Object>,
  Hex: addAPI(npm.Hex) as MatchCheck<string>,
  Int8: addAPI(npm.Int8) as MatchCheck<number>,
  Int16: addAPI(npm.Int16) as MatchCheck<number>,
  Int32: addAPI(npm.Int32) as MatchCheck<number>,
  Int53: addAPI(npm.Int53) as MatchCheck<number>,
  UInt8: addAPI(npm.UInt8) as MatchCheck<number>,
  UInt16: addAPI(npm.UInt16) as MatchCheck<number>,
  UInt32: addAPI(npm.UInt32) as MatchCheck<number>,
  UInt53: addAPI(npm.UInt53) as MatchCheck<number>,
  Finite: addAPI(npm.Finite) as MatchCheck<number>,
  arrayOf: <T>(type: T, options?: ArrayOfOptions) => addAPI(npm.arrayOf(type, options)) as ArrayCompiled<T>,
  LengthN: <T extends { length: number }> (type: AnyRaw<T>, length: number) => addAPI(npm.LengthN(type, length)) as Check<T>,
  ArrayN: <T> (length: number) => addAPI(npm.ArrayN(length)) as Check<T[]>,
  BufferN: (length: number) => addAPI(npm.BufferN(length)) as Check<Buffer>,
  HexN: (length: number) => addAPI(npm.HexN(length)) as Check<string>,
  StringN: (length: number) => addAPI(npm.StringN(length)) as Check<string>,
  Range: <T = number>(moreThan: any, lessThan: any, f?: AnyRaw<T>) => addAPI(npm.Range(moreThan, lessThan, f)) as Check<T>,
  allOf: <T extends any[]>(...uncompiled: T) => addAPI(npm.allOf(...uncompiled)) as AllOfCompiled<T>,
  map: <V, K> (value: V, key: K) => addAPI(npm.map(value, key)) as Check<Mapped<Compiled<V>>>,
  quacksLike: (typeName: string) => addAPI(npm.quacksLike(typeName)) as Check<Object>,
  object: <T> (type: T) => addAPI(npm.object(type)) as ObjectCompiled<T>,
  maybe: <T extends any>(type: T) => addAPI(npm.maybe(type)) as MaybeCompiled<T>,
  anyOf: <T extends any[]>(...uncompiled: T) => addAPI(npm.anyOf(...uncompiled)) as AnyOfCompiled<T>,
  tuple: <T extends any[]>(...uncompiled: T) => addAPI(npm.tuple(...uncompiled)) as Check<Tuple<TupleCompiled<T>>>,
  TfTypeError: npm.TfTypeError,
  TfPropertyTypeError: npm.TfPropertyTypeError
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const npmAsync = require('../bench/node_modules/typeforce/async')
export const async: TypeforceAsyncForTest = {
  ...sync,
  assert: (type: any, value: any, strictOrCallback: boolean | null | undefined | Callback, callback?: Callback): void => {
    let strict
    if (typeof strictOrCallback === 'function') {
      callback = strictOrCallback
    } else {
      strict = strictOrCallback
    }
    const cb = callback as Callback
    npmAsync(type, value, strict ?? false, (err?: Error): void => {
      if (err === null || err === undefined) {
        cb(null, true)
      } else {
        cb(err, false)
      }
    })
  }
}
