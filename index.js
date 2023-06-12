const merge = require('./modules/pr-170.js');

const testData1 = {
    nums1: [46,55,88,0,0,0,0],
    m: 3,
    nums2: [18,29,80,90],
    n: 4
}
const testData2 = {
    nums1: [0,0,0,0],
    m: 0,
    nums2: [18,29,80,90],
    n: 4
}
const testData3 = {
    nums1: [18,29,80,90],
    m: 4,
    nums2: [],
    n: 0
}

console.log('Test data 1');
console.log(merge(testData1.nums1, testData1.m, testData1.nums2, testData1.n));

console.log('Test data 2');
console.log(merge(testData2.nums1, testData2.m, testData2.nums2, testData2.n));

console.log('Test data 3');
console.log(merge(testData3.nums1, testData3.m, testData3.nums2, testData3.n));
