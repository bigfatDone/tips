// Accessing the property 'toLowerCase'
// on 'message' and then calling it
// message.toLowerCase();
// // Calling 'message'
// message();

// const message = "Hello World!";

// const user = {
//   name: "Daniel",
//   age: 26,
// };
// user.location; // returns undefined

// Greets the world.
// console.log("Hello world!");

// This is an industrial-grade general-purpose greeter function:
// function greet(person, date) {
//   console.log(`Hello ${person}, today is ${date}!`);
// }
 
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", new Date());