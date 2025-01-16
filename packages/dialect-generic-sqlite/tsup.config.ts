import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: {
      'index': 'src/index.ts',
      'worker': 'src/worker/index.ts',
      'node-helper': 'src/worker/node-helper.ts',
      'web-helper': 'src/worker/web-helper.ts',
    },
    clean: true,
    format: ['cjs', 'esm'],
    shims: true,
    dts: true,
    treeshake: true,
  },
])
