import fs from 'node:fs'
import path from 'node:path'
import type { YuiConfig } from './types.js'

const CONFIG_FILE = 'y-ui.config.json'

export function findConfigDir(cwd: string = process.cwd()): string | null {
  let dir = path.resolve(cwd)
  while (true) {
    if (fs.existsSync(path.join(dir, CONFIG_FILE))) return dir
    const parent = path.dirname(dir)
    if (parent === dir) return null
    dir = parent
  }
}

export function loadConfig(cwd: string = process.cwd()): YuiConfig | null {
  const dir = findConfigDir(cwd)
  if (!dir) return null
  const raw = fs.readFileSync(path.join(dir, CONFIG_FILE), 'utf-8')
  return JSON.parse(raw) as YuiConfig
}

export function saveConfig(config: YuiConfig, cwd: string = process.cwd()): string {
  const filePath = path.join(cwd, CONFIG_FILE)
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2) + '\n')
  return filePath
}

export function configExists(cwd: string = process.cwd()): boolean {
  return fs.existsSync(path.join(cwd, CONFIG_FILE))
}
