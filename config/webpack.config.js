const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "../src/index.js"),
  module: {
    rules: [
      {
        test: /.js$/,
        include: path.resolve(__dirname, '../src'),
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              // modules: false, //是否开启模块化
              importLoaders: 1,
              // localIdentName: '[name]_[local]_[hash:base64]', 
              sourceMap: true,
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          { loader: 'css-loader', options: { sourceMap: false } },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
                trictMath: true,
              }
            }
          }
        ]
      },
      {
        test: /\.[(png)|((jpg))|(obj)|(json)]$/,
        loader: "file-loader"
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src/index.html"),
      filename: "./index.html"
    }),
    new CleanWebpackPlugin(["dist"]),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(`../dist/manifest.json`)
    }),
    new AddAssetHtmlPlugin(
      [
        {
          filepath: "./dist/*.dll.js",
        },
      ]
    ),
  ],
  output: {
    filename: "[hash].bundle.js",
    path: path.resolve(__dirname, "../dist"),
  },
  devServer: {
    port: 4000,
  }
}