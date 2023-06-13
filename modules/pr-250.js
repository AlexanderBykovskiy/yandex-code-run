/** @returns Array<string|null> */
module.exports = function(inputString) {

    const pattern = /^[G-HK-U][3-8]{3}(B[CKMB][GJP]|T[ORS][J8ME])[0-9A-Y]{1,24}Z$/

    if (!pattern.test(inputString)) return null

    const arr = inputString.split('');
    let c1 = arr.splice(0, 4).join('');
    let c2 = arr.splice(0, 1).join('');
    let c3 = arr.splice(0, 2).join('');
    arr.splice(-1, 1);
    let c4 = arr.join('');

    return [c1, c2, c3, c4];
}
