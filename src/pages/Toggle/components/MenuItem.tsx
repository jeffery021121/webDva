// 第一版menuitem
// import React, { MouseEvent, SFC } from 'react'
// import { IRenderProps } from './Toggleable'
// type IProps = Partial<{
//   title: string
//   content: string
// }>

// // IProps中没有title好的content,但是我们额外属性又需要传递

// const MenuItem: SFC<IProps & IRenderProps> = ({ show, toggle, title = '默认title', content = '默认内容' }) => {
//   return (
//     <div style={{ 'background': 'pink' }}>
//       <div onClick={(e: MouseEvent<HTMLElement>) => { toggle(e) }}>
//         <h1>{title}</h1>
//       </div>
//       {show && <p>{content}</p>}
//     </div>
//   )

// }
// export default MenuItem

import React, { MouseEvent, SFC } from 'react'
import { IRenderProps } from './Toggleable'

export type IProps = Partial<
	Readonly<{
		title: string
		content: string
		intro: string
	}>
>

const handleClick = (toggle: IRenderProps['toggle'] | undefined) => (
	e: MouseEvent<HTMLElement>,
) => {
	if (toggle) toggle(e)
}

const MenuItem: SFC<IProps & Partial<IRenderProps>> = ({ title, toggle, show, content }) => (
	<div>
		<div onClick={handleClick(toggle)}>
			<h1>{title}</h1>
		</div>
		{/* {show && <p>{content}属性类型查看{show.length}</p>} */}
		{show && <p>{content}</p>}
	</div>
)
// let Cpm = (MenuItem as any) as ComponentType<IProps & Partial<IRenderProps>>
export default MenuItem
