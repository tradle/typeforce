import type { Compiled, Validator, Tuple, TupleCompiled, AnyOfCompiled, MaybeCompiled, ObjectCompiled, Mapped, AllOfCompiled, ArrayOfOptions, ArrayCompiled, JITType, RawValidator } from '../src/interfaces'
import { addAPI } from '../src/index'
import type { TypeforceForTest, TypeforceAsyncForTest } from './run-tests'
import { Callback } from '../src/async'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const npm = require('../bench/node_modules/typeforce')
export const sync: TypeforceForTest = {
  assert: npm,
  matchType: (<T> (type: RawValidator<T>, value: any, strict?: boolean): value is T => {
    try {
      return npm(type, value, strict)
    } catch (err) {
      sync.matchType.error = err as Error
      return false
    }
  }) as (<T> (type: RawValidator<T>, value: any, strict?: boolean) => value is T) & {
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
  value: <T> (expected: T): Validator<T> => addAPI(npm.value(expected)),
  Array: addAPI(npm.Array),
  Boolean: addAPI(npm.Boolean),
  Function: addAPI(npm.Function),
  Buffer: addAPI(npm.Buffer),
  Nil: addAPI(npm.Nil),
  Null: addAPI(npm.Null),
  String: addAPI(npm.String),
  Number: addAPI(npm.Number),
  Object: addAPI(npm.Object),
  Hex: addAPI(npm.Hex),
  Int8: addAPI(npm.Int8),
  Int16: addAPI(npm.Int16),
  Int32: addAPI(npm.Int32),
  Int53: addAPI(npm.Int53),
  UInt8: addAPI(npm.UInt8),
  UInt16: addAPI(npm.UInt16),
  UInt32: addAPI(npm.UInt32),
  UInt53: addAPI(npm.UInt53),
  Finite: addAPI(npm.Finite),
  arrayOf: <T>(type: T, options?: ArrayOfOptions): ArrayCompiled<T> => addAPI(npm.arrayOf(type, options)),
  LengthN: <T extends { length: number }> (type: Validator<T>, length: number): Validator<T> => addAPI(npm.LengthN(type, length)),
  ArrayN: <T> (length: number): Validator<T[]> => addAPI(npm.ArrayN(length)),
  BufferN: (length: number): Validator<Buffer> => addAPI(npm.BufferN(length)),
  HexN: (length: number): Validator<string> => addAPI(npm.HexN(length)),
  StringN: (length: number): Validator<string> => addAPI(npm.StringN(length)),
  Range: <T extends number = number>(moreThan: number, lessThan: number, f?: Validator<T>): Validator<T> => addAPI(npm.Range(moreThan, lessThan, f)),
  allOf: <T extends any[]>(...uncompiled: T): AllOfCompiled<T> => addAPI(npm.allOf(...uncompiled)),
  map: <V, K> (value: V, key: K): Validator<Mapped<Compiled<V>>> => addAPI(npm.map(value, key)),
  quacksLike: (typeName: string) => addAPI(npm.quacksLike(typeName)),
  object: <T> (type: T): ObjectCompiled<T> => addAPI(npm.object(type)),
  maybe: <T extends any>(type: T): MaybeCompiled<T> => addAPI(npm.maybe(type)),
  anyOf: <T extends any[]>(...uncompiled: T): AnyOfCompiled<T> => addAPI(npm.anyOf(...uncompiled)),
  tuple: <T extends any[]>(...uncompiled: T): Validator<Tuple<TupleCompiled<T>>> => addAPI(npm.tuple(...uncompiled)),
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
