import React from 'react'
import { Cmp1 as Com1 } from '@/components'
import { Button, Input, Form, Table } from 'antd'

const dataSource = [
	{
		key: '1',
		name: '胡彦斌',
		age: 32,
		address: '西湖区湖底公园1号',
	},
	{
		key: '2',
		name: '胡彦祖',
		age: 42,
		address: '西湖区湖底公园1号',
	},
]

const columns = [
	{
		title: '姓名',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: '年龄',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: '住址',
		dataIndex: 'address',
		key: 'address',
	},
]
const Bbb = (props) => {
	console.log('Bbb组件的参数：', props)
	return (
		<div>
			<Form>
				<Button>hah</Button>
			</Form>
			{/* <Table data={[]} column={[]} /> */}
			<div>
				<Table dataSource={dataSource} columns={columns} />
			</div>
			<Button>又是antd的按钮</Button>
			我是路由bbb的组
			<div>
				<Input value="这个是antd的Input" />
				<Com1 />
			</div>
		</div>
	)
}
export default Bbb
