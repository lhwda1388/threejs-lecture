/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // head에 스타일 태그를 넣는대신 따로 css파일 생성
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html 설정
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  entry: {
    main: path.join(__dirname, './src/index.ts'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?(css|)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name].[ext]?[hash]', // rebundle시 기존의 hash 된 파일을 사용해서 불필요한 복사를 막음.
              limit: 10000, // 10kb 미만인경우 url-loader처리(base64파일)
            },
          },
        ],
      },
      {
        test: /\.(ts|js)x?$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'), // 템플릿 경로
      inject: true, // 번들링 파일 자동으로 붙일지 여부
      filename: path.resolve(__dirname, './dist/index.html'), // 빌드 이후 파일
    }),
    new WebpackManifestPlugin({
      fileName: 'assets.json',
      basePath: '/',
    }),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: './src/main.css', to: './main.css' },
    //     { from: './src/images', to: './images' },
    //     { from: './src/models', to: './models' },
    //     { from: './src/sounds', to: './sounds' },
    //   ],
    // }),
  ],
};

module.exports = config;
