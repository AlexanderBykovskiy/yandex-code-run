const readline = require('readline');

// Init data
let nailsCount;
let coordinats = [];


// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// Input data
// rl.on('line', count => {
//     rl.on('line', line => {
//         nailsCount = Number(count);
//         coordinats = stringToCoordinats(line)
//         console.log(nailsCount, coordinats)
//         //process.stdout.write(nailsCount, coordinats);
//         rl.close();
//     })
// })


// Convert input string to points with coordinats
function stringToCoordinats (inputString) {
    const coordinats = inputString.split(' ').map(Number);
    // console.log(coordinats)
    return coordinats.sort((a, b) => a - b);
}



const test = {
    count: '6',
    string: '3 13 12 4 14 6',
}

nailsCount = Number(test.count);
coordinats = stringToCoordinats(test.string);

console.log(coordinats);
