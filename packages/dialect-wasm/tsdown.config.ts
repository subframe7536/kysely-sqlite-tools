import { lib } from '@subf/config/tsdown'

export default lib({
  unbundled: ['kysely', '@sqlite.org/sqlite-wasm'],
  overrides: {
    format: ['cjs', 'esm'],
    outExtensions: ({ format }) => ({ js: format === 'es' ? '.mjs' : '.js' }),
  },
})
