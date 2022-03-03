/* eslint-disable @typescript-eslint/no-var-requires */
const commonConfig = require('./webpack.common');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

const config = merge(commonConfig, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
});

module.exports = config;
