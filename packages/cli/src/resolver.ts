import type { Registry, RegistryComponent } from './types.js'
import { loadRegistry } from './registry.js'

export interface ResolvedComponent {
  name: string
  meta: RegistryComponent
}

export function resolveDependencies(
  names: string[],
  registry?: Registry,
): ResolvedComponent[] {
  const reg = registry ?? loadRegistry()
  const all = reg.components
  const resolved = new Map<string, ResolvedComponent>()
  const visiting = new Set<string>()

  function visit(name: string): void {
    if (resolved.has(name)) return
    if (visiting.has(name)) return
    const meta = all[name]
    if (!meta) return

    visiting.add(name)
    for (const dep of meta.dependencies) {
      visit(dep)
    }
    visiting.delete(name)
    resolved.set(name, { name, meta })
  }

  for (const name of names) {
    visit(name)
  }

  return [...resolved.values()]
}

export function validateComponentNames(names: string[]): string[] {
  const reg = loadRegistry()
  return names.filter((n) => !(n in reg.components))
}
