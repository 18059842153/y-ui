import fs from 'node:fs'
import path from 'node:path'
import type { Framework, RegistryFile } from '../types.js'

export function writeLocalFiles(
  files: RegistryFile[],
  baseDir: string,
  componentDir: string,
): string[] {
  const dir = path.join(baseDir, componentDir)
  fs.mkdirSync(dir, { recursive: true })

  const written: string[] = []
  for (const file of files) {
    const filePath = path.join(dir, file.path)
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, file.content)
    written.push(filePath)
  }
  return written
}

export function getComponentDir(framework: Framework, baseDir: string): string {
  return path.join(baseDir, 'components', 'ui')
}
