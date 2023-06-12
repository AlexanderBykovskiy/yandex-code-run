const calculate = require('./modules/pr-166')

const text1 = {"N": 8, "staff": [5, 13, 8, 4, 4, 15, 1, 9], "K": 8};
console.log("Test 1", calculate(text1.N, text1.staff, text1.K));

const text2 = {"N": 11, "staff": [14, 8, 15, 19, 2, 21, 13, 21, 12, 10, 8], "K": 5};
console.log("Test 2", calculate(text2.N, text2.staff, text2.K));

const text3 = {"N": 15, "staff": [19, 20, 5, 10, 2, 20, 7, 9, 1, 3, 13, 14, 3, 3, 4], "K": 1};
console.log("Test 3", calculate(text3.N, text3.staff, text3.K));

const text4 = {"N": 12, "staff": [22, 7, 24, 24, 11, 22, 24, 3, 9, 16, 2, 19], "K": 7};
console.log("Test 4", calculate(text4.N, text4.staff, text4.K));

const text5 = {"N": 7, "staff": [10, 3, 21, 23, 6, 3, 8], "K": 4};
console.log("Test 5", calculate(text5.N, text5.staff, text5.K));
