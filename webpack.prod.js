/* global __dirname */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
var CompressionPlugin = require('compression-webpack-plugin');

// const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // TODO: Replace UglifyJS with BabelMinifyWebpackPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
// Enable to see bundle analysis (Part 1):
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;

const CopyWebpackPlugin = require('copy-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development', // TODO: Fix this - 'production' mode is not outputting *some* styles.
  // devtool: 'source-map', // TODO: devtool: 'source-map' fails when using UglifyJS Webpack Plugin with sourceMap: true.
  entry: {
    app: ['babel-polyfill', './src/views/App/indexNoHot.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'built'),
    filename: '[name].js',
    publicPath: '/',
  },
  // Explanation of optimization options: https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a
  optimization: {
    minimize: true, // Must disable minimization in production mode or UglifyJsPlugin runs and errors on Staging.
    namedModules: true,
    splitChunks: { chunks: 'all' },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      title: 'Caching',
      template: './src/index.html',
    }),
    new CopyWebpackPlugin([
      { from: './src/vendor/ckeditor', to: './vendor/ckeditor' },
      {
        from: './src/vendor/font-awesome-4.7.0',
        to: './vendor/font-awesome',
      },
    ]),
    // TODO: Enable in Production
    // Todo: Add mini-css-extract-plugin (replaces extract-text-plugin)
    // new UglifyJSPlugin({ sourceMap: true }),
    // TODO: Enable BundleAnalyzerPlugin only with a flag ANALYZER=true
    // Enable to see bundle analysis (Part 2):
    // new BundleAnalyzerPlugin(),
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: './src/sw.js',
      swDest: 'service-worker2.js'
    }),
    new CompressionPlugin(),
  ],
});
