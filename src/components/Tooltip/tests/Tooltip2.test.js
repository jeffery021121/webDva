// import e
import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import JestCom from '../index'
// 引入的css资源还是有问题，使用css-module的话，做完这次需求再说吧

configure({ adapter: new Adapter() })

describe('<JestCom />', () => {
	it('should render JestCom', () => {
		const warpper = mount(<JestCom />)
		// console.log(warpper)
		expect(warpper.find('.className1').text()).toBe('I am jest cmp')
	})
})

test('first test by myself', () => {
	expect(true).toBeTruthy()
})
