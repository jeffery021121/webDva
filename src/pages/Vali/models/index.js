/* 
这里只是验证用的，为了节省时间，所以不写ts了
*/
import produce from 'immer'

const model = {
	namespace: 'vali',

	state: {
		submitObj: {
			name: '',
			address: '',
			sex: '',
		},
	},

	subscriptions: {
		// eslint-disable-next-line no-unused-vars
		setup({ dispatch, history }) {},
	},

	effects: {
		*fetch(action, { select, put }) {
			const { obj } = yield select(({ aaa }) => aaa)
			const nextState = produce((draftState) => {
				draftState.a.b.c[0] = `${new Date().valueOf()}`
			})(obj)
			yield put({
				type: 'save',
				payload: { time: `${new Date().valueOf()}`, obj: nextState },
			})
		},
	},

	reducers: {
		updateState(state, action) {
			// console.log('payload:', action.payload)
			return { ...state, ...action.payload }
		},
	},
}

export default [model]
