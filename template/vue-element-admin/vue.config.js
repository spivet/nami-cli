const path = require('path');

const name = 'vue Admin Template';

module.exports = {
  configureWebpack: {
    // name 值会注入到 index.html 的 title 中，作为页面的默认 title
    name,
    resolve: {
      alias: {
        '@/': path.join(__dirname, 'src/'),
      },
    },
  },
};
