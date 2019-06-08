import React from 'react'
import { Cmp3 as Com3 } from '@/components'
import { debounce } from 'lodash'

const Dynamic = (props) => {
	console.log('Dynamic组件的参数：', props)
	const {
		match: {
			params: { anyProp },
		},
	} = props
	return (
		<div>
			<button
				type="button"
				onClick={debounce(() => {
					console.log('lodash 1s')
				}, 1000)}
			>
				点我
			</button>
			我是路由Dynamic的组件,参数是:
			{anyProp}
			<div>
				<Com3 />
			</div>
		</div>
	)
}
export default Dynamic
