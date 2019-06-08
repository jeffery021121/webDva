// babel7和jest兼容的不够好，需要自己再写一遍babel的配置,其实就是env的module不能为false，它依赖env的类型转换

const config = {
	babelrc: false,
	presets: ['@babel/preset-env', '@babel/preset-react'],
	plugins: [
		'@babel/plugin-transform-runtime',
		['@babel/plugin-proposal-decorators', { legacy: true }],
		'@babel/plugin-proposal-class-properties',
		'react-hot-loader/babel',
		'@babel/plugin-syntax-dynamic-import',
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
	],
}
module.exports = require('babel-jest').createTransformer(config)
