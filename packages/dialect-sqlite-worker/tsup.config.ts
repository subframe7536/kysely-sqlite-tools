import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/worker.ts',
  ],
  clean: true,
  format: 'esm',
  shims: true,
  dts: true,
  external: ['kysely'],
  treeshake: true,
  outExtension() {
    return {
      js: '.js',
    }
  },
})
