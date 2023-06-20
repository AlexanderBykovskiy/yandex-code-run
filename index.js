const solution = require("./modules/pr-174");

const formatter = (arr) => {
    arr.forEach(item => {
        console.log(item.join(' '));
    })
}

const test1 = {
    field: [
        [0, 2, 4, 8],
        [0, 0, 0, 0],
        [0, 2, 2, 8],
        [0, 2, 2, 2],
    ],
    moves: "U U U",
}
formatter(solution(test1.field, test1.moves));
