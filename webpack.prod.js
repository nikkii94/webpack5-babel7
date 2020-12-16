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
  // optimization: {
  //   splitChunks: {
  //     chunks: "all"
  //   }
  // },
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