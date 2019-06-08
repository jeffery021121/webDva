// import { Tooltip, Button } from 'antd'
// import { configure, render } from 'enzyme'
// import toJson from 'enzyme-to-json'
// import Adapter from 'enzyme-adapter-react-16'
test('描述', () => {
	expect(2 + 3).toBe(5)
})
// configure({ adapter: new Adapter() })

// describe('FileUploadInput render', () => {
// 	it('basic use', () => {
// 		const wrapper = render(
// 			<Tooltip title="prompt text">
// 				<span>Tooltip will show when mouse enter.</span>
// 			</Tooltip>,
// 		)
// 		expect(toJson(wrapper)).toMatchSnapshot()
// 	})

// 	it('use arrowPointAtCenter', () => {
// 		const wrapper = render(
// 			<div>
// 				<Tooltip placement="topLeft" title="Prompt Text">
// 					<Button>Align edge / 边缘对齐</Button>
// 				</Tooltip>
// 				<Tooltip placement="topLeft" title="Prompt Text" arrowPointAtCenter>
// 					<Button>Arrow points to center / 箭头指向中心</Button>
// 				</Tooltip>
// 			</div>,
// 		)
// 		expect(toJson(wrapper)).toMatchSnapshot()
// 	})

// 	// it('use placement', () => {
// 	// 	const wrapper = render(
// 	// 		<div>
// 	// 			<div style={{ marginLeft: 60 }}>
// 	// 				<Tooltip placement="topLeft" title={text}>
// 	// 					<a href="#">TL</a>
// 	// 				</Tooltip>
// 	// 				<Tooltip placement="top" title={text}>
// 	// 					<a href="#">Top</a>
// 	// 				</Tooltip>
// 	// 				<Tooltip placement="topRight" title={text}>
// 	// 					<a href="#">TR</a>
// 	// 				</Tooltip>
// 	// 			</div>
// 	// 			<div style={{ width: 60, float: 'left' }}>
// 	// 				<Tooltip placement="leftTop" title={text}>
// 	// 					<a href="#">LT</a>
// 	// 				</Tooltip>
// 	// 				<Tooltip placement="left" title={text}>
// 	// 					<a href="#">Left</a>
// 	// 				</Tooltip>
// 	// 				<Tooltip placement="leftBottom" title={text}>
// 	// 					<a href="#">LB</a>
// 	// 				</Tooltip>
// 	// 			</div>
// 	// 			<div style={{ width: 60, marginLeft: 270 }}>
// 	// 				<Tooltip placement="rightTop" title={text}>
// 	// 					<a href="#">RT</a>
// 	// 				</Tooltip>
// 	// 				<Tooltip placement="right" title={text}>
// 	// 					<a href="#">Right</a>
// 	// 				</Tooltip>
// 	// 				<Tooltip placement="rightBottom" title={text}>
// 	// 					<a href="#">RB</a>
// 	// 				</Tooltip>
// 	// 			</div>
// 	// 			<div style={{ marginLeft: 60, clear: 'both' }}>
// 	// 				<Tooltip placement="bottomLeft" title={text}>
// 	// 					<a href="#">BL</a>
// 	// 				</Tooltip>
// 	// 				<Tooltip placement="bottom" title={text}>
// 	// 					<a href="#">Bottom</a>
// 	// 				</Tooltip>
// 	// 				<Tooltip placement="bottomRight" title={text}>
// 	// 					<a href="#">BR</a>
// 	// 				</Tooltip>
// 	// 			</div>
// 	// 		</div>,
// 	// 	)
// 	// 	expect(toJson(wrapper)).toMatchSnapshot()
// 	// })
// })
