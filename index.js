const bruteForce = require ("./modules/pr-335");


const test1 = "7";
console.log("true", bruteForce(test1));
const test2 = "7711";
console.log("true", bruteForce(test2));
const test3 = "77111111";
console.log("true", bruteForce(test3));
const test4 = "7117111111117777777711";
console.log("true", bruteForce(test4));
const test5 = "";
console.log("false", bruteForce(test5));
const test6 = "6678";
console.log("false", bruteForce(test6));
const test7 = "77771171111171111";
console.log("false", bruteForce(test7));
