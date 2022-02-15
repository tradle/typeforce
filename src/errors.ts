import type { Matcher, RawValidator, Validator } from './interfaces'

export function getTypeName (fn: Function): string {
  if (fn.name !== undefined) {
    return fn.name
  }
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

  // @ts-expect-error
  return e
}

export function assertType <T> (type: RawValidator<T>, value: any, strict?: boolean): value is T {
  if (type(value, strict)) return true
  throw new TfTypeError(type, value)
}

export const matchType = (<T> (type: RawValidator<T>, value: any, strict?: boolean): value is T => {
  try {
    return assertType(type, value, strict)
  } catch (e) {
    matchType.error = e as Error
    return false
  }
}) as (<T> (type: RawValidator<T>, value: any, strict?: boolean) => value is T) & {
  error: Error | null | undefined
}

export function addAPI <T = any> (fn: RawValidator<T>, json?: any): Validator<T> {
  if (!('toJSON' in fn)) {
    if (json === undefined) {
      json = fn.name
    }
    Object.assign(fn, {
      toJSON () { return json }
    })
  }
  const assert = (value: any, strict?: boolean): value is T => assertType(fn, value, strict)
  const match = ((value: any, strict?: boolean): value is T => {
    try {
      return assert(value, strict)
    } catch (e) {
      match.error = e as Error
      return false
    }
  }) as Matcher<T>
  return Object.assign(fn, {
    assert,
    match
  }) as Validator<T>
}
