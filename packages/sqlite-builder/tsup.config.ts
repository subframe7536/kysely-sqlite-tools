import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    schema: 'src/schema/index.ts',
    utils: 'src/utils.ts',
  },
  clean: true,
  format: ['cjs', 'esm'],
  shims: true,
  dts: true,
  external: ['kysely'],
  treeshake: true,
})
