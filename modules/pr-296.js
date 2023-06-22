/**
 * @param {string} genA
 * @param {string} genB
 * @param {number} level
 * @returns {boolean}
 * A Аденин
 * G Гуанин
 * T Тимин
 * C Цитозин
 */
function isRelativies(genA, genB, level) {

    function isCommon (a,b) {
        for(let i=0; i<a.length; i++) {
            //console.log(item,b.includes(item) )
            if (b.includes(a[i])) return true;
        }
        return false;
    }

    if (genA === genB) return true;
    if (!genA || !genB) return false;
    if (Math.abs(genB.length - genA.length) > level) return false;

    let long = genB.length >= genA.length ? genB : genA;
    let short = genB.length < genA.length ? genB : genA;

    let queryLong = [long];
    let queryShort = [short];

    let currentLevel = long.length - short.length;

    while (queryLong.length && queryLong[0].length > short.length) {
        queryLong.push(queryLong[0].slice(0,-1));
        queryLong.push(queryLong[0].slice(1));
        queryLong = queryLong.slice(1);
    }
    //console.log('level', currentLevel)
    while (queryLong.length && currentLevel <= level) {
        //console.log("#",queryLong, queryShort)
        if(isCommon(queryLong, queryShort)) {
            //console.log("have same")
            return true
        }
        const queryLongLen = queryLong.length;
        if (queryLong[0].length > 1) {
            for (let i = 0; i < queryLongLen; i++) {
                queryLong.push(queryLong[0].slice(0,-1));
                queryLong.push(queryLong[0].slice(1));
                queryLong = queryLong.slice(1);
            }
        }
        const queryShortLen = queryShort.length;
        for (let i = 0; i < queryShortLen; i++) {
            if (queryShort[0].length > 1) {
                queryShort.push(queryShort[0].slice(0, -1));
                queryShort.push(queryShort[0].slice(1));
                queryShort = queryShort.slice(1);
            }
        }
        currentLevel++;
    }
    //console.log("end prog")
    return false;
}

exports.isRelativies = isRelativies;
