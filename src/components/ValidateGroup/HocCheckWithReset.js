// import React, { Component } from 'react'
// import { valiContext } from './ValiForm'
// const HocCheckWithReset = (Com) =>
// 	class HocCheckWithReset extends Component {
// 		handelCLick = ({ reset, check }) => () => {
// 			//还是需要在click的时候在那边自己做一个forceupdate，这边做不行，而且还是需要一个参数来告知，到底是cancle还是confirm
// 			check()
// 			this.props.onClick()
// 			// reset()
// 		}
// 		render() {
// 			return (
// 				<valiContext.Consumer>
// 					{({ reset, check }) => (
// 						<Com {...this.props} onClick={this.handelCLick({ reset, check })}>
// 							{this.props.children}
// 						</Com>
// 					)}
// 				</valiContext.Consumer>
// 			)
// 		}
// 	}
// //step4//step4//step4//step4//step4//step4//step4//step4//step4//step4//step4//step4//step4//step4//step4//step4//step4//step4//step4//step4//step4//step4//step4
// export default HocCheckWithReset
