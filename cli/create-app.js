const fs = require('fs')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')
const { prompt } = require('enquirer')
const { copy } = require('../utils/copy')
const { findAllDir } = require('../utils/other')

// 当前工作目录
const cwd = process.cwd()

// 获取所有模板
const targetDir = path.join(cwd, './template')
const TEMPLATES = findAllDir(targetDir)

async function createApp (projectName) {
  // 如果 projectName 是”.“，则在当前文件夹下创建项目
  const targetDir = path.join(cwd, projectName)

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  } else {
    const existing = fs.readdirSync(targetDir)
    if (existing.length) {
      try {
        const { yes } = await prompt({
          type: 'confirm',
          name: 'yes',
          initial: 'Y',
          message: chalk.yellow(`是否清空目标文件夹 ${projectName}?`)
        })
        if (yes) {
          emptyDir(targetDir)
        } else {
          return
        }
      } catch (err) {
        return
      }
    }
  }

  const { template } = await prompt({
    type: 'select',
    name: 'template',
    message: '请选择模板',
    choices: TEMPLATES
  })

  const templateDir = path.join(__dirname, `../template/${template}`)
  const spinner = ora(chalk.cyan('创建模板中......')).start()
  copy(templateDir, targetDir)
  spinner.succeed(chalk.green('模板创建成功！')).stop()
}

function emptyDir (dir) {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    const abs = path.resolve(dir, file)
    if (fs.lstatSync(abs).isDirectory()) {
      emptyDir(abs)
      fs.rmdirSync(abs)
    } else {
      fs.unlinkSync(abs)
    }
  }
}

module.exports = {
  createApp
}
