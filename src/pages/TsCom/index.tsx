// import Test from './../Test'
// 这个只是编辑器的报错，因为编辑器无法读取webpack的配置，所以需要再写一遍tsconfig.json
import Test from '@/pages/Test'
import TsCom2 from '@/pages/TsCom/TsCom'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table';
import { connect } from 'dva'
import React, { MouseEvent, PureComponent, ReactNode, SFC } from "react"
import style from './tscom3.css'
// console.log('style:',style)

interface IUser {
  key: string,
  name: string,
  age: number,
  address: string
}
// 通过查找.d.ts文件 ColumnProps<IUser> 是一个接口 相当于 <someTyep>[]  === Array<someType>
// console.log(ColumnProps<IUser>[],111)//类型是打印不出来的，直接报错
const columns: ColumnProps<IUser>[] = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
}];

const data: Array<IUser> = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号',
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号',
}]

const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号',
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号',
}]

// const columns = [{
//   title: '姓名',
//   dataIndex: 'name',
//   key: 'name',
// }, {
//   title: '年龄',
//   dataIndex: 'age',
//   key: 'age',
// }, {
//   title: '住址',
//   dataIndex: 'address',
//   key: 'address',
// }]
interface IAaa {
  aaa: Object
}




// import React, { MouseEvent, ReactNode } from 'react'
// ts中结构赋值的用法
interface Props {
  children?: ReactNode
  onClick(e: MouseEvent<HTMLElement>): void
}
const Button = ({ onClick: handleClick, children }: Props) => (
  <button onClick={handleClick}>{children}</button>
)


interface IProps {
  onClick(e: MouseEvent<HTMLElement>): void
}

const Button2: SFC<IProps> = ({ onClick: handleClick, children }) => {
  return(
    <button onClick={handleClick}>{children}</button>
  )
}


const mapStateToProps: (aaa: IAaa) => any = ({ aaa }) => ({ aaa })
@connect(mapStateToProps)
class TsCom extends PureComponent {
  // constructor(props: Readonly<{}>) {
  //   super(props)
  // }
  public render() {
    console.log(this.props, '11111')
    let aa = 123
    let a = 12345
    // let aaa: object
    const { aaa }: any = this.props// 结构赋值在ts中的使用
    return (
      <div>
        <div className={style.asdfasd}>
          {JSON.stringify(aaa)}
          <TsCom2 />
        </div>
        第一个ts的组件{a}{aa}
        <div>
          <Table dataSource={dataSource} columns={columns} />
          <Table<IUser> columns={columns} dataSource={data} />
          <Table<IUser> dataSource={data}>
            <Table.Column<IUser> key="name" title="Name" dataIndex="name" />
          </Table>
        </div>
        <div>
          {/* <Button2 onClick={()=>{console.log('click me again')}}>第二个手动组件</Button2> */}
        </div>
        {/* <Button onClick={() => { console.log('click me') }}>aaa</Button>ts结束 */}
        <Test />
      </div>
    )
  }
}

export default TsCom
