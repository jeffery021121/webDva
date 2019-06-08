// import { getInfor, postInfor } from '../services/example'
import { stateFactory } from '@/utils/publicFunc'
import { EffectsCommandMap } from 'dva'
// import { Dispatch } from 'redux'
import { History } from 'history'
import produce from 'immer'
// 像tree这种数据类型，例如是不确定深度的数据，ts该如何写
// 我们应该有一个固定判断类型的地方，其实就是initalState,如果没有任何地方提供数据的类型判断依据，那么ts的t就没有意义了
// 树形数据处理的确是一个问题，我们总不可能吧所有深层次数据都搞出来的啊
// 这样看来的话，其实所有的数据就都得是接口了

// 目前解决方案，使用类来提供接口和初始数据，工厂函数来提供处理后的初始数据（immer不能处理类生成的对象）,typeof 来获取接口，并且和namespace对应，进而全局暴露（主要是为了方便page页的使用）

/*
在这里写上所有可能出现在model中的情况（ts）
结合immer操作数据
已经全局配置了dva-immer,所以在reducer中写数据其实要比在页面写要爽一点
payload属性类型问题，这个，我觉得就是要直接声明的，用ts能解决我最大的问题，应该就是终于可以让我看到payload到底长什么样子了。。。
*/

// 递归接口定义
interface INode {
	children?: INode[]
}
// 日常工作中，后端可能会返回一堆数据，而我们只用几个，因为ts是静态检测，所以它不知道后端到底返回了什么，所以我们只用在接口里面定义我们自己需要的数据就可以啦

// 其实比较重要的是入参的正确与否，这个是必须要写接口的，但是大部分这种接口应该又是比较类似的，所以应该定义成global,然后引入

// 是用类定义初始类型
class IinitalStateClass {
	public time = '时间'
	public toggle = 'tyui'
	public obj = { a: { b: { c: [1, 2, 8] } }, asd: 3456 }
	public treeData = [] // 树数据一般我都是这样写的，其实这样写反而没有了依据
	public tree: Array<INode> = [
		{ children: [{ children: [{ children: [] }, { children: [] }] }, { children: [] }] },
		{ children: [] },
	] // 这是一个典型的树数据，一般来说我们的处理也不一样
}

// 获取实例
const classState = new IinitalStateClass()

// 文件声明这能放在文件的顶层，意味着不能使用函数来暴露了。。。
declare global {
	// 根据nameSpace，生成对应的 global State，这个类型是给mapstateToProps和effect使用的，添加了只读限定
	// typeof以后感觉复杂类型失效了，数组和树数据都变成了any[]
	interface IToggle {
		// typeof 处理获得类型
		toggle: DeepReadonly<typeof classState>
	}
}

// 定义state的类型，这个类型是给reducer使用的，没有加只读限定
type IToggleState = typeof classState

// 工厂函数处理clss数据，获得immer可以处理的初始数据
const initalState = stateFactory<IToggleState>(classState)

const toggle = {
	namespace: 'toggle',

	state: initalState, //  state不能是类生成的对象，所以使用工厂函数转化一下

	subscriptions: {
		setup({ dispatch, history }: { dispatch: Dispatch; history: History }) {
			// eslint-disable-line
			// 这里可以执行监听操作，如果不使用unModle方法的话，建议整个项目的监听写在app哪个global的model中
			// 监听对应需要的参数 已经设置了正确的类型 dispatch，history
			// console.log(history.push)
		},
	},

	/*
  effect是generator函数，ts核心库要求generator函数必须有yield关键字
  这里的immer处理数据还是需要通过引入immer来用的，不如reducer中潇洒
  effect应该说是我们前端的service，通过这里和后端做数据交换
  */
	effects: {
		*payloadType(
			{ payload }: Action & { payload: { aaa: { dd: string } } },
			sagas: EffectsCommandMap,
		) {
			// effect类型，Action类型已经全局设置，select，put通过EffectsCommandMap获取

			const result: string = window.aaa // window.aaa没有报错，因为全局设定了这个方法

			/*
      payload具有比较深度不确定性，所以做Action类型的时候，最后给成了any，
      但是代码里面应该避免any,应该显示的去声明payload到底内部是什么
      用&连接符设定该effect的payload
      */
			const {
				aaa: { dd },
			} = payload
			yield console.log(dd.length, 10000)
		},

		// select和put的类型，在dva中已经定义好了
		// immer正常使用演示
		*immer(
			action: Action,
			{ select, put }: { select: EffectsCommandMap['select']; put: EffectsCommandMap['input'] },
		) {
			const { obj } = yield select(({ toggle }: IToggle) => toggle)

			// immer用法演示：
			/* 第一种方式,正常的两个参数 */
			// produce(currentState, producer: (draftState) => void): nextState
			const nObj = produce(obj, (draftState) => {
				draftState.a.b.c[0] = `${new Date().valueOf()}`
			})

			/* 第二种方式，柯里化，先把处理函数传递进去，然后再把原始数据放进去，也是dva-immer实现的方法啦，可以放到钩子里面去的 */
			// produce(recipe: (draftState) => void | draftState, ?PatchListener)(currentState): nextState
			const nObj2 = produce((draftState) => {
				draftState.a.b.c[0] = `${new Date().valueOf()}`
			})(obj)

			yield put({ type: 'save', payload: { time: `${new Date().valueOf()}`, obj: nObj2 } })
		},
		*loadingTest(action: Action, { put }: EffectsCommandMap) {
			let time = 1000
			yield setTimeout(() => {
				console.log('计时完毕')
			}, time)
			yield put({type:'immerTest2'})
		},
	},

	/*
  其实用了redux之后，我们就应该鼓励去多写reducer，将业务逻辑，或者说将controller从page中揪出来，
  因为配置了dva-immer的原因，这里的state不需要返回，直接操作即可
  redux更应该是 controller的职责，连接service（在这里就是effect）和 view(负责展示和渲染的 pages)
  */
	reducers: {
		// 配置dva-immer以后，可以这样直接操作数据，
		// 但是配合immer以后，我们上边设置的Readonly属性就挂掉了
		// 所以在本effect中的类型都是可操作的，全局暴露的都是不可操作的
		add(state: IToggleState) {
			state.obj.a.b.c[0] = 1
			// state.obj.a.b.d[0]
		},

		// 没用immer之前，操作state的方式
		save(state: IToggleState, action: Action & { payload: InitObj }) {
			console.log('payload:', action.payload, initalState)
			return { ...state, ...action.payload }
		},

		// 未加dva-immer前 immer处理数据，添加以后这样处理也是正确的
		inputChangeImmer(state: IToggleState, { payload }: Action<{ toggle: string }>) {
			const nState = produce((draftState) => {
				console.log('draftState', draftState)
				draftState.toggle = payload.toggle
			})(state)

			return nState
		},

		// 测试更新不同数据引发的渲染次数
		// 这个测试还是对immer的不理解。。。。
		// 其实经过dva-immer后，我们的redux就相当于被immer给包裹了，最后会默认返回draftState，不会你操作一下，就返回一个的新的state的，和setState是不一样的，可以把这一整个当做setState(()=>{})
		// produce包裹的第二种方式，运用柯里化，如果没有全局immer,这种处理方式应该是最好的
		immerTest2: produce((state) => {
			state.toggle = `${new Date().valueOf()}`
			console.log('测试多次改变数据的情况')
			state.time = `${new Date().valueOf()}`
		}),

		clear(state: IToggleState, { payload }: Action) {
			return { ...initalState, ...payload }
		},
	},
}

export default toggle
