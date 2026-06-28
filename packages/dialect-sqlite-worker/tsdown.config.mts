import { lib } from '@subf/config/tsdown'

export default lib({
  unbundled: ['node:path', 'node:worker_threads'],
  entry: {
    index: 'src/index.ts',
    worker: 'src/worker/index.ts',
  },
  overrides: {
    clean: true,
    format: ['cjs', 'esm'],
    outExtensions: ({ format }) => ({ js: format === 'es' ? '.mjs' : '.js' }),
  },
})
