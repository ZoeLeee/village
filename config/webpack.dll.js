const webpack = require("webpack");
const CleanWebpackPlugin  = require("clean-webpack-plugin");
const path = require('path');

const dllName = "dll";
const vendors = [
  "react",
  "react-dom",
  "three",
];

module.exports = {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[hash].dll.js",
    library: dllName,
  },
  entry: { "lib": vendors, },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, `../dist/manifest.json`),
      name: dllName,
      context: __dirname,
    }),
    new CleanWebpackPlugin([`./dist/dll.*.js`,`./dist/*.json`], { root: path.resolve(__dirname, "../") })
  ],
};
