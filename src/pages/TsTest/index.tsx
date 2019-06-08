// @ts-ignore
import app from '@'
// @ts-ignore 这个语句可以忽略ts对于js文件的检测
import asyncComponent from '@/utils/dynamic'
import React, { Component, ComponentType, Fragment, MouseEvent, ReactNode, SFC } from 'react'
// import { History, Location } from 'history'
import { Route } from 'react-router'

// import { Dispatch } from 'redux'
import { connect } from 'dva'
import aaad from './abc.scss'
// import { ModalState } from './models'//这种方式不好，最好是直接通过nameSpace直接放到全局下
import style from './index.css'
// import TsTest2 from './TsTest2'

// 其实，如果知道model已经注册过了，这里是不用再写注册model的，因为会有一个model的检测，只要现在还在挂载的model都不会重新注册的
// 异步加载成功，下一步其实是把他们都变成ts的高阶组件，代码里也就没有了js和jsx文件了，其实可以搞两套。。。
const TsTest2 = asyncComponent(() => import('@/pages/TsTest/TsTest2'), {
	app,
	modelsFunc: () => [import('@/pages/TsTest/models')],
})

// ts是静态检测，而store其实是动态数据，所以得有一个总的store,然后每次注册mode时候把数据加上去
// 应该要写一个高阶组件了，提供其需要的类型

// import { ToggleableMenuViaComponentInjection } from './togalShow'

// type RenderCallback = (args: number) => JSX.Element //JSX是react下的一个namespace, ts的namespace还是得去看一下到底是什么。。。

// type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;ComponentType其实就是sfc和component的联合类型
// ts中结构赋值的用法
// tslint:disable-next-line:no-console
console.log('app查看', app._models)
interface IBtnProps {
	className?: string
	children?: ReactNode
	onClick(e: MouseEvent<HTMLElement>): void
}
const Button = ({ onClick: handleClick, children, className }: IBtnProps) => (
	<button className={className} onClick={handleClick}>
		{children}
	</button>
)

interface IProps {
	// [prop:string]:any
	className: string
	onClick(e: MouseEvent<HTMLElement>): void
}

const Button2: SFC<IProps> = ({ onClick: handleClick, children, className }) => {
	return (
		<button className={className} onClick={handleClick}>
			{children}
		</button>
	)
}

const inintalState = { clickCount: 0 }
// console.log(1111111, Readonly<typeof inintalState>)
type State = DeepReadonly<typeof inintalState>

/*
我一直有一个不解的地方，为什么继承一个Component的时候，一定要使用泛型
答：是源码里面要求的，我们继承，其实就相当于调用了，使用的时候最好去看一下源码，然后记得readonly, private等修改符
// React Component types源码
class Component<P, S> {
        constructor(props: Readonly<P>);
        setState<K extends keyof S>(
            state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
            callback?: () => void
        ): void;
        forceUpdate(callBack?: () => void): void;
        render(): ReactNode;
        readonly props: Readonly<{ children?: ReactNode }> & Readonly<P>;
        state: Readonly<S>;
        context: any;
        refs: {
            [key: string]: ReactInstance
        };
    }

*/
// interface IStore{
//   tsTest: ModalState
// }

// 这里定义了集合了redux和router
// history和location需要去history下获取，因为ts核心库也写了，所以自己一些就重复报错了，只能从全局获取
// 剩下的直接全局数据
type IProp = {
	// 高阶组件注入的参数，目前我能想到的就是变成可选参数，保证其在调用的时候检测不出错
	dispatch?: Dispatch // dispatch应该是没有必要写在这里的，应该是直接写在mapDispatchToProps
} & RouteType &
	ITsTestState

type t_aaa = { aa?: string; bb: number } & { dd: string; cc: boolean; aa: string }
// const a_tt: t_aaa = { aa: 'asdf', bb: 123, cc: true, dd: '' }
console.log('&的用法，求并集，&符号两边的都得包含才可以')

// const mapStateToprops: (store: IStore) => IStore = ({ tsTest }) => ({ tsTest })
const mapStateToprops: (store: { tsTest: ITsTestState }) => { tsTest: ITsTestState } = ({
	tsTest,
}) => ({ tsTest })
// const mapStateToprops: (store: T) => T = ({ tsTest }) < T > => ({ tsTest })
type IHandelTest = TsTest['handelTest'] // 通过Lookup Types 直接拿到类方法的类型
const handleTest: IHandelTest = () => {
	console.log('234567')
}
handleTest()

// 参数和返回值都是 ITsTestState类型
@connect(mapStateToprops)
class TsTest extends Component<IProp, State> {
	public readonly state: State = inintalState

	public render() {
		const { clickCount } = this.state
		// console.log(this.props.tsTest!.obj.a.b.c)
		console.log(this.props.tsTest)
		this.handelTest()
		return (
			<Fragment>
				<Button className={`${style.add} ${aaad.test1}`} onClick={this.handleIncrement}>
					+
				</Button>
				<div>
					<Button2 className={style.deleteBtn} onClick={this.handleDecrement}>
						-
					</Button2>
				</div>
				你点了我{clickCount}次{/* <div>{this.props.tsTest.time}</div> */}
				{/* {this.props.tsTest.tree} */}
				<div>
					<Button onClick={this.handleCombineReduxBtnClick}>结合redux啦</Button>
				</div>
				<div>
					{/* {this.props.match.path}/ts2 */}
					{/* 这其实就是组件注入的方式，render的时候 return <this.props.component match={}...> children </this.props.component> */}
					{/* 这种component注入 方式的话，好像没有看到有报警告的地方,ts直接把这个读取成了组件，然后其属性就和这里没有关系了，只有jsx语法的时候，才会去读具体的组件的属性是什么类型 */}
					<Route path={`${this.props.match.path}/ts2`} component={TsTest2} />
				</div>
				<Button onClick={this.handleLink}>跳转ts2路由</Button>
			</Fragment>
		)
	}
	private handleIncrement = () => this.setState(incrementClickCounts)
	private handleDecrement = () => this.setState(decrementClickCounts)
	private handelTest = () => {
		console.log('1234567', this.props)
	}
	private handleLink = () => {
		this.props.history.push('./ts/ts2')
	}
	private handleCombineReduxBtnClick = () => {
		console.log('fghjkl')
		const { dispatch } = this.props
		if (dispatch) dispatch({ type: 'tsTest/save', payload: { time: { s: '秒' } } })
	}
}
const incrementClickCounts = (preState: State) => ({ clickCount: preState.clickCount + 1 })
const decrementClickCounts = (preState: State) => ({ clickCount: preState.clickCount - 1 })
export default TsTest
