/* eslint-disable @typescript-eslint/no-var-requires */
const prodConfig = require('./webpack.prod');
const { merge } = require('webpack-merge');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = merge(prodConfig, {
  plugins: [new BundleAnalyzerPlugin()],
});

module.exports = config;
