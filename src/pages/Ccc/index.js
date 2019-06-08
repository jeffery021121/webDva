import React from 'react'
import { connect } from 'dva'
import { Cmp3 as Com3 } from '@/components'
import { debounce } from 'lodash'

// import asyncComponent from '@/utils/dynamic'

// import app from '@'// app在不同的时间，内部注册的数据也是不一样的，所以最标准的传递app就是在本页面
// import { HocAsyncRegestModel } from '@/components/HOC'
// const Aaa = asyncComponent(() => import(/* webpackChunkName: "aaa" */'@/pages/Aaa'),
// { app, modelsFunc: () => ([import('@/pages/Aaa/models/aaa.js')]) })

let num = 0
// @HocAsyncRegestModel({ app, modelsFunc: () => ([import('@/pages/Ccc/models/ccc.js')]) })
@connect(({ ccc }) => ({ ccc }))
class Ccc extends React.Component {
	render() {
		// const { ccc: { obj } } = this.props
		num += 1
		const { ccc } = this.props
		// console.log('渲染次数', num, '，看app：', app)
		return (
			<div>
				<input
					type="button"
					value="点我"
					onClick={debounce(() => {
						console.log('lodash 1s')
					}, 1000)}
				/>
				<p>乱：阿阿斯蒂芬斯</p>
				<p>
					渲染次数:
					{num}
				</p>
				看model数据:
				{JSON.stringify(ccc.obj)}
				<div>
					看aaa组件：
					{/* <Aaa /> */}
				</div>
				组件3：
				<Com3 />
			</div>
		)
	}
}
export default Ccc
