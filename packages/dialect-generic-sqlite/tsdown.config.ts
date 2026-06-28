import { lib } from '@subf/config/tsdown'

export default lib({
  unbundled: ['node:events', 'node:worker_threads'],
  entry: {
    index: 'src/index.ts',
    worker: 'src/worker/index.ts',
    'worker-helper-node': 'src/worker/node-helper.ts',
    'worker-helper-web': 'src/worker/web-helper.ts',
  },
  overrides: {
    format: ['esm', 'cjs'],
  },
})
