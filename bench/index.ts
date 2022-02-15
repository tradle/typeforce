import * as assert from 'assert'
import * as benchmark from 'benchmark'
import { Compiled } from '../src/interfaces'
import fixtures from '../test/fixtures'
import type { LimitedTest, RunHandler } from '../test/fixtures/fixture'
import createTypes from '../test/types'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const local = require('../cjs')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const npm = require('typeforce')

const legacyCompile =
  typeof npm !== 'function'
    ? npm.compile
    : function <T> (type: T): { assert: (value: any, string?: boolean) => value is Compiled<T> } {
      const compiled = npm.compile(type)
      return {
        assert (value: any, strict?: boolean): value is Compiled<T> {
          return npm(compiled, value, strict)
        }
      }
    }

const hollowRun = {
  equal (a: any, b: any): void {
    assert.equal(a, b)
  },
  fail (err: any): void {
    throw err
  },
  throws (fn: () => any, check?: string | RegExp | Function): void {
    try {
      fn()
    } catch (err) {
      if (typeof check === 'function') {
        assert.ok(check(err))
      }
      if (typeof check === 'string') {
        assert.equal((err as Error).message, check)
      }
      if (check instanceof RegExp) {
        const message = (err as Error).message
        assert.match(message, check)
      }
    }
  },
  end (): void {}
}

const incompatible = new Set()
try {
  fixtures(legacyCompile, function warmupNPM (name, handler) {
    try {
      handler(hollowRun)
    } catch (err) {
      console.log((err as Error)?.stack ?? err)
      incompatible.add(name)
    }
  } as RunHandler, createTypes(npm))
  fixtures(local.compile, function warmupLocal (_name, handler) {
    handler(hollowRun)
  } as RunHandler, createTypes(local))
} catch (err) {
  console.log((err as Error)?.stack ?? err)
  process.exit(1)
}
if (incompatible.size > 0) {
  console.warn(`[WARNING] Following fixtures can not be run against old version: \n  - ${Array.from(incompatible).join('\n  - ')}`)
}

const only = process.env.ONLY
const namedTests: Array<{ name: string, handler: (t: LimitedTest) => void }> = []
const suiteTest = (prefix: string, compile: <T> (input: T) => Compiled<T>, types: { [key: string]: any }): void => {
  Object.entries({ ' invalid': { skipValid: true }, '.. valid': { skipInvalid: true } }).forEach(([variant, opts]) => {
    fixtures(
      compile,
      ((name, handler) => {
        if (incompatible.has(name)) return
        if (only !== undefined && only !== name) {
          return
        }
        namedTests.push({
          name: `${name} ...${variant} ...${prefix}`,
          handler
        })
      }) as RunHandler,
      types,
      opts
    )
  })
}

// benchmark.options.minTime = 1
const suite = new benchmark.Suite()
suiteTest(' local', local.compile, createTypes(local))
suiteTest('.. npm', legacyCompile, createTypes(npm))

suite.on('error', (error: any) => {
  console.log(error.stack)
})

for (const { name, handler } of namedTests.sort((a, b) => {
  if (a.name > b.name) return 1
  if (a.name < b.name) return -1
  return 0
})) {
  suite.add(name, () => handler(hollowRun))
}

// after each cycle
suite.on('cycle', (event: any) => {
  console.log('*', String(event.target))
})

suite.on('error', (event: any) => {
  throw event.target.error
})

suite.run()
