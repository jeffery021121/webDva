// 如果是多级路由看，这里不只是有自己的展示，应该还有子路由的挂载
// 该组件实现一个点击按钮展开和关闭的效果
// 其实对于来回toggle这种完全没有涉及到数据交互的状态，我比较倾向于把它放到state中，操作起来比较简单
// 不过这样的话，就违背了单向数据流原则。。。。

// @ts-ignore
import app from '@'
import { connect } from 'dva'
import React, { FocusEvent, Fragment, MouseEvent, PureComponent } from 'react'
import Button from './components/Button'
import HocWithOutItem from './components/HOCWithOutToggleable'
import HocItem from './components/HOCWithToggle'
import InjectMenuItem from './components/InjectMenuItem' // 应该叫InjectToggle才对
import MenuItem from './components/MenuItem'
import Toggleable, { IRenderCallback } from './components/Toggleable'


interface IDispatchToProps {
	handleClick: voidFunc
}

type IProps = IToggle & IDispatchToProps & RouteType
const mapStateToProps: (store: { toggle: IToggle, loading: any }) => { toggle: IToggle, loading:any } = ({ toggle,loading }) => ({
	toggle,loading,
})
const mapDispatchToprops: (dispatch: Dispatch, owenprops: any) => void = (dispatch, owenprops) => {
	// console.error('自己的属性', owenprops)
	return {
		handleClick(e: FocusEvent<HTMLInputElement>) {
			// dispatch({ type: 'toggle/immerTest1', payload: { toggle: e.target.value } })
			dispatch({
				payload: { toggle: e.target.value },
				type: 'toggle/loadingTest',
			})
		},
	}
}
// 其实只要不是父组件传递过来的属性，都应该过一手WithDefaultProps这个属性的
// 如果使用mapDispatch的形式的话，就没有必要写成类组件了

const inintState = { show: false }
type IState = typeof inintState

const toggleFunc = ({ show }: IState) => ({ show: !show })

@connect(
	mapStateToProps,
	mapDispatchToprops,
)
class Toggle extends PureComponent<IProps, IState> {
	public readonly state = inintState
	public btnClic = () => this.setState(toggleFunc)
	public render() {
		const { toggle: mainToggle } = this.props
		const { show } = this.state
		console.log(this.props.toggle)
		// const { mainToggle} =this.props
		// console.warn('父组件render', mainToggle)//这个属性断言的问题，其实可以使用写好的那个高阶组件解决问题
		// 电饭锅和健康了分工会尽快ghj
		return (
			<Fragment>
				我是toggle组件，immer：
				<div>{mainToggle.time}</div>
				<input type="text" onChange={this.props.handleClick} />
				<div>
					<p>真正的toggle开始</p>
					<div>
						渲染回调1 renderProps:
						<Toggleable render={this.renderCallback('renderProps', 'renderProps')} />
					</div>
					<div>
						渲染回调2 childrenCallback:
						<Toggleable>
							{/* {({ show, toggle }) => (
								<div style={{ background: 'pink' }}>
									<div
										onClick={(e: MouseEvent<HTMLElement>) => {
											toggle(e)
										}}
									>
										<h1>childrenCallback</h1>
									</div>
									{show && <p>childrenCallback</p>}
								</div>
							)} */}
							{this.renderCallback('childrenCallback', 'childrenCallback')}
						</Toggleable>
					</div>

					<div>
						组件注入 components Injection:
						{/* 这种实现有点难受，因为想要不报错，，
            就得侵入 Toggleable，添加MenuItem需要的属性 ，而且得在MenuItem中把Togglable 的IRenderProps 取出来然后并列到自己的IProps中
            应该换一个方式，使用一个中间组件InjectMenuItem ,内部实现 MenuItem 然后引入Toggleable
            talk is cheap, show you the code
            <Toggleable component={MenuItem} title='component Inject' content='组件注入模式，可以参靠Route的 component属性' />
            */}
						<p>InjectMenuItem 开始</p>
						<InjectMenuItem
							component={MenuItem}
							title="component Inject"
							content="组件注入模式，可以参靠Route的 component属性"
							intro="改良版本component Inject"
						>
							额外的子内容
						</InjectMenuItem>
						<p>InjectMenuItem renderProps</p>
						<InjectMenuItem
							render={this.renderCallback('InjectMenuItem renderProps', 'renderProps')}
						>
							额外的子内容
						</InjectMenuItem>
						<p>inject children</p>
						<InjectMenuItem>
							{/* {({ show, toggle }) => (
								<div style={{ background: 'pink' }}>
									<div onClick={toggle}>
										<h1>InjectMenuItem childrenCallback</h1>
									</div>
									{show && <p>childrenCallback</p>}
								</div>
							)} */}
							{this.renderCallback('InjectMenuItem childrenCallback', 'childrenCallback')}
						</InjectMenuItem>
						<p>普通children模式</p>
						<InjectMenuItem>无component和render,只有非函数children，</InjectMenuItem>
						{/* 纯空组件，无效 */}
						<InjectMenuItem />
						<InjectMenuItem />
					</div>
					<p>高阶组件，手动toggle</p>
					<HocWithOutItem
						title="高阶组件，不结合renderProps"
						content="高阶组件，不结合renderProps"
						children="额外的子内容"
					/>
					<p>高阶组件，手动toggle 测试children优先级</p>
					<HocWithOutItem title="高阶组件，不结合renderProps" content="高阶组件，不结合renderProps">
						额外的子内容，标签间的children要比属性children优先级更高
					</HocWithOutItem>
					<p>高阶组件，使用toggle组件</p>
					<HocItem
						title="高阶组件，结合renderProps"
						content="高阶组件，结合renderProps"
						children="额外的子内容"
					/>

					<p>受控组件展示，renderProps，高阶组件也是一样的方式，就不写高阶组件的形式了</p>
					<div>
						<div>
							<Button handleClick={this.btnClic} value="受控组件按钮" />
						</div>
						<p>InjectMenuItem 开始</p>
						<InjectMenuItem
							show={show}
							component={MenuItem}
							title="component Inject"
							content="组件注入模式，可以参靠Route的 component属性"
							intro="改良版本component Inject"
						>
							额外的子内容
						</InjectMenuItem>

						<p>InjectMenuItem renderProps</p>
						<InjectMenuItem
							show={show}
							render={this.renderCallback('InjectMenuItem renderProps', 'renderProps')}
						>
							额外的子内容
						</InjectMenuItem>

						<p>inject children</p>
						<InjectMenuItem show={show}>
							{({ show, toggle }) => (
								<div style={{ background: 'pink' }}>
									<div onClick={toggle}>
										<h1>InjectMenuItem childrenCallback</h1>
									</div>
									{show && <p>childrenCallback</p>}
								</div>
							)}
						</InjectMenuItem>
					</div>
				</div>
				<p>结束</p>
			</Fragment>
		)
	}
	private renderCallback = (title: string, content: string): IRenderCallback => ({
		show,
		toggle,
	}) => (
		<div style={{ background: 'pink' }}>
			<div onClick={toggle}>
				<h1>InjectMenuItem renderProps</h1>
			</div>
			{show && <p>renderProps</p>}
		</div>
	)
}

export default Toggle
