/* global __dirname */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './src/views/App/indexNoHot.jsx',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'built'),
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    inline: true,
    contentBase: 'built',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({
      title: 'Html Output',
      template: './src/index.html',
    }),
    new CopyWebpackPlugin([
      { from: './src/vendor/ckeditor', to: './vendor/ckeditor' },
      {
        from: './src/vendor/font-awesome-4.7.0',
        to: './vendor/font-awesome',
      },
    ]),
    new WriteFilePlugin(), // needed so CopyWebpackPlugin files are written to built/
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['vendor.js']
    })
  ],
});
