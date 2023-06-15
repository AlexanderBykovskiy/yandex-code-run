const dateFinder = require("./modules/pr-334");


const test1 = "Ta’gh ta’So 29 jE yin";
console.log("\nt1 ", dateFinder(test1));

const test2 = "DUN 'Ej QAD Je pAtLh TLhOQ Ta'ko 494 PuS WoVBe' SICh HuD, So, Ko, Ta, Qa, Goo";
console.log("\nt2 ", dateFinder(test2));

const test3 = "DUN 'Ej QAD Je tA’ta 48 pAtLh TLhOQ T'tA 494 PuS WoVBe' SICh HuD,";
console.log("\nt3 ", dateFinder(test3));

const test4 = "DUN 'Ej QAD Je pAtLh TLhOQ ta'Qa 6544484846465456 PuS WoVBe' SICh HuD, So, Ko, Ta, Qa, Goo";
console.log("\nt4 ", dateFinder(test4));

const test5 = "DUN 'Ej QAD Je TA’Goo 48 pAtLh TLhOQ 363563 PuS WoVBe' SICh HuD,";
console.log("\nt5 ", dateFinder(test5));

const test6 = "ta'Qa 65444848";
console.log("\nt6 ", dateFinder(test6));

const test7 = "DUN 'Ej QAD Je TA’Goo pAtLh TLhOQ SICh HuD,";
console.log("\nt7 ", dateFinder(test7));

const test8 = "DUN 'Ej QAD Je tA’ta 48 pAtLh TLhOQ Ta'tA 494 PuS WoVBe' SICh HuD,";
console.log("\nt8 ", dateFinder(test8));
