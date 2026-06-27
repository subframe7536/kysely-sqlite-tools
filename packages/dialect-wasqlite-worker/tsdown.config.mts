import { lib } from '@subf/config/tsdown'
import { defineConfig } from 'tsdown'

export default defineConfig(
  lib({
    entry: {
      index: 'src/index.ts',
      worker: 'src/worker/index.ts',
    },
    unbundled: ['kysely'],
    overrides: {
      clean: true,
      format: ['cjs', 'esm'],
      outExtensions: ({ format }) => ({ js: format === 'es' ? '.mjs' : '.js' }),
    },
  }),
)
