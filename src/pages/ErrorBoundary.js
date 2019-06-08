import React from 'react'

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error) {
		// 这个就是cmpWillReceiveProps的替代品，还是要结合componentdidupdate才可以
		// Update state so the next render will show the fallback UI.
		console.log('这个是static定义的方法：', error)
		return { hasError: true }
	}

	componentDidCatch(error, info) {
		// You can also log the error to an error reporting service
		// logErrorToMyService(error, info);
		console.log('捕获错误：', error)
		console.log('错误详情：', info)
	}

	render() {
		const { hasError } = this.state
		const { children } = this.props
		if (hasError) {
			// You can render any custom fallback UI
			return <h1>出错了，但是成功被捕获</h1>
		}

		return children
	}
}
export default ErrorBoundary
