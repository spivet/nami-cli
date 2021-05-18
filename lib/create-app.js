const fs = require('fs')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')
const { prompt } = require('enquirer')
const copy = require('./utils/copy')
const createProjectFolder = require('./handle-folder')
const { getAllTemplateName, downloadTemplate, unzipTemplate, removeTemplateZip } = require('./handle-template')
const { completeHint } = require('./hint')

async function createApp (projectName) {
  // 如果 projectName 是”.“，则在当前文件夹下创建项目
  const cwd = process.cwd()
  const targetDir = path.join(cwd, projectName)

  try {
    const TEMPLATES = await getAllTemplateName()

    await createProjectFolder(targetDir, projectName)

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

    completeHint(projectName)
  } catch (err) {

  }
}

module.exports = {
  createApp
}
