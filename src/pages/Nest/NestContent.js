import React, { PureComponent } from 'react'
import { Link } from 'dva/router'

class Nest extends PureComponent {
	render() {
		const { children } = this.props
		return (
			<div>
				router4嵌套路由父路由，一般来说嵌套路由直接放在最外层就可以了
				<div>
					<Link to="/nest/abc">abc</Link>
					<p />
					<Link to="/nest/def">def</Link>
				</div>
				<div>{children}</div>
			</div>
		)
	}
}

export default Nest
