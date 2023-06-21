module.exports = function (str) {

    // console.log("str", str, str.length)
    // console.log(str.split("").map((_, i) => i).join(""))

    if (str < 1) return false;

    const available = ["1111", "711", "7"];

    let i = str.length;

    while (i > 0) {

        let find = false;

        for (let j=0; j<available.length; j++) {

            const pattern = available[j];
            const patternLen = pattern.length;
            const start = i - patternLen;
            const end = i;

            if (start < 0) continue;
            //console.log(`i:${i} - `, `|${pattern}| (${patternLen}) :`, `|${str.slice(start, end)}| (${start}: ${end}) :`)
            if (str.slice(start, end) === pattern) {
                //console.log('*')
                find = true;
                i = i - patternLen;
                break;
            }
        }

        //console.log(`find: ${find}   i: ${i}`)
        if (find === false || i < 0) return false;
    }

    return true;

};
