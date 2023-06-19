const print = (multiArray) => {
    multiArray.forEach(r => {
        let str = "";
        r.forEach(c => str+=c);
        console.log(str);
    })
}

function scan (multiArray) {

    print(multiArray);

    let sailing = multiArray[0].map(item => " ");

    let width = multiArray[0].length;
    let height = multiArray.length;

    for (let i=0; i<width; i++) {
        let y = 0;
        let x = i;
        if (multiArray[y][x] === 1) {
            sailing[x] = "s";
            while (y<height && (multiArray[y][x] === 1 || multiArray[y][x] === "@")) {
                multiArray[y][x] = '#';
                if (y === height-1) {
                    sailing[ i ] = 'b';
                };
                while ( x + 1 < width && multiArray[ y ][ x + 1 ] === 1 ) {
                    multiArray[ y ][ x + 1 ] = "@";
                    x++;
                }
                x = i;
                y++;
            }

        }
    }


    console.log(sailing.join(""));
    print(multiArray);


    const result = {ceil: 2, floor: 2, both: 1}

    return undefined;
}


module.exports = { scan };
