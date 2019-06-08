import React, { ComponentType, MouseEvent, SFC } from 'react'
import WithDefaultProps from './WithDefaultProps'

// 这个高阶组件的作用就是讲传入的defaultProps变成可选属性，并重新注入

const DefaultProps = {
	items: [1, 2, 3, 4],
}

// 默认属性应该是可选属性
type IDefaultProps = Readonly<typeof DefaultProps>

type IProps = Readonly<
	{
		value: string
		handleClick: (e: MouseEvent<HTMLElement>) => void
		// color?:string//默认属性是可选属性，通过高阶组件转手的话，这里就可以写成是必选的，方便组件操作
	} & IDefaultProps
>
const Button: SFC<IProps> = (props) => {
	const { value, handleClick, items } = props
	console.warn('btn被更新')
	return (
		<button onClick={handleClick}>
			{value}
			{/* 使用可选属性的时候一定会出现的问题：使用非空断言，三元表达式，或者高阶组件 ， 三者中高阶组件是最没有侵染性的 */}
			{/* 非空断言{items![1]} */}

			{/* 高阶组件的做法是将传入的默认属性先设置为普通类型，然后再在高阶组件中转化一层，保证定义的地方和使用的地方都可以正确操作默认实行类型 */}
			{/* 使用高阶组件WithDefaultProps 包裹以后，这个问题就没有了 */}
			{items[1]}
		</button>
	)
}
// Button.defaultProps = DefaultProps
const NewButton = WithDefaultProps(DefaultProps, Button)
// let NewButton = Button
export default NewButton

const hanleClick=()=>{
	console.log('asdf')
}
const ComNew = () => (
	<>
		<NewButton
			handleClick={hanleClick}
			value="小明"
			items={[1, 2, 3]}
		/>
		{/* 未使用高阶组件之前，items是默认必填的，使用以后变成可选属性 */}
		<NewButton
			handleClick={hanleClick}
			value="asdf"
		/>
	</>
)
// console.log(ComNew)
