import { execFileSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const require = createRequire(import.meta.url)

describe('wasm package declarations', () => {
  it('typechecks from a consumer project without vendor declaration bundling', () => {
    const dir = mkdtempSync(join(tmpdir(), 'kysely-wasm-types-'))
    const entryPath = fileURLToPath(new URL('../dist/index.js', import.meta.url))
    const tsconfigPath = join(dir, 'tsconfig.json')

    mkdirSync(join(dir, 'src'))
    writeFileSync(
      join(dir, 'src/index.ts'),
      [
        `import { CrSqliteDialect, NodeWasmDialect, OfficialWasmDialect, SqlJsDialect } from '${entryPath}'`,
        'void CrSqliteDialect',
        'void NodeWasmDialect',
        'void OfficialWasmDialect',
        'void SqlJsDialect',
      ].join('\n'),
    )
    writeFileSync(
      tsconfigPath,
      JSON.stringify(
        {
          compilerOptions: {
            module: 'NodeNext',
            moduleResolution: 'NodeNext',
            strict: true,
            target: 'ES2022',
          },
          include: ['src'],
        },
        null,
        2,
      ),
    )

    try {
      expect(() =>
        execFileSync(
          process.execPath,
          [require.resolve('typescript/lib/tsc'), '--project', tsconfigPath],
          {
            cwd: dir,
            stdio: 'pipe',
          },
        ),
      ).not.toThrow()
    } finally {
      rmSync(dir, { force: true, recursive: true })
    }
  })
})
