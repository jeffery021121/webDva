import React, { Fragment, PureComponent } from 'react'
import { IItem, valiContext } from './ValiForm'
// import {IItem} from ''

/* 
这里要通过context拿到一些方法和属性
这里需要返回给页面需要的 help和status，以及listen方法

如果要写无状态的验证的话，换成sourceName

还有一种情况，那就是不需要验证的情况，那么就需要做一个判断
*/
// 整个文件ts的写法都是错的，不要借鉴
interface IProps {
	children: (prop: any) => JSX.Element
	rules?: any
	source?: { [propName: string]: any }
	help?: string
	sourceName?: string
  needFormItem?: boolean
  [propName:string]:any
}

/* 
一个check对应一个验证，onChange触发 或者 form的check方法触发会统一执行验证，然后更新form里面的数据
如果未验证，不更新formItem需要的status和help属性，通过渲染回调的方式，把对应的状态传递出去
通过context拿到改变form元素的方法

如果是把验证写在check中的话，那么久彻底解决了动态验证的问题，因为每添加一条验证，就意味着添加一个check

这里有一个验证重复的问题，可以参考model注册的逻辑
*/

const STATUS = {
	validateStatus: '' as '' | 'success' | 'warning' | 'error' | 'validating' | undefined,
	help: '',
}

class Check extends PureComponent<IProps> {
	public updateState: any = null
	public deleteProp: any = null
	public state: any = {}
	public componentDidMount = async () => {
		const { source, sourceName } = this.props
		let key = undefined as any
		if (source) [key] = Object.keys(source) as [string, any]
		if (sourceName) key = sourceName

		await this.setState({ propName: key })
		this.registProp()
	}
	public render() {
		const { source, sourceName, needFormItem = false, ...props } = this.props
		return (
			<valiContext.Consumer>
				{({ setStateObj, getState, verify, deleteProp, Item }) => {
					let propName = ''
					if (source) {
						propName = Object.keys(source)[0]
					} else if (sourceName) {
						propName = sourceName
					} else {
            // console.error('source和sourceName有且必有一个')
            throw new Error('source和sourceName有且必有一个')
					}

					if (!this.updateState) this.updateState = setStateObj
					if (!this.deleteProp) this.deleteProp = deleteProp
					const { status = STATUS } = getState(propName) as IItem

					if (needFormItem) {
						// console.log('数据：', status)
						return (
							<Item help={status.help} validateStatus={status.validateStatus} {...props}>
								{this.props.children({
									listen: this.listen(setStateObj, verify),
								})}
							</Item>
						)
					}
					return (
            // 默认返回没有Item的版本
						<Fragment>
							{this.props.children({
								listen: this.listen(setStateObj, verify),
								help: status.help,
								validateStatus: status.validateStatus,
							})}
						</Fragment>
					)
				}}
			</valiContext.Consumer>
		)
	}

	public componentWillUnmount() {
		const { propName } = this.state
		this.deleteProp(propName)
	}

	// 注册函数，同时要把方法注册上去
	private registProp = () => {
		if (this.updateState) {
			const { rules, source, sourceName } = this.props
			if (source && sourceName) {
				return console.error('sourceName和source属性只能使用一个，以区分是否为受控组件')
			}
			const { propName } = this.state
			// let [key] = Object.keys(source) as [string, any]
			if (source) this.updateState('value')(source)
			if (rules) {
				let descriptor = {
					// 这个格式有点特殊
					[propName]: { [propName]: rules },
				}
				this.updateState('descriptor')(descriptor)
			}
			if (sourceName) this.updateState('value')({ [sourceName]: undefined })
		}
	}

	/* 
  监听数据改变，执行表单验证,传出回调函数，同时修改对应的存在form中的值
  通过rules，source拼接出descriptor
  */
	private listen = (
		setStateObj: (propName: 'value' | 'status') => (prop: { [propName: string]: any }) => void,
		verify: (propName: string) => any,
	) => (cb: any) => async (...props: Array<any>) => {
		if (cb) await cb(...props)

		const { source, sourceName, rules } = this.props
		const { propName } = this.state

		if (source) setStateObj('value')(source)
		if (sourceName) {
			const [prop1] = props
			let value: any = prop1
			if (prop1 && prop1.target) value = prop1.target.value
			setStateObj('value')({ [sourceName]: value })
		}
		if (rules) verify(propName)
		// let [key] = Object.keys(source) as [string, any]
	}
}

export default Check
