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
    treeshake: true,
  },
  {
    entry: [
      'src/worker.ts',
    ],
    format: 'cjs',
    dts: false,
    external: ['better-sqlite3'],
    treeshake: true,
  },
])
