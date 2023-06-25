function scan (multiArray) {

    let width = multiArray[0].length;
    let height = multiArray.length;

    const result = {
        ceil: 0,
        floor: 0,
        both: 0
    }

    if (!width || !height) return result;

    const stack = [];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            console.log(multiArray[y][x])
            if (multiArray[y][x] === 1) {
                stack.push({x,y})
                let ceil = false;
                let floor = false;
                while ( stack.length ) {
                    const {x, y} = stack.pop();
                    if (y === 0) ceil = true;
                    if (y === height-1) floor = true;
                    multiArray[y][x] = "*";
                    if (y+1 < height && multiArray[y+1][x] === 1) stack.push({x: x, y: y+1});
                    if (y-1 >= 0 && multiArray[y-1][x] === 1) stack.push({x: x, y: y-1});
                    if (x+1 < width && multiArray[y][x+1] === 1) stack.push({x: x+1, y: y});
                    if (x-1 >= 0 && multiArray[y][x-1] === 1) stack.push({x: x-1, y: y});
                }
            if (ceil && floor) result.both+=1;
            if (ceil && !floor) result.ceil+=1;
            if (!ceil && floor) result.floor+=1;
            }
        }
    }

    return result;
}


module.exports = { scan };
