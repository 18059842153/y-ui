import fs from 'node:fs'
import path from 'node:path'
import type { Framework, RegistryFile } from '../types.js'

const CDN_BASE = 'https://cdn.jsdelivr.net/npm/@y-ui'

export interface ImportMapEntry {
  imports: Record<string, string>
}

export function buildImportMap(
  framework: Framework,
  files: RegistryFile[],
  version: string,
): ImportMapEntry {
  const imports: Record<string, string> = {}

  for (const file of files) {
    const bare = file.path.replace(/\.(tsx?|vue|svelte)$/, '.js')
    const name = `@y-ui/${bare}`
    imports[name] = `${CDN_BASE}/${framework}@${version}/dist/${bare}`
  }

  return { imports }
}

export function writeImportMap(
  entry: ImportMapEntry,
  outputPath: string,
): string {
  const filePath = path.resolve(outputPath)
  const content = JSON.stringify(
    { imports: entry.imports },
    null,
    2,
  ) + '\n'
  fs.writeFileSync(filePath, content)
  return filePath
}

export function mergeImportMap(
  existing: ImportMapEntry,
  incoming: ImportMapEntry,
): ImportMapEntry {
  return {
    imports: { ...existing.imports, ...incoming.imports },
  }
}
