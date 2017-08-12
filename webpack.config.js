const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const OpenPackPlugin = require('openpack');

const parts = require('./webpack.parts');

const developmentConfig = require('./webpack.dev')
const commonConfig = require('./webpack.common')


const productionConfig = merge([
  parts.extractCSS({
    use: 'css-loader'
  }),
  parts.generateSourceMaps({
    type: 'source-map'
  }),
  parts.extractBundles([{
    name: 'vendor',
  }, ]),
  parts.clean(path.join(__dirname, 'build')),
  parts.minifyJavaScript(),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
      },
      safe: true,
    },
  }),
  {
    output: {
      chunkFilename: '[name].[chunkhash:8].js',
      filename: '[name].[chunkhash:8].js',
    },
  },
]);



module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  } else {
    return merge(commonConfig, developmentConfig);
  }
};
