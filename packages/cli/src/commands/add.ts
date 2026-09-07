import pc from 'picocolors'
import { loadConfig } from '../config.js'
import { resolveDependencies, validateComponentNames } from '../resolver.js'
import { writeLocalFiles, getComponentDir } from '../writers/local.js'
import { buildImportMap, writeImportMap } from '../writers/importmap.js'
import { collectNpmDependencies } from '../writers/deps.js'

export async function addCommand(names: string[], cwd: string): Promise<void> {
  const config = loadConfig(cwd)
  if (!config) {
    console.error(pc.red('No y-ui.config.json found. Run `y-ui init` first.'))
    process.exit(1)
  }

  const invalid = validateComponentNames(names)
  if (invalid.length > 0) {
    console.error(pc.red(`Unknown component(s): ${invalid.join(', ')}`))
    console.error(`Run ${pc.bold('y-ui list')} to see available components.`)
    process.exit(1)
  }

  const resolved = resolveDependencies(names)
  const added: string[] = []
  const skipped: string[] = []

  if (config.mode === 'local') {
    const baseDir = getComponentDir(config.framework, cwd)
    for (const { name, meta } of resolved) {
      const files = meta.files[config.framework]
      if (!files || files.length === 0) {
        skipped.push(name)
        continue
      }
      const written = writeLocalFiles(files, cwd, config.directory)
      added.push(...written)
    }
  } else {
    const allFiles = resolved.flatMap(({ meta }) => meta.files[config.framework] ?? [])
    const entry = buildImportMap(config.framework, allFiles, '0.1.0')
    const mapPath = writeImportMap(entry, `${cwd}/import-map.json`)
    added.push(mapPath)
  }

  const npmDeps = collectNpmDependencies(resolved, config.framework)

  console.log(pc.green(`\nAdded ${resolved.length} component(s):`))
  for (const { name } of resolved) {
    console.log(`  ${pc.cyan(name)}`)
  }

  if (config.mode === 'local') {
    console.log(`\n${added.length} file(s) written to ${pc.dim(config.directory)}`)
  }

  if (skipped.length > 0) {
    console.log(pc.yellow(`\nSkipped (no files for ${config.framework}): ${skipped.join(', ')}`))
  }

  if (npmDeps.length > 0) {
    console.log(`\nRequired npm dependencies:`)
    for (const dep of npmDeps) {
      console.log(`  ${pc.yellow(dep)}`)
    }
  }

  console.log()
}
