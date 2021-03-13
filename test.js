const path = require('path')
const fs = require('fs')
// const { copy } = require('./utils/copy')
const { findAllDir } = require('./utils/other')
const cwd = process.cwd()

// const root = path.join(cwd, './t')
// fs.mkdirSync(root)
// const stat = fs.lstatSync(root).isDirectory()
// fs.lstat(root, {}, (err, stats) => {
//     console.log(err, stats.isDirectory())
// })
// console.log(stat)

// fs.rmdirSync(root, {
//   recursive: true
// })
const targetDir = path.join(cwd, './template')
// const templateDir = path.join(__dirname, 'template-vue-element-admin')
// // copy(templateDir, targetDir)
// console.log(templateDir, targetDir)

// const src = path.join(__dirname, './template-vue-element-admin')
// copy(src, root)
console.log(findAllDir(targetDir))
