import { lib } from '@subf/config/tsdown'

export default lib({
  entry: {
    index: 'src/index.ts',
    worker: 'src/worker/index.ts',
  },
  unbundled: ['kysely'],
  overrides: {
    format: ['cjs', 'esm'],
    outExtensions: ({ format }) => ({ js: format === 'es' ? '.mjs' : '.js' }),
  },
})
