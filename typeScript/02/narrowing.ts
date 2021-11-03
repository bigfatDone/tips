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
// function example(x: string | number, y: string | boolean) {
//   if (x === y) {
//     // We can now call any 'string' method on 'x' or 'y'.
//     x.toUpperCase();
          
// //(method) String.toUpperCase(): string
//     y.toLowerCase();
          
// ///(method) String.toLowerCase(): string
//   } else {
//     console.log(x);
               
// //(parameter) x: string | number
//     console.log(y);
               
// //(parameter) y: string | boolean
//   }
// }

// type Fish = { swim: () => void };
// type Bird = { fly: () => void };
 
// function move(animal: Fish | Bird) {
//   if ("swim" in animal) {
//     return animal.swim();
//   }
 
//   return animal.fly();
// }

// interface Shape {
//   kind: "circle" | "square";
//   radius?: number;
//   sideLength?: number;
// }

// function handleShape(shape: Shape) {
//   // oops!
//   if (shape.kind === "rect") {
// // This condition will always return 'false' since the types '"circle" | "square"' and '"rect"' have no overlap.
//     // ...
//   }
// }

interface Circle {
  kind: "circle";
  radius: number;
}
 
interface Square {
  kind: "square";
  sideLength: number;
}
 
type Shape = Circle | Square;
 
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape; // never说明是不纯在的object
      return _exhaustiveCheck;
  }
}