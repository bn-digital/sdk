import { Command } from 'commander'

import { command as lintCommand } from './lint'
import { command as projectCommand } from './project'

const command = new Command('bn')
command.addCommand(projectCommand)
command.addCommand(lintCommand)

function run(args: string[]) {
  return command.parse(args)
}

export { run }
