const VALUES = require('../values')

function fixture (name, type, handler, opts) {
  const obj = {
    [name] (compile, run) {
      const compiled = compile(type)
      if (opts && opts.only) {
        run = run.only
      }
      run(name, t => {
        const tests = []
        let only
        const valid = (input) => {
          if (only) return
          tests.push(() => {
            const value = VALUES[input.valueId] || input.value
            t.equal(compiled.assert(value, input.strict), true, 'passes with ' + JSON.stringify(value))
          })
        }
        valid.only = (input) => {
          if (only) throw new Error('Multiple "only" detected.')
          valid(input)
          only = tests.pop()
        }
        const invalid = (input) => {
          if (only) return
          tests.push(() => {
            if (!input.exception) throw new TypeError('Expected exception')
            const value = VALUES[input.valueId] || input.value
            t.throws(function () {
              compiled.assert(value, input.strict)
            }, new RegExp(input.exception), 'throws "' + input.exception + '" with value of ' + JSON.stringify(value))
          })
        }
        invalid.only = (input) => {
          if (only) throw new Error('Multiple "only" detected.')
          invalid(input)
          only = tests.pop()
        }
        handler({ valid: valid, invalid: invalid })
        if (only) {
          only()
        } else {
          for (const test of tests) {
            test()
          }
        }
        t.end()
      }, opts)
    }
  }
  return obj[name]
}
fixture.only = function (name, type, handler, opts) {
  return fixture(name, type, handler, Object.assign({}, { only: true }, opts))
}
module.exports = fixture
