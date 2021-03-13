const fs = require('fs')

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

module.exports = {
  findAllDir
}
