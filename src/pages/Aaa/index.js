/* eslint-disable react/no-multi-comp */
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import Test from '@/pages/Test'
// import { Com3 } from '@/components'
import { Button } from 'antd'
import { debounce } from 'lodash'
import TsCom from '@/pages/TsCom'

// import app from '@'// app在不同的时间，内部注册的数据也是不一样的，所以最标准的传递app就是在本页面
// import { HocAsyncRegestModel } from '@/components/HOC'

// 在异步组件加载以后异步注册model
// @HocAsyncRegestModel({ app, modelsFunc: () => ([import('@/pages/Aaa/models/aaa.js')]) })

// 现在是在路由的层次异步加载组件之前去注册model了

const Abc = ({ a = '组件参数a', ...props }) => {
	console.error('组件a的参数sss', props)
	return (
		<div>
			高阶组件实验参数：
			{a}
		</div>
	)
}

// 当高阶 组件的参数是一个函数的时候，即没有办法做反向继承，也没有办法做属性代理，这特么就没法玩了。。。
// 所以高阶组件的玩法就注定了我们只能用类组件作为高阶组件的参数

const WithDefaultProps = (Com) =>
	class WithDeaultHoc extends PureComponent {
		render() {
			const b = '高阶组件属性b'
			return <Com b={b} {...this.props} />
		}
	}
const Wabc = WithDefaultProps(Abc)

let num = 0

@connect(({ aaa, loading }) => ({ aaa, loading }))
class Aaa extends React.Component {
	render() {
		num += 1
		const { aaa } = this.props
		console.warn('参数查看：', this.props)
		return (
			<div>
				<Button
					onClick={debounce(() => {
						console.log('点击btn,500ms延迟')
					}, 500)}
				>
					antd的按钮
				</Button>
				<p>乱：阿阿斯蒂芬斯fghjkl</p>
				<p>
					渲染次数:
					{num}
				</p>
				看model数据:
				{JSON.stringify(aaa)}
				<div>
					test:
					<Test />
				</div>
				<TsCom />
				{/* 组件3：
        <Com3 /> */}
				<Wabc />
			</div>
		)
	}
}
export default Aaa
