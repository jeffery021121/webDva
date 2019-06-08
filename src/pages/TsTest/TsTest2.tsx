import { connect } from 'dva'
import { History, Location } from 'history'
import React, { Component, Fragment } from 'react'

// ts+react+redux初级用法里面最难的就是redux了，connect出入属性的问题等，下面是简单的用法
/*
思路，从model里根据namespace全局暴露state的属性
在组件中直接获取state, props用到的不外乎这几个属性： dispatch,  需要的store的state一个或多个  router的三个属性（只用本组件作为router的那三个用法（render渲染，component属性和children渲染）才会用到）
其他的情况主要是看高阶组件等问题了
*/
// 这里写下需要用到的数据，所有model的数据都需要暴露好
const mapStateToprops: (store: { tsTest: ITsTestState }) => { tsTest: ITsTestState } = ({
	tsTest,
}) => ({ tsTest })
// const mapStateToprops = ({ tsTest }: { tsTest: ITsTestState }) => ({ tsTest })//其实如果是通过变量定义的函数，使用上面那种绑定类型的方式比较正规，因为这种方式的值是通过类型推断出来的不准确

// 这样的话也就包含了react-router了，基础的就到这里啦
type IProps = {
	dispatch: Dispatch
	// 高阶组件传入的属性都应该使用可选属性，否则在调用组件的地方会报错，ts检测不到有的参数是高阶组件传递进来的
	history: History // 反正是静态检测，用到什么，就设置一下什么的类型就可以了
	prop1: string
} & ITsTestState

// @connect(({ tsTest }: { tsTest: ITsTestState }) => ({ tsTest }))//这种写法不能明确的表示出来返回的是什么类型
@connect(mapStateToprops)
class TsTest2 extends Component<IProps> {
	private readonly dispatch = this.props.dispatch
	public constructor(props: IProps) {
		super(props)
		const dispatch = this.props.dispatch
		this.dispatch = dispatch
		console.log(this.props, 'fghjkldfghjdfghj')
	}
	public handelSet = () => {
		console.log('1234567890', this.dispatch({ type: 'tsTest/save', payload: { aa: '3456' } }))
	}
	public render() {
		const tsTest = this.props.tsTest // 使用类型断言或者非空断言以后，该怎么结构还是真么结构
		const dispatch = this.props.dispatch
		// this.handelSet()动态写入一个没有做过初始值的数据，ts报错，一开始不太习惯，仔细一想，引入这玩意儿就是为了这个时候报错的啊。
		// console.log('子组件的props:', tsTest.aa)//这里使用了非空断言，因为上面的属性其实是通过connect高阶组件传递的，不过ts在调用组件的地方做了判断，如果没写，直接报类型不匹配
		return (
			<Fragment>
				我是第二个组件
				<button onClick={this.handelSet}>点我</button>
				<button
					onClick={this.btnClick}
				>
					跳转回父路由
				</button>
			</Fragment>
		)
	}
	private btnClick = () => {
		this.props.history.go(-1)
	}
}

export default TsTest2
