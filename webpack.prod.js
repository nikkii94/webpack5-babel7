const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path');
const Webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ECMAVersionValidatorPlugin } = require("ecma-version-validator-webpack-plugin");
const { CheckEsVersionPlugin } = require("@bitjourney/check-es-version-webpack-plugin");

module.exports= merge(common, {
  mode: 'production',
  devtool: false,
  stats: 'errors-only',
  bail: true,
  output: {
    // with contenthash webpack only generates new files is it has changes - and only for that file
    // if just js changed then dont create new css file on build
    filename: "[name].bundle.js",
    path: path.resolve(__dirname,  './dist')
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: "all"
  //   }
  // },
  module: {
    rules: [
      // handle css & sass & scss
      {
        test: /\.s?[ac]ss$/,
        use: [
          // 4. injects link tags with css files generated by MiniCssExtractPlugin
          MiniCssExtractPlugin.loader,
          // 4. injects css returned by css-loader into style tags
          // 'style-loader',
          // 3. reads the content of the css files and returns it
          'css-loader',
          // 2. vendor prefixes, etc..
          'postcss-loader',
          // 1. convert scss to css
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // move css into separate files
    // this makes the js bundle much smaller -> faster
    // allows to load files in parallel
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css'
    }),
    new CheckEsVersionPlugin({
      esVersion: 5,
    }),
    new ECMAVersionValidatorPlugin({
      ecmaVersion: 5
    })
  ]
});