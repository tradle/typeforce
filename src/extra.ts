import type { MatchCheck, Check, AnyRaw } from './interfaces'
import * as NATIVE from './native'

import { tfCustomError, addAPI } from './errors'
import { Buffer as NativeBuffer } from 'buffer'

export const Buffer: MatchCheck<Buffer> = addAPI(function Buffer (value: any): value is NativeBuffer {
  return NativeBuffer.isBuffer(value)
})

export const Hex: MatchCheck<string> = addAPI(function Hex (value: any): value is string {
  return typeof value === 'string' && /^([0-9a-f]{2})+$/i.test(value)
})

const getCheck = (fallback: Check<any>, type?: AnyRaw<any>): Check<any> => type === undefined ? fallback : NATIVE.Check(type) ? type : addAPI(type)

export function LengthN <T extends { length: number }> (type: AnyRaw<T>, length: number): Check<T> {
  const check = getCheck(NATIVE.Number, type)
  const name = check.toJSON()
  const nameStr = String(name)
  const errorStr = (length: number): string => `${nameStr}(Length: ${length.toString()})`
  const expected = errorStr(length)
  return addAPI(function _LengthN (value: any): boolean {
    if (!(check(value) as boolean)) return false
    if (value.length === length) return true

    throw tfCustomError(expected, errorStr(value.length))
  }, name) as Check<T>
}

export const ArrayN = (length: number): Check<any[]> =>
  LengthN<any[]>(NATIVE.Array, length)

export const BufferN = (length: number): Check<NativeBuffer> =>
  LengthN<NativeBuffer>(Buffer, length)

export const HexN = (length: number): Check<string> =>
  LengthN<string>(Hex, length)

export const StringN = (length: number): Check<string> =>
  LengthN<string>(NATIVE.String, length)

export function Range <T = number> (moreThan: any, lessThan: any, type?: AnyRaw<T>): Check<T> {
  const check = getCheck(NATIVE.Number, type)
  return addAPI(
    function _Range (value: any, strict?: boolean): boolean {
      return (check(value, strict) as boolean | undefined | null ?? false) && (value > moreThan) && (value < lessThan)
    },
    `${String(check.toJSON())} between [${String(moreThan)}, ${String(lessThan)}]`
  ) as Check<T>
}

const INT53_MAX = Math.pow(2, 53) - 1

export const Finite: MatchCheck<number> = addAPI(function Finite (value: any): value is number {
  return typeof value === 'number' && isFinite(value)
})

export const Int8: MatchCheck<number> = addAPI(function Int8 (value: any): value is number { return ((value << 24) >> 24) === value })
export const Int16: MatchCheck<number> = addAPI(function Int16 (value: any): value is number { return ((value << 16) >> 16) === value })
export const Int32: MatchCheck<number> = addAPI(function Int32 (value: any): value is number { return ((value | 0) === value) })
export const Int53: MatchCheck<number> = addAPI(function Int53 (value: any): value is number {
  return typeof value === 'number' &&
    value >= -INT53_MAX &&
    value <= INT53_MAX &&
    Math.floor(value) === value
})

export const UInt8: MatchCheck<number> = addAPI(function UInt8 (value: any): value is number { return ((value & 0xff) === value) })
export const UInt16: MatchCheck<number> = addAPI(function UInt16 (value: any): value is number { return ((value & 0xffff) === value) })
export const UInt32: MatchCheck<number> = addAPI(function UInt32 (value: any): value is number { return ((value >>> 0) === value) })
export const UInt53: MatchCheck<number> = addAPI(function UInt53 (value: any): value is number {
  return typeof value === 'number' &&
    value >= 0 &&
    value <= INT53_MAX &&
    Math.floor(value) === value
})
