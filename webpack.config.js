const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "index.html",
  inject: "body"
});
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/index.js', './src/_styles/main.scss'],
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: [/src\/pages/, /src\/sharedComponents/],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: "babel-loader" },
          { loader: "eslint-loader" }
        ]
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          { loader: "babel-loader" },
          { loader: "eslint-loader" }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /src\/_styles/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  plugins: [
    htmlPlugin,
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true
        }
      }
    }),
    new ExtractTextPlugin("styles.css")
  ]
};