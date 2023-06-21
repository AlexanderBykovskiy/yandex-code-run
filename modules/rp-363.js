/**
 * @param n - количество участников
 * @param width - ширина экрана каждого участника в пикселях
 * @param height - высота экрана каждого участника в пикселях
 */
module.exports = function(n, width, height) {

    const result = [];

    const cells = Math.ceil(Math.sqrt(n));
    const firstLineCount = n % cells;
    const rows = Math.floor(n / cells) + (firstLineCount ? 1 : 0);

    const newWidth = Math.round(width / cells);
    const newHeight = Math.round((newWidth * height) / width);

    const deltaTop = Math.round((cells - rows) * newHeight / 2);
    const deltaLeft =  firstLineCount ? Math.round((cells - firstLineCount) * newWidth / 2) : 0;

    console.log("n", n, "w", width, "h", height)
    console.log("c", cells, "r", rows, "f:", firstLineCount)
    console.log("dt", deltaTop, "dl", deltaLeft)


    let current = 1;
    let firstDone = false;
    for (let y = 0; y < cells && current <= n; y++) {
        for (let x = 0; x < cells && current <= n; x++) {
            //console.log("current", current, "f", firstLineCount)
            //console.log("x", x, "y", y)
            result.push({
                x: current <= firstLineCount ? x * newWidth + deltaLeft : x * newWidth,
                y: y * newHeight + deltaTop,
                width: newWidth,
                height: newHeight,
            })
            current++;
            if (firstLineCount !== 0 && current > firstLineCount && !firstDone) {
                firstDone = true;
                break;
            }

        }
    }

    return result;
}
