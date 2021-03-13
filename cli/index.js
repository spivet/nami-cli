const cac = require('cac')
const chalk = require('chalk')
const packageJson = require('../package.json')
const { createApp } = require('./create-app')
const cli = cac('dant')

cli
  .command('create <projectName>')
  .action((projectName) => {
    try {
      createApp(projectName)
    } catch (err) {
      console.error(err.message)
    }
  })

cli.help()
cli.version(packageJson.version)

try {
  cli.parse()
} catch (err) {
  console.error(chalk.red('Error: ', err.message))
}
