import { Form } from 'antd'
import FormItem from 'antd/lib/form/FormItem'
// @ts-ignore
import schema from 'async-validator'
import produce from 'immer'
import React, { Fragment, PureComponent } from 'react'

const { Item } = Form
interface IValiForm {
	setStateObj: (
		propName: 'value' | 'status' | 'descriptor',
	) => (prop: { [propName: string]: any }) => void
	getState: (propName: string) => IItem | {}
	verify: (propName: string) => void
	deleteProp: (propName: string) => void
	Item: typeof FormItem
}

export interface IItem {
	value: any
	status?: {
		validateStatus: "" | "success" | "warning" | "error" | "validating" | undefined
		help: string
	}
	descriptor?: { [propName: string]: any }
}

const prop: IValiForm = {
	setStateObj: (propName) => (prop) => {},
	getState: (propName) => ({}),
	verify: (propName) => {},
	deleteProp: (propName) => {},
	Item,
}
const valiContext = React.createContext(prop)

interface IProps {
	children: (prop: {
		checkStatus: () => Promise<boolean>
		getStates: () => { [propName: string]: any }
		reset: () => void
	}) => JSX.Element
}

const initState: { formData: { [propName: string]: IItem } } = {
	formData: {
		// name: {
		// 	value: '小明',
		// 	status: {
		// 		validateStatus: 'success',
		// 		help: '请填写对应的内容',
		//    descriptor:any,
		// 	},
		// },
	},
}

class ValiForm extends PureComponent<IProps> {
	public state = initState
	public render() {
		return (
			<Fragment>
				<valiContext.Provider
					value={{
						setStateObj: this.setStateObj,
						getState: this.getState,
						verify: this.verify,
						deleteProp: this.deleteProp,
						Item,
					}}
				>
					{this.props.children({
						checkStatus: this.checkStatus,
						getStates: this.getStates,
						reset: this.resetAll,
					})}
				</valiContext.Provider>
			</Fragment>
		)
	}

	// 这个方法应该通过context传递，listen内部和check应该都会用到该方法,更新formData内的方法
	private setStateObj: IValiForm['setStateObj'] = (propName) => (prop) => {
		// 这里了直接写setState的话，会出现那个react统一更新状态的坑，导致只有最后一个数据可以注册成功
		const [key, value] = Object.entries(prop)[0] as [string, any]

		this.setState((prevState: typeof initState) => {
			let immerData = produce(prevState.formData, (draftData) => {
				if (!draftData[key]) draftData[key] = { value: undefined }
				draftData[key][propName] = value
			})
			return { formData: immerData }
		})
	}

	// 校验函数
	private verify: IValiForm['verify'] = (propName) => {
		const { value, descriptor } = this.state.formData[propName]
		if (!descriptor) {
			// 不需要验证，直接返回正确的及结果
			return this.setStateObj('status')({
				[propName]: {
					validateStatus: '',
					help: '',
				},
			})
		}
		const source = {
			[propName]: value,
		}
		let validator = new schema(descriptor)
		type IErrors = Array<{ message: string }>
		validator.validate(source, (errors: IErrors) => {
			if (errors) {
				let message = ''
				if (errors && errors.length) {
					message = errors[0].message
				}
				return this.setStateObj('status')({
					[propName]: {
						validateStatus: 'error',
						help: message,
					},
				})
			}
			this.setStateObj('status')({
				[propName]: {
					validateStatus: '',
					help: '',
				},
			})
		})
	}

	// 重置校验结果
	private reset = (propName: string) => {
		this.setStateObj('status')({ [propName]: { validateStatus: '', help: '' } })
	}

	// 取出所有的status,然后统一验证，返回一个结果
	private checkStatus = async () => {
		// 先执行所有的验证，然后返回总的结果
		await Object.keys(this.state.formData).forEach(this.verify)

		let status = true
		Object.values(this.state.formData).forEach((item) => {
			if (!item.status) return
			const { validateStatus } = item.status
			if (validateStatus === 'error') status = false
		})
		return status
	}

	// 获取所有的value,对象的形式
	private getStates = () => {
		const { formData } = this.state
		let obj: { [propName: string]: any } = {}
		Object.entries(formData).forEach(([k, v]) => {
			obj[k] = v.value
		})
		return obj
	}

	// 通过键名获取对应的数据
	private getState: IValiForm['getState'] = (propsName) => {
		const { formData } = this.state
		return formData[propsName] || {}
	}

	// 注销函数，删除对应的数据
	private deleteProp: IValiForm['deleteProp'] = (propsName) => {
		this.setState((prevState: typeof initState) => {
			let immerData = produce(prevState.formData, (draftData) => {
				delete draftData[propsName]
			})
			return { formData: immerData }
		})
	}

	// 清空目前的验证状态,直接制空现在的formData
	private resetAll = () => {
		Object.keys(this.state.formData).forEach(this.reset)
	}
}

export default ValiForm
export { valiContext }

/* 
初始注册的数据，一定要有value和descriptor,不能有status,统一验证的时候直接把数据拿出来做统一的验证。
*/

/* 
目前已经实现了常规表格验证，简单的动态表格验证，下一步目标：
1.实现复杂动态表格验证
    (难点：动态的source属性，可参考自定义表单的实现，同名source会出现覆盖的情况，其实目前组件已经支持了，
    主要是写法上的问题，应该还是使用拼接式的写法，实例参考审批流添加多个审批人的情况，自动实现uuid),
2.实现非受控表单元素验证
3.兼容受控和非受控组件的验证，提供同一套api
*/
