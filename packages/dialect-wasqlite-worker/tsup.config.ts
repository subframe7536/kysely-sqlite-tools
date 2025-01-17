import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    worker: 'src/worker/index.ts',
  },
  clean: true,
  format: ['cjs', 'esm'],
  shims: true,
  dts: true,
  external: ['kysely'],
  treeshake: true,
  plugins: [
    {
      name: 'classic worker',
      renderChunk(code) {
        if (this.format === 'cjs') {
          return { code: code.replaceAll('import.meta.url', 'self.location.href') }
        }
      },
    },
  ],
})
