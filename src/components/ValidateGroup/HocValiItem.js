// import React, { Component } from 'react'
// import {valiItemContext} from './HocValiFormItem'
// //step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3
// //onCHange最后一步，创建HocValiItem高阶组件，提取listen方法，处理组件验证组件的onChange方法，这里可能会用到updateState方法
// //引入valiItemContext，这里不引入的原因同上
// const HocValiItem = (Com) => class HocValiItem extends Component {
//   render() {
//     return (
//       <valiItemContext.Consumer>
//         {
//           listen => {
//             return (<Com
//               {...this.props}
//               onChange={listen(this.props.onChange)}
//             >
//               {this.props.children}
//             </Com>)
//           }
//         }
//       </valiItemContext.Consumer>
//     )
//   }
// }
// //step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3//step3
// export default HocValiItem
