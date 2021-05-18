const chalk = require('chalk')

function completeHint (projectName) {
  console.log(`👉  Get started with the following commands:
    cd ${projectName}
    yarn ${chalk.gray('or')} npm i
    yarn dev ${chalk.gray('or')} npm dev`)
}

module.exports = {
  completeHint
}
