// import { getInfor, postInfor } from '../services/example'
import produce from 'immer'

class InitalStateClass {
	public time = 23456
	public obj = { a: { b: { c: [1, 2, 8] } } }
	// treeData = []//树数据一般我都是这样写的，其实这样写反而没有了依据
	// tree: Array<INode> = [{ children: [{ children: [{ children: [] }, { children: [] }] }, { children: [] }] }, { children: [] }]//这是一个典型的树数据，一般来说我们的处理也不一样
}
const initalState = new InitalStateClass()
declare global {
	type IBbb = DeepReadonly<typeof initalState>
}
export default {
	namespace: 'bbb',

	state: initalState,

	subscriptions: {
		setup({ dispatch, history }) {
			// eslint-disable-line
		},
	},

	effects: {
		*fetch({ payload }, { select, put }) {
			// eslint-disable-line
			// console.log('到达effect')
			const { obj } = yield select(({ example }) => example)
			/* 第一种方式,正常的两个参数 */
			// produce(currentState, producer: (draftState) => void): nextState
			// const nextState = produce(obj, (draftState) => {
			//   draftState.a.b.c[0] = `${new Date().valueOf()}`
			// })

			/* 第二种方式，柯里化，先把处理函数传递进去，然后再把原始数据放进去，也是dva-immer实现的方法啦，可以放到钩子里面去的 */
			// produce(recipe: (draftState) => void | draftState, ?PatchListener)(currentState): nextState
			const nextState = produce((draftState) => {
				// 这个arg直接就是剩余参数的集合啦，还是下面柯里化那个函数的剩余参数集合，
				// 第二个参数有点像第一个参数的call方法:produce.call(obj, 1, 2, 3, 4)
				// console.log('第二个参asdf数：', arg)
				draftState.a.b.c[0] = `${new Date().valueOf()}`
				// return {
				//   a: {
				//     b: { c: [1, 2, `${new Date().valueOf()}`] },
				//   },
				// }
			})(obj)

			/* 注意，这里有一个produce有一个producer */
			// const obj1 = {}
			// const producer = produce((draft, arg) => { // 这个arg其实是下面的producer的第二个参数
			//   console.log('第二个参数：', arg)
			//   console.log(obj1 === arg) // true
			// })
			// const asdf = producer(obj, 'asdf')
			// console.log('原始数据：', asdf)
			// console.log('处理后的数据：', nextState)
			yield put({ type: 'save', payload: { time: `${new Date().valueOf()}`, obj: nextState } })
		},
		// * getInfor(action, { call, put }) {
		//   const result = yield call(getInfor)
		//   console.log('get请求到的结果：', result)
		// },
		// * PostInfor(action, { call, put }) {
		//   const result = yield call(postInfor)
		//   console.log('post请求到的结果：', result)
		// },
	},

	reducers: {
		save(state, action) {
			// console.log('payload:', action.payload)
			return { ...state, ...action.payload }
		},
	},
}
