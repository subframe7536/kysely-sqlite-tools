import { existsSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'

const root = process.cwd()
const packages = [
  'packages/dialect-generic-sqlite',
  'packages/dialect-sqlite-worker',
  'packages/dialect-bun-worker',
  'packages/dialect-wasm',
  'packages/dialect-tauri',
  'packages/dialect-wasqlite-worker',
]
const require = createRequire(import.meta.url)

for (const packageDir of packages) {
  const pkgPath = join(root, packageDir, 'package.json')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
  const base = dirname(pkgPath)
  const checkPath = (field, value) => {
    if (typeof value === 'string' && value.startsWith('./') && !existsSync(join(base, value))) {
      throw new Error(`${pkg.name} ${field} points to missing ${value}`)
    }
  }
  checkPath('main', pkg.main)
  checkPath('module', pkg.module)
  checkPath('types', pkg.types)
  for (const [key, target] of Object.entries(pkg.exports ?? {})) {
    if (typeof target === 'string') {
      checkPath(`exports[${key}]`, target)
    } else {
      for (const [condition, value] of Object.entries(target)) {
        checkPath(`exports[${key}].${condition}`, value)
      }
    }
  }
  for (const [key, values] of Object.entries(pkg.typesVersions?.['*'] ?? {})) {
    for (const value of values) {
      checkPath(`typesVersions.${key}`, value)
    }
  }
  for (const [dep, range] of Object.entries(pkg.dependencies ?? {})) {
    if (range.startsWith('workspace:')) {
      const workspace = packages
        .map((p) => JSON.parse(readFileSync(join(root, p, 'package.json'), 'utf8')))
        .find((p) => p.name === dep)
      if (!workspace) {
        throw new Error(`${pkg.name} has unresolved workspace dependency ${dep}`)
      }
      if (!workspace.version) {
        throw new Error(`${dep} has no publishable version`)
      }
    }
  }
  const runtimeRequiresSpecialHost = pkg.name.includes('bun')
  if (!runtimeRequiresSpecialHost) {
    const rootExport = pkg.exports?.['.']
    const rootImport =
      typeof rootExport === 'string' ? rootExport : (rootExport?.import ?? pkg.module ?? pkg.main)
    await import(join(base, rootImport))
  }
  if (!runtimeRequiresSpecialHost && pkg.exports?.['.']?.require) {
    require(join(base, pkg.exports['.'].require))
  }
  for (const [key, target] of Object.entries(pkg.exports ?? {})) {
    if (key === '.' || key === './package.json') {
      continue
    }
    if (key.includes('worker')) {
      continue
    }
    if (runtimeRequiresSpecialHost) {
      continue
    }
    if (typeof target === 'object') {
      if (target.import) {
        await import(join(base, target.import))
      }
      if (target.require) {
        require(join(base, target.require))
      }
    } else {
      await import(join(base, target))
    }
  }
}
