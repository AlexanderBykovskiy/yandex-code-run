module.exports = function(content) {

    const startDescribe = /^\s*describe\s*\(/i;
    const startBlock = /^\s*it[.(]/i;
    const endBlock = /^\s*}?\s*\)\s*;?\s*$/i;

    const arr = content.split("\n");
    const len = arr.length

    const wrapper = [];

    for (let i = 0; i < len; i++) {
        if (startDescribe.test(arr[i])) {
            for (let j = len - 1; j > i; j--) {
                if (endBlock.test(arr[j])) {
                    wrapper.push(i);
                    wrapper.push(j);
                    break;
                }
            }
            break;
        }
    }

    // console.log("wrapper", wrapper)

    // if (wrapper[0] < 0 && wrapper[1] < 1) console.log("Wrong data");

    const blocks = [];
    let block = [null, null];
    for (let i = wrapper[1] - 1; i > wrapper[0]; i--) {

        if (block[1] === null && endBlock.test(arr[i])) {
            block[1] = i;
        }

        if (block[0] === null && block[1] !== null && startBlock.test(arr[i])) {
            block[0] = i;
            blocks.unshift([block[0], block[1]]);
            block[0] = null;
            block[1] = null;
        }
    }

    // console.log(blocks);

    return blocks.map(item => arr.slice(0, wrapper[0]+1).join("\n") + "\n" + arr.slice(item[0], item[1] + 1).join("\n") + "\n" + arr.slice(wrapper[1], len + 1).join("\n"));
}

