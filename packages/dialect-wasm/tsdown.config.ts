import { lib } from '@subf/config/tsdown'

export default lib({
  unbundled: [
    'kysely',
    '@sqlite.org/sqlite-wasm',
    'node-sqlite3-wasm',
    '@vlcn.io/sqlite-wasm',
    'sql.js',
  ],
  overrides: {
    format: ['cjs', 'esm'],
    outExtensions: ({ format }) => ({ js: format === 'es' ? '.mjs' : '.js' }),
  },
})
