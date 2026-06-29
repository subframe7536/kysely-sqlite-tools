import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['packages/dialect-*/test/**/*.test.ts'],
    exclude: ['packages/dialect-bun-worker/test/**/*.test.ts'],
  },
})
