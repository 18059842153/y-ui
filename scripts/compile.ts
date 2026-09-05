import { readdirSync, existsSync } from 'fs'
import { resolve, dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const componentsDir = resolve(root, 'packages/components')

const targets = ['react', 'vue', 'svelte'] as const

console.log('Starting Mitosis compilation...\n')

for (const target of targets) {
  console.log(`Compiling for ${target}...`)

  const targetDir = resolve(root, `packages/${target}`)
  const srcDir = resolve(targetDir, 'src')

  try {
    execSync(
      `npx mitosis build --target ${target} --config mitosis.config.ts`,
      {
        cwd: componentsDir,
        stdio: 'inherit',
      },
    )
    console.log(`  ✓ ${target} compiled successfully\n`)
  } catch (error) {
    console.error(`  ✗ ${target} compilation failed:`, error)
    console.log('  Continuing with other targets...\n')
  }
}

console.log('Mitosis compilation complete.')
