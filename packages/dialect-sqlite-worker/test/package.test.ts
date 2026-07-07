import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

const require = createRequire(import.meta.url)
const packageJson = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
) as {
  exports: {
    '.': {
      require: string
    }
    './worker': {
      require: string
    }
  }
  main: string
}

describe('sqlite worker package metadata', () => {
  it('publishes CJS entry points with .cjs extensions', () => {
    expect(packageJson.main).toBe('./dist/index.cjs')
    expect(packageJson.exports['.'].require).toBe('./dist/index.cjs')
    expect(packageJson.exports['./worker'].require).toBe('./dist/worker.cjs')
  })

  it('loads the packaged CJS entry', () => {
    expect(() => require('../dist/index.cjs')).not.toThrow()
  })
})
