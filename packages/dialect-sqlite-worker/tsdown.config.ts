import { lib } from '@subf/config/tsdown'
import type { TsdownPluginOption, UserConfig } from 'tsdown'

export default lib({
  unbundled: ['node:path', 'node:worker_threads'],
  entry: {
    index: 'src/index.ts',
    worker: 'src/worker/index.ts',
  },
  overrides: {
    format: ['cjs', 'esm'],
    outExtensions: ({ format }) => ({ js: format === 'es' ? '.mjs' : '.js' }),
    plugins: [correctWorkerPathPlugin()],
  },
})

function correctWorkerPathPlugin(): TsdownPluginOption<any> {
  let format: UserConfig['format']
  const REG_TARGET = /join\(__dirname, "worker\.js"\)/
  return {
    name: 'correct-worker-path',
    tsdownConfigResolved(config) {
      format = config.format
    },
    renderChunk: {
      filter: {
        code: REG_TARGET,
      },
      handler(code) {
        if (format === 'es') {
          return code.replace(REG_TARGET, `new URL('./worker.mjs', import.meta.url)`)
        }
      },
    },
  }
}
