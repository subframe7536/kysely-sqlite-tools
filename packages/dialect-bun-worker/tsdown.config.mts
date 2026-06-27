import { lib } from '@subf/config/tsdown'
import { defineConfig } from 'tsdown'

export default defineConfig(
  lib({
    entry: {
      index: 'src/index.ts',
      normal: 'src/normal.ts',
      worker: 'src/worker/index.ts',
    },
    unbundled: ['kysely', 'bun:sqlite'],
    overrides: {
      clean: true,
      format: ['cjs', 'esm'],
      outExtensions: ({ format }) => ({ js: format === 'es' ? '.mjs' : '.js' }),
    },
  }),
)
