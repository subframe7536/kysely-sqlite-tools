import { lib } from '@subf/config/tsdown'

export default lib({
  unbundled: ['kysely'],
  overrides: {
    format: ['cjs', 'esm'],
    outExtensions: ({ format }) => ({ js: format === 'es' ? '.mjs' : '.cjs' }),
  },
})
