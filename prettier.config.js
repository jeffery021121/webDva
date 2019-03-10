// 这里只是代码美化的设置
module.exports = {
	// eslintIntegration: true, // #让prettier使用eslint的代码格式进行校验，总感觉没有生效

	// stylelintIntegration: true,

	// tslintIntegration: true,

	// tab缩进大小,默认为2
	tabWidth: 2,

	// 使用tab缩进，默认false
	useTabs: true,

	// 使用分号, 默认true
	semi: false,

	// 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
	singleQuote: true,

	// jsx 使用双引号,引入神马的都是单引号，jsx语法使用双引号
	jsxSingleQuote: false,

	// 行尾逗号,默认none,可选 none|es5|all
	// es5 包括es5中的数组、对象
	// all 包括函数对象等所有可选
	trailingComma: 'all',

	// 对象中的空格 默认true
	// true: { foo: bar }
	// false: {foo: bar}
	bracketSpacing: true,

	// JSX标签闭合位置 默认false
	// false: <div
	//          className=""
	//          style={{}}
	//       >
	// true: <div
	//          className=""
	//          style={{}} >
	jsxBracketSameLine: false,

	// 箭头函数参数括号 默认avoid 可选 avoid| always
	// avoid 能省略括号的时候就省略 例如x => x
	// always 总是有括号,avoid应该是比较好的配置，但是和eslint冲突，那就用always吧
	arrowParens: 'always',

	// 行最大长度
	printWidth: 100,
}
