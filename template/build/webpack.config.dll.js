var path = require("path");
var webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = {
  mode: "production",
  entry: {
    vue: ["vue"]
  },
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
