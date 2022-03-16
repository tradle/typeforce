import type { Match, Raw, CheckForRaw, TypeForCheck, Assert, AnyRaw, AssertType } from './interfaces'
import newDebug from 'debug'

const debug = newDebug('tradle:typeforce')

export function getTypeName (fn: Function): string {
  if (fn.name !== undefined) {
    return fn.name
  }
  /* c8 ignore next 6 */
  const match = fn.toString().match(/function (.*?)\s*\(/)
  if (match != null) {
    return match[1]
  }
  throw new Error(`Can't identify the typename of ${String(fn)}`)
}

export function getValueTypeName (value: null | undefined): ''
export function getValueTypeName (value: Object): string
export function getValueTypeName (value: null | undefined | Object): string | null {
  return value === null || value === undefined ? '' : getTypeName(value.constructor)
}

function getValue (value: any): string {
  if (typeof value === 'function') return ''
  if (typeof value === 'string') return JSON.stringify(value)
  if (value !== null && typeof value === 'object') return ''
  return value
}

export function tfJSON (type: any): any {
  if (type === undefined) return ''
  if (type === null) return null
  if (type.constructor === Array) return 'Array'
  if (typeof type === 'function') return 'toJSON' in type ? type.toJSON() : getTypeName(type)
  if (typeof type === 'object') return 'Object'
  return type
}

export function tfString (type: any): string {
  // TODO: improve performance
  return String(tfJSON(type))
}

export function tfErrorString (type: any, value: any, valueTypeName: string): string {
  const valueJson = getValue(value)

  return `Expected ${tfString(type)}, got${
    (valueTypeName !== '' ? ' ' + valueTypeName : '')
  }${
    (valueJson !== '' ? ' ' + valueJson : '')
  }`
}

export class TfTypeError extends Error {
  __type: any
  __value: any
  __valueTypeName: string

  constructor (type: any, value: any, valueTypeName?: string) {
    super(tfErrorString(type, value, valueTypeName ?? getValueTypeName(value)))
    valueTypeName = valueTypeName ?? getValueTypeName(value)

    this.__type = type
    this.__value = value
    this.__valueTypeName = valueTypeName
  }
}

export function tfPropertyErrorString (type: any, label: string | undefined, name: any, value: any, valueTypeName: string): string {
  return tfErrorString(
    `property "${tfString(name)}" ${label !== 'key' ? 'of' : 'with key'} type ${tfString(type)}`,
    value,
    valueTypeName
  )
}

export class TfPropertyTypeError extends Error {
  __label: string | undefined
  __property: string
  __type: string
  __value: any
  __valueTypeName: string | undefined

  constructor (type: any | null, property: string, label?: string, value?: any, valueTypeName?: string) {
    super(type !== null && type !== undefined
      ? tfPropertyErrorString(type, label, property, value, valueTypeName ?? getValueTypeName(value))
      : `Unexpected property "${property}"`
    )

    this.__label = label
    this.__property = property
    this.__type = type
    this.__value = value
    this.__valueTypeName = valueTypeName ?? getValueTypeName(value)
  }
}

export function tfCustomError (expected: string, actual: any): TfTypeError {
  return new TfTypeError(expected, {}, actual)
}

export function tfSubError <T extends Error> (e: T, property: string, label?: string):
T extends TfPropertyTypeError ?
  TfPropertyTypeError :
  T extends TfTypeError ?
    TfPropertyTypeError :
    T {
  // sub child?
  if (e instanceof TfPropertyTypeError) {
    // @ts-expect-error
    return new TfPropertyTypeError(
      e.__type, `${property}.${e.__property}`, e.__label, e.__value, e.__valueTypeName
    )
  }

  // child?
  if (e instanceof TfTypeError) {
    // @ts-expect-error
    return new TfPropertyTypeError(
      e.__type, property, label, e.__value, e.__valueTypeName
    )
  }
  /* c8 ignore next 3 */
  // @ts-expect-error
  return e
}

function assertTypeRaw <T> (type: AnyRaw<T>, value: T, strict?: boolean): asserts value is T {
  if (!(type(value, strict) as boolean)) {
    throw new TfTypeError(type, value)
  }
  // @ts-expect-error
  return true
}

function getStack (err: any): string {
  if (typeof err === 'string') {
    return err
  }
  if (typeof err !== 'object' || err === null) {
    return String(err)
  }
  if ('__error' in err) {
    return getStack(err.__error)
  }
  if ('stack' in err) {
    return String(err.stack)
  }
  if ('message' in err) {
    return String(err.message)
  }
  return String(err)
}

export function assertTypeDebug <T> (type: AnyRaw<T>, value: T, strict?: boolean): asserts value is T {
  let match = false
  try {
    match = type(value, strict) as boolean
  } catch (err) {
    debug('typecheck failed: ' + getStack(err), ...arguments)
    throw err
  }
  if (!match) {
    const error = new TfTypeError(type, value)
    debug('typematch failed: ' + getStack(error), ...arguments)
    throw error
  }
  // @ts-expect-error
  return true
}

export const assertType: <T> (type: AnyRaw<T>, value: T, string?: boolean) => asserts value is T =
  debug.enabled
    /* c8 ignore next */
    ? assertTypeDebug
    : assertTypeRaw

// To be used for typescript. Assert operations need to be explicitly typed
export const assertAnyType: AssertType<any> = assertType as AssertType<any>

export const matchType = (<T extends Raw> (type: T, value: any, strict?: boolean): value is TypeForCheck<T> => {
  try {
    assertType(type, value, strict)
    return true
  } catch (e) {
    matchType.error = e as Error
    return false
  }
}) as (<T extends Raw> (type: T, value: any, strict?: boolean) => value is TypeForCheck<T>) & {
  error: Error | null | undefined
}

export function addAPI <T extends Raw> (fn: T, json?: any): CheckForRaw<T> {
  if (!('toJSON' in fn)) {
    if (json === undefined) {
      json = fn.name
    }
    Object.assign(fn, {
      toJSON () { return json }
    })
  }
  const assert: Assert<T> = (value: any, strict?: boolean): asserts value is T => assertType(fn, value, strict)
  const match = ((value: any, strict?: boolean): value is T => {
    try {
      assert(value, strict)
      return true
    } catch (e) {
      match.error = e as Error
      return false
    }
  }) as Match<T>
  return Object.assign(fn, {
    assert,
    match
  }) as unknown as CheckForRaw<T>
}
