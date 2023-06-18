module.exports = function(content) {

    const startBlock = /^[ ]*it(.skip)?\(/i;
    const endBlock = /^[ ]+\}\);/i;
    const endAll = /^\}\);/i;

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

    const docStart = arr.slice(0, blocks[0][0]).join("\n") + "\n";
    const docEnd = "\n});\n"

    return  blocks.map(item => docStart + arr.slice(item[0], item[1]+1).join("\n") + docEnd);
}

