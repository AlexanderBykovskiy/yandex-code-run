module.exports = function(content) {

    const startBlock = /^[ ]*it(.skip)?\(/i;
    const endBlock = /^[ ]+\}\);/i;
    const endAll = /^\}\);/i;

    function wrapper (string) {
        return "// Some imports and comments\nconst component = require('./component');\n\ndescribe('suite', function () {\n" + string + "\n});\n"
    }

    content = content.replace(/\n$/,"")

    const arr = content.split("\n");
    const len = arr.length
    if (len < 2) return console.log('Wrong input data')

    const blocks = [];
    let blockIndStart = null

    for (let i = 1; i < len; i++) {
        if ( startBlock.test(arr[i]) || endAll.test(arr[i])) {
            if (endBlock.test(arr[i - 1])) {
                blocks.push([blockIndStart, i-1]);
                blockIndStart = null;
            }
            blockIndStart = i;
        }
    }

    const result = blocks.map (item => wrapper(arr.slice(item[0], item[1]+1).join("\n")));
    return result;
}

