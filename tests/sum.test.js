// const sum = require('@/sum')
// const sum = require('sum')
// 使用jest插件以后会自动检测，不通过就会报红
import sum from '@/sum'

test('adds 1 + 2 to equal 3', () => {
	expect(sum(1, 2)).toBe(3)
})

test('adds 3 + 2 to equal 5', () => {
	expect(sum(3, 2)).toBe(5)
})

// test('adds 1 + 2 to equal 3', () => {
// 	expect(sum(1, 2)).toBe(4)
// })

// 一些列相关的逻辑可以放在一个describe中测试
describe('第一次describe', () => {
	it('第一次it', () => {
		expect(sum(3, 2)).toBe(5)
	})
})

describe('第二次describe', () => {
	test('test使用', () => {
		expect(sum(3, 2)).toBe(5)
	})
})
