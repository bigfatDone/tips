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
        
// function doSomething(value: string[]) {
//   console.log(value);
  
// }
 
// let myArray: string[] = ["hello", "world"];
 
// // either of these work!
// doSomething(myArray);
// doSomething(new Array("hello", "world"));

// 对于array来说，Array本身就是一个泛型
// interface Array<Type> {
//   /**
//    * Gets or sets the length of the array.
//    */
//   length: number;
 
//   /**
//    * Removes the last element from an array and returns it.
//    */
//   pop(): Type | undefined;
 
//   /**
//    * Appends new elements to an array, and returns the new length of the array.
//    */
//   push(...items: Type[]): number;
//   // ...
// }

// ReadonlyArray表明这个数组只能读
// function doStuff(values: ReadonlyArray<string>) {
//   // We can read from 'values'...
//   const copy = values.slice();
//   console.log(`The first value is ${values[0]}`);
 
//   // ...but we can't mutate 'values'.
//   values.push("hello!");
// Property 'push' does not exist on type 'readonly string[]'.
// }
// bad
// new ReadonlyArray("red", "green", "blue");
// // 'ReadonlyArray' only refers to a type, but is being used as a value here.
// // good
// const roArray: ReadonlyArray<string> = ["red", "green", "blue"];

// 解构，数组也是可以的
function doSomething(stringHash: [string, number]) {
  const [inputString, hash] = stringHash;
  console.log(inputString);
  console.log(hash);
}