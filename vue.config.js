const path = require('path')

module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8080
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', path.join(__dirname, './src/renderer')),
    config.plugins.delete('pwa')
  },
  pages: {
    index: {
      entry: './src/renderer/main.js'
    }
  },
  publicPath: process.env.NODE_ENV  ===  'production'  ?  './'  :  '/',

  pluginOptions: {
    electronBuilder: {
      mainProcessFile: './src/main/background.js',
      chainWebpackRendererProcess(config) {
        config.plugins.delete('workbox')
        config.plugins.delete('pwa')
      },
      nodeIntegration: true,
      externals: [
        'serialport',
        'node-opcua'
      ]
    }
},
}
