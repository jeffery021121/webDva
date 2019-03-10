### webDva迁移指南
# webdva 完美兼容roadhog+dva
1.将自己项目中的src文件夹和webdva框架的文件夹做替换
2.将自己项目中的依赖添加到package.json，开发依赖一般是不用添加了，生产依赖对照着添加，babel类的应该是不用加的
3.babel7之前的babel一律不要添加
4.如果要开启热启动功能 
5.添加window.React=React
