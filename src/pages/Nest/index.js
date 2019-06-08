import React, { PureComponent } from 'react'
import { Route } from 'dva/router'
import NestContent from './NestContent'

// 这种嵌套路由的注册，直接从父组件里面注册，其实就是传递给Route组件之前注册了就可以了
// app可以从首页直接引入一下，过一下手，再传出去，就是最新时刻的实例了，其实就是在进Route之前保持最新就好

class Nest extends PureComponent {
	render() {
		console.log(this.props)
		const {
			match: { path },
		} = this.props
		return (
			<NestContent>
				<Route path={`${path}/abc`} exact render={() => <div>  我是嵌套路由子路由abc</div>} />
				<Route path={`${path}/def`} exact render={() => <div>  我是嵌套路由子路由def</div>} />
			</NestContent>
		)
	}
}

export default Nest
