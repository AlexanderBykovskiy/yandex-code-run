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
    const [min, max] = genB.length > genA.length ? [genA, genB] : [genB, genA]
    const stack = [{min, max, index: 0}]

    if (max.length - min.length > level) {
        return false
    }

    while (stack.length) {
        const {min, max, index} = stack.pop()
        if (index > level || min.length === 0) {
            continue
        }

        if (max.length > min.length) {
            stack.push({max: max.slice(0, -1), min, index: index + 1})
            stack.push({max: max.slice(1), min, index: index + 1})
        } else {
            if (min === max) {
                return true
            }
            stack.push({max: max.slice(0, -1), min: min.slice(1), index: index + 1})
            stack.push({max: max.slice(1), min: min.slice(1), index: index + 1})
            stack.push({max: max.slice(0, -1), min: min.slice(0, -1), index: index + 1})
            stack.push({max: max.slice(1), min: min.slice(0, -1), index: index + 1})
        }

    }

    return false
}

exports.isRelativies = isRelativies;
