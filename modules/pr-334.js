/** @returns string */
module.exports = function(inputString) {

    const pattern = /ta'((So|Ko|Ta|Qa|Goo) \d+)/i;

    const result = inputString.match(pattern);

    return result ? result[1].toLowerCase() : '0';

}
