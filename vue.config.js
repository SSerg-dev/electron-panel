const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

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
  /* dev */
  configureWebpack: config => {

    // get a reference to the existing ForkTsCheckerWebpackPlugin
    const existingForkTsChecker = config.plugins.filter(
      p => p instanceof ForkTsCheckerWebpackPlugin,
    )[0];

    // remove the existing ForkTsCheckerWebpackPlugin
    // so that we can replace it with our modified version
    config.plugins = config.plugins.filter(
      p => !(p instanceof ForkTsCheckerWebpackPlugin),
    );

    // copy the options from the original ForkTsCheckerWebpackPlugin
    // instance and add the memoryLimit property
    const forkTsCheckerOptions = existingForkTsChecker.options;
    forkTsCheckerOptions.memoryLimit = 8192;

    config.plugins.push(new ForkTsCheckerWebpackPlugin(forkTsCheckerOptions));
  },
  /*     */
};
