const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    index: path.join(__dirname, 'app/pages/index/js/index.js'),
    vendor: ['react', 'react-dom']
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
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[hash:8].[ext]',
        },
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/pages/index/view/index.html'),
      filename: 'index.html',
      inject: 'body',
      chunks: ['index', 'vendor']
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        }
      }
    }
  }
}
