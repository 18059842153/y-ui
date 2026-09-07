import fs from 'node:fs'
import path from 'node:path'
import pc from 'picocolors'
import { loadConfig } from '../config.js'
import { resolveDependencies, validateComponentNames } from '../resolver.js'
import { buildImportMap, writeImportMap, mergeImportMap } from '../writers/importmap.js'
import { loadRegistry } from '../registry.js'

export async function cdnInitCommand(cwd: string): Promise<void> {
  const config = loadConfig(cwd)
  if (!config) {
    console.error(pc.red('No y-ui.config.json found. Run `y-ui init` first.'))
    process.exit(1)
  }

  const registry = loadRegistry()
  const allFiles = Object.values(registry.components).flatMap(
    (c) => c.files[config.framework] ?? [],
  )
  const entry = buildImportMap(config.framework, allFiles, registry.version)
  const filePath = writeImportMap(entry, path.join(cwd, 'import-map.json'))

  console.log(pc.green(`\nImport map written to ${filePath}`))
  console.log(`  ${Object.keys(entry.imports).length} entries for ${pc.cyan(config.framework)}\n`)
}

export async function cdnAddCommand(names: string[], cwd: string): Promise<void> {
  const config = loadConfig(cwd)
  if (!config) {
    console.error(pc.red('No y-ui.config.json found. Run `y-ui init` first.'))
    process.exit(1)
  }

  const invalid = validateComponentNames(names)
  if (invalid.length > 0) {
    console.error(pc.red(`Unknown component(s): ${invalid.join(', ')}`))
    process.exit(1)
  }

  const mapPath = path.join(cwd, 'import-map.json')
  let existing = { imports: {} as Record<string, string> }
  if (fs.existsSync(mapPath)) {
    existing = JSON.parse(fs.readFileSync(mapPath, 'utf-8'))
  }

  const registry = loadRegistry()
  const resolved = resolveDependencies(names, registry)
  const allFiles = resolved.flatMap(({ meta }) => meta.files[config.framework] ?? [])
  const incoming = buildImportMap(config.framework, allFiles, registry.version)
  const merged = mergeImportMap(existing, incoming)

  writeImportMap(merged, mapPath)

  console.log(pc.green(`\nAdded ${resolved.length} component(s) to import map.`))
  console.log(`  Total entries: ${Object.keys(merged.imports).length}\n`)
}
