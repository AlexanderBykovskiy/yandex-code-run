module.exports = function solveCaptcha(captcha) {

    const captchaArr = captcha.trim().split("\n").map(item => item.trim());
    console.log(captchaArr)
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
    //console.log("S:",partS)

    let rectangles = [];
    for (let i = captchaArr[0].length-1; i >= 0; i--) {
        if (partS % i === 0 && (partS / i) <= captchaArr.length) rectangles.push([i, partS / i]);
    }
    console.log("rectangles:", rectangles)

    const markPositions = (pos, figure, layout) => {
        const arr = Array.from(layout)
        for (let y = pos[1]; y<pos[1]+figure[1]; y++) {
            arr[y] = arr[y].slice(0, pos[0]) + "#".repeat(figure[0]) + arr[y].slice(pos[0]+figure[0]);
        }
        return arr;
    }

    const getPos = (arr) => {
        for (let x = 0; x < arr[0].length; x++) {
            for (let y = 0; y < arr.length; y++) {
                if (!(arr[y][x] === "#" || arr[y][x] === "*")) {
                    return [x, y];
                }
            }
        }
        return null;
    }

    const getNewLayout = (pos, figure, arr) => {
        const layout = Array.from(arr)

        if (pos[0] + figure[0] <= layout[0].length && pos[1] + figure[1] <= layout.length) {
            let sCount = 0;
            for (let y = pos[1]; y < pos[1] + figure[1]; y++) {
                for (let x = pos[0]; x < pos[0] + figure[0]; x++) {
                    if (captchaArr[y][x] === "S") sCount++;
                }
            }
            if (sCount !== 1) return null;
            return markPositions(pos, figure, arr);
        }
        return null;
    }

    const converter = (pos, figure) => {
        const arr = [];
        //console.log("p", pos, 'f', figure)
        for (let y = pos[1]; y < pos[1] + figure[1]; y++) {
            //console.log("##", captchaArr[y].slice(pos[0], figure[0]))
            let str = "";
            for (let x = pos[0]; x<pos[0]+figure[0]; x++) {
                str+=captchaArr[y][x];
            }
            //console.log(y,str)
            arr.push(str)
        }
        return arr.join("\n");
    }


    const query = [[Array.from(captchaArr), signCount, []]];

    while (query.length) {

        for (let i=rectangles.length-1; i >= 0; i--) {

            const cItem = Array.from(query[0]);
            //console.log(cItem[0])

            const pos = getPos(cItem[0]);

            if (cItem[1] <= 0) {
                if (!pos) {
                    return cItem[2];
                }
                continue;
            }

            const figure = rectangles[i];

            const newLayout = getNewLayout(pos, figure, Array.from(cItem[0]))

            if (newLayout) {
                //console.log(newLayout)
                const rawFigure = converter(pos, figure);
                const newList = Array.from(cItem[2])
                newList.push(rawFigure)
                //console.log(rawFigure)
                const newArr = [newLayout, cItem[1]-1, newList];
                //console.log(newArr)
                query.push(newArr)
            }
        }
        query.shift();
    }

}
