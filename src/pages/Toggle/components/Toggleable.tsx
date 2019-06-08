import { isFunction } from '@/utils/publicFunc'
import React, { Component, ComponentType, PureComponent, ReactNode } from 'react'
// 该组件的功能，对外提供一个 show属性 和一个修改show属性的 方法toogle(方法都应该写成私有的)
// 只提供数据，不做UI

/*
// 第一版本完成renderProps，实现上面提出的工能

type IProps = {
  render: (props: { show: IState['show'], toggle: voidFunc }) => ReactNode
}
const initState = {
  show: false
}
type IState = typeof initState
class Toggleable extends PureComponent<IProps, IState>{
  readonly state: IState = initState
  private toggle = () => {
    this.setState(toggleShow)
  }
  render() {
    return (
      this.props.render({ show: this.state.show, toggle: this.toggle })
    )
  }
}
const toggleShow = (preState: IState) => ({ show: !preState.show })

*/

/*
// 第二个版本 提取类型，定义成 type 不再写成行内属性，并且支持children渲染

// state和props最起码应该是只读属性啊
// 把reactNode替换成JSX.Element ,要求的更加具体一些

type IRenderProps = Readonly<{ show: IState['show'], toggle: <T=any>(e: T) => void }>
type IRenderCallback = (props: IRenderProps) => JSX.Element

// 高阶组件调用自己的属性或者方法应该是确定的，不用可选属性
// 外界使用高阶组件的时候，需要使用的高阶组件的属性个数是不一定的
//  eg:高阶组件使用渲染回调的方式提供了5个参数，如果使用者只是用了3个参数，

// 应该说，处理默认属性，其他从prop上获取到的属性，应该都是可选属性

type IProps = Partial<Readonly<{
  render: IRenderCallback
  children: IRenderCallback
}>>

const initState = { show: false }
type IState = Readonly<typeof initState>

// enum enum1{a='aaaa'}

class Toggleable extends PureComponent<IProps, IState>{
  readonly state: IState = initState
  // static defProps = this.props
  private toggle =() => {//这里一般来说不一定传递参数，传递参数的话，也不应该在这里定义，应该使用泛型
    this.setState(toggleShow)
  }
  render() {
    const { render,children}=this.props
    const renderProps = { show: this.state.show, toggle: this.toggle }
    if (render){
      return (
        render(renderProps)
      )
    }

    return isFunction(children) ? children(renderProps):null

  }
}

const toggleShow = (preState: IState) => ({ show: !preState.show })
*/

/*
// 组件注入 component Injection

const initState = { show: false }
type IState = Readonly<typeof initState>

export type IRenderProps = Readonly<{ show: IState['show'], toggle: <T=any>(e: T) => void }>
export type IRenderCallback = (props: IRenderProps) => JSX.Element

// 高阶组件调用自己的属性或者方法应该是确定的，不用可选属性
// 外界使用高阶组件的时候，需要使用的高阶组件的属性个数是不一定的
//  eg:高阶组件使用渲染回调的方式提供了5个参数，如果使用者只是用了3个参数，

// 应该说，处理默认属性，其他从prop上获取到的属性，应该都是可选属性

// 在这里定义component组件需要的 props属性 的类型，使用泛型
// type DefaultProps<P extends object = InitObj> = { props: P } & Pick<IState, 'show'>
type DefaultProps<P> = { props: P }
// type DefaultProps<P extends object=InitObj> = { props: P }

// 都变成泛型类型，用& 连接外部传入的属性
type IProps<P extends object=InitObj> = Partial<
  Readonly<
    {
      render: IRenderCallback
      children: IRenderCallback | ReactNode
      component: ComponentType<Partial<IRenderProps> & P>//这里故意传递了any，因为通过泛型传递过来的是这个组件的props的类型 ， 不是这个组件的IProps
    }
    & DefaultProps<P>
  >
>

class Toggleable<T extends object=InitObj> extends PureComponent<IProps<T>, IState>{//IProps的泛型得通过组件的泛型传递
  readonly state: IState = initState
  // static defProps = this.props
  private toggle = () => {//这里一般来说不一定传递参数，传递参数的话，也不应该在这里定义，应该使用泛型
    this.setState(toggleShow)
  }
  render() {
    const { render, children, component: InjectedCmp, props } = this.props
    // props其实是要传递给这个注入的组件的
    // renderprops在使用时更像是默认属性，，render和childrn的形式不需要props，因为它们可以直接在使用时的函数中传递
    // 以前剩余参数的形式存在，太灵活了，不利于确定它的类型以及内部属性的类型

    const renderProps = { show: this.state.show, toggle: this.toggle }
    // 通过判断语句使ts避免掉关于空类型的检测

    if (InjectedCmp) {

      return (
        // 这里有点高阶组件的味道了,传递原始参数，传递新的renderProps,及时props为undefined，解构也不会出错
        <InjectedCmp {...renderProps} {...props!}>
          {children}
        </InjectedCmp >
      )
    }
    if (render) {
      return (
        render(renderProps)
      )
    }
    // toggle组件内部，非函数children不去渲染，外部自己去处理
    return isFunction(children) ? children(renderProps) : null

  }
}

const toggleShow = (preState: IState) => ({ show: !preState.show })
*/

/*
实现完全可控的toggle，外部按钮可以直接控制toggleable内部的属性

初始化数据的时候，show的属性不再默认为false,而是this.props.false
而且这个show，直接写成默认属性

增加componentWillReceiveProps 生命周期，判断，如果props的show属性发生了变化，修改state的show
react componentWillReceiveProps变成了unsafe,下一个版本就删除了，使用新的方法 static getDerivedStateFromProps

如果想要同时控制几个toggle，那么这几个toggle组件内部传入的时候传入同一个show就可以了

*/

// const initState = { show: false, preProps:{} }
type IState<T = any> = Readonly<{
	show: boolean
	preProps: T
}>

export type IRenderProps = Readonly<{ show: IState['show']; toggle: <T = any>(e: T) => void }>
export type IRenderCallback = (props: IRenderProps) => JSX.Element

type DefaultProps<P> = Readonly<{ props: P } & Pick<IState, 'show'>> // 第一步修改，默认属性添加show

type IProps<P extends object = InitObj> = Partial<
	Readonly<{
		render: IRenderCallback
		children: IRenderCallback | ReactNode
		component: ComponentType<Partial<IRenderProps> & P>
	}> &
		DefaultProps<P>
>

class Toggleable<T extends object = InitObj> extends PureComponent<IProps<T>, IState<IProps<T>>> {
	// UNSAFE_componentWillReceiveProps(nextProps: IProps<T>) {//react17就将移除这些特性
	//   const { show } = this.props
	//   if (nextProps.show !== show) this.setState({ show: !show })
	// }

	/*
  静态成员的话不能引入泛型，所以T换成了InitObj
  但是又要使用props所以只能结合componentDidUpdate,将每次的props都保存起来
  */
	public static getDerivedStateFromProps(
		nextProps: IProps<InitObj>,
		preState: IState<IProps<InitObj>>,
	) {
		const { show } = preState.preProps
		if (nextProps.show !== show) {
			return { show: !show }
		}
		return null
	}
	public readonly state: IState = { show: false, preProps: this.props }
	public componentDidUpdate(preProps: IProps<T>) {
		const { show } = this.props
		// 其实如果这里只是使用show的话，我们可以只存preShow这个字段，就不用存preProps了
		if (show !== preProps.show) {
			this.setState({ preProps: this.props })
		}
	}

	public render() {
		const { render, children, component: InjectedCmp, props } = this.props

		const renderProps = { show: this.state.show, toggle: this.toggle }

		if (InjectedCmp) {
			return (
				// tslint:disable-next-line:no-non-null-assertion
				<InjectedCmp {...renderProps} {...props!}>
					{children}
				</InjectedCmp>
			)
		}
		if (render) {
			return render(renderProps)
		}
		return isFunction(children) ? children(renderProps) : null
	}
	private toggle = () => {
		// console.log('点击触发')
		this.setState(toggleShow)
	}
}

const toggleShow = (preState: IState) => ({ show: !preState.show })

export default Toggleable
