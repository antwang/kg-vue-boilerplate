module.exports =  {
  // 配置dll入口例如{vue: ['vue', 'vue-router']} 值必须是数组
  dllEntry:{}
  // 静态资源的路径
  publicPath: "",
  // 资源输出目录，默认为dist
  outputDir: "dist",
  // 是否启用页面调试工具
  enableDebugTool: true,
  // 配置代理
  proxy: {},
  // 是否默认打开浏览器
  autoOpenBrowser: true,
  // devserver 默认端口号
  devServerport: 3000,
  mockServerPort: 8000,
  // ftp登录
  ftpAccount: {
    host: "",
    port: "",
    user: "",
    password: ""
  },
  deployDir: '',
  // 现代模式下指定浏览器的范围
  browserslist: {
    legacy: ["> 1%", "last 2 versions", "Firefox ESR"],
    modern: [
      "last 2 Chrome versions",
      "not Chrome < 60",
      "last 2 Safari versions",
      "not Safari < 10.1",
      "last 2 iOS versions",
      "not iOS < 10.3",
      "last 2 Firefox versions",
      "not Firefox < 54",
      "last 2 Edge versions",
      "not Edge < 15"
    ]
  }
};
