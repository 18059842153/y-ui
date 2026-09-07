import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Registry } from './types.js'

let cached: Registry | null = null

export function loadRegistry(): Registry {
  if (cached) return cached

  const thisDir = path.dirname(fileURLToPath(import.meta.url))
  const candidates = [
    path.join(thisDir, '..', 'registry.json'),
    path.join(thisDir, '..', '..', 'registry.json'),
  ]

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      const parsed = JSON.parse(fs.readFileSync(candidate, 'utf-8')) as Registry
      cached = parsed
      return parsed
    }
  }

  return { version: '0.0.0', components: {} }
}

export function getAvailableComponents(): string[] {
  const registry = loadRegistry()
  return Object.keys(registry.components).sort()
}
