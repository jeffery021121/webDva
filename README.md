#### 编辑器依赖（vscode）

代码美化和检测需要以下 vscode 插件支持

- ESLint js,jsx 代码 lint
- stylelint 样式文件(css,scss,less 等)代码 lint,其中 scss 支持自动 fix
- TSLint ts,tsx 代码 lint
- Prettier 各种代码美化(已经配置工作区代码，一键美化: alt+shift+f )

#### 项目启动步骤

1. npm install(安装依赖)
2. npm run dll (生成 manifest 文件，开发时可以加快打包速度)
3. npm start (如果使用 npm start,默认不启用 dllplugin,可以不执行第二步骤，而且方便联调线上数据)
4. npm run devMac 或者 devWindow (因为 mac 和 window 设置环境变量的写法不一样，所以写了两个 script 命令)，manifest 式启动，生产依赖越多，开发幸福感相对越强。
5. 新的页面开发采用 tsx,但是支持 js 写法，tsx 不了解可以看 webdva 项目，有示例。
6. npm run buildAnalyze 分析打包各种依赖以及大小

#### 项目提交

1. 全局安装 git 命令行提示工具 commitizen. npm install -g commitizen
2. git commit 规范按照 commitizen 来，一开始不熟练，可以直接将 git commit 替换为 git cz，按照提示选择和输入即可
