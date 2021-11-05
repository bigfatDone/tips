// function greet(person: Person) {
//   return "Hello " + person.name;
// }
// type Person = {
//   name: string;
//   age: number
// }
// readonly
// interface SomeType {
//   readonly prop: string;
// }
// function doSomething(obj: SomeType) {
//   // We can read from 'obj.prop'.
//   console.log(`prop has the value '${obj.prop}'.`);
//   // But we can't re-assign it. prop is readonly
//   obj.prop = "hello";
//   // Cannot assign to 'prop' because it is a read-only property.
// }
// interface Person {
//   name: string;
//   age: number;
// }
// interface ReadonlyPerson {
//   readonly name: string;
//   readonly age: number;
// }
// let writablePerson: Person = {
//   name: "Person McPersonface",
//   age: 42,
// };
// // works
// let readonlyPerson: ReadonlyPerson = writablePerson;
// readonlyPerson.age++
// console.log(readonlyPerson.age); // prints '42'
// writablePerson.age++;
// console.log(readonlyPerson.age); // prints '43'
// interface NumberDictionary {
//   [index: string]: number;
//   length: number; // ok
//   name: string;
//   // Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
// }
// interface NumberOrStringDictionary {
//   [index: string]: number | string;
//   length: number; // ok, length is a number
//   name: string; // ok, name is a string
// }
// extends继承属性
// interface BasicAddress {
//   name?: string;
//   street: string;
//   city: string;
//   country: string;
//   postalCode: string;
// }
// interface AddressWithUnit extends BasicAddress {
//   unit: string;
// }
// let a: AddressWithUnit = {}
// 泛型定义参数类型
// interface Box<Type> {
//   contents: Type;
// }
// interface StringBox {
//   contents: string;
// }
// let boxA: Box<string> = { contents: "hello" };
// boxA.contents;
// let boxB: StringBox = { contents: "world" };
// boxB.contents;
function doSomething(value) {
    // ...
}
var myArray = ["hello", "world"];
// either of these work!
doSomething(myArray);
doSomething(new Array("hello", "world"));
