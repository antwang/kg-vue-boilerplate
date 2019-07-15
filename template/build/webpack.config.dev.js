const merge = require("webpack-merge");
const baseConf = require("./webpack.config.base");
const { configureURLLoader, configureBabelLoader } = require("./util");
const config = require("../app.config");
let devServer = {
  proxy: config.proxy || {},
  contentBase: "dist",
  hot: true,
  clientLogLevel: "warning",
  compress: true,
  overlay: true,
  open: config.autoOpenBrowser || true,
  port: config.devServerport || 3000
};
module.exports = merge(baseConf, {
  mode: "development",
  devServer,
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      configureBabelLoader(),
      ...configureURLLoader()
    ]
  }
});