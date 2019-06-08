// import { getInfor, postInfor } from '../services/example'
import { EffectsCommandMap } from 'dva'
// import { Dispatch } from 'redux'
import { History } from 'history'
import produce from 'immer'
// 像tree这种数据类型，例如是不确定深度的数据，ts该如何写
// 我们应该有一个固定判断类型的地方，其实就是initalState,如果没有任何地方提供数据的类型判断依据，那么ts的t就没有意义了
// 树形数据处理的确是一个问题，我们总不可能吧所有深层次数据都搞出来的啊
// 这样看来的话，其实所有的数据就都得是接口了

// 递归接口定义
interface INode {
	children?: INode[]
}
// 日常工作中，后端可能会返回一堆数据，而我们只用几个，因为ts是静态检测，所以它不知道后端到底返回了什么，所以我们只用在接口里面定义我们自己需要的数据就可以啦

// 其实比较重要的是入参的正确与否，这个是必须要写接口的，但是大部分这种接口应该又是比较类似的，所以应该定义成global,然后引入

class InitalStateClass {
	public time = 'asdfasdf'
	public obj = { a: { b: { c: [1, 2, 8] } }, asd: 3456 }
	public treeData = [] // 树数据一般我都是这样写的，其实这样写反而没有了依据
	public tree: Array<INode> = [
		{ children: [{ children: [{ children: [] }, { children: [] }] }, { children: [] }] },
		{ children: [] },
	] // 这是一个典型的树数据，一般来说我们的处理也不一样
}
const initalState = new InitalStateClass()

// const initalState = {
//   time: 'asdfasdf',
//   obj: { a: { b: { c: [1, 2, 8] } } },
//   treeData: [],//树数据一般我都是这样写的，其实这样写反而没有了依据
//   tree: [{ children: [{ children: [{ children: [] }, { children: [] }] }, { children: [] }] }, { children: [] }]//这是一个典型的树数据，一般来说我们的处理也不一样
// }
// export
// const func = ()=>{
//   declare global {
//     type ITsTest = DeepReadonly<typeof initalState>
//   }
// }
declare global {
	// 文件声明这能放在文件的顶层，意味着不能使用函数来暴露了。。。
	interface ITsTestState {
		tsTest: DeepReadonly<typeof initalState>
	}
}

export default {
	namespace: 'tsTest',

	state: initalState,

	subscriptions: {
		setup({ dispatch, history }: { dispatch: Dispatch<Action>; history: History }) {
			// eslint-disable-line
			console.log(history.push)
		},
	},

	effects: {
		*fetch(
			{ payload }: Action,
			{ select, put }: { select: EffectsCommandMap['select']; put: EffectsCommandMap['input'] },
		) {
			// 一般这里是请求来的数据，我们要处理一下,这里的result一般不是对象就是数组，层次至少两层
			const result: string = window.aaa
			const {
				aaa: { dd },
			} = payload
			console.log(dd, '1234')
			yield put({ type: '', payload: { a: '' }, aaa: '' })

			// console.log('到达effect')
			const { obj } = yield select(({ tsTest }: ITsTestState) => tsTest)
			/* 第一种方式,正常的两个参数 */
			// produce(currentState, producer: (draftState) => void): nextState
			// const nextState = produce(obj, (draftState) => {
			//   draftState.a.b.c[0] = `${new Date().valueOf()}`
			// })

			/* 第二种方式，柯里化，先把处理函数传递进去，然后再把原始数据放进去，也是dva-immer实现的方法啦，可以放到钩子里面去的 */
			// produce(recipe: (draftState) => void | draftState, ?PatchListener)(currentState): nextState
			const nextState = produce((draftState) => {
				draftState.a.b.c[0] = `${new Date().valueOf()}`
			})(obj)
			yield put({ type: 'save', payload: { time: `${new Date().valueOf()}`, obj: nextState } })
		},
	},

	reducers: {
		save(state: ITsTestState, action: Action) {
			console.log('payload:', action.payload, initalState)
			return { ...state, ...action.payload }
		},
	},
}
