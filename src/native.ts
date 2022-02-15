import type { Validator as IValidator } from './interfaces'
import { addAPI } from './errors'

export const Validator = addAPI(function Validator (value: any): value is IValidator<any> {
  return typeof value === 'function' && 'toJSON' in value && 'assert' in value && 'match' in value
})

export const Array = addAPI(function Array (value: any): value is any[] {
  return value !== null && value !== undefined && value.constructor === global.Array
})

export const Boolean = addAPI(function Boolean (value: any): value is boolean {
  return value === true || value === false
})

export const Function = addAPI(function Function (value: any): value is Function {
  return typeof value === 'function'
})

export const Null = addAPI(function Null (value: any): value is null | undefined {
  return value === undefined || value === null
})

export const Nil = Null

export const Number = addAPI(function Number (value: any): value is number {
  return typeof value === 'number'
})

export const Object = addAPI(function Object (value: any): value is Object {
  return typeof value === 'object'
})

export const String = addAPI(function String (value: any): value is string {
  return typeof value === 'string'
})
