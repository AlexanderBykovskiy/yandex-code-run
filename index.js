const {isRelativies} = require("./modules/pr-296");

const test1 = {"genA":"AT","genB":"TA","level":1};
console.log('test 1 + :', isRelativies(test1.genA, test1.genB, test1.level));


const test2 = {"genA":"ATTTGCGC","genB":"CGCGATTT","level":4};
console.log('test 2 + :', isRelativies(test2.genA, test2.genB, test2.level));
