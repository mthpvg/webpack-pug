const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
// TODO bring back js minimification: https://github.com/webpack-contrib/babel-minify-webpack-plugin/issues/68
// const BabiliPlugin = require('babili-webpack-plugin');
const OptimizeCSSAssetsPlugin =
  require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');


module.exports = {
  mode: 'production',
  devtool: 'cheap-module-eval-source-map',
  output: {
    chunkFilename: '[name].[chunkhash:8].js',
    filename: '[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css"
    }),
    new CleanWebpackPlugin([path.join(__dirname, 'build')]),
    // Minify Javascript
    // new BabiliPlugin(),
    // Minify CSS
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
        safe: true,
      },
      canPrint: false,
    }),
  ],
}
