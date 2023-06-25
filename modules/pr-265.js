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

    fieldArr[0][0] = "-";
    fieldArr[0][1] = "-";
    fieldArr[0][2] = "-";

    const temp = moves.split(" ");
    const movesArr = [];
    for (let i = 0; i < temp.length; i+=2) {
        movesArr.push([temp[i], temp[i+1]])
    }
    //console.log(movesArr)

    let head = {r: 0, c: 2};
    let size = 3;

    function go(way) {
        while(way[1]) {
            if (way[0] === "R") head.c += 1;
            if (way[0] === "L") head.c -= 1;
            if (way[0] === "D") head.r += 1;
            if (way[0] === "U") head.r -= 1;
            if (food.includes(fieldArr[head.r][head.c])) {
                size++;
            }
            fieldArr[head.r][head.c] = "*";
            way[1]--;
        }
    }

    movesArr.forEach(item => go(item));

    //print(fieldArr);


    return [[head.r, head.c], size]; // [x, y] - координаты головы змейки, N - размер змейки
}
