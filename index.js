const {isRelativies} = require("./modules/pr-296");

const test1 = {"genA":"ATTTGCGC","genB":"CGCGATTT","level":7};
console.log('test 1:', isRelativies(test1.genA, test1.genB, test1.level));


const test2 = {genA:"ATGGC",genB:"TGT",level:3};
//console.log(`test 2 + :${test2.genA} ${test2.genB}\n`, isRelativies(test2.genA, test2.genB, test2.level));
