const printLayer = (arr, message = undefined) => {
    if(message) console.log(message, "-")
    arr.forEach(item => console.log(item.join("")))
    console.log("-")
}

module.exports = function solveCaptcha(captcha) {

    const captchaArr = captcha.trim()
        .split("\n").map(item => item.trim().split(""));
    printLayer (captchaArr)
    console.log("x:", captchaArr[0].length, "y:", captchaArr.length)

    function getSCount (point, size) {
        let signCount = 0;
        for (let y = point[1]; y < captchaArr.length || y < size[1]; y++) {
            for (let x = point[0]; x < captchaArr[0].length || x < size[0]; x++) {
                if (captchaArr[y][x] === "S") signCount++;
            }
        }
        return signCount;
    }
    const signCount = getSCount([0, 0], [captchaArr[0].length, captchaArr.length]);
    if (!(0 < signCount < 10)) return [];
    //console.log("sCount:", signCount)

    const fullS = captchaArr.length * captchaArr[0].length;
    //console.log("fS:", fullS)

    if (fullS % signCount !== 0) return [];
    const partS = fullS / signCount;
    console.log("S:", partS)

    let rectangles = [];
    for (let i = captchaArr[0].length; i > 0; i--) {
        if (partS % i === 0 && (partS / i) <= captchaArr.length) rectangles.push([i, partS / i]);
    }
    console.log("rectangles:", rectangles)

// #####################################################################################################################


    const getEmptyPos = (board) => {
        const cLayer = Object.assign([],board[board.length-1]);
        //console.log(cLayer[0].length, cLayer.length)
        for (let x = 0; x < cLayer[0].length; x++) {
            for (let y = 0; y < cLayer.length; y++) {
                if (cLayer[y][x] !== "#" && cLayer[y][x] !== "*")
                    return [x, y];
            }
        }

        return undefined;
    }


    const getLayer = (pos, size, board) => {

        const newLayer = Object.assign([], board[board.length-1]);

        console.log("\nGET LAYER")
        printLayer(newLayer, "\nGET LAYER ####")
        console.log("pos", pos, "size", size)

        let sCount = 0;


        console.log("end x", pos[0] + size[0] , "need", newLayer[0].length, "       end y", pos[1] + size[1] , "need", newLayer.length)

        if (pos[1] + size[1] > newLayer.length || pos[0] + size[0] > newLayer[0].length) return null;

        for (let y = pos[1]; y < pos[1] + size[1]; y++) {
            for (let x = pos[0]; x < pos[0] + size[0]; x++) {
                if (newLayer[y][x] === "S") sCount++;
            }
        }

        console.log("S count", sCount)

        if (sCount !== 1) return null;


        for (let y = pos[1]; y < pos[1] + size[1]; y++) {
            for (let x = pos[0]; x < pos[0] + size[0]; x++) {
                if (newLayer[y][x] === "S") {
                    newLayer[y][x] = "*";
                } else {
                    newLayer[y][x] = "#";
                }
            }
        }

        printLayer(newLayer, "\n---ACCEPT---")

        console.log("\n\n")
        return newLayer;
    }





    function nextLayout(num, arr) {

        const board = Object.assign([], arr);

        if (num  === 0) return board;

        const pos = getEmptyPos(board);
        //if (!pos) return board; // ********
        console.log("\n-----------------------------\nPOS", pos, "level", num);
        printLayer(board[board.length-1])

        for (let i = 0; i < rectangles.length; i++) {

            const size = rectangles[i];

            const layer = getLayer(pos, size, board);
            if (layer) console.log("* layer ok *")

            if (layer) {

                board.push(Array.from(layer));

                const res = nextLayout(num - 1, board);

                if (res) return res;

                board.pop();
            }

        }
        console.log("==== all figuries, last is ====")
        board.map(item => printLayer(item))
        board.pop()
    }

    const res = nextLayout(signCount, [Object.assign([], captchaArr)])

    return "answer";

}
