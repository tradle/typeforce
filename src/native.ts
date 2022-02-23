import type { Check as IValidator, MatchCheck } from './interfaces'
import { addAPI } from './errors'

export const Check: MatchCheck<IValidator<any>> = addAPI(function Validator (value: any): value is IValidator<any> {
  return typeof value === 'function' && 'toJSON' in value && 'assert' in value && 'match' in value
})

export const Validator: MatchCheck<IValidator<any>> = Check

export const Array: MatchCheck<any[]> = addAPI(function Array (value: any): value is any[] {
  return value !== null && value !== undefined && value.constructor === global.Array
})

export const Boolean: MatchCheck<boolean> = addAPI(function Boolean (value: any): value is boolean {
  return value === true || value === false
})

export const Function: MatchCheck<Function> = addAPI(function Function (value: any): value is Function {
  return typeof value === 'function'
})

export const Null: MatchCheck<null | undefined> = addAPI(function Null (value: any): value is null | undefined {
  return value === undefined || value === null
})

export const Nil: MatchCheck<null | undefined> = Null

export const Number: MatchCheck<number> = addAPI(function Number (value: any): value is number {
  return typeof value === 'number'
})

export const Object: MatchCheck<Object> = addAPI(function Object (value: any): value is Object {
  return typeof value === 'object'
})

export const String: MatchCheck<string> = addAPI(function String (value: any): value is string {
  return typeof value === 'string'
})
