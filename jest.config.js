module.exports = {
	// testRegex: '/tests/.*.test.jsx?$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

	verbose: true,
	transform: {
		// Use official TypeScript Jest transformer
		'\\.(ts|tsx)?$': 'ts-jest',

		// Use our custom transformer only for the *.js and *.jsx files
		'\\.(js|jsx)?$': './tests/config/transform.js',
		// I'm also transforming GraphQL files with my own transformer (remove this line if you don't need it)
		// '\\.(gql|graphql)$': '@jagi/jest-transform-graphql',
	},
	// As I've mentioned the package that was causing errors in my case is `lodash-es`
	// so I'm including it in the next line.
	// Notice that if you have more than one package you should use `|` (pipe) i.e.
	// transformIgnorePatterns: ["/node_modules/(?!(lodash-es|other-package|next-es-pkg)/)"]
	transformIgnorePatterns: ['/node_modules/(?!(lodash-es)/)'],

	moduleNameMapper: {
		'^sum(.*)$': '<rootDir>/src/sum', // 直接配置到文件
		'^@/(.*)$': '<rootDir>/src/$1', // @配置
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/tests/__mocks__/fileMock.js',
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
	},
}
console.log('经过jest配置文件')
