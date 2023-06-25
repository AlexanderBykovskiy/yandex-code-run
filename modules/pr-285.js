function scan (multiArray) {

    const result = {
        ceil: 0,
        floor: 0,
        both: 0
    }

    const stack = [];

    for (let y = 0; y < multiArray.length; y++) {
        for (let x = 0; x < multiArray[0].length; x++) {
            if (multiArray[y][x] === 1) {
                stack.push({x,y})
                let ceil = false;
                let floor = false;
                while ( stack.length ) {
                    const {x, y} = stack.pop();
                    if (y === 0) ceil = true;
                    if (y === multiArray.length-1) floor = true;
                    multiArray[y][x] = "*";
                    if (y+1 < multiArray.length && multiArray[y+1][x] === 1) stack.push({x: x, y: y+1});
                    if (y-1 >= 0 && multiArray[y-1][x] === 1) stack.push({x: x, y: y-1});
                    if (multiArray[y][x+1] === 1) stack.push({x: x+1, y: y});
                    if (multiArray[y][x-1] === 1) stack.push({x: x-1, y: y});
                }
                if (ceil && floor) {
                    result.both += 1
                } else {
                    if (ceil) result.ceil+=1;
                    if (floor) result.floor+=1;
                }

            }
        }
    }

    return result;
}


module.exports = { scan };
