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

    if (genA === genB) {
        console.log("input equal")
        return true
    }
    if (!genA || !genB) {
        console.log("input empty")
        return false
    }
    if (Math.abs(genB.length - genA.length) > level) {
        console.log("input small level")
        return false
    }

    let long = genB.length >= genA.length ? genB : genA;
    let short = genB.length < genA.length ? genB : genA;

    let query = [{long: long, short: short, level: level}];

    while (query.length && query[0].long.length > short.length) {
        const pr1 = {long: query[0].long.slice(0,-1), short: short, level: query[0].level - 1}
        const pr2 = {long: query[0].long.slice(1), short: short, level: query[0].level - 1}
        if (pr1.long === pr1.short || pr2.long === pr2.short) {
            console.log("hurray")
            return true;
        }
        query.push(pr1);
        query.push(pr2);
        query = query.slice(1);
    }
    //console.log("before ===",query)

    while (query.length) {
        if (query[0].long.length - 1 < 1 || query[0].level < 1) {
            console.log("short parents")
            return false;
        }
        const pr1 = {long: query[0].long.slice(0,-1), short: query[0].short.slice(0,-1), level: query[0].level - 1}
        const pr2 = {long: query[0].long.slice(1), short: query[0].short.slice(0,-1), level: query[0].level - 1}
        const pr3 = {long: query[0].long.slice(0,-1), short: query[0].short.slice(1), level: query[0].level - 1}
        const pr4 = {long: query[0].long.slice(1), short: query[0].short.slice(1), level: query[0].level - 1}
        if (pr1.long === pr1.short || pr2.long === pr2.short || pr3.long === pr3.short || pr4.long === pr4.short) {
            console.log("hurray")
            return true;
        }
        query.push(pr1);
        query.push(pr2);
        query.push(pr3);
        query.push(pr4);
        query = query.slice(1);
    }
    console.log("finished")
    return false;
}

exports.isRelativies = isRelativies;
