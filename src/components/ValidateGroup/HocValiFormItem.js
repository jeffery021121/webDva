// import React, { Component } from 'react'
// //step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2
// import { valiContext } from './ValiForm'

// //使用高阶函数处理formItem，截取rules字段和valiOption，同时使用getFieldDecorator处理formItem，最后提供listen和status
// const valiItemContext = React.createContext({ listen: () => { }, status: {} })

// // const HocValiFormItem = (Com) => class HocValiFormItem extends Component {
// const HocValiFormItem = (Com) => (props) => {
//   // render() {
//   // const {props} = this
//   const { rules, valiOption } = props
//   return (
//     < valiContext.Consumer >
//       {
//         ({ getFieldDecorator }) => {
//           return (
//             <div>
//               {
//                 getFieldDecorator(valiOption, { rules })(
//                   ({ listen, status }) => {
//                     // console.log('看状态：', status)
//                     return (
//                       <valiItemContext.Provider value={listen}>
//                         <Com
//                           {...props}
//                           validateStatus={status.validate}
//                           help={status.help}
//                         >
//                           {props.children}
//                         </Com>
//                       </valiItemContext.Provider>
//                     )
//                   }
//                 )
//               }
//             </div>
//           )
//         }
//       }
//     </valiContext.Consumer >
//   )
//   // }
// }
// //step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2//step2
// export { valiItemContext, HocValiFormItem }
