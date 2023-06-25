const simulate = require("./modules/pr-265");

const test1 = {field: [
        "ooo------Y--AND------",
        "-----EXY--A--N---D--E",
        "-X-----Y--A-N---D----",
        "------EXY----A---N---",
        "--DE--X---------YA---",
        "-----ND---EXY--AN--D-",
        "----E-----X-Y----A--N",
        "D-----E-XY---AN---D--",
        "E--------------------",
        "-------X---Y------A-N",
        "----D-EX----------YA-",
        "--N-DEX--Y-A--N-----D",
        "E------X--Y----------",
    ],
    moves: 'R 12 D 2 R 2 U 1 R 2'
};
console.log(simulate(test1.field, test1.moves));
