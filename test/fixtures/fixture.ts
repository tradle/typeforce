import VALUES from '../values'
import type { Compiled } from '../../src/interfaces'

export type OrOnly <T extends Function > = T & {
  only: T
}

export type ValidHandler = (input: Fixture) => void
export type InvalidHandler = (input: Invalid) => void

export type FixtureHandler = (opts: {
  valid: ValidHandler
  invalid: InvalidHandler
}) => void

export interface LimitedTest {
  throws (fn: () => void, msg?: string | undefined): void
  throws (fn: () => void, exceptionExpected: Function | RegExp, msg?: string | undefined): void
  fail (error: any): void
  equal (a: any, b: any, msg?: string): void
  end (): void
}

export type RunHandler = OrOnly<(name: string, run: (t: LimitedTest) => void, opts?: { only: boolean }) => void>

export type RunFixture = (compile: <T> (input: T) => Compiled<T>, run: RunHandler, types: { [key: string]: any }, opts?: Opts) => void

export type Fixture = ({
  value: any
} | {
  valueId: keyof typeof VALUES
}) & {
  strict?: true
}

export type Invalid = Fixture & {
  exception: string
}

export interface Opts {
  only?: boolean
  skipValid?: boolean
  skipInvalid?: boolean
}

const fixture = ((name: string, createType: (types: { [key: string]: any }) => void, handler: FixtureHandler, defaults?: Opts): RunFixture => {
  return (compile: <T> (input: T) => Compiled<T>, run: RunHandler, types: { [key: string]: any }, opts?: Opts) => {
    opts = {
      ...defaults,
      ...opts
    }
    const runActual = (opts.only ? run.only : run) ?? run
    runActual(name, t => {
      const compiled: Compiled<any> = compile(createType(types))
      const valid = opts && opts.skipValid
        ? () => {}
        : (input: any) => {
          const value = 'valueId' in input ? VALUES[input.valueId] : input.value
          t.equal((compiled as Compiled<any>).assert(value, input.strict ?? false), true, 'passes with ' + JSON.stringify(value))
        }
      const invalid = opts && opts.skipInvalid
        ? () => {}
        : (input: Invalid) => {
          if (!input.exception) throw new TypeError('Expected exception')
          const value: any = 'valueId' in input ? VALUES[input.valueId] : input.value
          t.throws(function () {
            compiled.assert(value, input.strict)
          }, new RegExp(input.exception), 'throws "' + input.exception + '" with value of ' + JSON.stringify(value))
        }
      handler({ valid: valid, invalid: invalid })
      t.end()
    })
  }
}) as OrOnly<(name: string, type: any, handler: FixtureHandler, opts?: { only: boolean }) => RunFixture>
fixture.only = function (name: string, type: any, handler: FixtureHandler, opts?: { only: boolean }): RunFixture {
  return fixture(name, type, handler, Object.assign({}, { only: true }, opts))
}
export default fixture
