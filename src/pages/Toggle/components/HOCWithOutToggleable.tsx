// 使用高阶组件完成toggleable的功能
// 这里主要实现的是渲染回调模式转换成高阶组件
// 高阶组件的本质是一个高阶函数， 确切说是一个函数，接收一个组件作为参数，最后返回一个组件，中间对这个传入的组件做些处理
import React, { ComponentType, MouseEvent, PureComponent, SFC } from 'react'
import Toggleable from './Toggleable'

// 高阶组件有反向继承和属性代理
// 原则是能不去继承就不去继承
// 这个高阶组件就是给组件提供show，和toggle的能力
/*
第一种方式，不借助renderPros，自己写一个
*/

/*
高阶组件的话，不管使用该组件的是一个什么组件，所以传入的组件类型为 ComponentType<any>,
也可以使用泛型来确定传入的类型，不过没有什么意义，高阶组件和注入组件不一样，props的类型是直接可确定的

*/

const initState = { show: false }
type IInitState = Readonly<typeof initState>

type IToggle = (preState: IInitState) => IInitState

interface IRenderProps {
	show: IInitState['show']
	toggle: voidFunc
}

const HOCToggleable = (Cmp: ComponentType<any>) =>
	class HOCToggleableClass extends PureComponent<any> {
		public readonly state: IInitState = initState
		public render() {
			const {
				props,
				state: { show },
				toggle,
			} = this
			const renderProps: IRenderProps = { show, toggle } // 这里不给IRenderProps，也可以通过类型断言断定出来的
			return <Cmp {...props} {...renderProps} />
		}
		private toggle = () => this.setState(handleToggle)
	}
const handleToggle: IToggle = ({ show }) => ({ show: !show })

/*
使用，这里就不拆开了
*/

type IProps = Partial<
	Readonly<
		{
			name: string
			title: string
			content: string
		} & IRenderProps
	>
>

// let TestCmp =
class TestCmp extends PureComponent<IProps> {
	public render() {
		const { show, toggle, title = '默认title', content = '默认content', children } = this.props
		return (
			<div style={{ background: 'pink' }}>
			{/* 123456789 */}
				<div onClick={this.handleClick(toggle)}>
					<h1>{title}</h1>
				</div>
				{/* {show && <p>{content}属性类型查看{show.length}</p>} */}
				{show && <p>{content}</p>}
				{children}
			</div>
		)
	}
	private handleClick = (toggle: IProps['toggle']) => (e: MouseEvent<HTMLElement>) => {
		if (toggle) toggle(e)
	}
}

// 注解的形式，会导致ts语法错误，需要高阶组件参数和渲染组件内部方法一致，函数写法则不会用问题
export default HOCToggleable(TestCmp)
