import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    normal: 'src/normal.ts',
    worker: 'src/worker/index.ts',
  },
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  external: ['kysely', 'bun:sqlite'],
  treeshake: true,
})
