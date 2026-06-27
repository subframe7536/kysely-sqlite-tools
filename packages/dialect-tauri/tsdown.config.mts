import { lib } from '@subf/config/tsdown'
import { defineConfig } from 'tsdown'

export default defineConfig(
  lib({
    unbundled: ['kysely'],
    overrides: {
      clean: true,
      format: ['cjs', 'esm'],
      outExtensions: ({ format }) => ({ js: format === 'es' ? '.mjs' : '.js' }),
    },
  }),
)
