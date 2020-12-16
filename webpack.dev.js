const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports= merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  devServer: {
    // should be the same as output path
    contentBase: path.resolve(__dirname,  './dist'),
    index: 'index.html',
    port: 9000,
    inline: true,
    hot: true,
    writeToDisk: true
  },
  output: {
    // with contenthash webpack only generates new files is it has changes - and only for that file
    // if just js changed then dont create new css file on build
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname,  './dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './src'),
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
      // handle css & sass & scss
      {
        test: /\.s?[ac]ss$/,
        use: [
          // 4. injects css returned by css-loader into style tags
          'style-loader',
          // 3. reads the content of the css files and returns it
          'css-loader?sourceMap=true',
          // add missing vendor prefixes and etc
          'postcss-loader',
          // 1. convert scss to css
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [
    new StylelintPlugin({
      files: path.join('src', '**/*.s?(a|c)ss'),
    }),
  ]
});