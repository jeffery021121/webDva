#ts 错误的设置了类型，最为致命
#ts 工具讲解和实现 https://zhuanlan.zhihu.com/p/40311981 #跟着打一遍 https://segmentfault.com/a/1190000015326439 #一个 tslint 的配置
tslint中没有警告，只有对和不对。。。
rulesDirectory 指定规则的实现目录，可以配置多个
{
//ts 专用
adjacent-overload-signatures ： true, // Enforces function overloads to be consecutive.
ban-comma-operator：true, //禁止逗号运算符。
ban-type: [true, ["object","User {} instead."],["string"]] //禁止类型
member-access： [true , "no-public"||"check-accessor"|| "check-constructor" || "check-parameter-property" ] , //类成员必须声明 private public ....
member-order: [true, {order:....}], //类声明排序
no-any: true,//不需使用 any 类型
no-empty-interface:true //禁止空接口 {}
no-import-side-effect: [true, {"ignore-module": "(\\.html|\\.css)$"}], //禁止导入带有副作用的语句
no-inferrable-types：[true, "ignore-params", "ignore-properties"]， //不允许将变量或参数初始化为数字，字符串或布尔值的显式类型声明。
no-internal-module:true， //不允许内部模块
no-magic-numbers: [true,1,2,3], //不允许在变量赋值之外使用常量数值。当没有指定允许值列表时，默认允许-1,0 和 1
no-namespace: [ true,"allpw-declarations"], //不允许使用内部 modules 和命名空间
no-non-null-assertion: true , //不允许使用!后缀操作符的非空断言。
no-parameter-reassignment: true, //不允许重新分配参数
no-reference: true, // 禁止使用/// <reference path=> 导入 ，使用 import 代替
no-unnecessary-type-assertion： true, //如果类型断言没有改变表达式的类型就发出警告
no-var-requires： true, //不允许使用 var module = require("module"),用 import foo = require('foo')导入
only-arrow-functions：[true，"allow-declarations"，"allow-named-functions"], //允许箭头表达式，不需要传统表达式 ； 允许独立的函数声明 ；允许表达，function foo() {}但不是 function() {}
prefer-for-of:true, //建议使用 for(..of)
promise-function-async: true, 要求异步函数返回 promise
typedef: [true, "call-signature", "parameter", "member-variable-declaration"], //需要定义的类型存在
typedef-whitespace： true, //类型声明的冒号之前是否需要空格
unified-signatures： true, //重载可以被统一联合成一个

    //function 专用
    await-promise： true,  //警告不是一个promise的await
    ban: [
          true,
          "eval",
          {"name": "$", "message": "please don't"},
          ["describe", "only"],
          {"name": ["it", "only"], "message": "don't focus tests"},
          {
            "name": ["chai", "assert", "equal"],
            "message": "Use 'strictEqual' instead."
          },
          {"name": ["*", "forEach"], "message": "Use a regular for loop instead."}
    ],
    curly: true, //for if do while 要有括号
    forin:true, //用for in 必须用if进行过滤
    import-blacklist:true, //允许使用import require导入具体的模块
    label-postion: true, //允许在do/for/while/swith中使用label
    no-arg:true, //不允许使用 argument.callee
    no-bitwise:true, //不允许使用按位运算符
    no-conditional-assignmen: true, //不允许在do-while/for/if/while判断语句中使用赋值语句
    no-console：true, //不能使用console
    no-construct: true, //不允许使用 String/Number/Boolean的构造函数
    no-debugger： true, //不允许使用debugger
    no-duplicate-super: true, //构造函数两次用super会发出警告
    no-empty:true, //不允许空的块
    no-eval: true, //不允许使用eval
    no-floating-promises: true, //必须正确处理promise的返回函数
    no-for-in-array: true, //不允许使用for in 遍历数组
    no-implicit-dependencies: true, //不允许在项目的package.json中导入未列为依赖项的模块
    no-inferred-empty-object-type： true， //不允许在函数和构造函数中使用{}的类型推断
    no-invalid-template-strings： true, //警告在非模板字符中使用${
    no-invalid-this：true, //不允许在非class中使用 this关键字
    no-misused-new: true, //禁止定义构造函数或new class
    no-null-keyword: true, //不允许使用null关键字
    no-object-literal-type-assertion：true, //禁止objext出现在类型断言表达式中
    no-return-await：true, //不允许return await
    arrow-parens： true, //箭头函数定义的参数需要括号

} ####这里应该是 ts 的集合了
tsx 高阶组件的正确玩法 https://blog.csdn.net/sinat_17775997/article/details/84203095
ts 新的特性：https://segmentfault.com/a/1190000008108248
一个 ts 和 react 的工具库 https://www.npmjs.com/package/utility-types
ts 工具函数及其一些实现 https://zhuanlan.zhihu.com/p/40311981
Partial 将类型中的所有属性变成可选类型，也就是加一个问号
Readonly 只读
非空断言 ！ this.props.history!.push('http://www.aaa.com')

###########Readonly 实现：
type Readonly<T> = {
readonly [P in keyof T]: T[P];
};

interface A {
k1: string;
k2: string;
k3: number;
}

type A_ro = Readonly<A>;

结果：
type A_ro = {
readonly k1: string;
readonly k2: string;
readonly k3: number;
}
#########partial 实现
keyof 关键字 遍历取出类型中所有的 key,并且转换成联合类型
in 关键字 遍历一个可枚举类型
type Partial<T> = { [P in keyof T]?: T[P] };

# type State = Readonly<typeof initialState> 这种写法可以让我们不再关注 initialState，并且转化其所有属性为只读

# 在 ts 中使用 react-redux

1.在 model 中初始化 state，并且暴露出去，同时该 model 的 state 直接就是 initalState：
const initalState = {
time: 'asdfasdf',
obj: { a: { b: { c: [1, 2, 8] } } },
}
export type ModalState = Readonly<typeof initalState>

2.在对应的 page 组件中引入 类型 ModalState， 同时给定正确的属性
import { ModalState } from './models'

interface ITsTest {//这个得是最外围的 store 才可以。。。
tsTest: ModalState
}

interface IProp {
tsTest: ModalState,
dispatch: any 这里还没有完成，还有具有 history 属性的组件
}

// 参数和返回值都是 ITsTest 类型
const mapStateToprops: (store: ITsTest) => ITsTest = ({ tsTest }) => ({ tsTest })

@connect(mapStateToprops)
class TsTest extends Component<IProp, State>{
readonly state: State = inintalState

####ts 中有没有树形结构，如果有的话，一开始定义还是怎么做，如果变脸类型发生了改变呢，这些怎么做
其实还是按照 js 的思想去做了，首先，如果我们想要使用树形结构，那么，初始化定义的时候，变量什么的，应该是必须有的，
感觉不舒服，只能证明原来的写法不规范
最起码，一个数据的初始值和它以后的值因该是一个类型的。
ts 定义树数据：https://segmentfault.com/a/1190000011819279 ###因为 model 的 namespace 具有全局唯一性，所以我们在这个 namespace 的基础上扩展出来唯一的 modelState 的 type
eg: namespace:aa type :IAa 采用类似 useState 的写法
上面那种写法不好，因为其他的全局变量都是没有 I 标记的，所以，变为 namespace:aa type:AaState 的形式，保持统一

### 感觉我做不了无痛完成 ts 了。。。。

### 从 js 转过来，尤其是在含有 redux 的情况下，的确比较难以搞好

#### 记录几个类型

函数组件 const ComFunc1:FC<IProps>=(props)=>{}
函数无状态组件 SFC
有状态组件 Component<IProps,IState>
Purecomponent<不记得了，可以直接跳转定义的>
ComponentType，一般用于定义组件类型的时候，但是不能直接当组件 extends，是 SFC 和有状态组件的联合类型  
component: ComponentType<ToggleableComponentProps<P>>
ReactNode 组件 children 的类型

前两个事件类型来自 react， 后面的 html 是全局的，来自 ts 核心库
输入框触发事件 e: FocusEvent<HTMLInputElement
鼠标点击按钮触发事件 event: MouseEvent<HTMLElement>

effect 的 put 方法和 select 都是这里来的 import { EffectsCommandMap } from 'dva' put :EffectsCommandMap['put']

JSX.Element 函数返回的时候可以是这个类型，意思是返回一个 jsx 的元素，不太确定和上面的 reactNode 的区别是什么

# 答案，jsx.element 是一个 reactElement,意味着可以给 creatElement 方法，得是一个标签，需要 type(div,span,Toggle,IndexPage) ,prop(标签或者说组件对应的属性)，chiledren(子元素或者组件，相当于这个的一个递归)

# reactNode 完全包含上者，同时还有 字符串，数组，null,undefined ReactChild | ReactFragment | ReactPortal | boolean | null | undefined

### 再次修改文件的组成格式，在 page 级别加入 component 文件夹

一个页面一个 page 文件夹这个思路绝对是正确的，一个 page 有完整的一套配置
但是要考虑多级页面的问题，多级页面，pages 文件夹下就是一级路由文件夹
一级路由文件夹下是二级路由，直到 page
这样分完就有一种想要接管路由的冲动。。。（在物业里应该有实现的核心代码）
这次不再搞什么路由组件嵌套组件了，路由，就应该分散在各个页面的，就是一个组件
同时把以及路由放到原来的 router.tsx 文件夹下面就可以了
这样其实可以摆脱文件夹层级嵌套太深的问题，毕竟 model 已经是跟着页面来走了，
所以开发过程中，除非是公用组件公用 model 的操作，其他的数据都是在各自的 page 中的，也不需要关心其他的问题

最后是 model 的动态注册的问题，路由的拆分意味着子一级路由是没有办法直接使用 app.router 方法提供的 app 实例了
只有父路由引入 app 的方式来注册了。。。。

#### ts 最后一个目标，完成一个 高阶组件模式，完成一个 渲染回调模式 ， 完成一个组件注入模式

上面三者，目前最得人心的应该就是渲染回调模式了，不过我自己的话，其实更加喜欢高阶组件，其实就是因为装饰器模式，看起来太优雅了。。。。。

### 一定要上 useHooks,但是在上钩子之前，彻底把 tslint 配置好，要不然感觉前一阵子那么努力配置的 eslint 都特么喂了狗了

### 目前我能看到的最后一个目标，单元测试，感觉狗年是完成不了了，等猪年吧。。。

### model 中有 payload 的，payload 一定要写类型

#ts 结合 redux 已经完成



# 规范终结篇

腾讯通用的tslint规范，的确很好
https://github.com/AlloyTeam/tslint-config-alloy/blob/master/index.js

tslint 配置终极篇 
主要采用腾讯规范 https://github.com/AlloyTeam/tslint-config-alloy/blob/master/index.js
集合prettier配置 https://prettier.io/docs/en/options.html
如果两者出现冲突，自己配置一个 https://palantir.github.io/tslint/rules/
# ts 未做

### 请求返回的数据，如果是需要使用或者处理的，也一定要写 type