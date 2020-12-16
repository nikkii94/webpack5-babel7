// default webpack config file
// const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// prod módban ez automatikusan be van kapcsolva
// const TerserPlugin = require('terser-webpack-plugin');
// dev módban style-loader elég ez helyett
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  // entrypoint file
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      // handle js files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      // handle images
      {
        test: /\.(png|jpe?g)$/,
        use: [
          'file-loader'
        ]
      },
    ]
  },
  plugins: [
    // creates an index.html and automatically inserts bundled assets
    new HtmlWebpackPlugin({
      // generated file name in dist folder
      filename: 'index.html',
    }),
    
    // clear dist folder before build
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        // kitöröl mindent az output mappából a build előtt
        '**/*'
      ]
    })
  ]
};

module.exports = config;