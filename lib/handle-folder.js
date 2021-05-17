const fs = require('fs')
const chalk = require('chalk')
const { prompt } = require('enquirer')
const { emptyDir } = require('./utils/util')

async function createProjectFolder (targetDir, projectName) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
    return
  }

  const existing = fs.readdirSync(targetDir)
  if (existing.length) {
    const { yes } = await prompt({
      type: 'confirm',
      name: 'yes',
      initial: 'Y',
      message: chalk.yellow(`是否清空目标文件夹 ${projectName}?`)
    })
    if (yes) {
      emptyDir(targetDir)
    }
  }
}

module.exports = createProjectFolder
