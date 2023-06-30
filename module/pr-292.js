module.exports = function solveCaptcha(captcha) {

    const captchaArr = captcha.trim()
        .split("\n").map(item => item.trim());
    //console.log(captchaArr)
    //console.log("x:", captchaArr[0].length, "y:", captchaArr.length)

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
    //console.log("S:", partS)

    let rectangles = [];
    for (let i = captchaArr[0].length; i > 0; i--) {
        if (partS % i === 0 && (partS / i) <= captchaArr.length) rectangles.push([i, partS / i]);
    }
    //console.log("rectangles:", rectangles)

// #####################################################################################################################


    const getEmptyPos = () => {
        const cLayer = Object.assign([], board[board.length-1]);
        //console.log(cLayer[0].length, cLayer.length)
        for (let x = 0; x < cLayer[0].length; x++) {
            for (let y = 0; y < cLayer.length; y++) {
                if (cLayer[y][x] !== "#" && cLayer[y][x] !== "*")
                    return [x, y];
            }
        }

        return undefined;
    }


    const getLayer = (pos, size) => {

        const newLayer = Object.assign([], board[board.length-1]);

        //console.log("\nGET LAYER")
        //console.log("pos", pos, "size", size)

        //console.log("end x", pos[0] + size[0] , "need", newLayer[0].length, "       end y", pos[1] + size[1] , "need", newLayer.length)

        if (pos[1] + size[1] > newLayer.length || pos[0] + size[0] > newLayer[0].length) return null;

        let sCount = 0;
        for (let y = pos[1]; y < pos[1] + size[1]; y++) {
            for (let x = pos[0]; x < pos[0] + size[0]; x++) {
                if (newLayer[y][x] === "S") sCount++;
            }
        }

        //console.log("S count", sCount)

        if (sCount !== 1) return null;

        for (let y = pos[1]; y < pos[1] + size[1]; y++) {
            newLayer[y] = newLayer[y].slice(0, pos[0]) + "#".repeat(size[0]) + newLayer[y].slice(pos[0] + size[0], newLayer[y].length);
            //newSolution.push(newLayer[y].slice(pos[0], size[0]));
        }

        //console.log("\n---ACCEPT---")
        //console.log(newLayer)
        //console.log("\n\n")

        return newLayer;
    }

    const newSolution = (pos, size) => {

        const newLayer = Object.assign([], board[board.length-1]);
        const sol = [];


        if (pos[1] + size[1] > newLayer.length || pos[0] + size[0] > newLayer[0].length) return null;

        for (let y = pos[1]; y < pos[1] + size[1]; y++) {
            sol.push(newLayer[y].slice(pos[0], pos[0] + size[0]));
        }
        return sol.length ? sol : null;
    }


    function nextLayout(num) {

        if (num  === 0) return board;

        const pos = getEmptyPos(board);
        //if (!pos) return board; // ********
        //console.log("\n-----------------------------\nPOS", pos, "level", num);
        //console.log(board[board.length-1])

        for (let i = 0; i < rectangles.length; i++) {

            const size = rectangles[i];

            const layer = getLayer(pos, size);
            const newSol = newSolution(pos, size);

            //if (layer) console.log("* layer ok *")

            if (layer) {

                board.push(Object.assign([],layer));
                solution.push(Object.assign([],newSol));

                const res = nextLayout(num - 1);


                if (res) return res;

                board.pop();
                solution.pop();
            }

        }

        //console.log("==== all figuries, last is ====")
        //board.map(item => console.log(item))
    }

    const board = [Object.assign([], captchaArr)];
    const solution = [];

    const res = nextLayout(signCount)

    //console.log("res", res)
    const result = solution.map(item => item.join("\n"));
    //console.log("sol", solution.map(item => item.join("\n")))


    return result;

}
