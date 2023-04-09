import { Command } from 'commander'
import { prompt } from 'inquirer'

const command = new Command('project')
command.addHelpCommand(true).addCommand(
  new Command('new')
    .addOption(command.createOption('-n, --name', 'Project name'))
    .addOption(command.createOption('-t, --template', 'Project template to inherit from'))
    .action(() => {
      prompt([
        {
          name: 'name',
          errorMessage: 'What is project name?',
          transformer: (input: string) =>
            Array.from(input)
              .map((char, idx) => (char.match(/[A-Z]/) ? (idx !== 0 ? `-${char}` : char).toLowerCase() : char))
              .reduce((acc, char) => (acc + char).replace(' ', '-').replace(':', '-').replace('--', '-'), ''),
          validate: (input: string) => input.length >= 3 || 'Pick up more informative name',
        },
        {
          name: 'type',
          errorMessage: 'Specify type of the project:',
          type: 'list',
          loop: true,
          choices: [{ name: 'frontend' }, { name: 'backend' }, { name: 'full-stack' }],
        },
        {
          name: 'template',
          errorMessage: 'Which project template you are going to use?',
          type: 'list',
          loop: true,
          choices: (answers: { name: string; type: string }) =>
            [
              { name: 'full-stack/react-strapi' },
              { name: 'full-stack/react-nextjs' },
              { name: 'frontend/html' },
              { name: 'frontend/react-ssr' },
              { name: 'frontend/react-antd' },
            ].filter(it => it.name.startsWith(answers.type)),
        },
      ]).then(console.log)
    })
)

export { command }
