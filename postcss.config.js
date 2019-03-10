/* 应该是没有必要上precss的语法了，直接看scss吧，只要现在有的语法，scss都是和css兼容的 */
// const precss = require('precss')
const autoprefixer = require('autoprefixer')

module.exports = {
	loader: 'postcss-loader',
	plugins: [
		// 先不上postCss了，研究一下postcss-preset-env,这个东西绝对是趋势。
		// 是可以配置的趋势，不过会导致大家的都不一样，所以就保守一点啦
		// precss, // 支持precss的语法，但是编辑器插件好像没有认识precss语法的，所以还是直接上scss
		autoprefixer({
			browsers: [
				'defaults',
				'not ie < 11',
				'last 2 versions',
				'> 1%',
				'iOS 7',
				'last 3 iOS versions',
			],
		}),
	],
}
