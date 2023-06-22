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

    level = String(level);
    if (!genA || !genB) return false;
    if (genA === genB) return true;

    function getParents(children) {
        return [children.slice(0, children.length-1), children.slice(1, children.length)]
    }

    const parentsA = [genA];
    let counter = 1;
    for (let i = 0; i < level && i < genA.length; i++) {
        for (let j = 0; j < counter; j++) {
            //console.log("i", i, "j", counter + j - 1)
            const nP = getParents(parentsA[counter + j - 1]);
            //console.log("nP",nP)
            parentsA.push(nP[0])
            parentsA.push(nP[1])
        }
        counter*=2;
    }

    for(let i=0; i<parentsA.length; i++) {
        const index = genB.indexOf(parentsA[i]);
        if (index >=0 && index <= level) return true;
    }

    return false;
}

exports.isRelativies = isRelativies;
