const parser = require("./modules/rp-256");

const test1 = `// Some imports and comments
const component = require('./component');

describe('suite', function () {
    it('test1', function () {
        function () {
            console.log("super");
        };
    });
    it('test2', function () {
        // Some test 2
    });
    it.skip('test3', function () {
        // Some test 3
        const lol = () => {
            console.log('lalalal')
        };
        arr.map((i,j) => {
            return i;
        });
    });
});`

console.log("Test 1:", parser(test1));
