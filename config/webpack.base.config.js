// 基础配置页,js 除了css以外的loader，entry，output,resolve,
const path = require('path')
const os = require('os')
const HappyPack = require('happypack')
const tsImportPluginFactory = require('ts-import-plugin') // babel-plugin-import的ts版本
// const webpack = require('webpack')
// const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
	output: {
		path: path.join(__dirname, '../dist'),
		filename: '[name].js',
		chunkFilename: '[name].[chunkhash:5].chunk.js',
		// publicPath: 'https://www.baidu.com',
	},

	resolve: {
		extensions: ['.js', '.jsx', '.tsx', '.ts'],
		alias: {
			'@': path.resolve(__dirname, '../src'),
			// '@': `${process.cwd()}/src`,
		},
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				// test: /\.ts|.tsx$/,

				use: [{ loader: 'happypack/loader?id=happyBabel' }, { loader: 'happypack/loader?id=ts' }],
				include: path.join(process.cwd(), 'src'),
				// loader: 'ts-loader',
			},
			{
				test: /\.jsx?$/,
				// use: ['babel-loader?cacheDirectory=true'],
				loader: 'happypack/loader?id=happyBabel',
				include: path.join(process.cwd(), 'src'),
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
				},
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
				},
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
				},
			},
		],
	},

	plugins: [
		new HappyPack({
			id: 'ts',
			threadPool: happyThreadPool,
			loaders: [
				{
					loader: 'ts-loader',
					options: {
						happyPackMode: true,
						transpileOnly: true,
						getCustomTransformers: () => ({
							before: [
								tsImportPluginFactory(
									{
										libraryName: 'antd',
										libraryDirectory: 'es',
										style: true,
									},
									{
										libraryName: '@/components',
										libraryDirectory: '',
										camel2UnderlineComponentName: false,
										camel2DashComponentName: false,
									},
									{
										libraryName: 'lodash',
										libraryDirectory: '',
										camel2DashComponentName: false, // default: true
									},
								),
							],
						}),
					},
				},
			],
		}),
		new HappyPack({
			// 变化不明显啊，讲真的，好像不如没有的时候快，可能是因为我的文件太小了
			/* 比如多进程跑loader，如果你项目比较小，开了之后可能变慢了，因为本来打包时间就比较短，
            用来fork子进程的时间，说不定都已经跑完了 */
			id: 'happyBabel',
			loaders: [
				{
					loader: 'babel-loader?cacheDirectory=true',
				},
			],
			// 共享进程池
			threadPool: happyThreadPool,
			// 允许 HappyPack 输出日志
			verbose: true,
		}),
		// new webpack.ProgressPlugin(function handler(percentage, msg) {
		// 	console.log(`${percentage.toFixed(2) * 100}%`, msg)
		// }),
		// new ProgressBarPlugin({
		// 	format: '  build [:bar] :percent (:elapsed seconds)',
		// 	clear: false,
		// 	width: 60,
		// }),
	],
}
