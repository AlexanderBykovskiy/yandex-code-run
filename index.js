const {isRelativies} = require("./modules/pr-296");

const test1 = {genA:"AT",genB:"TA",level:1};
console.log('test 1: +', isRelativies(test1.genA, test1.genB, test1.level));
console.log();

const test2 = {genA:"AT",genB:"TA",level:2};
console.log('test 2: +', isRelativies(test2.genA, test2.genB, test2.level));
console.log();

const test3 = {genA:"AT",genB:"TA",level:0};
console.log('test 3: -', isRelativies(test3.genA, test3.genB, test3.level));
console.log();


const test4 = {genA:"ATGGC",genB:"TG",level:3};
console.log(`test 4: +`, isRelativies(test4.genA, test4.genB, test4.level));
console.log();


const test5 = {genA:"ATGGC",genB:"TG",level:2};
console.log('test 5: -', isRelativies(test5.genA, test5.genB, test5.level));
console.log();


const test6 = {genA:"ATGGC",genB:"TG",level:10};
console.log(`test 6: +`, isRelativies(test6.genA, test6.genB, test6.level));
console.log();


const test7 = {genA:"AAA",genB:"AAA",level:0};
console.log(`test 7: +`, isRelativies(test7.genA, test7.genB, test7.level));
console.log();


const test8 = {genA:"T",genB:"B",level:3};
console.log('test 8:', isRelativies(test8.genA, test8.genB, test8.level));
console.log();
