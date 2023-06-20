const print = (multiArray, sailing = undefined) => {
    if (sailing) console.log(" ", " ", sailing)
    console.log(" ", " ", "-".repeat(multiArray[0].length))
    console.log(" ", " ", "01234567890123456789")
    console.log(" ", " ", "-".repeat(multiArray[0].length))
    multiArray.forEach((r, i) => {
        let str = "";
        r.forEach(c => str+=c);
        console.log(i, ":", str);
    })
    console.log(" ", " ", "-".repeat(multiArray[0].length))
}

function scan (multiArray) {

    let sailing = new Array(multiArray[0].length).fill(" ");

    let width = multiArray[0].length;
    let height = multiArray.length;

    const lookAround = (x, y) => {
        console.log("(", x, y, ")");
        if (y-1 > 0 && multiArray[y-1][x] === 1) {
            console.log("^");
            multiArray[y-1][x] = "+";
            print(multiArray);
            lookAround(x, y-1);
        }
        if (x-1 > 0 && multiArray[y][x-1] === 1) {
            console.log("<");
            multiArray[y][x-1] = "+";
            print(multiArray);
            lookAround(x-1 , y);
        }
        if (x+1 < width && multiArray[y][x+1] === 1) {
            console.log(">");
            multiArray[y][x+1] = "+";
            print(multiArray);
            lookAround(x+1 , y);
        }
        if (y+1 < height && multiArray[y+1][x] === 1) {
            console.log("|");
            multiArray[y+1][x] = "+";
            print(multiArray);
            lookAround(x, y+1);
        }
        if (y+1 === height)
            console.log("both", x, y);
    }


    for (let i=0; i<width; i++) {
        console.log("-",i,"-");
        let x = i;
        let y = 0;
        if (multiArray[0][i] === 1) {
            sailing[i] = "s"
            multiArray[y][x] = '+'
            lookAround(x, y);
        }
    }

    print(multiArray, sailing.join(""));


    const result = {ceil: 2, floor: 2, both: 1}

    return undefined;
}


module.exports = { scan };
