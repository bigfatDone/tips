// let changingString = "Hello World";
// changingString = "Hello";

// const constantString = "Hello World";
// constantString

// function printText(s: string, alignment: "left" | "right" | "center") {
//   // ...
// }
// printText("Hello, world", "left");
// printText("G'day, mate", "centre"); // alignment只有三个选项

// function compare(a: string, b: string): -1 | 0 | 1 { // :返回值的类型或者数值
//   return a === b ? 0 : a > b ? 1 : -3;
// }

// function handleRequest(a: string, b: "post") {}
// const req = { url: "https://example.com", method: "post" as "post"};
// handleRequest(req.url, req.method);

// function doSomething(x: string | null | number) {
//   if (x === null) { // 进行缩小范围
//     // do nothing
//   } else {
//     console.log("Hello, " + x.toUpperCase());
//   }
// }

// !的用法
// function liveDangerously(x?: number | null) {
//   // No error
//   console.log(x!.toFixed());
// }