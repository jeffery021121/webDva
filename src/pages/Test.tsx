import { Link } from 'dva/router'
import React, { PureComponent } from 'react'
import style from './test.scss'

// const style = {}
const BACKGROUND = { background: 'white' }
const arr = [1, 2, 3]
const arrList = arr.map(item => <li key={`${item}`}>{item}</li>)
// const crr = []
const brr = [
	{
		source: 'a',
		target: 'b',
	},
	{
		source: 'b',
		target: 'c',
	},
	{
		source: 1,
		target: 2,
	},
	{
		source: 2,
		target: 3,
	},
	{
		source: 3,
		target: 4,
	},
	{
		source: '我',
		target: '你',
	},
	{
		source: '你',
		target: '他',
	},
]
// console.log('brr:', brr)
// 先冒泡排序，排成下图
const lrr = [
	{
		source: 3,
		target: 4,
	},
	{
		source: 'c',
		target: 'd',
	},
	{
		source: 'a',
		target: 'b',
	},
	{
		source: 1,
		target: 2,
	},
	{
		source: '我',
		target: '你',
	},
	{
		source: 2,
		target: 3,
	},
	{
		source: '你',
		target: '他',
	},
	{
		source: 'b',
		target: 'c',
	},
]
const l = lrr.length
for (let i = 0; i < l; i += 1) {
	// console.log(1111, lrr[i])
	for (let y = 1; y < l; y += 1) {
		// console.log('asf:', y)
		if (lrr[i].target === lrr[y].source) {
			// err.push(lrr[i], lrr[y])
			const itemY = lrr[y]
			lrr[y] = lrr[i + 1]
			lrr[i + 1] = itemY
		}
		if (lrr[i].source === lrr[y].target) {
			if (i < y) {
				const itemY = lrr[y]
				const itmeI = lrr[i]
				lrr[y] = lrr[i + 1]
				lrr[i] = itemY
				lrr[i + 1] = itmeI
				i = 0
			}
		}
	}
}

// let n = 0
// const accInit = lrr.shift()
// const nrr = lrr.reduce((acc, cur) => {
//   const itemArray = acc[n]
//   if (itemArray[itemArray.length - 1] === cur.source) {
//     itemArray.push(cur.target)
//   } else {
//     n += 1
//     acc[n] = [cur.source, cur.target]
//   }
//   return acc
// }, ([[accInit.source, accInit.target]]))

class Test extends PureComponent {
	public handleAsync = async () => {
		const str = await new Promise(resolve =>
			setTimeout(() => {
				resolve('11111')
			}, 1000),
		)

		console.log('qwertyuiop11111qwsdf', str)
	}
	public render() {
		return (
			<div className={style.textBox} onClick={this.handleAsync}>
				test分离
				<div style={BACKGROUND}>
					<ul className={style.ulist}>{arrList}</ul>
					{/* {asdf} */}
				</div>
				<div
					style={{ height: "50px" }}
					onClick={this.handleClick}
				>
					点我
				</div>
				<Link to="/aaa">跳转aaa</Link>
				<p />
				<Link to="/bbb">跳转bbb</Link>
			</div>
		)
	}
	private handleClick=()=>{
		console.log(lrr)
	}
}
export default Test
