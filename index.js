const { decode } = require("./modules/pr-320");


const test1 = {"ops": ["Aa", [{ "from": "a", "to": "b" }]]}
console.log("Test 1 (Ab):", decode(test1.ops[0], test1.ops[1]), "\n");

const test2 = {"ops": ["ab", [{ "from": "a", "to": "b" }]]}
console.log("Test 2 (bb):", decode(test2.ops[0], test2.ops[1]), "\n");

const test3 = {"ops": ["ab", [{ "from": "a", "to": "ba" }, { "from": "b", "to": "r" }]]}
console.log("Test 3 (bar):", decode(test3.ops[0], test3.ops[1]), "\n");

const test4 = {"ops": ["ab", [{ "from": "b", "to": "bar" }, { "from": "ab", "to": "foo" }]]}
console.log("Test 4 (foo):", decode(test4.ops[0], test4.ops[1]), "\n");

const test5 = {"ops": ["ab", [{ "from": "a", "to": "bar" }, { "from": "ab", "to": "foo" }]]}
console.log("Test 5 (foo):", decode(test5.ops[0], test5.ops[1]), "\n");

const test6 = {"ops": ["", [{ "from": "b", "to": "bar" }, { "from": "ab", "to": "foo" }]]}
console.log("Test 6 (foo):", decode(test6.ops[0], test6.ops[1]), "\n");

const test7 = {"ops": ["", []]}
console.log("Test 7 ():", decode(test7.ops[0], test7.ops[1]), "\n");

const test8 = {"ops": ["Abc", []]}
console.log("Test 8 (Abc):", decode(test8.ops[0], test8.ops[1]), "\n");
