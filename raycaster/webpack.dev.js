/* eslint-disable @typescript-eslint/no-var-requires */
const commonConfig = require('./webpack.common');
const { merge } = require('webpack-merge');

const config = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: 3000,
    hot: true,
  },
});

module.exports = config;
