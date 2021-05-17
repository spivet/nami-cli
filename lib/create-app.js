const fs = require('fs')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')
const { prompt } = require('enquirer')
const copy = require('./utils/copy')
// const { emptyDir } = require('./utils/util')
const createProjectFolder = require('./handle-folder')
const { getAllTemplateName, downloadTemplate, unzipTemplate, removeTemplateZip } = require('./handle-template')

async function createApp (projectName) {
  // 如果 projectName 是”.“，则在当前文件夹下创建项目
  const cwd = process.cwd()
  const targetDir = path.join(cwd, projectName)

  const TEMPLATES = await getAllTemplateName()

  await createProjectFolder(targetDir, projectName)
  // if (!fs.existsSync(targetDir)) {
  //   fs.mkdirSync(targetDir, { recursive: true })
  // } else {
  //   const existing = fs.readdirSync(targetDir)
  //   if (existing.length) {
  //     try {
  //       const { yes } = await prompt({
  //         type: 'confirm',
  //         name: 'yes',
  //         initial: 'Y',
  //         message: chalk.yellow(`是否清空目标文件夹 ${projectName}?`)
  //       })
  //       if (yes) {
  //         emptyDir(targetDir)
  //       } else {
  //         return
  //       }
  //     } catch (err) {
  //       return
  //     }
  //   }
  // }

  const { template } = await prompt({
    type: 'select',
    name: 'template',
    message: '请选择模板',
    choices: TEMPLATES
  })

  const spinner = ora(chalk.cyan('开始下载模板......')).start()
  await downloadTemplate(template, targetDir)
  spinner.succeed(chalk.green('模板下载成功！')).stop()

  spinner.text = chalk.cyan('开始解压模板......')
  await unzipTemplate(targetDir)
  removeTemplateZip(targetDir)

  const unzipedSource = path.join(targetDir, `thales-template-${template}`)
  copy(unzipedSource, targetDir)
  fs.rmSync(unzipedSource, { recursive: true })
  spinner.succeed(chalk.green('模板创建成功！')).stop()
}

module.exports = {
  createApp
}
