import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import Test from './Test'
import style from './IndexPage.scss'

const arr = [1, 2, 3]
function IndexPage(props) {
	const handelSave = () => props.dispatch({ type: 'example/fetch' })
	const { example } = props
	const arrList = arr.map((item) => <li key={`${item}`}>{item}</li>)
	const { time, obj } = example
	console.log('测试提交')
	return (
		<div className={style.mainBox}>
			<Link to="/vali">表单验证组件页面</Link>
			<div className="normal" onClick={handelSave}>
				戳一下:
				{obj.a.b.c[0]}
			</div>
			<div>
				如果和阿斯蒂芬验证dva是否ok,一个prasdfop：
				{time || '还没有发出请求'}
			</div>
			<div className={style.aa}>
				完成任务,cssModule开启，发生变化。。。
				<p>热启动配置成功</p>
				<span>看postcss嵌套阿斯蒂芬规划局看sdfghjkl</span>
				<div className="title">title修改速度贼快</div>
			</div>
			<div>
				<div className="title">title炒鸡顺畅</div>
			</div>
			<ul className={style.ulist}>{arrList}</ul>
			<ul>
				<li key="yellow" className={style.li_yellow}>
					yellow
				</li>
				<li key="pink" className={style.li_pink}>
					pink
				</li>
				<li key="blue" className={style.li_blue}>
					blue
				</li>
			</ul>
			<div className={style.extend_aa}>测试</div>
			scss开始
			<div className={style.scssTest1} />
			<div className={style.box}>
				<p>--------------box------</p>
			</div>
			<div className={style.extendBox} />
			<Test />
			<div>
				<Link to="/nest">嵌套路由跳转</Link>
				<p>
					<Link to="/dynamic/12df">动态路由adsf跳adsf转</Link>
				</p>
			</div>
		</div>
	)
}

export default connect(({ example }) => ({ example }))(IndexPage)
