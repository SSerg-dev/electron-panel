const path = require('path');

module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 8080,
  },
  configureWebpack: {
    devtool: "source-map",
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', path.join(__dirname, './src/renderer'));
  },
  pages: {
    index: {
      entry: "./src/renderer/main.js",
    },
  },
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: "./src/main/background.ts",
      nodeIntegration: true,
      externals: [
        'serialport'
      ] 
    },
  },
};
