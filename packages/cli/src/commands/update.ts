import prompts from 'prompts'
import pc from 'picocolors'
import { loadConfig } from '../config.js'
import { resolveDependencies } from '../resolver.js'
import { writeLocalFiles, getComponentDir } from '../writers/local.js'
import { getAvailableComponents } from '../registry.js'

export async function updateCommand(names: string[], cwd: string): Promise<void> {
  const config = loadConfig(cwd)
  if (!config) {
    console.error(pc.red('No y-ui.config.json found. Run `y-ui init` first.'))
    process.exit(1)
  }

  if (config.mode !== 'local') {
    console.error(pc.red('Update is only supported in local mode. Use `y-ui cdn add` for import map mode.'))
    process.exit(1)
  }

  const resolved = resolveDependencies(names.length > 0 ? names : getAvailableComponents())

  const { confirm } = await prompts({
    type: 'confirm',
    name: 'confirm',
    message: `Update ${resolved.length} component(s)? This will overwrite existing files.`,
    initial: false,
  })

  if (!confirm) {
    console.log(pc.yellow('Cancelled.'))
    return
  }

  const baseDir = getComponentDir(config.framework, cwd)
  let count = 0

  for (const { name, meta } of resolved) {
    const files = meta.files[config.framework]
    if (!files || files.length === 0) continue
    writeLocalFiles(files, cwd, config.directory)
    count++
    console.log(`  ${pc.green('✓')} ${name}`)
  }

  console.log(pc.green(`\nUpdated ${count} component(s).\n`))
}
