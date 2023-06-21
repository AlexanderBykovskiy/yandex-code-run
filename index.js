const convert = require("./modules/rp-363");


const test1 = {
    "n": 1,
    "width": 100,
    "height": 100
}
/*console.log(`[
    {
        "x": 0,
        "y": 0,
        "width": 100,
        "height": 100
    }
]`);*/
//console.log(convert(test1.n, test1.width, test1.height))


const test2 = {
    "n": 2,
    "width": 1200,
    "height": 900
}
console.log(`[
    {
        "x": 0,
        "y": 225,
        "width": 600,
        "height": 450
    },
    {
        "x": 600,
        "y": 225,
        "width": 600,
        "height": 450
    }
]`);
console.log(convert(test2.n, test2.width, test2.height))



const test3 = {
    "n": 3,
    "width": 1200,
    "height": 900
}
/*console.log(`[
    {
        "x": 300,
        "y": 0,
        "width": 600,
        "height": 450
    },
    {
        "x": 0,
        "y": 450,
        "width": 600,
        "height": 450
    },
    {
        "x": 600,
        "y": 450,
        "width": 600,
        "height": 450
    }
]`);*/
//console.log(convert(test3.n, test3.width, test3.height))
