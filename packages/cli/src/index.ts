import { Command } from 'commander'
import { initCommand } from './commands/init.js'
import { addCommand } from './commands/add.js'
import { listCommand } from './commands/list.js'
import { updateCommand } from './commands/update.js'
import { cdnInitCommand, cdnAddCommand } from './commands/cdn.js'

const program = new Command()

program
  .name('y-ui')
  .description('Y-UI component library CLI')
  .version('0.1.0')

program
  .command('init')
  .description('Initialize Y-UI in your project')
  .action(() => initCommand(process.cwd()))

program
  .command('add')
  .description('Add components to your project')
  .argument('<components...>', 'Component names to add')
  .action((components: string[]) => addCommand(components, process.cwd()))

program
  .command('list')
  .description('List available components')
  .action(() => listCommand())

program
  .command('update')
  .description('Update installed components')
  .argument('[components...]', 'Component names to update (all if omitted)')
  .action((components: string[]) => updateCommand(components, process.cwd()))

const cdn = program
  .command('cdn')
  .description('Import map / CDN management')

cdn
  .command('init')
  .description('Generate import map for all components')
  .action(() => cdnInitCommand(process.cwd()))

cdn
  .command('add')
  .description('Add components to import map')
  .argument('<components...>', 'Component names to add')
  .action((components: string[]) => cdnAddCommand(components, process.cwd()))

program.parse()
