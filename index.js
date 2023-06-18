const parser = require("./modules/rp-256");

const test1 = `// Some imports and comments
const component = require('./component');

describe('suite', function () {
    it('test1', function () {
        // Some test 1
    });
    it('test2', function () {
        // Some test 2
    });
    it.skip('test3', function () {
        // Some test 3
    });
});`

console.log("Test 1:", parser(test1));
