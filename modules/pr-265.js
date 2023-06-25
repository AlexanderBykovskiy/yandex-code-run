/**
 * @param {string[]} field - описание поля в виде массива строк
 * @param {string} moves - строка со всеми движениями змейки
 * @returns {[number[], number]}
 */

function print(arr) {
    arr.forEach(item => {
        console.log(item.join(''))
    })
}

module.exports = function (field, moves) {

    const food = ["Y", "A", "N", "D", "E", "X"];

    const fieldArr = [];
    field.forEach(item => {
        fieldArr.push(item.split(""));
    })
    const movesArr = moves.split(" ");

    fieldArr[0][0] = "-";
    fieldArr[0][1] = "-";
    fieldArr[0][2] = "-";

    let head = {r: 0, c: 2};
    let size = 3;

    print(fieldArr);

    console.log(movesArr)

    return [[0, 0], 0]; // [x, y] - координаты головы змейки, N - размер змейки
}
