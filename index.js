const {isRelativies} = require("./modules/pr-296");

const test1 = {"genA":"AT","genB":"TA","level":1};
console.log('test 1:', isRelativies(test1.genA, test1.genB, test1.level));
