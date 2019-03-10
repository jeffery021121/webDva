
import { History, Location } from 'history'

// 全局类型不加I，但是非全局类型都加I
declare global{
  // 可以通过这种方式修改window对象
  // tslint:disable-next-line:interface-name
  interface Window { aaa: any; }
  // tslint:disable-next-line:interface-name
  interface RouteType {
    history: History
    match: Match
    location: Location
  }
}
// 讲真的没太看懂
window.aaa = window.aaa || {};
