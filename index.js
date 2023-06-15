const { decode } = require("./modules/pr-320");


const test1 = {"ops": ["Aa", [{ "from": "a", "to": "b" }]]}
console.log(decode(test1.ops[0], test1.ops[1]));
