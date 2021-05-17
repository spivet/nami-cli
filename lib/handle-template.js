const fs = require('fs')
const https = require('https')
const path = require('path')
const compressing = require('compressing')
const download = require('./utils/download')

const FILE_NAME = 'template.zip'

function getAllTemplateName () {
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
  const dest = path.join(targetDir, FILE_NAME)

  await download(url, dest)
}

async function unzipTemplate (targetDir) {
  const source = path.join(targetDir, FILE_NAME)
  await compressing.zip.uncompress(source, targetDir)
}

function removeTemplateZip (targetDir) {
  const source = path.join(targetDir, FILE_NAME)
  fs.unlinkSync(source)
}

module.exports = {
  getAllTemplateName,
  downloadTemplate,
  unzipTemplate,
  removeTemplateZip
}
