import produce from 'immer'

export default {
	namespace: 'ccc',

	state: {
		time: '时间',
		obj: { a: { b: { c: [1, 2, 8, 2345] } } },
	},

	subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
		},
	},

	effects: {
    *fetch({ payload }, { select, put }) {  // eslint-disable-line
			const { obj } = yield select(({ aaa }) => aaa)
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
