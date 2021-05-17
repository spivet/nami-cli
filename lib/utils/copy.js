const fs = require('fs')
const path = require('path')

/**
 * 拷贝文件夹
 * @param {String} srcDir 源文件夹
 * @param {String} destDir 目标文件夹
 */
function copyDir (srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

function copyFile (src, dest) {
  fs.copyFileSync(src, dest)
}

function copy (src, dest) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    copyFile(src, dest)
  }
}

module.exports = copy
