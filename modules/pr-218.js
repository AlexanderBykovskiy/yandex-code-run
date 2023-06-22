module.exports = function (mapString) {

    const holePattern = /^\d$/;
    const letterPattern = /^[A-Z]$/;

    const mapArray = [];
    mapString.split("\n").forEach(item => mapArray.push(item.split("")));

    const rCount = mapArray.length;
    const cCount = mapArray[0].length;

    const holes = [];
    for (let y = 0; y < rCount; y++) {
        //console.log("#", mapArray[y][0], mapArray[y][cCount-1])
        if(holePattern.test(mapArray[y][0])) {
            holes.push([0, y]);
        }
        if(holePattern.test(mapArray[y][cCount-1])) {
            holes.push([cCount-1, y]);
        }
    }
    for (let x = 1; x < cCount-1; x++) {
        //console.log("#", mapArray[0][x], mapArray[rCount-1][x])
        if(holePattern.test(mapArray[0][x])) {
            holes.push([x, 0]);
        }
        if(holePattern.test(mapArray[rCount-1][x])) {
            holes.push([x, rCount-1]);
        }
    }

    const letters = [];
    for (let y = 1; y < rCount-1; y++) {
        for (let x = 1; x < cCount-1; x++) {
            if(letterPattern.test(mapArray[y][x])) {
                letters.push([x, y]);
            }
        }
    }

    let minWays = [];
    letters.forEach(letter => {
        let minWay = rCount + cCount + 1;
        holes.forEach(hole => {
            const way = Math.abs(hole[0] - letter[0]) + Math.abs(hole[1] - letter[1])
            if (way < minWay) minWay = way;
            // console.log("way", hole, letter, way)
        });
        minWays.push(minWay);
    })

    console.log("row", rCount, "col", cCount)
    console.log("holes", holes, holes.length)
    console.log("letrs", letters, letters.length)
    console.log("min ways", minWays)

    let timeInSec = minWays[0];
    minWays.forEach(item => {
        if (item > timeInSec) timeInSec = item;
    } )

    return timeInSec + 1; // первая секунда, в которую в кастрюле отсутствуют буквы
}
