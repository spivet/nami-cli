const https = require('https')
const fs = require('fs')

function download (url, dest) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      const { statusCode } = res
      if (statusCode !== 200) {
        const err = new Error(`文件下载失败(${statusCode})`)
        res.resume()
        reject(err)
      }

      const file = fs.createWriteStream(dest)
      res.pipe(file)
      file.on('finish', () => {
        file.close(resolve)
      }).on('error', (err) => {
        fs.unlink(dest)
        reject(err.message)
      })
    })

    req.on('error', (err) => {
      reject(err.message)
    })
  })
}

module.exports = download
