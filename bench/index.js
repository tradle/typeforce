const assert = require('assert')
const benchmark = require('benchmark')
const local = require('../')
const npm = require('typeforce')
const fixtures = require('../test/fixtures')

const legacyCompile = 
  typeof npm !== 'function' ? npm.compile : function (type) {
    const compiled = npm.compile(type)
    return {
      assert (value, strict) {
        return npm(compiled, value, strict)
      }
    }
  }

const hollowRun = {
  equal(a, b) {
    assert.equal(a, b)
  },
  throws(fn, msg) {
    assert.throws(fn, msg)
  },
  end () {}
}

const incompatible = new Set()
fixtures(legacyCompile, function warmupNPM (name, handler) {
  try {
    handler(hollowRun)
  } catch (err) {
    incompatible.add(name)
  }
})
fixtures(local.compile, function warmupLocal (_name, handler) {
  handler(hollowRun)
})
if (incompatible.size > 0) {
  console.warn(`[WARNING] Following fixtures can not be run against old version: \n  - ${Array.from(incompatible).join('\n  -')}`)
}

const testsByName = {}
const suiteTest = (prefix, compile) => fixtures(compile, (name, handler) => {
  if (incompatible.has(name)) return
  let testByName = testsByName[name]
  if (!testByName) {
    testByName = []
    testsByName[name] = testByName
  }
  testByName.push(() => suite.add(`${prefix}#${name}`, () => {
    handler(hollowRun)
  }))
})

// benchmark.options.minTime = 1
const suite = new benchmark.Suite()
suiteTest('local', local.compile)
suiteTest('npm', legacyCompile)

for (const tests of Object.values(testsByName)) {
  for (const addToSuite of tests) {
    addToSuite()
  }
}

// after each cycle
suite.on('cycle', function (event) {
  console.log('*', String(event.target))
})

suite.on('error', function (event) {
  throw event.target.error
})

suite.run()
