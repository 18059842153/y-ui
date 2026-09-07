import pc from 'picocolors'
import { loadRegistry } from '../registry.js'

export function listCommand(): void {
  const registry = loadRegistry()
  const entries = Object.entries(registry.components)

  if (entries.length === 0) {
    console.log(pc.yellow('No components available in the registry.'))
    return
  }

  console.log(`\n${pc.bold('Available components')}\n`)

  const nameWidth = Math.max(...entries.map(([n]) => n.length)) + 2

  for (const [name, meta] of entries.sort(([a], [b]) => a.localeCompare(b))) {
    const padded = name.padEnd(nameWidth)
    const deps = meta.dependencies.length > 0
      ? pc.dim(` (deps: ${meta.dependencies.join(', ')})`)
      : ''
    console.log(`  ${pc.cyan(padded)} ${meta.description}${deps}`)
  }

  console.log(`\nRun ${pc.bold('y-ui add <component>')} to install.\n`)
}
