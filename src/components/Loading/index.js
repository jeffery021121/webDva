import React, { PureComponent } from 'react'

let timer
class Loading extends PureComponent {
	// loading组件
	state = { isLoadingShow: false }
	componentDidMount() {
		const { deadLine = 200 } = this.props
		timer = setTimeout(
			() => {
				this.setState({ isLoadingShow: true })
			},
			deadLine > 0 ? deadLine : 0,
		)
	}
	componentWillUnmount() {
		clearTimeout(timer)
	}
	render() {
		const { isLoadingShow } = this.state
		if (isLoadingShow) return <div>请设计自己的loading</div>
		return null
	}
}
export default Loading
