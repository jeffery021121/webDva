// /*
//  * @Author: barry sun
//  * @Date: 2018-06-12 14:23:12
//  * @Last Modified by: barry sun
//  * @Last Modified time: 2019-1-11 15:43:33
//  */

// import Schema from 'async-validator'
// import { async } from 'q';
// import React, { FocusEvent, PureComponent } from 'react'

// interface Status {
//   [keyName: string]: {
//     valiStatu?: number
//     status?: status
//     goodGuy?: boolean
//     schema?: Schema
//     value?: any
//   }
// }

// interface Value {
//   [keyName: string]: any
// }

// interface Istatus {
//   validate?: string
//   help?: string
// }

// interface Options {
//   rules: any[]
// }

// interface Error {
//   field: string
//   message: string
// }

// const Validator = (): Function => (WrappedComponent: any) => {
//   const Status: Status = {}
//   let clean: null | NodeJS.Timeout = null
//   let runCount = 0 // 统计每次render 中 getFieldDecorator 执行次数

//   const listen = (keyName: string) => (callback: Function) => (value: FocusEvent<HTMLInputElement> & string) => {
//     Status[keyName].valiStatu = 1
//     if (!callback) {
//       console.warn('缺少表单元素：' + keyName + '的 "data change" 函数')
//       return false
//     }
//     return callback(value) // 这个回调才是去做数据流
//   }

//   const resetStatu = (keyName: string) => {
//     Status[keyName].valiStatu = 0
//   }

//   const runCountReset = () => {
//     runCount = 0
//   }

//   const trigger = (keyName: string) => {
//     const { schema, value } = Status[keyName] // schema为引入组件的实例
//     const data = { [keyName]: value }
//     return new Promise((resove) => {
//       schema.validate(data, (errors: Error[] | null) => {
//         const { status } = updateStatus(data, errors)
//         Status[keyName].status = status
//         if (status.validate === 'success') {
//           resove(true)
//         } else {
//           resove(false)
//         }
//       })
//     })
//   }

//   const reset = () => {
//     for (let i of Object.keys(Status)) {
//       delete Status[i]
//     }
//   }

//   const check = (keyNames?: string[]) => {
//     const triggers = keyNames || Object.keys(Status)
//     return Promise.all(triggers.map((v) => trigger(v))).then((status) => {
//       return new Promise((resolve, reject) => {
//         if (status.filter((_) => _).length === status.length) {
//           resolve(true)
//         } else {
//           resolve(false)
//         }
//       })
//     })
//   }

//   const filter = (keyName: string) => {
//     Status[keyName].goodGuy = true
//     if (clean) return // 确保每次render只执行一次
//   }

//   const clear = () => {
//     for (let i of Object.keys(Status)) {
//       if (!Status[i].goodGuy) {
//         delete Status[i]
//       } else {
//         delete Status[i].goodGuy
//       }
//     }
//     clean = null // 等同于每次同步执行一轮getFieldDecorator 都会额外执行一个异步函数clean，用于检查已经不存在的校验数据
//   }

//   const getFieldDecorator = (data: Value, options: Options) => (callback: Function) => {
//     // 每次周期内累加，周期结束了会被重置
//     runCount++

//     // data为需要验证的数据一个键值对，opt是验证的规则，callback为回调,一进来渲染的时候就会执行
//     const keyName = Object.keys(data)[0]
//     const keyValue = Object.values(data)[0]
//     if (Object.keys(Status).indexOf(keyName) !== -1) {
//       Status[keyName].value = keyValue // 赋新值
//       if (Status[keyName].valiStatu) {
//         // 并且校验时机打开，这个校验时机只有在三层listen执行的时候才会打开
//         trigger(keyName) // 校验
//         resetStatu(keyName) // 重置校验时机，等待下次三层listen，即组件的onChange事件再次触发
//       }
//     } else {
//       // 不存在，则注册一个
//       const { rules = {} } = options
//       Status[keyName] = {
//         schema: new Schema({
//           // 每个key生成一个schema实例，向这个库中传入键和验证规则，和以前的初始化一样，注册一下
//           [keyName]: rules,
//         }),
//         status: {}, // 存储最终这一项的验证结果
//         value: keyValue, // 存储本次验证的值
//       }
//     }

//     filter(keyName) // 加入清理名单，名单之外的将被删除
//     const validator = {
//       // 这个对象是干嘛的啊？
//       listen: listen(keyName), // 这里给listen方法传入了第一个参数
//       status: Status[keyName].status, // 存储最终这一项的验证结果
//     }
//     return callback && callback(validator)
//   }

//   const updateStatus = (datas = {}, errors: Error[] | null) => {
//     let status = {
//       // 默认通过
//       validate: 'success',
//       help: '',
//     }
//     const errorObj: { [field: string]: string } = {}
//     errors &&
//       errors.map((v: any) => {
//         errorObj[v.field] = v.message
//       })
//     for (let i of Object.keys(errorObj)) {
//       // 其实有的话只有一个键
//       status = {
//         validate: 'error',
//         help: errorObj[i],
//       }
//     }
//     return {
//       status,
//     }
//   }

//   class Validator extends PureComponent<Props> {

//     public componentWillUnmount() {
//       reset()
//     }

//     public componentDidUpdate() {
//       clear()
//       console.log('runCount', runCount)
//       if (runCount === 0) {
//         reset()
//       }
//       runCountReset()
//       console.log('Status', Status)
//     }

//     public checked = async (keyNames?: string[]): Promise<{}> => {
//       const validator = await check(keyNames)

//       console.log('validator1', validator)

//       this.forceUpdate()

//       console.log('validator2', validator)

//       return validator
//     }

//     public render() {
//       return (
//         <WrappedComponent reset={reset} check={this.checked} getFieldDecorator={getFieldDecorator} {...this.props} />
//       )
//     }
//   }
//   return Validator
// }


// export default Validator
