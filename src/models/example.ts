
// import { getInfor, postInfor } from '../services/example'
import produce from 'immer'

class InitalStateClass {
  public time = 'asdfasdf'
  public obj = { a: { b: { c: [1, 2, 8] } } }
  // treeData = []//树数据一般我都是这样写的，其实这样写反而没有了依据
  // tree: Array<INode> = [{ children: [{ children: [{ children: [] }, { children: [] }] }, { children: [] }] }, { children: [] }]//这是一个典型的树数据，一般来说我们的处理也不一样
}
const initalState = new InitalStateClass
// export type ModalState = Readonly<typeof initalState>

declare global {
  type IExample = DeepReadonly<typeof initalState>
}

export default {

  namespace: 'example',

  state: initalState,
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    * fetch(state, { select, put }) {  
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
        draftState.a.b.c[0] = `${new Date().valueOf()}`
      })(obj)
      yield put({ type: 'save', payload: { time: `${new Date().valueOf()}`, obj: nextState } })
    },
  },

  reducers: {
    save(state, action) {
      // console.log('payload:', action.payload)
      return { ...state, ...action.payload }
    },
  },

}
