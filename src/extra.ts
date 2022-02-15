import type { Validator } from './interfaces'
import * as NATIVE from './native'

import { tfCustomError, addAPI } from './errors'
import { Buffer as NativeBuffer } from 'buffer'

export const Buffer = addAPI(function Buffer (value: any): value is NativeBuffer {
  return NativeBuffer.isBuffer(value)
})

export const Hex = addAPI(function Hex (value: any): value is string {
  return typeof value === 'string' && /^([0-9a-f]{2})+$/i.test(value)
})

export function LengthN <T extends { length: number }> (type: Validator<T>, length: number): Validator<T> {
  const name = type.toJSON()
  const nameStr = String(name)
  const errorPrefix = `${nameStr}(Length: `
  const expected = `${errorPrefix}${length.toString()})`
  return addAPI(function _LengthN (value: any): value is T {
    if (!type(value)) return false
    if (value.length === length) return true

    throw tfCustomError(expected, `${errorPrefix}${value.length.toString()})`)
  }, name)
}

export const ArrayN = (length: number): Validator<any[]> =>
  LengthN<any[]>(NATIVE.Array, length)

export const BufferN = (length: number): Validator<NativeBuffer> =>
  LengthN<NativeBuffer>(Buffer, length)

export const HexN = (length: number): Validator<string> =>
  LengthN<string>(Hex, length)

export const StringN = (length: number): Validator<string> =>
  LengthN<string>(NATIVE.String, length)

export function Range <T extends number = number> (moreThan: number, lessThan: number, f?: Validator<T>): Validator<T> {
  const validator = f ?? NATIVE.Number
  return addAPI(function _Range (value: any, strict?: boolean): value is T {
    return validator(value, strict) && (value > moreThan) && (value < lessThan)
  }, `${String(validator.toJSON())} between [${moreThan.toString()}, ${lessThan.toString()}]`)
}

const INT53_MAX = Math.pow(2, 53) - 1

export const Finite = addAPI(function Finite (value: any): value is number {
  return typeof value === 'number' && isFinite(value)
})

export const Int8 = addAPI(function Int8 (value: any): value is number { return ((value << 24) >> 24) === value })
export const Int16 = addAPI(function Int16 (value: any): value is number { return ((value << 16) >> 16) === value })
export const Int32 = addAPI(function Int32 (value: any): value is number { return ((value | 0) === value) })
export const Int53 = addAPI(function Int53 (value: any): value is number {
  return typeof value === 'number' &&
    value >= -INT53_MAX &&
    value <= INT53_MAX &&
    Math.floor(value) === value
})

export const UInt8 = addAPI(function UInt8 (value: any): value is number { return ((value & 0xff) === value) })
export const UInt16 = addAPI(function UInt16 (value: any): value is number { return ((value & 0xffff) === value) })
export const UInt32 = addAPI(function UInt32 (value: any): value is number { return ((value >>> 0) === value) })
export const UInt53 = addAPI(function UInt53 (value: any): value is number {
  return typeof value === 'number' &&
    value >= 0 &&
    value <= INT53_MAX &&
    Math.floor(value) === value
})
