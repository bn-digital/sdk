import { createCommand } from 'commander'
import packageJson from '../package.json'
import { github } from './commands/github'
import { vault } from './commands/vault'

const command = createCommand('bn').version(packageJson.version).addCommand(vault).addCommand(github)

command.parse(process.argv)
