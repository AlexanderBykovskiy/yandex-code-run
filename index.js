const solveCaptcha = require("./module/pr-292");

const test1 = "TRABWARH\nTHSCAHAW\nWWBSCWAA\nCACACHCR"

const test2 = "CSRARHAR\nCWAHCBSW\nABWBSWBA\nRBSBTABH"

const test3 = "HSRSTBHC\nCAWTRTBT\nWBATSTRA\nTWRBRTRR\nRWTABSHB\nTWCBWBCA"

const test4 = "TSRSBWAC\nASCSWBTC\nTTAHTABC\nAHWTRWWA"

const test5 = "TSRBSPAC"

const test7 = ".o.o....\n" +
    "  .o.o....\n" +
    "  ........\n" +
    "  ........\n" +
    "  ........\n" +
    "  ........"

const test6 = ".S......\n" +
    "  ......S.\n" +
    "  ....S...\n" +
    "  ..S....."

// console.log(solveCaptcha(test1));
// console.log(solveCaptcha(test2));
// console.log(solveCaptcha(test3));
// console.log(solveCaptcha(test4));
// console.log(solveCaptcha(test5));
console.log(solveCaptcha(test7));
