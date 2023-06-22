const timeCalculator = require("./modules/pr-218");


const test1 =
`1-------2
|       |
|       |
|       |
5       |
|       |
|       |
|       |
3-------+`
console.log("\nT 1\n", timeCalculator(test1));

const test2 =
`+----------------0---------------+
|                                |
|                                |
|          U        D            |
|     L                          |
|              R                 |
|           L                    |
|  U                             1
3        U    D                  |
|         L              R       |
|                                |
+----------------2---------------+`
//console.log("\nT 2\n", timeCalculator(test2));
