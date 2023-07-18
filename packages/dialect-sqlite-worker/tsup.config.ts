import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: [
      'src/index.ts',
      'src/worker.ts',
    ],
    clean: true,
    format: ['cjs', 'esm'],
    shims: true,
    dts: true,
    external: ['kysely', 'better-sqlite3'],
    treeshake: true,
  },
])
