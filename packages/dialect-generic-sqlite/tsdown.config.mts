import { lib } from '@subf/config/tsdown'
import { defineConfig } from 'tsdown'

export default defineConfig(
  lib({
    unbundled: ['node:events', 'node:worker_threads'],
    entry: {
      index: 'src/index.ts',
      worker: 'src/worker/index.ts',
      'worker-helper-node': 'src/worker/node-helper.ts',
      'worker-helper-web': 'src/worker/web-helper.ts',
    },
    overrides: {
      clean: true,
      format: ['esm', 'cjs'],
    },
  }),
)
