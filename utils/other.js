const fs = require('fs')
const path = require('path')

/**
 * 获取指定目录下的所有文件夹名称
 * @param {String} targetDir 目标文件夹
 * @returns 所有文件夹名
 */
function findAllDir (targetDir) {
  const contentList = fs.readdirSync(targetDir)
  return contentList.filter(name => {
    const src = `${targetDir}/${name}`
    return fs.statSync(src).isDirectory()
  })
}

/**
 * 清空指定文件夹
 * @param {string} targetDir 目标文件夹
 */
function emptyDir (targetDir) {
  if (!fs.existsSync(targetDir)) return

  const files = fs.readdirSync(targetDir)
  files.forEach(file => {
    const src = path.resolve(targetDir, file)
    if (fs.lstatSync(src).isDirectory()) {
      emptyDir(src)
      fs.rmdirSync(src)
    } else {
      fs.unlinkSync(src)
    }
  })
}

module.exports = {
  findAllDir,
  emptyDir
}
