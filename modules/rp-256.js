module.exports = function(content /* текст тестового файла */) {

    const startBlock = /^[ ]*it(.skip)?\(/i;
    const endBlock = /^[ ]*\}\);/i;

    const blockList = [];
    let block = "";
    let isBlock = false;

    content = content.replace(/\n$/,"").replace(/\n[ ]*\}\)$/i,"");

    const contentArr = content.split('\n');
    const len = contentArr.length;

    for (let i=0; i<len; i++) {

        if (!isBlock) {
            const string = contentArr[i].match(startBlock);
            if (string) {
                isBlock = true;
                block += contentArr[i] + "\n";
            }
        } else {
            const string = contentArr[i].match(endBlock);
            const nextStart = i + 1 < len ? contentArr[i + 1].match(startBlock) : true;
            if (string && nextStart) {
                isBlock = false;
                block += contentArr[i];

                blockList.push(block);

                block = "";
            } else {
                if (i + 1 < len) block += contentArr[i] + "\n";
            }
        }

    }

    console.log("+++++",block);
    if (isBlock) blockList.push(block);

    const result =  blockList.map(item => "// Some imports and comments\nconst component = require('./component');\n\ndescribe('suite', function () {\n" + item + "\n");
    // console.log(result);
    return result;
}

