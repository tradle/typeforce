import { compile } from './compile'
import { Raw } from './interfaces'
export * from './index'

export interface Callback {
  (error: Error, match: false): any
  (error: null, match: true): any
}

function assertAsync (type: any, value: any, strict: boolean, callback: Callback): void {
  try {
    (compile(type).assert as Raw)(value, strict)
  } catch (err) {
    // eslint-disable-next-line node/no-callback-literal
    return queueMicrotask(() => callback(err as Error, false))
  }
  return queueMicrotask(() => callback(null, true))
}

export function assert (type: any, value: any, callback: Callback): void
export function assert (type: any, value: any, strict: boolean | null | undefined, callback: Callback): void
export function assert (type: any, value: any, strictOrCallback: boolean | null | undefined | Callback, callback?: Callback): void {
  if (typeof strictOrCallback === 'function') {
    assertAsync(type, value, false, strictOrCallback)
  } else {
    assertAsync(type, value, strictOrCallback ?? false, callback as Callback)
  }
}
