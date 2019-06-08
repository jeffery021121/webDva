import React, { PureComponent } from 'react'
import Loading from '@/components/Loading'

const hadleUpdateModal = (modelObj) => (model) => {
	modelObj[model.namespace] = true
}

const regestModel = (app) => (model) => {
	model = model.default || model
	if (model.length) return model.forEach(regestModel(app)) // 同一个import可能会用多个model
	const modelObj = {}
	app._models.forEach(hadleUpdateModal(modelObj))
	if (modelObj[model.namespace]) return
	app.model(model)
}

const dynamicRegestModels = async ({ app, modelsFunc }) => {
	const modlesPromise = modelsFunc()
	const models = await Promise.all(modlesPromise) // 这个models可能是二维数组
	if (!models || !models.length) return new Date().valueOf()
	models.forEach(regestModel(app)) // 把多个import 依次传递给注册函数
	return new Date().valueOf()
}

const HocAsyncRegestModelCom = (asyncProp) => (Com) =>
	class extends PureComponent {
		state = {
			isModleReady: false,
			deadLine: 200,
		}
		componentDidMount = async () => {
			const startTime = new Date().valueOf()
			const regestResult = dynamicRegestModels(asyncProp) // 先执行起来
			const endTime = await regestResult
			const deadLine = 200 + startTime - endTime
			this.setState({ isModleReady: true, deadLine })
		}
		render() {
			const { isModleReady, deadLine } = this.state
			if (isModleReady) return <Com deadLine={deadLine} {...this.props} />
			return <Loading deadLine={deadLine} />
		}
	}
export default HocAsyncRegestModelCom
