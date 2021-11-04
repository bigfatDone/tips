// function greeter(fn: (a: string) => void) {
//   fn("Hello, World");
// }
// function printToConsole(s: string) {
//   console.log(s);
// }
// greeter(printToConsole);
// type DescribableFunction = {
//   description: string;
//   (someArg: number): boolean;
// };
// TODO 函数回调的属性，如何调用
// function doSomething(fn: DescribableFunction) {
//   console.log(fn.description + " returned " + fn(6));
// }
// class SomeObject {
//   constructor(s:string) {
//     console.log(s)
//   }
// }
// type SomeConstructor = {
//   new (s: string): SomeObject;
// };
// function fn(ctor: SomeConstructor) {
//   return new ctor("hello");
// }
// const a = SomeObject
// fn(a)
// function firstElement(arr: any[]) {
//   return arr[0];
// }
// // // 泛型的使用
// function firstElement1<Type>(arr: Type[]): Type | undefined {
//   return arr[0];
// }
// firstElement1([1])
// u is of type undefined
// const u = firstElement([]);
// 通过extends来约束参数，必须拥有extends内部的参数才是正确的
// function longest<Type extends { length: number }>(a: Type, b: Type) {
//   if (a.length >= b.length) {
//     return a;
//   } else {
//     return b;
//   }
// }
// // longerArray is of type 'number[]'
// const longerArray = longest([1, 2], [1, 2, 3]);
// // longerString is of type 'alice' | 'bob'
// const longerString = longest("alice", "bob");
// // Error! Numbers don't have a 'length' property
// const notOK = longest(10, 100); // number没有length属性
// bad 和下面的就是脱裤子放屁一样，Str如果出现两次以上就可以这样做
// function greet<Str extends string>(s: Str) {
//   console.log("Hello, " + s);
// }
// greet("world");
// good
// function greet(s: string) {
//   console.log("Hello, " + s);
// }
// 没有指定返回值，就是void；?可选标志
// function f(x?: number) {
//   // ...
// }
// f(); // OK
// f(10); // OK
// 函数重载，可以定义多个同名函数，但是它的参数值不一致，ts去编译的时候会去匹配相对应参数的函数
// function makeDate(timestamp: number): Date; // 函数签名
// function makeDate(a: number, b: number): Date; // 函数签名
// function makeDate(m: number, d: number, y: number): Date; // 函数签名
// function makeDate(mOrTimestamp: number, d?: number, y?: number): Date { // 函数体
//   if (d !== undefined && y !== undefined) {
//     return new Date(y, mOrTimestamp, d);
//   } else {
//     return new Date(mOrTimestamp);
//   }
// }
// const d1 = makeDate(12345678);
// const d2 = makeDate(5, 5, 5);
// const d3 = makeDate(1, 3);
// 将重载函数改成非重载函数
// function len(s: string): number;
// function len(arr: any[]): number;
// function len(x: any) {
//   return x.length;
// }
// function len(x: any[] | string) {
//   return x.length;
// }
// 关于this的使用
// const user = {
//   id: 123,
//   admin: false,
//   becomeAdmin: function () {
//     this.admin = true;
//   },
// };
// user.becomeAdmin()
// console.log(user)
// function f1(a: any) {
//   a.b(); // OK
// }
// function f2(a: unknown) {
//   a.b();
//   // Object is of type 'unknown'.
// }
// 返回值可以
// function safeParse(s: string): unknown {
//   return JSON.parse(s);
// }
// // Need to be careful with 'obj'!
// const obj = safeParse('someRandomString');
// 抛出异常就是never，意味着函数抛出异常或终止程序的执行
// function fail(msg: string): never {
//   throw new Error(msg);
// }
// 在else没有对应上，也会是never
// function fn(x: string | number) {
//   if (typeof x === "string") {
//     // do something
//   } else if (typeof x === "number") {
//     // do something else
//   } else {
//     x; // has type 'never'!
//   }
// }
// 结构赋值
// function sum({ a, b, c }: { a: number; b: number; c: number }) {
//   console.log(a + b + c);
// }
// // Same as prior example
// type ABC = { a: number; b: number; c: number };
// function sum({ a, b, c }: ABC) {
//   console.log(a + b + c);
// }
// 对于fn = () => void，是可以返回任意类型，并且不会报错，这是void的特殊用法
// type voidFunc = () => void;
// const f1: voidFunc = () => {
//   return true;
// };
// const f2: voidFunc = () => true;
// const f3: voidFunc = function () {
//   return true;
// };
// 这种定义的void类型，是不能返回任何类型的
// function f2(): void {
//   // @ts-expect-error
//   return true;
// }
// const f3 = function (): void {
//   // @ts-expect-error
//   return true;
// };
