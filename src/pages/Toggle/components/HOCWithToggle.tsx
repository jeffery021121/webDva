// 使用renderProps提供的属性，用高阶组件做一个转手，只是输出形式的更改
import React, { ComponentType, MouseEvent, PureComponent } from 'react'
import Toggleable, { IRenderCallback, IRenderProps } from './Toggleable'

const HOCWithToggle = (Cpm: ComponentType<any>) =>
	class HOCWithToggleClass extends PureComponent<any> {
		public render() {
			const { props } = this
			// return <Toggleable render={(renderProps) => <Cpm {...props} {...renderProps} />} />
			return <Toggleable render={this.renderCallBack(props)} />
		}

		private renderCallBack = (props: any): IRenderCallback => (renderProps) => (
			<Cpm {...props} {...renderProps} />
		)
	}

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

// @HOCWithToggle
class TestCmp extends PureComponent<IProps> {
	public render() {
		const { show, toggle, title = '默认title', content = '默认content', children } = this.props
		return (
			<div style={{ background: 'pink' }}>
				<div
					onClick={this.handleClick(toggle)} 
				>
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

export default HOCWithToggle(TestCmp)
