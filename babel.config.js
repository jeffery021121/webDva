const plugins = [
	// 从上到下
	'@babel/plugin-transform-runtime',
	['@babel/plugin-proposal-decorators', { legacy: true }],
	'@babel/plugin-proposal-class-properties',
	'react-hot-loader/babel',
	'@babel/plugin-syntax-dynamic-import',
	[
		'import',
		{
			libraryName: '@/components',
			libraryDirectory: '',
			camel2UnderlineComponentName: false,
			camel2DashComponentName: false,
		},
		'components',
	],
	[
		'import',
		{
			libraryName: 'antd',
			libraryDirectory: 'es',
			style: true, // 这样引入的就是less文件了，需要有less对应的loader，然后也就可以配置对应的less全局变量啦
		},
		'antd',
	],
	[
		'import',
		{
			libraryName: 'lodash',
			libraryDirectory: '',
			camel2DashComponentName: false, // default: true
		},
		'lodash',
	],
]
const presets = [
	// 从下到上
	[
		'@babel/preset-env',
		{
			modules: false, // 转换模块类型。这样才可以使用webpack的treeShaking，因为它基于es6静态引入
			// targets: {// 这里是你的文件要跑在什么浏览器上，只会编译这些浏览器还不支持的语法或者api，会使引入的包polifill或者runtime变小
			//   browsers: [// 不太看得懂
			//     '> 1%',
			//     'last 2 versions',
			//     'not ie <= 8',
			//     'not dead',
			//   ],
			// },
			// useBuiltIns: 'usage', // 就是这个东西几乎可以干掉runtime了。
		},
	],
	'@babel/preset-react',
]

// module.exports = { presets, plugins }

const babelConfig = (api) => {
	// api有catch设定,env判断等工能。
	// catch的设定必须要加上
	api.cache(false)
	return { plugins, presets }
}
module.exports = babelConfig
