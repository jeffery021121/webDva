/*
今天还不太清楚最正规的注释怎么写，但是工具函数这种基础的东西，希望有最详细的注释
而且最好做无痛的改动
@param type: 处理好的对象的类型
@param: 需要通过工厂函数转化，变成能被immer处理的 具有类名的 obj
@return: 处理好的可被immer处理的初始数据对象
*/

export const stateFactory: <T = { [propName: string]: any }>(initalState: T) => T = <T>(
	initalState: T,
): T => {
	// 通过工厂函数转换类生成对象为普通对象，immer就可以使用了
	// let initalState = new initalClass()
	const state: InitObj = {}
	Object.entries(initalState).map(([k, v]: [string, any]) => {
		state[k] = v
	})
	return (state as any) as T // 在这里转一手，强制要求输出的是T类型
}

/*
判断参数是否为函数
@param 需要判断的函数
@return 判断结果，布尔值
*/

export const isFunction = <T extends (e: any) => any>(value: any): value is T =>
	typeof value === 'function'
