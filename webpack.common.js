const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    index: path.join(__dirname, 'app/js/index.js'),
    secondary: path.join(__dirname, 'app/js/secondary'),
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    rules: [
        { test: /\.pug$/, loader: "pug-loader" },
        { test: /\.json$/, loader: "json-loader" },
        {
          test: /\.(jpg|jpeg|png|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[hash:8].[ext]',
          },
        },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/views/index.pug'),
      filename: 'index.html',
      inject: 'body',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/views/secondary.pug'),
      filename: 'secondary/index.html',
      inject: 'body',
      chunks: ['secondary']
    }),
  ],
};
