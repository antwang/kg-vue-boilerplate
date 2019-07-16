var path = require("path");
var webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const { dllEntry } = require("../app.config");
let entry = Object.assign(
  {
    vue: ["vue"]
  },
  dllEntry
);
module.exports = {
  mode: "production",
  entry,
  output: {
    filename: "[name].dll.js",
    path: path.resolve(__dirname, "../dll"),
    library: "[name]_[hash:8]"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: path.resolve(__dirname, "../dll", "[name].manifest.json"),
      name: "[name]_[hash:8]"
    })
  ]
};
