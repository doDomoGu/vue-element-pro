const path = require('path');

module.exports = ({ config, mode }) => {
  
  config.module.rules.push({
    test: /\.vue$/,
    use: ['vue-loader']
  })

  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  })

  config.resolve.alias['@'] = path.resolve('src')
  config.resolve.alias['vue$'] = '/Volumes/html/www/vue-element-pro/node_modules/vue/dist/vue.js'
  console.log(config.resolve)
  console.log(config.module.rules)

  // if (mode === 'PRODUCTION') {
  //   // ...
  // }

  // resolve:{
  //   //配置别名，在项目中可缩减引用路径
  //   alias: {
  //     vue$: 'vue/dist/vue.esm.js',
  //     '@': resolve('src'),
  //     '&': resolve('src/components'),
  //     'api': resolve('src/api'),
  //     'assets': resolve('src/assets')
  //   }
  // },

  // config.module.rules.push({
  //   test: /\.css$/,
  //   use: ['style-loader', 'css-loader'],
  // });

  //  config.module.rules.push({
  //   resourceQuery: /blockType=docs/,
  //   use: ['storybook-readme/docs-loader', 'html-loader', 'markdown-loader'],
  // });

  return config;
};