import { isFunction } from '@/utils/publicFunc'
import React, { ComponentType, ReactNode, SFC } from 'react'
import { IProps } from './MenuItem'
import Toggleable, { IRenderCallback, IRenderProps } from './Toggleable'

// 还是需要引入对于show和toggle的定义IRenderProps，这种用法的好处是不会侵入Toggle组件，而且还能保证类型的正确性
// 这个IProps,是给Toggleable用的

type IRenderCallbackAssembly = Partial<{
	render: IRenderCallback
	children: IRenderCallback | ReactNode
	component: ComponentType<IProps & Partial<IRenderProps>>
	show: IRenderProps['show']
}>

const InjectMenuItem: SFC<IProps & IRenderCallbackAssembly> = ({
	title = '默认title',
	content = '默认内容',
	children,
	intro,
	render,
	component,
	show,
}) => {
	return (
		<div>
			<p>{intro}</p>
			<div style={{ background: 'pink' }}>
				{/* <Toggleable<IProps>//这个是ts2.9以后支持的工能，可以直接在标签上传递泛型 */}
				<Toggleable<IProps> // 这个是ts2.9以后支持的工能，可以直接在标签上传递泛型，   这个组件的泛型就是props的类型就可以了
					component={component}
					show={show}
					// content={content}
					// 不得不承认，这个代码是有问题的，
					// 给定的props类型，能判断出是否正确,但是多出来的变量会被接受
					// 这里的props的类型还是没有办法完全判断出来，可以做提示，但是多了，出现了不一样的类型还是搞不定

					// 但是已知属性类型错误的时候，会把多的也给揪出来, 同时这个组件错传 属性参数的时候也会暴露出 props的错误来
					// 总觉得是IDE的锅
					props={{ title, content, intro: 'asdf' }}
					children={children}
					render={render}
				/>
				{isFunction(children) ? null : children}
			</div>
		</div>
	)
}
export default InjectMenuItem
