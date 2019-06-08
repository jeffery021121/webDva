
// 全局类型不加I，但是非全局类型都加I
// 同时，全局类型中，在model中定义暴露的类型统一加  I eg: IExample

/* 
ts方法
*/

// omit 方法
declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
// type Exclude<T, U> = T extends U ? never : T;  拿到的是类型的key,通过pick方法转换成新的type

// 类型深度readonly方法
declare type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}











/* 
基础性的全局类型
尽量不要设置any类型的数据吧，因为只要一设计成any，那么ts就没有什么意义了
*/

// 初始对象的默认类型，这个类型可以有任何内部值，使用该类型的数据必须是对象
declare type InitObj = { [propName: string]: any, [index: number]: any }

// 返回为空的函数类型，如果有参数，希望传递T
declare type voidFunc<T=any> = (arg: T) => void










/* 
框架级别的类型 的 基本type
*/

//payload参数的默认类型，非常不推荐使用 
type IPayload = {
  [propName: string]: any
}

//action的默认类型，推荐在没有有payload的时候使用
declare type Action<T=IPayload> = {
  type: string,
  payload: T
}

// 路由的 match参数的类型，这个一般不用，因为我整合了RouteType
declare type Match = {
  path: string;
  url: string;
  params: any;
  isExact: boolean;
}

// 函数的dispatch方法，希望每个有payload的类型都传递T
declare type Dispatch<T = Action> = (action: T) => void


