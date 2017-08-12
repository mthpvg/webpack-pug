const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const OpenPackPlugin = require('openpack');

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'app/js'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = merge([{
  entry: {
    app: PATHS.app,
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  module: {
    rules: [
        { test: /\.pug$/, loader: "pug-loader" },
        { test: /\.json$/, loader: "json-loader" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/views/index.pug'),
      inject: 'body'
    }),
  ],
}]);

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
  parts.clean(PATHS.build),
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

const developmentConfig = merge([
  parts.devServer({
    host: '0.0.0.0',
    port: '8080',
  }),
  parts.loadCSS(),
  {
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    },
  },
  parts.generateSourceMaps({
    type: 'cheap-module-eval-source-map'
  }),
]);

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  } else {
    return merge(commonConfig, developmentConfig);
  }
};
