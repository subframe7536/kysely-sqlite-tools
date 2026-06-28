import { lib } from '@subf/config/tsdown'

export default lib({
  entry: {
    index: 'src/index.ts',
    normal: 'src/normal.ts',
    worker: 'src/worker/index.ts',
  },
  unbundled: ['kysely', 'bun:sqlite'],
  overrides: {
    format: ['cjs', 'esm'],
    outExtensions: ({ format }) => ({ js: format === 'es' ? '.mjs' : '.js' }),
  },
})
