const print = (multiArray, sailing = undefined, floor = undefined, index = undefined) => {
    if (sailing) console.log(" ", " ", sailing)
    console.log(" ", " ", "-".repeat(multiArray[0].length))
    if (index) {
        console.log( ' ', ' ', '01234567890123456789' );
        console.log(" ", " ", "-".repeat(multiArray[0].length))
    }
    multiArray.forEach((r, i) => {
        let str = "";
        r.forEach(c => str+=c);
        console.log(i, ":", str);
    })
    console.log(" ", " ", "-".repeat(multiArray[0].length))
    if (floor) console.log(" ", " ", floor)
}

function scan (multiArray) {

    function lookAround (stack) {
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
        return {ceil, floor}
    }

    let ceil = new Array(multiArray[0].length).fill(" ");
    let floor = new Array(multiArray[0].length).fill(" ");

    let width = multiArray[0].length;
    let height = multiArray.length;

    const result = {
        ceil: 0,
        floor: 0,
        both: 0
    }

    for (let i = 0; i < multiArray[0].length; i++) {
        const stack = [];

        if (multiArray[0][i] === 1) {
            stack.push({x: i, y: 0});
        }
        const {ceil, floor} = lookAround(stack);
        if (ceil && floor) result.both+=1;
        if (ceil && !floor) result.ceil+=1;
    }

    for (let i = 0; i < multiArray[0].length; i++) {
        const stack = [];

        if (multiArray[height-1][i] === 1) {
            stack.push({x: i, y: height-1});
        }
        const {ceil, floor} = lookAround(stack);
        if (!ceil && floor) result.floor+=1;
    }

    // print(multiArray, ceil.join(""), floor.join(""));

    return result;
}


module.exports = { scan };
