#!/usr/bin/env node

const cac = require('cac')
const chalk = require('chalk')
const packageJson = require('./package.json')
const { createApp } = require('./lib/create-app')
const cli = cac('thales')

cli
  .command('create <projectName>')
  .action((projectName) => {
    createApp(projectName)
  })

cli.help()
cli.version(packageJson.version)

try {
  cli.parse()
} catch (err) {
  console.error(chalk.red('Error: ', err.message))
}
