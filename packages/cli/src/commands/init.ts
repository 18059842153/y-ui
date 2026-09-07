import prompts from 'prompts'
import pc from 'picocolors'
import { saveConfig, configExists } from '../config.js'
import type { Framework, InstallMode, YuiConfig } from '../types.js'

export async function initCommand(cwd: string): Promise<void> {
  if (configExists(cwd)) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: 'y-ui.config.json already exists. Overwrite?',
      initial: false,
    })
    if (!overwrite) {
      console.log(pc.yellow('Cancelled.'))
      return
    }
  }

  const response = await prompts([
    {
      type: 'select',
      name: 'framework',
      message: 'Which framework?',
      choices: [
        { title: 'React', value: 'react' },
        { title: 'Vue', value: 'vue' },
        { title: 'Svelte', value: 'svelte' },
      ],
    },
    {
      type: 'select',
      name: 'mode',
      message: 'Install mode?',
      choices: [
        { title: 'Local — copy source files to your project', value: 'local' },
        { title: 'Import Map — CDN with import map', value: 'importmap' },
      ],
    },
    {
      type: 'text',
      name: 'directory',
      message: 'Component directory (relative to project root)?',
      initial: 'src/components/ui',
    },
  ])

  if (!response.framework) {
    console.log(pc.yellow('Cancelled.'))
    return
  }

  const config: YuiConfig = {
    framework: response.framework as Framework,
    mode: response.mode as InstallMode,
    directory: response.directory as string,
  }

  const filePath = saveConfig(config, cwd)
  console.log(pc.green(`\nConfig written to ${filePath}`))
  console.log(`\n  Framework: ${pc.cyan(config.framework)}`)
  console.log(`  Mode:      ${pc.cyan(config.mode)}`)
  console.log(`  Directory: ${pc.cyan(config.directory)}`)
  console.log(`\nRun ${pc.bold('y-ui add <component>')} to add components.\n`)
}
