const { installDependencies, runLintFix, printMessage } = require("./utils");
module.exports = {
  helpers: {
    if_or(v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
  },
  // 用户输入的信息
  prompts: {
    name: {
      type: "string",
      required: true,
      message: "Project name"
    },
    description: {
      when: "isNotTest",
      type: "string",
      required: false,
      message: "Project description",
      default: "A Vue.js project"
    },
    author: {
      when: "isNotTest",
      type: "string",
      message: "Author"
    },
    router: {
      when: "isNotTest",
      type: "confirm",
      message: "Install vue-router?"
    },
    lint: {
      when: "isNotTest",
      type: "confirm",
      message: "Use ESLint to lint your code?"
    },
    unit: {
      when: "isNotTest",
      type: "confirm",
      message: "Set up unit tests"
    },
    e2e: {
      when: "isNotTest",
      type: "confirm",
      message: "Setup e2e tests with Nightwatch?"
    },
    autoInstall: {
      when: "isNotTest",
      type: "list",
      message: "项目创建完成后是否自动运行 `npm install` 安装依赖? (推荐)",
      choices: [
        {
          name: "Yes, use NPM",
          value: "npm",
          short: "npm"
        },
        {
          name: "Yes, use Yarn",
          value: "yarn",
          short: "yarn"
        },
        {
          name: "No, I will handle that myself",
          value: false,
          short: "no"
        }
      ]
    }
  },
  // 定义文件与功能选项之间的映射关系，如果用户没有选择对应的功能，则某些文件将不会渲染。
  filters: {
    ".eslintrc.js": "eslint",
    "eslint-config-kuaigou.js": "eslint",
    ".stylelintrc.js": "stylelint",
    "stylelint-config-kuaigou.js": "stylelint",
    "build/webpack.config.test.js": "unit",
    "test/unit/**/*": "unit",
    "test/e2e/**/*": "e2e",
    "src/router/**/*": "router"
  },
  complete: function(data, { chalk }) {
    const green = chalk.green;
    const cwd = path.join(process.cwd(), data.inPlace ? "" : data.destDirName);

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green);
        })
        .then(() => {
          printMessage(data, green);
        })
        .catch(e => {
          console.log(chalk.red("Error:"), e);
        });
    } else {
      printMessage(data, chalk);
    }
  }
};
