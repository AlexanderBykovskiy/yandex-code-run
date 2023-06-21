/**
 * @param n - количество участников
 * @param width - ширина экрана каждого участника в пикселях
 * @param height - высота экрана каждого участника в пикселях
 */
module.exports = function(n, width, height) {

    const result = [];

    const cells = Math.ceil(Math.sqrt(n));

    const newWidth = Math.round(width / cells);
    const newHeight = Math.round((newWidth * height) / width);

    console.log(cells, newWidth, newHeight)

    let currentWidth
    for (let i = n-1; i >= 0; i--) {
        result.unshift({
            x: "x",
            y: "x",
            width: newWidth,
            height: newHeight,
        })
    }

    return result;
}
