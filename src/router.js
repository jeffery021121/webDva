import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import asyncComponent from '@/utils/dynamic'
import ErrorBoundary from '@/pages/ErrorBoundary'

/*
按需加载其实是webpack提供的一种能力，需要做到的是在代码中实现动态引入，es模块的引入导出（import，export）都是静态的,commonJS的require是动态的，
所以使用其require.ensure也是可以完成功能的，不过我们可以通过babel使用import() ，它是动态的，同时注意，这个import并不是一个函数，只是看起来相似而已。
这种写法意味着彻底将动态加载组件和动态加载其model的逻辑分开了,不过也还好，路由这里就更加的专注于组件
而model这个东西本来就是为组件服务的，注册在组件中也对
所以写了两个方法，一个是先注册model，一个是后注册model
*/

const IndexPage = asyncComponent(() =>
	import(/* webpackChunkName: "indexPage" */ '@/pages/IndexPage'),
)
const Bbb = asyncComponent(() => import(/* webpackChunkName: "Bbb" */ '@/pages/Bbb'))
const Nest = asyncComponent(() => import(/* webpackChunkName: "Nest" */ '@/pages/Nest'))
const Dynamic = asyncComponent(() => import(/* webpackChunkName: "dynamic" */ '@/pages/Dynamic'))

function RouterConfig({ history, app }) {
	// 即异步组件和model
	const Vali = asyncComponent(() => import(/* webpackChunkName: "vali" */ '@/pages/Vali'), {
		app,
		modelsFunc: () => [import(/* webpackChunkName: "aaaModel" */ '@/pages/Vali/models')],
	})
	const Aaa = asyncComponent(() => import(/* webpackChunkName: "aaa" */ '@/pages/Aaa'), {
		app,
		modelsFunc: () => [import(/* webpackChunkName: "aaaModel" */ '@/pages/Aaa/models')],
	})
	const Ccc = asyncComponent(() => import(/* webpackChunkName: "Ccc" */ '@/pages/Ccc'), {
		app,
		modelsFunc: () => [import(/* webpackChunkName: "cccModel" */ '@/pages/Ccc/models/ccc.js')],
	})
	const TsTest = asyncComponent(() => import(/* webpackChunkName: "TsTest" */ '@/pages/TsTest'), {
		app,
		modelsFunc: () => [import(/* webpackChunkName: "TsTestModel1" */ '@/pages/TsTest/models')],
	})
	const Toggle = asyncComponent(() => import(/* webpackChunkName:"Toggle" */ '@/pages/Toggle'), {
		app,
		modelsFunc: () => [import(/* webpackChunkName:"ToggleModel" */ '@/pages/Toggle/models')],
	})
	return (
		<ErrorBoundary>
			<Router history={history}>
				<Switch>
					<Route path="/" exact component={IndexPage} />
					<Route path="/aaa" exact component={Aaa} />
					<Route path="/bbb" exact component={Bbb} />
					<Route path="/ccc" exact component={Ccc} />
					{/* 动态路由 */}
					<Route path="/dynamic/:anyProp" exact component={Dynamic} />
					{/* 嵌套路由: router V4的嵌套路由需要在组件内部嵌套，意味着需要给嵌套路由一个盒子，盒子内部两个组件，一个是父路由内容，一个是子路由集合 */}
					<Route path="/nest" component={Nest} />
					<Route path="/ts" component={TsTest} />
					<Route path="/toggle" component={Toggle} />
					<Route path="/vali" component={Vali} />
				</Switch>
			</Router>
		</ErrorBoundary>
	)
}

export default RouterConfig
