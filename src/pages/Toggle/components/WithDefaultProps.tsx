import { ComponentType } from 'react'

// 高阶组件，目的是给组件添加上对应的默认属性

// 高阶组件其实就是一个函数，接收一个组件，然后返回一个新的组件

// 高阶组件只能用类组件作为参数吗？不是，但是高阶组件只能返回一个类组件,因为eract要求返回的值必须是函数或者类，函数的话就不能实现属性注入了

// 一般高阶组件的写法 jsx语法
/*
const WithDefaultProps = Com => class WithDefaultPropsHoc extends PureComponent{
  render() {
    return (
      <Com {...this.props} />
    )
  }
}
*/
// 这个高阶组件的作用就是将传入的defaultProps变成可选属性，并重新注入
// 我们这个高阶组件很独特，是用来处理类型的，因为不需要属性注入，所以可以写成函数的形式
const WithDefaultProps = <P extends object, DP extends Partial<P> = Partial<P>>(
	defaultProps: DP,
	Cmp: ComponentType<P>,
) => {
	type RequiredProps = Omit<P, keyof DP> // Omit 取出P独有的类型
	type Props = Partial<DP> & Required<RequiredProps> //  这里的写法有待商榷我觉得是不用前面那个Required的，因为常规props中也可能有传递了没用的属性

	// 这里注入默认属性，但是也是Partial形式的啊。。。
	Cmp.defaultProps = defaultProps

	// 这里不太了解，为什么使用两次断言
	/*
  答案：如果不使用两次断言的话，Cmp as ComponentType<Props> 会报错，
  Prpos类型 显然 和上面定义的 P类型不一定是一致的（于是ts报错说两个类型是不可以比较的），
  所以通过any转手一层，再进行一次断言
  */
	// return Cmp as ComponentType<Props>
	return (Cmp as ComponentType<any>) as ComponentType<Props>
}
export default WithDefaultProps
