import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcDir = resolve(__dirname, '..', 'src')
const distDir = resolve(__dirname, '..', 'dist')

mkdirSync(distDir, { recursive: true })
mkdirSync(resolve(distDir, 'component'), { recursive: true })

const cssFiles = ['global.css', 'semantic.css', 'animations.css', 'rtl.css']
for (const file of cssFiles) {
  const content = readFileSync(resolve(srcDir, file), 'utf-8')
  writeFileSync(resolve(distDir, file), content)
}

const componentDir = resolve(srcDir, 'component')
const componentFiles = readdirSync(componentDir)
for (const file of componentFiles) {
  copyFileSync(resolve(componentDir, file), resolve(distDir, 'component', file))
}

console.log('Tokens built successfully.')
