// /*
//  * @Author: barry sun
//  * @Date: 2018-06-12 14:23:12
//  * @Last Modified by: barry sun
//  * @Last Modified time: 2018-06-27 17:43:33
//  */

// import Schema from 'async-validator'

// const Validator = () => {
// 	const Status = {} // 各项结果的集合
// 	let clean = null

// 	const listen = (keyName) => (callback) => (value) => {
// 		// 开启校验时机
// 		Status[keyName].valiStatu = 1
// 		// console.log('value:', value)
// 		// console.log('callback:', callback)
// 		if (!callback) {
// 			// 不存在回调的情况，这个既然三层才能进来，那么第三个参数一定是第二参数的的参数才行，所以搞不懂为什么做这个验证，
// 			// 这种情况：<Input onChange={listen()} className={style.input} value={number} placeholder='出库数量' />
// 			// 因为如果在ui层不写那个listen的参数，也就是第二个参数callback不写,组件的change事件还是会触发，这个value值会自动传入,还是会执行到第三层
// 			// 正常的用法：<Input onChange={listen(onChange('number', key, true))} className={style.input} value={number} placeholder='出库数量' />
// 			console.warn('缺少表单元素：' + keyName + '的 "data change" 函数')
// 			return false
// 		}
// 		return callback(value) // 这个回调才是去做数据流
// 	}

// 	const resetStatu = (keyName) => {
// 		// 重置校验时机
// 		Status[keyName].valiStatu = 0
// 	}

// 	const trigger = (keyName) => {
// 		// 校验，最后结果返回true或者false
// 		let { schema, value } = Status[keyName] // schema为引入组件的实例

// 		if (typeof value === 'string') {
// 			value = value.replace(/(^\s*)|(\s*$)/g, '') // 清除value两边空格，不能让他提交。
// 		}

// 		const data = { [keyName]: value }
// 		let validator = false
// 		// validate为实例提供的方法，接收两个参数，验证的键值对和结果的回调
// 		schema.validate(data, (errors, fields) => {
// 			// 这两个参数只有在错误的时候才会返回为下面那个样子，正确的话，两个都是null
// 			// errors: [{field:"number_40adb792-1e6d-638b-e84c-fc8d65ad89ba",message:"请输入出库数量!"}]
// 			// {number_40adb792-1e6d-638b-e84c-fc8d65ad89ba: [{field:"number_40adb792-1e6d-638b-e84c-fc8d65ad89ba",message:"请输入出库数量!"}]}
// 			const { status } = updateStatus(data, errors)
// 			Status[keyName].status = status
// 			if (status.validate === 'success') {
// 				validator = true
// 			}
// 		})
// 		return validator
// 	}

// 	const reset = () => {
// 		for (let i of Object.keys(Status)) {
// 			delete Status[i]
// 		}
// 	}

// 	const check = (keyNames) => {
// 		// 校验全部
// 		let validator = true
// 		const triggers = keyNames || Object.keys(Status)
// 		for (let i of triggers) {
// 			const validate = trigger(i)
// 			if (!validate) validator = false
// 		}
// 		return validator
// 	}

// 	// getFieldDecorator 每次执行的时候，都执行一次clear, 每次clear都会删除掉标记，直到标记不被记录，证明该条记录被删除
// 	const filter = (keyName) => {
// 		Status[keyName].goodGuy = true
// 		if (clean) return // 确保每次render只执行一次
// 		clean = setTimeout(() => {
// 			// 设置为0，的意义，等主线程的任务结束，消息队列才会进入
// 			clear()
// 		}, 0)
// 	}

// 	// 凡是不带有“良民证”属性的校验数据都会被删除
// 	const clear = () => {
// 		for (let i of Object.keys(Status)) {
// 			if (!Status[i].goodGuy) {
// 				// 没有goodGuy的，就证明没有进入filter，即已经删除了
// 				delete Status[i]
// 			} else {
// 				delete Status[i].goodGuy
// 			}
// 		}
// 		clean = null // 等同于每次同步执行一轮getFieldDecorator 都会额外执行一个异步函数clean，用于检查已经不存在的校验数据
// 	}

// 	const getFieldDecorator = (data, options) => (callback) => {
// 		// data为需要验证的数据一个键值对，opt是验证的规则，callback为回调,一进来渲染的时候就会执行(主要是为了注册Status)
// 		const keyName = Object.keys(data)[0]
// 		const keyValue = Object.values(data)[0]
// 		if (Object.keys(Status).indexOf(keyName) !== -1) {
// 			// 假如注册列表中存在  ？？这个函数只有在渲染的时候执行，为什么会存在？因为render，这个时候继续执行渲染说明有数据流变化了，这个时候，判断到底是新增还是改变原有状态了
// 			// 新增为未注册，不会进入这里的
// 			// 改变原有状态,已注册，会改变这里，此时验证状态已经打开，则需要验证，同时开始验证
// 			// 删除的话,删除的哪一组因为已经不再渲染了，所以根本不会进入插件
// 			Status[keyName].value = keyValue // 赋新值
// 			if (Status[keyName].valiStatu) {
// 				// 并且校验时机打开，这个校验时机只有在三层listen执行的时候才会打开
// 				// 这里有个现象，那就是函数的触发时机，在第一次render的时候，都是去下面注册了，等onChange事件触发的时候，先去执行了打开校验时机事件，然后更新状态，因为二次render，再次渲染
// 				// 又一次执行本次函数，这时校验时机已经处于打开的状态了，执行校验，并且在最后，关闭校验时机
// 				trigger(keyName) // 校验
// 				resetStatu(keyName) // 重置校验时机，等待下次三层listen，即组件的onChange事件再次触发
// 			}
// 		} else {
// 			// 不存在，则注册一个
// 			const { rules = {} } = options
// 			Status[keyName] = {
// 				schema: new Schema({
// 					// 每个key生成一个schema实例，向这个库中传入键和验证规则，和以前的初始化一样，注册一下
// 					[keyName]: rules,
// 				}),
// 				status: {}, // 存储最终这一项的验证结果
// 				value: keyValue, // 存储本次验证的值
// 			}
// 		}

// 		filter(keyName) // 加入清理名单，名单之外的将被删除

// 		const validator = {
// 			// 这个对象是干嘛的啊？
// 			listen: listen(keyName), // 这里给listen方法传入了第一个参数
// 			status: Status[keyName].status, // 存储最终这一项的验证结果
// 		}
// 		// console.log('看回调参数：', validator)
// 		return callback && callback(validator)
// 		// 执行回调，渲染组件，因为整个UI的渲染都是在回调中,回调中会需要两个参数，分别是listen和status
// 		// ui中的listen是一个函数，其参数又是一个回调
// 		// 这里，插件中的listen和UI中的listen重名了，所以有点难以理解，所以UI中的listen的调用相当于这个listen的一层闭包调用-----> validator.listen === this.listen(keyName)
// 		// 在页面的callback中又是一个闭包，简化的调用就是 this.listen(keyName)（cb）('number')
// 		// 在listen代码中，我们只是在有三层参数的情况下才有逻辑，其余的都是保存需要的参数，运用函数柯里化，返回一个函数继续等待参数，直到满足情况
// 	}

// 	const updateStatus = (datas = {}, errors) => {
// 		let status = {
// 			// 默认通过
// 			validate: 'success',
// 			help: '',
// 		}
// 		const errorObj = {}
// 		// errors: [{field:"number_40adb792-1e6d-638b-e84c-fc8d65ad89ba",message:"请输入出库数量!"}]正确的时候为null
// 		errors &&
// 			errors.map((v) => {
// 				errorObj[v.field] = v.message
// 			})
// 		for (let i of Object.keys(errorObj)) {
// 			// 其实有的话只有一个键
// 			status = {
// 				validate: 'error',
// 				help: errorObj[i],
// 			}
// 		}
// 		return {
// 			status,
// 		}
// 	}

// 	return {
// 		getFieldDecorator,
// 		reset,
// 		check,
// 	}
// }

// export default Validator

// /*

// Vali.getFieldDecorator({id}, {
//   rules: [
//     { type: 'number', required: true, message: '名称不能为空!' },
//     { type: 'number', max: 56, message: '不超过56个字符!' }
//   ]
// })({listen, status})(<FormItem validateStatus={status.validate} help={status.help} required label={'角色名'}>
//   <Select placeholder='请选择备品备件' value={id} onChange={(v) => listen(v)} style_={{ width: '247px' }} />
// </FormItem>)

// */
// /*
// 该组件最大的问题是，所有的状态是外部管理的，不属于state或者prop,也就意味着外部状态的改变不能够触发渲染
// 只有使用forceUpdate强制刷新渲染，但是无状态组件内部又没有这个东西，所以，验证组件最好的方式就是使用一个高阶组件或者回调渲染
// 去替换外部状态，从而实现渲染更新数据。
// */
