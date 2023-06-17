const convert = require("./modules/pr-159");


const test1 = `= head '= head'

text ((https://ya.ru link)) text.

* item
* item

text ((https://google.com long link)) text.

* item
* item`;
console.log("\nTest 1:", convert(test1));
