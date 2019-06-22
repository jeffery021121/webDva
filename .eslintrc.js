module.exports = {
	// 环境，这里可以设置环来做区别判断
	env: {
		browser: true,
		// "commonjs": true,
		es6: true,
		jest: true,
	},
	// 使用的扩展库
	// extends: ['airbnb'],
	// 使用prettier规则，然后其规则尽量按照eslint来
	extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
	// extends: ["airbnb", "plugin: prettier / recommended"],

	// 解析器用于解析代码
	parser: 'babel-eslint',
	// parser: '@typescript-eslint/parser',

	// 第三方插件
	plugins: ['react', 'jsx-a11y', 'prettier'],
	// plugins: ['react', 'jsx-a11y', '@typescript-eslint'],

	// 解析器配置
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	// 可以全局使用变量
	globals: {
		Babel: true,

		React: true,
	},
	// 这几条都不可用
	// "useJSXTextNode":false,
	// project: './tsconfig.json',
	// 规则配置
	rules: {
		// prettier 的错误直接报错
		'prettier/prettier': 'error',

		'linebreak-style': 0,
		'quotes': ['error', 'single'],
		'semi': ['error', 'never'],
		// 禁止缩进错误
		'indent': 0,
		// 关闭不允许使用 no-tabs
		'no-tabs': 'off',
		'no-console': 1,
		// 设置不冲突 underscore 库
		'no-underscore-dangle': 0,
		// 箭头函数直接返回的时候不需要 大括号 {}
		'arrow-body-style': [2, 'as-needed'],
		'no-alert': 'error',

		// 设置是否可以重新改变参数的值
		'no-param-reassign': 0,
		// 允许使用 for in
		'no-restricted-syntax': 0,
		'guard-for-in': 0,
		// 不需要每次都有返回
		'consistent-return': 0,
		// 允许使用 arguments
		'prefer-rest-params': 0,
		// 允许返回 await
		'no-return-await': 0,
		// 不必在使用前定义 函数
		'no-use-before-define': 0,
		// 允许代码后面空白
		'no-trailing-spaces': 0,

		// 有一些 event 的时候，不需要 role 属性，不需要其他解释
		'jsx-a11y/no-static-element-interactions': 0,
		'jsx-a11y/click-events-have-key-events': 0,
		// 类成员之间空行问题
		'lines-between-class-members': 0,

		// 不区分是否在 despendencies
		'import/no-extraneous-dependencies': 0,
		// 引用时候根据根目录基础
		'import/no-unresolved': 0,

		// 允许在 .js 和 .jsx 文件中使用  jsx
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		// jsx > 紧跟着属性
		'react/jsx-closing-bracket-location': [1, 'tag-aligned'],
		// 不区分是否是 无状态组件
		'react/prefer-stateless-function': 0,

		//不强制使用proptypes
		'react/prop-types': [0],

		// 有未使用的变量,这个主要是错误的太多了
		'no-unused-vars': 'warn',

		// 箭头函数只有一个参数的时候，不使用括号,这个设置和prettier冲突了
		// 'arrow-parens': ['error', 'as-needed', { 'requireForBlockBody': true }],
	},
}
