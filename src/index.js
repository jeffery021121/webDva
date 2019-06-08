import dva from 'dva'
import userImmer from 'dva-immer'
import createLoading from 'dva-loading'
import models from '@/models/index.ts'

// 1. Initialize
const app = dva({})
// 2. Plugins
app.use(createLoading())
app.use(userImmer())
// 3. Model
models.map(app.model)

// 4. Router
app.router(require('./router').default)

// 5. Start
app.start('#index')
if (module.hot) {
	// console.log('热更新开启')
	module.hot.accept()
}
export default app
