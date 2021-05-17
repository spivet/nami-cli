const fs = require('fs')
const path = require('path')
const https = require('https')
const ora = require('ora')
const chalk = require('chalk')
const { prompt } = require('enquirer')
const compressing = require('compressing')
const { copy } = require('../utils/copy')
const download = require('../utils/download')
const { emptyDir } = require('../utils/other')

function findAllTemplates () {
  const url = 'https://git.ops.yunlizhi.cn/frontend-base/thales-template/refs?sort=updated_desc&ref=vue-element-admin&search='
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res.statusCode !== 200) {
        const err = new Error('获取模板失败')
        res.resume()
        reject(err)
      }

      res.setEncoding('utf8')
      let rawData = ''
      res.on('data', (chunk) => { rawData += chunk })
      res.on('end', () => {
        const parsedData = JSON.parse(rawData)
        const branchs = parsedData.Branches
        const templates = branchs.filter(branch => branch !== 'master')
        resolve(templates)
      })
    })

    req.on('error', (err) => {
      reject(err.message)
    })
  })
}

async function downloadTemplate (template, targetDir) {
  // 当前工作目录
  const url = `https://git.ops.yunlizhi.cn/frontend-base/thales-template/-/archive/${template}/thales-template-${template}.zip`
  const dest = path.join(targetDir, 'template.zip')

  await download(url, dest)
}

function unzipTemplate (targetDir) {
  const source = path.join(targetDir, 'template.zip')
  return compressing.zip.uncompress(source, targetDir)
}

function removeTemplateZip (targetDir) {
  const source = path.join(targetDir, 'template.zip')
  fs.unlinkSync(source)
}

async function createApp (projectName) {
  // 如果 projectName 是”.“，则在当前文件夹下创建项目
  const cwd = process.cwd()
  const targetDir = path.join(cwd, projectName)

  const TEMPLATES = await findAllTemplates()

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
