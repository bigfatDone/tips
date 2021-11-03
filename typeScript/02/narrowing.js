// function padLeft(padding: number | string, input: string): string {
//   throw new Array(padding + 1).join(" ") + input;
// }
// function padLeft(padding: number | string, input: string) {
//   if (typeof padding === "number") {
//     return new Array(padding + 1).join(" ") + input;
//   }
//   return padding + input;
// }
// function printAll(strs: string | string[] | null) {
//   if (typeof strs === "object" && strs) {
//     for (const s of strs) {
//     // Object is possibly 'null'.
//       console.log(s);
//     }
//   } else if (typeof strs === "string") {
//     console.log(strs);
//   } else {
//     // do nothing
//   }
// }
// const b = Boolean('Hello')
// const a = !!'Hello'
// 验证相同的类型
function example(x, y) {
    if (x === y) {
        // We can now call any 'string' method on 'x' or 'y'.
        x.toUpperCase();
        //(method) String.toUpperCase(): string
        y.toLowerCase();
        ///(method) String.toLowerCase(): string
    }
    else {
        console.log(x);
        //(parameter) x: string | number
        console.log(y);
        //(parameter) y: string | boolean
    }
}
