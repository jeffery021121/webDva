import { Button, Form, Input, Select } from 'antd'
import { connect } from 'dva'
import React, { Fragment, PureComponent } from 'react'
import { Check, ValiForm } from './Components'
import style from './index.scss'

// const { Check } = ValiForm

const { Item: FormItem } = Form
const { Option } = Select
interface IProps {
	aa: string
	vali: any
	dispatch: any
}

const NAMESPACE = 'vali'

class ValiCmp extends PureComponent<IProps> {
	public state = { deleteFlag: false }
	private checkStatus = (null as any) as () => Promise<boolean>
	private reset = (null as any) as () => void

	private getStates = (null as any) as () => { [propName: string]: any }
	public render() {
		const { dispatch, vali } = this.props
		const { name, address, sex, name2, address2, sex2 } = vali.submitObj
		// console.log('render更新以后：', name)
		return (
			<div style={{ margin: 'auto', width: '500px' }}>
				<p>这个是表单验证展示组件</p>
				<p>-------分割线-------</p>
				<div className={style.box}>
					<ValiForm>
						{(formProps) => {
							const { checkStatus, reset, getStates } = formProps
							if (!this.checkStatus) this.checkStatus = checkStatus
							if (!this.reset) this.reset = reset
							if (!this.getStates) this.getStates = getStates
							// console.log('formProps；', formProps)
							return (
								<Fragment>
									<Check
										rules={[
											{ type: 'string', required: true, message: 'message1!' },
											{ max: 10, message: '不超过10个字符,msg2!' },
										]}
										source={{ name }}
										label="姓名"
										needFormItem={true}
									>
										{({ listen }) => (
											// <FormItem
											// 	label="姓名"
											// 	help={help}
											// 	validateStatus={validateStatus}
											// >
											<Fragment>
												<Input
													value={name}
													style={{ width: 200 }}
													onChange={listen(this.updateSubmitObj('name'))}
												/>
											</Fragment>

											// </FormItem>
										)}
									</Check>

									<Check
										rules={{
											type: 'string',
											required: true,
											message: '前端测试message22222!',
										}}
										source={{ address }}
										label="地址"
										hasFeedback={true}
										needFormItem={true}
									>
										{(checkProps) => {
											const { listen } = checkProps
											return (
												<Input
													value={address}
													style={{ width: 200 }}
													onChange={listen(this.updateSubmitObj('address'))}
												/>
											)
										}}
									</Check>
									{!this.state.deleteFlag && (
										<Check
											rules={{
												type: 'string',
												required: true,
												message: '前端测试message22222!',
											}}
                      source={{ sex }}
                      // sourceName={'sex'}
										>
											{(checkProps) => {
												const { listen, help, validateStatus } = checkProps
												return (
													<FormItem label="性别" help={help} validateStatus={validateStatus}>
														<Select
															onChange={listen(this.updateSubmitObj('sex'))}
															style={{ width: 200 }}
															value={sex}
														>
															<Option value="male">男</Option>
															<Option value="female">女</Option>
														</Select>
													</FormItem>
												)
											}}
										</Check>
									)}
								</Fragment>
							)
						}}
					</ValiForm>
					<Button
						// tslint:disable-next-line:jsx-no-lambda
						onClick={async () => {
							if (this.checkStatus) console.log('验证结果', await this.checkStatus())
						}}
					>
						验证所有数据
					</Button>
					<Button
						// tslint:disable-next-line:jsx-no-lambda
						onClick={() => {
							this.reset()
						}}
					>
						清空验证结果
					</Button>
					<Button
						// tslint:disable-next-line:jsx-no-lambda
						onClick={() => {
							let obj = this.getStates()
							console.log('obj:', obj)
						}}
					>
						获取所有值
					</Button>
					<Button
						// tslint:disable-next-line:jsx-no-lambda
						onClick={() => {
							this.setState({ deleteFlag: !this.state.deleteFlag })
						}}
					>
						toggle最后一个
					</Button>
				</div>
			</div>
		)
	}
	private updateSubmitObj = (propName:string) => (_value:any) => {
		let value = _value
		if (_value && _value.target) value = _value.target.value
		const { submitObj } = this.props.vali
		this.props.dispatch({
			type: `${NAMESPACE}/updateState`,
			payload: { submitObj: { ...submitObj, [propName]: value } },
		})
	}
}

export default connect(({ vali }:any) => ({ vali }))(ValiCmp)

/* 
动态修改验证通过
互不干扰验证通过，同一个页面两个form，随意修改，可以相互关联也可以互不干扰
问题：
如果两个form公用一个source,那么listen只是监听本表单元素的onchange就是不对的了，
最好的方式是实现vue的双向绑定，不过双向绑定的数据只能存在对应的组件中，也就是触发listen的时机要发生一定的改变才行
*/
