const printResult = (arr, message = undefined) => {
    if(message) console.log(message, "-")
    arr.forEach(item => console.log(item))
    console.log("-")
}

module.exports = function solveCaptcha(captcha) {

    const captchaArr = captcha.trim().split("\n").map(item => item.trim().split(""));
    //console.log(captchaArr)
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
    console.log("S:",partS)

    let rectangles = [];
    for (let i = captchaArr[0].length; i > 0; i--) {
        if (partS % i === 0 && (partS / i) <= captchaArr.length) rectangles.push([i, partS / i]);
    }
    console.log("rectangles:", rectangles)

    function arrToResult(arr) {
        return arr.map(item => item.join(""));
    }

    function getFreePosition(arr) {
        let position = null;
        loop: {
            for (let x = 0; x < arr[0].length; x++) {
                for (let y = 0; y < arr.length; y++) {
                    if (arr[y][x] !== "#" && arr[y][x] !== "*") {
                        position = [x, y];
                        break loop;
                    }
                }
            }
        }
        return position;
    }

    function layerMaker (point, figure, layer) {
        for (let y = point[1]; y < point[1] + figure[1]; y++) {
            for (let x = point[0]; x < point[0] + figure[0]; x++) {
                if (layer[y][x] === "S" || layer[y][x] === "*")
                    layer[y][x] = "*";
                else
                    layer[y][x] = "#";
            }
        }
        return layer;
    }

    function isPossibleStep (point, figure, layer) {
        let sCount = 0;
        console.log("point x", point[0], "fig w", figure[0], "x+w", point[0] + figure[0])
        // console.log("l x len", layer[0].length)
        console.log("point y", point[1], "fig h", figure[1], "y+h", point[1] + figure[1])
        // console.log("l y len", layer.length)
        if (point[0] + figure[0] <= layer[0].length && point[1] + figure[1] <= layer.length) {
            // console.log("try calc")
            for (let y = point[1]; y < point[1] + figure[1]; y++){
                // console.log("-", layer[y].join(""))
                for (let x = point[0]; x < point[0] + figure[0]; x++){
                    // console.log("+", x)
                    if (layer[y][x] === "S") sCount++;
                }
            }
        }
        console.log("sCount:", sCount)
        return sCount === 1;
    }

    function cFigure (point, figure) {
        const newFigure = [];
        for (let y = point[1]; y < point[1] + figure[1]; y++){
            const newRow = captchaArr[y].slice(point[0], point[0] + figure[0]).join("");
            // console.log("+++++", newRow)
            newFigure.push(newRow);
        }
        return newFigure.join("\n");
    }

    function nextLayer(layers, n, successBlocks) {
        console.log("-----------------------------------------------------------------------------------------")
        if (!n) return successBlocks;

        const layer = layers[layers.length-1];
        printResult(arrToResult(layer), "current layer")

        const freePosition = getFreePosition(layer);
        console.log("current free pos", freePosition);

        for (let i = 0; i < rectangles.length; i++) {
            const figure = rectangles[i];
            console.log("-----------")
            console.log("curren figure", figure)
            if (isPossibleStep(freePosition, figure, layer)) {
                console.log("can to put")
                successBlocks.push(cFigure(freePosition, figure));
                const newLayer = layerMaker(freePosition, figure, layer);
                // printResult(arrToResult(newLayer), "newLayer")
                layers.push(newLayer);
                const nextSuccessBlocks = nextLayer(layers, n-1, successBlocks);
                if (nextSuccessBlocks.length === signCount)
                    return successBlocks;
                else
                    layers.pop();
                    successBlocks.pop();
            }
        }

        return [];
    }

    const result = nextLayer([captchaArr], signCount, []);

    //console.log(result);

    return (result)

}
