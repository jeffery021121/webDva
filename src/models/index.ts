import bbb from './bbb'
import example from './example'

// 这里包含所有的静态的类型，动态类型的判断实在是不造了。。。

export default [bbb, example]
// declare global {
//   // type IStore = Readonly<typeof store >
//   // type Partial<T> = { [P in keyof T]?: T[P] };
//   type IStore = Partial<{ bbbState: bbbState, ExampleState: ExampleState}>
// } 