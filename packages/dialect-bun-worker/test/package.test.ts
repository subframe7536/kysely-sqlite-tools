import { describe, expect, it } from 'bun:test'
import { mkdtempSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

describe('bun sqlite package', () => {
  it('executes a query through the CommonJS normal entry point', () => {
    const projectDir = mkdtempSync(join(tmpdir(), 'kysely-bun-worker-cjs-'))

    try {
      createCommonJsProject(projectDir)
      const result = Bun.spawnSync(['bun', 'run', 'index.js'], {
        cwd: projectDir,
        stderr: 'pipe',
        stdout: 'pipe',
      })

      const stdout = new TextDecoder().decode(result.stdout)
      const stderr = new TextDecoder().decode(result.stderr)
      const output = [stdout, stderr].filter(Boolean).join('\n')
      expect(result.exitCode, output).toBe(0)
    } finally {
      rmSync(projectDir, { force: true, recursive: true })
    }
  })
})

function createCommonJsProject(projectDir: string): void {
  const nodeModulesDir = join(projectDir, 'node_modules')
  mkdirSync(nodeModulesDir)
  writeFileSync(join(projectDir, 'package.json'), '{"type":"commonjs"}')
  writeFileSync(
    join(projectDir, 'index.js'),
    [
      "const { Kysely, sql } = require('kysely')",
      "const { BunSqliteDialect } = require('kysely-bun-worker/normal')",
      '',
      ';(async () => {',
      "  const db = new Kysely({ dialect: new BunSqliteDialect({ url: ':memory:' }) })",
      '  try {',
      '    const { rows } = await sql`select 1 as value`.execute(db)',
      "    if (rows.length !== 1 || rows[0].value !== 1) throw new Error('Unexpected query result')",
      '  } finally {',
      '    await db.destroy()',
      '  }',
      '})().catch((error) => {',
      '  console.error(error)',
      '  process.exitCode = 1',
      '})',
    ].join('\n'),
  )
  symlinkSync(packageRoot, join(nodeModulesDir, 'kysely-bun-worker'), 'dir')
  symlinkSync(resolve(packageRoot, 'node_modules/kysely'), join(nodeModulesDir, 'kysely'), 'dir')
}
