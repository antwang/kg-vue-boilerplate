var path = require("path");
var webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = {
  mode: "production",
  context: path.resolve(__dirname, "../"),
  entry: {
    vue: ["vue"]
  },
  output: {
    filename: "[name].dll.js",
    path: "dll",
    library: "[name]_[hash:8]"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: "dll/[name].manifest.json",
      name: "[name]_[hash:8]"
    })
  ]
};
