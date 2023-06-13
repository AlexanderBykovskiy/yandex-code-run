const sumExcept = require("./modules/pr-338");


const test1 = { arr: [1, 9, 8, 4], start: 1, count: 2 }
console.log("t1:", sumExcept(test1.arr, test1.start, test1.count));

const test2 = { arr: [1, 9, 8, 4], start: 0, count: 20 }
console.log("t1=2:", sumExcept(test2.arr, test2.start, test2.count));

const test3 = { arr: [1, 9, 8, 4], start: -2, count: -5 }
console.log("t3:", sumExcept(test3.arr, test3.start, test3.count));

const test4 = { arr: [1, 9, "8", 4], start: -71, count: 25 }
console.log("t4:", sumExcept(test4.arr, test4.start, test4.count));

const test5 = { arr: ["1", 9, 8, 4], start: "9", count: 1 }
console.log("t5:", sumExcept(test5.arr, test5.start, test5.count));

const test6 = { arr: [1, 9, "8", 4], start: "9", count: "9" }
console.log("t6:", sumExcept(test6.arr, test6.start, test6.count));

const test7 = { arr: [1, 9, "8", 4], start: 9, count: 9 }
console.log("t7:", sumExcept(test7.arr, test7.start, test7.count));
