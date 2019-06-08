import React, { lazy, Suspense } from 'react'
import { Loading } from '@/components'

import { HocAsyncRegestModel } from '@/components/HOC'

const createCom = (LazyCom) => (props) => {
	const { deadLine, ...otherProp } = props
	return (
		<Suspense fallback={<Loading deadLine={deadLine} />}>
			<LazyCom {...otherProp} />
		</Suspense>
	)
}

export default (dynamicComponentFunc, asyncProp) => {
	// asyncProp = { app, modelsFunc }
	const LazyCom = lazy(dynamicComponentFunc)
	const Com = createCom(LazyCom)
	if (!asyncProp) return Com
	return HocAsyncRegestModel(asyncProp)(Com)
}
