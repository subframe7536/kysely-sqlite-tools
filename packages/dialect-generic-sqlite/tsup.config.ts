import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'worker': 'src/worker/index.ts',
    'worker-helper-node': 'src/worker/node-helper.ts',
    'worker-helper-web': 'src/worker/web-helper.ts',
  },
  format: ['cjs', 'esm'],
  clean: true,
  dts: true,
  treeshake: true,
})
