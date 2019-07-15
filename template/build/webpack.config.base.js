const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 样式检查插件
const StyleLintPlugin = require("stylelint-webpack-plugin");
// 雪碧图插件
const SpritesmithPlugin = require("webpack-spritesmith");
// 调试工具插件
const DebugPlugin = require("debugtool-webpack-plugin");
// 自动将资源插入html插件
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const { templateFunction, configureURLLoader, configureCSSLoader } = require("./util");
// 性能优化插件
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const webpack = require("webpack");
// 用户指定的配置
const config = require("../app.config");
const parseArgs = require("minimist");
const { env } = parseArgs(process.argv.slice(2));
const baseConf = {
  context: path.resolve(__dirname, "../"),
  entry: { app: "./src/app.js" },
  output: {
    filename: "js/[name].js",
    path: config.outputDir || "dist",
    publicPath: config.publicPath || ''
  },
  resolve: {
    modules: ["./node_modules", "./src/assets/generated"]
  },
  module: {
    rules: [
      {{#eslint}}
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        enforce: "pre",
        options: {
          formatter: require("eslint-friendly-formatter")
        }
      },
      {{/eslint}}
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: "vue-loader"
      },
      // 添加url-loader
      configureURLLoader(env),
      configureCSSLoader(env)
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HardSourceWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new webpack.DllReferencePlugin({
      manifest: require("./dll/vue.manifest.json")
    }),
    // 将dll文件添加到html中，必须放在htmlwebpackPlugin后面
    new AddAssetHtmlPlugin({
      filepath: "./dll/*.dll.js",
      outputPath: "js",
      publicPath: "js"
    }),
    // 是否启用调试工具
    new DebugPlugin({ enable: config.enableDebugTool }),
    // 是否启用stylelint
    new StyleLintPlugin({
      files: ["src/**/*.{vue, css, sass, scss}", "!src/assets/generated/"]
    }),
    // 是否启用雪碧图
    new SpritesmithPlugin({
      src: {
        cwd: "./src/assets/sprites",
        glob: "*.png"
      },
      customTemplates: {
        function_based_template: templateFunction
      },
      target: {
        image: "./src/assets/generated/sprite.png",
        css: [
          [
            "./src/assets/generated/sprite2.scss",
            {
              format: "function_based_template"
            }
          ],
          "./src/assets/generated/sprite.scss"
        ]
      },
      apiOptions: {
        cssImageRef: "~sprite.png"
      }
    })
  ]
};
module.exports = baseConf;
