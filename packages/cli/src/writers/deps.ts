import type { Framework, RegistryComponent } from '../types.js'

export function collectNpmDependencies(
  components: { name: string; meta: RegistryComponent }[],
  framework: Framework,
): string[] {
  const deps = new Set<string>()
  for (const { meta } of components) {
    const fwDeps = meta.npmDependencies[framework] ?? []
    for (const d of fwDeps) deps.add(d)
  }
  return [...deps].sort()
}
