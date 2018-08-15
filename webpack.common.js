const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = buildPages();


module.exports = {
  entry: {
    index: path.join(__dirname, 'app/pages/index/js/index.js'),
    secondary: path.join(__dirname, 'app/pages/secondary/js/index.js'),
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
        { test: /\.pug$/, loader: "pug-loader" },
        // { test: /\.json$/, loader: "json-loader" },
        {
          test: /\.(jpg|jpeg|png|svg)$/,
          loader: 'url-loader',
          options: {
            name: '[name].[hash:8].[ext]',
          },
        },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/pages/index/view/index.pug'),
      filename: 'index.html',
      inject: 'body',
      chunks: ['index']
    }),
  ].concat(pages),
};

function buildPages() {
  const config = require('./app/pages/config.json');
  return config.map(function (page) {
    return new HtmlWebpackPlugin({
      template: path.join(
        __dirname, 'app/pages/' + page.name+ '/view/index.pug'
      ),
      filename: page.url + '/index.html',
      inject: 'body',
      chunks: [page.name]
    })
  });
};
