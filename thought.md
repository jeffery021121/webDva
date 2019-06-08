使用 webpack4+dva2+react16+eslint+stylelint+scss+postcss+babel7 +(ts2.8+) + tslint(eslint 做的比较好) +【prettier】

# 看一下md语法。。。
react-fastclick
//解决 300 毫秒延时的库
大鱼目录结构：https://bigfish.alipay.com/doc/yizcml

拔到了一个配置，好像还是需要 runtime 啊。。。。。
hmr 和 dynamic 并没有冲突，只是需要把 app 传递进去，实时传递是最好的
一开始因为是在 utils 文件夹下引入的 app。导致和动态组件中的 app 时间上不同步了，所以出现了没有注册 model 的问题。

{
"presets": [
"@babel/preset-env",
"@babel/preset-react"
],
"plugins": [
"@babel/plugin-transform-runtime",
[
"@babel/plugin-proposal-decorators",
{
"legacy": true
}
],
"@babel/plugin-syntax-dynamic-import",
"@babel/plugin-proposal-class-properties",
["import",
{
"libraryName": "antd",
"libraryDirectory": "es",
"style": "css"
}
]
]
}

异步加载的数据，从体验上来说，还是先加载好 model 再加载组件是比较好的
将动态加载 model 放到动态加载组件前面去

react-loadable 如果不用 ssr 的话，自己写一个 loading 组件的话还是差不多的
没有看出来很大的区别

默认在 pages 中的 model 需要异步注册，即手动去异步调取组件的时候去注册

异步加载的确会和热更新产生冲突，这个时候本地禁掉懒加载或许才是最好的，当然，如果不大，无所谓啦。
解决方案：https://www.imooc.com/article/70831 babel-plugin-dynamic-import-node

貌似 dll 和热更新也是冲突的。。。。。
然鹅也是没有冲突的，现在的配置，修改代码应该是比较幸福的啦，hot 在 dll 以后，及时检查 styleLint 也会非常快

端口占用报错
events.js:167
throw er; // Unhandled 'error' event
^

Error: listen EADDRINUSE 127.0.0.1:8919
at Server.setupListenHandle [as \_listen2](net.js:1286:14)
at listenInCluster (net.js:1334:12)
at doListen (net.js:1460:7)
at process.\_tickCallback (internal/process/next_tick.js:63:19)
Emitted 'error' event at:
at emitErrorNT (net.js:1313:8)
at process.\_tickCallback (internal/process/next_tick.js:63:19)

在分组这里，我目前的思想是这样的，

第一梯队包（必须在任何业务逻辑之前加载，且任何业务逻辑都需要）：
框架去解决引入打包的问题，开发无感知。
react ,react-dom, dva(router,saga,redux)还有 runtime 或者 polyfill 这四个是基础包，一定需要先打包出来，打成一个包的，

第二梯队包（某些业务会需要，并不是所有业务或者说组件会用到）：

开发需要做一点工作，如果不打包的话，也是无感的。
这里的包需要一点思路，因为他们一般都是被各种业务来引入的，首先单独打包是必要的
有两种方式可以做，一种是动态引入，使用 import()语法，另外一种是通过 splitChunks 来进行配置
现在的问题是这些三方库如果动态引入的话，tree-shaking 还 o 不 ok
splitChunks 的话其实还是立即加载在头部了，只是通过并行加载的话，会提升一定的速度

愿景是三方库，在用到的时候才加载，并且 tree-shaking 成功，加载过后其他的业务再使用该组件时已经没有了问题。

在项目中需要使用到的方法，三方库，lodash，moment，antd 等

第三梯队包（业务拆分包）：
以各个路由为基础的各种组件包

第四梯队（目前趋势下业务分包，更加详细和符合逻辑）：
路由内部各种组件，其实也可以提取成懒加载包，或者说其实以路由为基础拆分是不如以组件逻辑来拆分更好，更明确。

三四梯队可以共存，也可以二选一，都是使用同样的方法，而且已经在 utils 文件夹下的 dynamic.js 文件中提供好了。

思考：我们自己写的 src 下的 components 文件夹到底算是什么样的加载，utils 等文件夹下的东西算是那种加载？
再次将这些为业务服务的文件提取问一个独立的包，似乎不太合适
放到入口文件中的话，其实业务组件更多的是依赖于这些 conmponents 下的组件来完成业务的。

### 还有一个疑问，如果以路由问区分的话，那么路由内部那些通过静态引入的包到底是被打到哪个里面了，入口文件还是懒加载文件。

答案：
通过 indexPage 和 test 的测试发现，如果 index 是异步引入的，那么它的静态依赖 test 会直接打包到 indexPage 生成的文件内部，它们则成为了一个文件

### 那么如果再有一个组件也需要这个 test 组件呢？把他当成通用 Components 来试一下,会把 test 组件打包到两个懒加载组件，还是打包到一个？

答案：的确被打包了两遍，被各自打进了不同的懒加载组件中,但是，那是以不使用 splitChunks 为前提的,
但是，使用 splitChunks 以后，配置缓存不论是 chunks 是 all 还是 async，配置允许复用，和最小公用次数为 2,那么这个被多个懒加载文件静态加载的文件也将被懒加载掉。并且不会出现重复。

### 分包策略到底怎样才是最好的？https://www.jianshu.com/p/23dcabf35744

看问题就知道了，没有最好，只有最合适。要更具我们使用的 http 的策略来看，浏览器并行加载几个资源才是最好的
上面的一和三或四依然是适用的，其实也看一次请求发起这个行为消耗的时间和它所请求的这个文件的大小是不是调整到了合适的比例
webpack 官网的建议是 30k 作为区分，也就是如果一个包是小于 30k 的话，首先它是没有必要去拆分出来的，如果拆出来一堆几 k 的包，那么没有什么意义。

缓存组这个配置其实还是要再考虑下，包是一定要分的，但是到底是用 async 来配置缓存组还是 all 亦或者是 init
公用函数和公用组件的打包，到底是直接打包成初次加载，还是做成异步加载
异步加载的话，是所有的 components 打包到一起，直接一个异步逻辑，还是各自为战，配置允许复用
各自为战的话，有些组件其实是很小的，没有必要单独出去，可是使用频率又很高，打到各自的业务中也是不对的

### dll 和 splitchunks 都是分包用的，dll 用于开发环境，生成的 manifest 可以让我们每次少打包一些代码。splitchunks 则是为了优化线上包体积和数量

记录一个分包策略
splitChunks: {
chunks: "all",
cacheGroups: {
libs: {
name: "chunk-libs",
test: /[\\/]node_modules[\\/]/,
priority: 10,
chunks: "initial" // 只打包初始时依赖的第三方
},
elementUI: {
name: "chunk-elementUI", // 单独将 elementUI 拆包
priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
test: /[\\/]node_modules[\\/]element-ui[\\/]/
},
commons: {
name: "chunk-comomns",
test: resolve("src/components"), // 可自定义拓展你的规则
minChunks: 2, // 最小共用次数
priority: 5,
reuseExistingChunk: true
}
}
};

官方打包策略，也是默认打包策略，只会影响到异步加载的包

optimization: {
splitChunks: {
chunks: 'async',
minSize: 30000,
maxSize: 0,
minChunks: 1,
maxAsyncRequests: 5,
maxInitialRequests: 3,
automaticNameDelimiter: '~',
name: true,
cacheGroups: {
vendors: {
test: /[\\/]node_modules[\\/]/,
priority: -10
},
default: {
minChunks: 2,
priority: -20,
reuseExistingChunk: true
}
}
}
}
maxSize takes higher priority than maxInitialRequest/maxAsyncRequests.
Actual priority is maxInitialRequest/maxAsyncRequests < maxSize < minSize.

splitChunks.cacheGroups.{cacheGroup}.enforce
boolean: false

Tells webpack to ignore splitChunks.minSize, splitChunks.minChunks, splitChunks.maxAsyncRequests and splitChunks.maxInitialRequests options and always create chunks for this cache group.

### 分包策略这个东西，其实还是要和我们自己的需求相互结合的

首页要求的是较快的速度，其他页面的话，不考虑用户使用流量的话，使用预加载，或者说首页包尽量的小，依赖拆分，其他页面的依赖再放一个包？

根据我现在在 ali 的网速，测试物业来说，发起一个服务的最小开销应该是 10ms 到 15ms 左右，服务器和网路都有限制，
而单纯下载一个 30k 的资源需要的时间，也在 10 到 15 毫秒之间

所以这个完全看项目了啊，路由懒加载是必须做的，如果路由包很大，而且逻辑可以分清楚，并且多个逻辑包压缩以后也大于 30k，再分离逻辑包

ui 库和框架库分离，组件库和业务代码是否分离看包的大小

因为我们配置统一入口的原因，components 文件夹下的数据会被统一引入
这个需要查看阿里的动态引入 antd 是怎么做的。配置好了，阿里的有些东西的确是好用啊。

测算比较水，没找到更专业一点的方式，不过参照 webpack 来说的话，30k 应该是一个分水岭，并发请求数，Chrome 是 6，ie 是 4
其实我们最关注的是首页的加载速度

其实每多一次请求，对应浏览器，服务器都是一种开销
要衡量的是 包的大小，浏览器允许的并发次数，发起一次资源请求所要造成的开销，所以 webpack 给出来的时间是 30k 为一个区分

骨架图必须要上

antd import 插件的实现的原理 主要是通过 ast（postcss 自己写插件也是这么个原理）
https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#toc-unit-testing

###  题外话，table 数据和搜索数据的存储关系
要求，尽量不使用 payload
初始关系：pageOpt={pageNum:1,pageSize:10} searchOpt={}

逻辑 1：如果上方搜索按钮触发的话，那么搜索出来的数据，一定要是第一页的数据的，=> pageNum:1,pageSize:last + ...searchOpt
逻辑 2：点击下一页或者改变页码大小的时候， 头部搜索显示项不能够变化， 搜索条件和上次保持一致， 页码直接拿 table 组件更新的页码信息
=> 更新好的 pageNum + 更新好的 pageSize + 上次搜索的 searhOpt
如果想要拿到 上次搜索的 searchOpt 那么 上次搜索的 searchOpt 必须有一个地方存储，
存一个新的对象 或者是 依附于已有的某条数据上，
我们倾向于直接把上次的信息放到 pageOpt 中

所以 searchOpt 只是负责存储最新的 用户输入信息

(1)每次搜索触发的时候，把 searchOpt 并到 pageOpt 中

(2)每次页面信息改变的时候，不去管新的 search 信息是什么 直接使用 更新了 page 信息的 pageOpt(已经包含了上次的 searchOpt)

获取 list 数据的时候，我们只取处理好的 pageOpt 这一个参数

### 研究 antd form 的数据是怎么获取的吧，应该是直接搞的高阶组件，这样用起来可能会轻松一点

### 三方包打包，提取 ui 再作为独立的包，这个在 antd 上好像没有必要，使用 babel-import-plugin 以后，本来它们就相当是一些列小的 component，不引用，是不会被打包的

就算是我们只是安装了，并且作为生产依赖，因为没有使用的原因，也会通过 tree shaking 拿掉，不用担心包因为引入一个库而太大的问题
###antd 在 3.8 以后(直到现在 2019.1.1 还没有解决)默认会把 icon 打到文件中，大出来了差不多 500k,这里是临时解决方案，但是要注意内部组件有引入的 icon 也要配置好 https://github.com/HeskeyBaozi/reduce-antd-icons-bundle-demo

### antd，使用，less 的处理要分开配置，因为我们本地打开了 cssModule,但是 antd 的不能够使用 cssModule,所以，得配置出来两个 less

{
test: /\.less$/, // 这个应该是不能跨过node_modules的，因为就是为了处理antd的文件
                exclude: [/node_modules/], // 其实就是src下的less文件打开cssModule
                use: [
                    { loader: 'style-loader' }, // creates style nodes from JS strings
                    {
                        loader: 'css-loader',
                        options: cssLoaderOptions(2),
                    }, // translates CSS into CommonJS 
                    { loader: 'postcss-loader' }, // autoprefixer
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                        },
                    }, // compiles Less to CSS
                ],
            },
            {
                test: /\.less$/, // 配置除 src 外的 less 文件不打开 cssModule
exclude: [/src/],
use: [
{ loader: 'style-loader' },
{
loader: 'css-loader',
options: {
importLoaders: 1,
},
},
{
loader: 'postcss-loader',
},
{
loader: 'less-loader',
options: {
modifyVars: { '@primary-color': '#1DA57A' },
javascriptEnabled: true,
},
},
],
},

### lodash 优化完毕，通过 lodash—es 和蚂蚁的 import

公用函数全局 model 等打到了 index.js 中
现在的分包策略是生产依赖打到了 vendors~index 中，并且在 index.js 之前加载
路由按需加载，page 级别的 model 也是按需加载
components 中的文件也使用蚂蚁的 import 引入，直接打到各自页面中，但是 HOC 的文件打到了 index.js 中
antd 做为主要的 ui 库，提取出来。
同时 vendor(lodash) page components 中的文件如果有公用的情况，直接自己成为一个文件

这种分包最大的问题就是 js 文件打包出来的太多了，
但是保证了最大的复用性，以及整体页面的大小最小

不过打包出来的文件，应该还是以 30k 位区分，如果不大于 30k 直接打到页面中，这样同样有问题，如果复用很多就打了很多次了

最后需要验证一下，不启用懒加载，包的大小。同样的，基础配置以后都是 1.3m，如果继续使用新的 antd 和 lodash 应该还是会加大

### model 动态注册，import 过来的文件一般来说是单个的 index.js，它内部才是各个 model，已经兼容

### 据说 2018 有百分之六十的前端程序员用上了 ts... react 中一般叫 tsx

ts 入门 https://ts.xcatliu.com/
type 即值类型，一般来说就是未知变量的类型需要指定一下（函数，类等的参数）

### ts 的 css 和 styleLint 的 autofix 之间的冲突，所以，建议使用 scss 或者 less,目前项目中没有配置 stylus(学不动了)

如果使用 css 文件，那么 stylelint-webpack-plugin 和 ts 的 css 声明插件有冲突，导致 autofix 失效，所以建议使用 scss 或者 less
如果 css 中有一个 class 叫 delete，那么这个 delete 因为是 js 的关键字，所以在 d.ts 的声明文件中是不允许暴露的，所以不被声明，于是在
tsx 文件中这个变量的类型就变成了没有声明，所以：

### css 中的 class 名不用用 js 的保留字 dlete,public 等

### 感受一波 ts 以后，我可能会把所有的 js 文件改成 ts,然后再配置一个足以让我爽的 tslint,至少要有 eslint 的感觉。。。

### 在这里我一定会放弃 css 的写法了，scss 还是比较倾心的，less（用专门的 global 文件配置全局变量）也得有。。。

##ts+redux+router 的基本思路
/_
思路，从 model 里根据 namespace 全局暴露 state 的属性
在组件中直接获取 state, props 用到的不外乎这几个属性： dispatch, 需要的 store 的 state 一个或多个 router 的三个属性（只用本组件作为 router 的那三个用法（render 渲染，component 属性和 children 渲染）才会用到）
其他的情况主要是看高阶组件等问题了
_/

#### react 的问题，问什么我们一直在说函数式组件， 函数式组件和类组件的区别到底是什么， 因为 useHooks 的出现函数组件也可以有状态了

函数是组件，没有实例化的步骤，也就不需要分配多余的内存
函数组件内部不允许再写函数（这点只能是我们自己要求，react 并没有阻止这件事情）
函数组件没有 shouldComponentUpdate 这个生命周期，所以每次有任何的 prop 数据变化(如果父组件执行了 render，但是函数组件的 prop 没有变化的话，会怎样？)，它都会更新（其实这也要求我们写组件的时候，要慎用传入组件的 prop）
函数组件没有 this，那么也就没有了一些列 this 带来的问题，this 指向问题

在大部分 React 代码中，大多数组件被写成无状态的组件，通过简单组合可以构建成其他的组件等；这种通过多个简单然后合并成一个大应用的设计模式被提倡。（官网）
函数组件没有一些列的生命周期方法，没有副作用，输入决定了输出，这一点就决定了它可以大量的复用

性能。目前 React 还是会把函数组件在内部转换成类组件，所以使用函数组件和使用类组件在性能上并无大的差异。但是，React 官方已承诺，未来将会优化函数组件的性能，因为函数组件不需要考虑组件状态和组件生命周期方法中的各种比较校验，所以有很大的性能提升空间。

个人认为无状态组件的使用暂时不该从考虑他们之间有无性能差来比较而使用谁？更应该从代码如何书写更合理来选择用谁。性能上这点可以暂时不去考虑。

其实还有一个个人观点，那就是我们现在写在类组件中的一些列方法，其实就是传统意义上的 controller 了，这个，应该直接放在 redux 里的吧，这样的话 immer 的用处就体现出来了，取值赋值也变得很容易。

而原本的方法则直接换成 connect 的第二个参数，mapDispatchToProps，这样即使是最外层的组件也可以是无状态组件，或者直接写成函数组件，不知道是 babel 还是 ts 的问题，现在的函数组件都不允许直接使用装饰器模式

###题外话，usehook 的出现，其实在我们的业务中，即使不用 redux，class 组件存在的必要性也没有那么大了其实。

#### 纠正一下，renderProps 格式 在汉语中我们一般叫 渲染回调模式 和高阶组件一样，可以为子组件提供一些其他的 prop 最常见的其实就是 react-router 了，它为组件提供了 history location 和 match 这三个额外的 prop

#### stestate

setState 一般来说是异步的，只要是 react 的形式 更新的时机：当有一系列 setState 函数在一起的时候，会讲这些 state 合成一个序列，
然后一起更新，执行一次 re-render 过程
this.setState({a:this.state.a+1}) this.setState((state,props)=>({a:state.a+1}))
两者都是异步执行的，前者是更新跟具 this.state 后者更新根据参数 state，其实就是上面讲的序列中的 state，
以为 this.state 的更新不是实时的，所以，我们所有的 setState 应该都使用函数式，函数式中的 state 是实时的啊

### 柯里化就一定意味着 前几步是包含 return 的

### 函数组件没有 shouldComponentUpdate 这就意味着，不管函数组件的属性有没有被改变，父组件只要执行 render，那么函数组件就会更新,父组件 shouldComponentUpdate 返回 false 的时候，触发不了父组件的 render，所以子组件是不更新的

### 父子组件更新的时候，声明周期的顺序

父组件,constructor
父组件,UNSAFE_componentWillMount
父组件 render
子组件,UNSAFE_componentWillMount
类子组件 render
子组件,componentDidMount
父组件,componentDidMount

更新 props 数据

父组件,UNSAFE_componentWillReceiveProps
父组件,shouldComponentUpdate
父组件,UNSAFE_componentWillUpdate
父组件 render
子组件,UNSAFE_componentWillReceiveProps
子组件,shouldComponentUpdate
子组件,UNSAFE_componentWillUpdate
类子组件 render
子组件,componentDidUpdate
父组件,componentDidUpdate

销毁

父组件,componentWillUnmount
子组件,componentWillUnmount

# componentWillComponent 和 componentDidMount 的区别？

# immer 和 dva 还有 react-redux 的源码看一下

# 开始搞 prettier 和 tslint eslint stylelint

# 代码格式化和美化 需要的 vscode 插件：

eslint，stylelint，tslint，prettier
先解决 eslint 和 prettier 的问题然后再看 ts 和 scss

eslint-config-prettier 禁止与 prettier 冲突的 eslint 规则，使用这个插件的话，最起码，eslint 和 prettier 不冲突了，强制按照 prettier 的规则走了。。。
想要使用 prettier 优化我们的项目的话，首先是把自己的 lint 改成和 prettier 一致的形式。。。 stylelint 配置完毕
而 prettier 的配置是我们自己可以搞定的
tslint-eslint-rules 让我们可以配置一些 eslint 的特性在 tslint 上

配置 tslint,直接粘贴了 antd 的配置。。。现在替换成了腾讯的全厂配置

# 我对 prettier 误解了 https://prettier.io/docs/en/comparison.html#how-does-it-compare-to-eslint-tslint-stylelint-etc

# 使用 useEffec 来处理函数组件不可以自定义更新的问题
page model的划分，应该是到达路由分割的那一层就可以了，我目前的想法是达到一级路由那个级别，再细的话其实就不能叫models了，因为一个级别一般都是只有一个model

resolve 的配置其实挺麻烦的，webpack需要，ts需要，jest也需要

jest 
tdd模式 test drive develop 测试驱动开发模式，先写测试用例，然后根据测试用例完成代码，便于重构，其他人理解业务代码和修改业务代码
# https://www.oschina.net/translate/test-react-components-jest
# https://mp.weixin.qq.com/s?__biz=MzIzNTU2ODM4Mw==&mid=2247486968&idx=1&sn=225ad62312a65cde52569a41a9d61d58&chksm=e8e46068df93e97e4a47787460149b78beadfe836b73a49503541a3420f9044129aa2a3ffbf7&scene=0#rd
# https://juejin.im/post/5bc03cda6fb9a05ce95c81ab
# https://juejin.im/post/5bc1f9ca6fb9a05cdc49b037

关于测试文件的位置，测试文件应该和业务代码文件在一起，所以其实是page和model中都应该有一个 __test__ 文件夹，jest会自动找到这个文件夹的，最外围的jest文件夹则主要是做一些mock和config的功能

### 引入antd-mobile的时候，把css和scss 系列loader中的的exclude去掉，不知道是什么原因，估计是没有打包这中文件。
### 移除scripts中的 --fix,stylint 的自动fix会把字母的大小写改变，导致composes失效

### 添加git规范
https://segmentfault.com/a/1190000009048911
