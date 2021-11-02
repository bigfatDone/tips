// 类型定好了就不能再改变了
// let obj = { x: 0 }
// obj.foo()
// obj()
// obj.bar = 222
// const n:number = obj
// 简单的类型推导
// let myName = "Alice";
// Parameter type annotation，定义了参数是字符串
// function greet(name: string) {
//   console.log("Hello, " + name.toUpperCase() + "!!");
// }
// greet('42');
// function greet():number {
//   return 88
// }
// The parameter's type annotation is an object type
// function printCoord(pt: { x: number; y: number }) {
//   console.log("The coordinate's x value is " + pt.x);
//   console.log("The coordinate's y value is " + pt.y);
// }
// interface obj {
//   x: number,
//   y?: number
// }
// function printCoord(pt: obj) {
//   console.log("The coordinate's x value is " + pt.x);
//   console.log("The coordinate's y value is " + pt.y);
// }
// // printCoord({ x: 3, y: 7 });
// printCoord({ x: 3 });
// 定义联合类型
// function printId(id: number | string) {
//   console.log("Your ID is: " + id);
// }
// // OK
// printId(101);
// // OK
// printId("202");
// // Error
// printId({ myID: 22342 });
// Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.Type '{ myID: number; }' is not assignable to type 'number'.
// 使用联合类型，通过判断类型进行使用对应的api
// function printId(id: number | string) {
//   if (typeof id === "string") {
//     // In this branch, id is of type 'string'
//     console.log(id.toUpperCase());
//   } else {
//     // Here, id is of type 'number'
//     console.log(id);
//   }
// }
// 类型别名
// type Point = {
//   x: number;
//   y: number;
// };
// // Exactly the same as the earlier example
// function printCoord(pt: Point) {
//   console.log("The coordinate's x value is " + pt.x);
//   console.log("The coordinate's y value is " + pt.y);
// }
// printCoord({ x: 100, y: 100 });
// 接口声明是一种方式来命名·对象类型·
// interface Point {
//   x: number;
//   y: number;
// };
// // Exactly the same as the earlier example
// function printCoord(pt: Point) {
//   console.log("The coordinate's x value is " + pt.x);
//   console.log("The coordinate's y value is " + pt.y);
// }
// printCoord({ x: 100, y: 100 });
// 向现有界面添加新字段
// interface Window {
//   zys: 'zys'
// }
// interface Window {
//   ts: 'zys'
// }
// 类型创建后不可更改,这里重复声明了
// type Window = {
//   title: string
// }
// type Window = {
//   ts: TypeScriptAPI
// }
// 断言
// let aa = <number><unknown>'wwwd'
// let aaa = 'wwwd' as unknown as number
var a = 88;
