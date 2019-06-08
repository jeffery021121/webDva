import produce from 'immer'

export default {
	namespace: 'aaa',

	state: {
		time: '时间',
		obj: { a: { b: { c: [1, 2, 8, 2345] } } },
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
		save(state, action) {
			// console.log('payload:', action.payload)
			return { ...state, ...action.payload }
		},
	},
}
