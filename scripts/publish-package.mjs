import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const filter = process.env.PACKAGE
if (!filter) {
  console.error('Set PACKAGE to the package name or workspace directory to publish')
  process.exit(1)
}

const roots = ['packages', 'playground']
const workspaces = roots.flatMap((root) => {
  if (!existsSync(root)) {
    return []
  }
  return readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(root, entry.name))
})

const workspace = workspaces.find((dir) => {
  const pkgPath = join(dir, 'package.json')
  if (!existsSync(pkgPath)) {
    return false
  }
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
  return pkg.name === filter || dir === filter || `./${dir}` === filter
})

if (!workspace) {
  console.error(`No workspace package matched ${filter}`)
  process.exit(1)
}

const result = spawnSync('npm', ['publish', '--provenance', '--access', 'public'], {
  cwd: workspace,
  stdio: 'inherit',
})
process.exit(result.status ?? 1)
