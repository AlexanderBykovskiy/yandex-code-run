module.exports = function(content) {

    const startBlock = /^[ ]*it(.skip)?\(/i;
    const endBlock = /^[ ]+\}\);/i;

    // content = content.replace(/\n$/,"")

    const arr = content.split("\n");
    const len = arr.length
    if (len < 2) return console.log('Wrong input data')

    const blocks = [];
    let blockIndStart = null


    for (let i = 1; i < len; i++) {
        if (startBlock.test(arr[i]) || i === len - 1) {
            if (blockIndStart !== null) {
                for (let j = i - 1; j>blockIndStart ; j--) {
                    if (endBlock.test(arr[j])) {
                        blocks.push([blockIndStart, j]);
                        break;
                    }
                }
            }
            blockIndStart = i;
        }

    }

    const docStart = arr.slice(0, blocks[0][0]).join("\n") + "\n";
    const docEnd = "\n" + arr.slice(blocks[blocks.length-1][1]+1, len).join("\n");

    return  blocks.map(item => docStart + arr.slice(item[0], item[1]+1).join("\n") + docEnd);
}

