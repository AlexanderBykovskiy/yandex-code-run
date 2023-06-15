/** @returns string */
module.exports = function(inputString) {

    const pattern = /ta'((So|Ko|Ta|Qa|Goo) \d+)/gi;

    const result = Array.from(inputString.matchAll(pattern));

    return result.length === 1 ? result[0][1].toLowerCase() : 0;

}
