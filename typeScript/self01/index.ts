// 泛型
// function identity<Type>(arg: Type): Type {
//   return arg;
// }
// console.log(identity(true));

// keyOf
// type Point = { [x: string]: number; [y: number]: number };
// type P = keyof Point;
// const a = ['1', 21]
// // type Arrayish = { [n: number]: unknown };
// type A = keyof Arrayish;

// typeOf
// Prints "string"
// console.log(typeof "Hello world");
// function f() {
//   return { x: 10, y: 3 };
// }
// type P = ReturnType<typeof f>;

// 索引访问类型
// type Person = { age: number; name: string; alive: boolean };
// type Age = Person["age"];
// type Ag = Person["ag"];
// const MyArray = [
//   { name: "Alice", age: 15 },
//   { name: "Bob", age: 23 },
//   { name: 88, age: 38 },
// ];

// type Person = typeof MyArray[number];

// // 运算条件
// interface Animal {
//   live(): void;
// }
// interface Dog extends Animal {
//   woof(): void;
// }

// let a: Dog = 8
// type Example1 = Dog extends Animal ? number : string;

// 映射类型
// type OnlyBoolsAndHorses = {
//   [name: string]: boolean | number;
// };

// const conforms: OnlyBoolsAndHorses = {
//   del: true,
//   rodney: false,
// };

// type OptionsFlags<Type> = {
//   [Property in keyof Type]: boolean;
// };
// type FeatureFlags = {
//   darkMode: () => void;
//   newUserProfile: () => void;
// };

// type FeatureOptions = OptionsFlags<FeatureFlags>;

// class

// class teacher {
//   name = 0;
//   age = 0
// }

// class student extends teacher {
//   constructor(name:any){
//     super();
//     console.log(name)
//   };
//   value = 48
// }

// const a = new student(88)
// a.name

// class Base {
//   k = 4;
// }

// class Derived extends Base {
//   constructor() {
//     // Prints a wrong value in ES5; throws exception in ES6
//     super(); // 这里先运行父级
//     console.log(this.k);
//   }
// }