const StylelintWebpackPlugin = require('stylelint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.config')
const manifest = require('../dll/vendor-manifest.json')

const cssLoaderOptions = (importLoaders) => ({
	modules: true, // 指定启用css modules
	localIdentName: '[name]__[local]--[hash:base64:5]', // 指定css的类名格式
	namedExport: true,
	camelCase: true,
	importLoaders, // 在调用本loader之前，调用的loader数目
})

module.exports = merge(baseWebpackConfig, {
	entry: {
		index: ['react-hot-loader/patch', path.join(__dirname, '../src/index.js')],
	},
	mode: 'development',
	devtool: 'cheap-module-source-map',
	module: {
		rules: [
			{
				test: /\.scss$/,
				// exclude: /node_modules/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: 'typings-for-css-modules-loader',
						options: cssLoaderOptions(2),
					},
					{
						loader: 'postcss-loader',
					},
					{
						loader: 'sass-loader',
					},
				],
			},
			{
				test: /\.less$/, // 这个应该是不能跨过node_modules的，因为就是为了处理antd的文件
				exclude: [/node_modules/], // 其实就是src下的less文件打开cssModule
				use: [
					{ loader: 'style-loader' }, // creates style nodes from JS strings
					{
						loader: 'typings-for-css-modules-loader',
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
				test: /\.less$/, // 配置除src外的less文件不打开cssModule
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
			{
				test: /\.css$/,
				// exclude: /node_modules/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: 'typings-for-css-modules-loader',
						options: cssLoaderOptions(1),
					},
					{
						loader: 'postcss-loader',
					},
				],
			},
		],
	},
	devServer: {
		// 本地服务器配置
		host: '0.0.0.0',
		// port: '8898', // 不指定端口号就可以实现自动切换端口号的工能
		open: true,
		hot: true,
		inline: true,
		stats: 'errors-only',
		// noInfo: true, // 不显示服务的详情
		// contentBase: __dirname + 'publick',//静态文件的地址，因为有cdn,这个可以不用配置
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'index',
			template: path.resolve(__dirname, '../public/index.html'),
			filename: path.resolve(__dirname, '../dist/index.html'),
			chunksSortMode: 'none',
		}),
		new StylelintWebpackPlugin({
			context: 'src',
			configFile: path.resolve(__dirname, '../.stylelintrc.js'),
			failOnError: false,
			quiet: true,
			fix: true, // webpack启动的时候的确自动修复了,配置 自动生成声明文件以后，这个失效了
		}),
		new webpack.HotModuleReplacementPlugin(), // 热启动插件，以前没用过这个插件的啊。。。
		new webpack.DllReferencePlugin({
			// 还没好，得改
			context: path.resolve(__dirname, '../src'), // 与DllPlugin中的那个context保持一致
			/**
		        下面这个地址对应webpack.dll.config.js中生成的那个json文件的路径
		        这样webpack打包时，会检测此文件中的映射，不会把存在映射的包打包进bundle.js，
		        开发环境记得手动引入，有了manifest，webpack就不会在打包它里面的文件，而是直接复用
		    * */
			manifest,
		}),

		new webpack.NamedModulesPlugin(), // 官方推荐，还没看呢，是一个分析插件
	],
})
