const path = require('path')
const cssnano = require('cssnano')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const CompressionWebpackPlugin = require('compression-webpack-plugin')//压缩，gz文件
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const baseWebpackConfig = require('./webpack.base.config')

const cssLoaderOptions = (importLoaders) => ({
	modules: true, // 指定启用css modules
	localIdentName: '[name]__[local]--[hash:base64:5]', // 指定css的类名格式
	importLoaders, // 在调用本loader之前，调用的loader数目
})

module.exports = merge(baseWebpackConfig, {
	mode: 'production',
	devtool: false,
	entry: {
		index: path.join(__dirname, '../src/index.js'),
	},
	module: {
		rules: [
			{
				// scss文件的处理方式，可以直接配置options来开启cssModule就是添加对应的变量名，都可以在下面配置的
				test: /\.scss$/,
				// exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
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
					{
						loader: MiniCssExtractPlugin.loader,
					},
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
				// 配置除src外的less文件不打开cssModule,这里css-loader 的配置，不能加options，我也不太清楚为什么，会和minicssep产生冲突
				test: /\.less$/,
				exclude: [/src/],
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
					},
					{
						loader: 'less-loader',
						options: {
							modifyVars: { '@primary-color': '#1DA57A' }, // less全局变量配置
							javascriptEnabled: true,
						},
					},
				],
			},
			{
				// css文件的处理方式，可以直接配置options来开启cssModule就是添加对应的变量名，都可以在下面配置的
				test: /\.css$/,
				// exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: cssLoaderOptions(1),
					},
					{
						loader: 'postcss-loader',
					},
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			// css文件抽离
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
		new OptimizeCssAssetsPlugin({
			// CSS压缩优化插件，合并同类css，压缩css。
			// 通过MiniCssExtractPlugin抽离好的css文件名其实就是 ENTRYNAME.css, 默认main
			assetNameRegExp: /.css$/g,
			cssProcessor: cssnano, // 使用cssnano优化css代码
			cssProcessorPluginOptions: {
				preset: ['default', { discardComments: { removeAll: true } }], // 这个配置没找到解释，应该是移除注释
			},
			canPrint: true, // 是否允许在控制台输出
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../public/index.html'),
			filename: path.resolve(__dirname, '../dist/index.html'),
			chunksSortMode: 'none',
			inject: true,
			// hash: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
			},
			// necessary to consistently work with multiple chunks via CommonsChunkPlugin
			// chunksSortMode: 'dependency',//这里的配置不太能看得懂
		}),
		// new CompressionWebpackPlugin({
		//     filename: '[path].gz[query]',
		//     algorithm: 'gzip',
		//     // test: path.resolve(__dirname, '../dist/'),
		//     // test: new RegExp(
		//     //     '\\.(js|css)$', // 压缩 js 与 css
		//     // ),
		//     threshold: 10240,
		//     minRatio: 0.8,
		// }),
		new CleanWebpackPlugin([path.join(process.cwd(), 'dist')], { allowExternal: true }),
		// new BundleAnalyzerPlugin({ analyzerPort: 8919 }),
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				parallel: true,
				uglifyOptions: {
					output: {
						comments: false,
					},
				},
			}),
		],
		splitChunks: {
			chunks: 'all',
			// minSize: 30000,
			// minChunks: 1,
			// maxAsyncRequests: 5,
			// maxInitialRequests: 3,
			// automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
					// enforce: true,//不再使用group之外配置的内容，只使用本地配置的内容
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: 10,
					reuseExistingChunk: true,
				},
				antdUi: {
					test: /[\\/]node_modules[\\/]antd[\\/]/,
					priority: 20,
					reuseExistingChunk: true,
				},
			},
		},
	},
})
