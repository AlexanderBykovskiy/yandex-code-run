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

    let ceil = new Array(multiArray[0].length).fill(" ");
    let floor = new Array(multiArray[0].length).fill(" ");

    let width = multiArray[0].length;
    let height = multiArray.length;

    const lookAroundT = (x, y) => {
        //console.log("(", x, y, ")");
        let end = false;
        if (y-1 >= 0 && multiArray[y-1][x] === 1) {
            //console.log("^");
            multiArray[y-1][x] = "+";
            print(multiArray);
            end = end || lookAroundT(x, y-1);
        }
        if (x-1 >= 0 && multiArray[y][x-1] === 1) {
            //console.log("<");
            multiArray[y][x-1] = "+";
            print(multiArray);
            end = end || lookAroundT(x-1 , y);
        }
        if (x+1 < width && multiArray[y][x+1] === 1) {
            //console.log(">");
            multiArray[y][x+1] = "+";
            print(multiArray);
            end = end || lookAroundT(x+1 , y);
        }
        if (y+1 < height && multiArray[y+1][x] === 1) {
            //console.log("|");
            multiArray[y+1][x] = "+";
            print(multiArray);
            end = end || lookAroundT(x, y+1);
        }

        if (y+1 === height) {
            end = true;
        }

        return end;
    }

    // top
    for (let i=0; i<width; i++) {
        let x = i;
        let y = 0;
        if (multiArray[0][i] === 1) {
            ceil[i] = "c"
            multiArray[y][x] = '+'
            if (lookAroundT(x, y)) ceil[i] = "b";
        }
    }

    // bottom
    for (let i=0; i<width; i++) {
        let x = i;
        let y = height-1;
        if (multiArray[height-1][i] === 1) {
            floor[i] = "f"
            multiArray[y][x] = '+'
            lookAroundT(x, y);
        }
    }

    print(multiArray, ceil.join(""), floor.join(""));


    return {
        ceil: ceil.filter(item => item === "c").length,
        floor: floor.filter(item => item === "f").length,
        both: ceil.filter(item => item === "b").length
    };
}


module.exports = { scan };
