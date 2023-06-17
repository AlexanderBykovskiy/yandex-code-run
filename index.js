const convert = require("./modules/pr-159");


const test1 = "= head\n" +
    "\n" +
    "text ((https://ya.ru link)) text.\n" +
    "\n" +
    "* item\n" +
    "* item"
console.log("\n", convert(test1));
