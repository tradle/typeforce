import runTests from './run-tests'

async function main (): Promise<void> {
  const cjs = process.env.TEST_CJS === 'true'
  const legacy = process.env.TEST_LEGACY === 'true'
  const ts = process.env.TEST_TS === 'true' || (!cjs && !legacy)
  if (ts) {
    runTests('ts', await import('../src'), await import('../src/async'))
  }
  if (cjs) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    runTests('cjs', require('../cjs'), require('../cjs/async'))
  }
  if (legacy) {
    const { sync, async } = await import('./legacy')
    runTests('legacy', sync, async)
  }
}

main().catch(err => {
  console.error((err as Error)?.stack ?? err)
  process.exit(1)
})
