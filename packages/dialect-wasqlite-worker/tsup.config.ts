import { copyFile } from 'node:fs/promises'
import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: [
      'src/index.ts',
    ],
    clean: true,
    format: ['cjs', 'esm'],
    shims: true,
    dts: true,
    external: ['kysely'],
    noExternal: ['wa-sqlite'],
    treeshake: true,
    plugins: [
      {
        name: 'copy',
        buildEnd: async () => {
          await copyFile(
            './node_modules/wa-sqlite/dist/wa-sqlite-async.wasm',
            './dist/wa-sqlite-async.wasm',
          )
        },
      },
    ],
  },
  {
    entry: [
      'src/worker.ts',
    ],
    clean: false,
    format: ['cjs', 'esm'],
    dts: true,
    noExternal: ['wa-sqlite'],
    treeshake: true,
  },
])
