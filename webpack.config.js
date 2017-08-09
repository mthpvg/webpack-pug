const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = {
  entry: {
    app: PATHS.app,
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack demo',
    }),
  ],
};

const productionConfig = {};

const developmentConfig = {
  devServer: {
    // Enable history API fallback so HTML5 History API based
    // routing works. Good for complex setups.
    historyApiFallback: true,
    // Display only errors to reduce the amount of output.
    stats: 'errors-only',
    host: '0.0.0.0',
    port: '8080',
  }
};

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  } else {
    return merge(commonConfig, developmentConfig);
  }
};
