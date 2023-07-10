const readline = require('readline');

// Init data
let nailsCount;
let coordinats = [];


// Input data from keyboard
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', count => {
    rl.on('line', line => {
        nailsCount = Number(count);
        coordinats = stringToCoordinats(line)
        process.stdout.write(String(findTheLength(coordinats, nailsCount)));
        rl.close();
    })
})


// Convert input string to points with coordinats
function stringToCoordinats (inputString) {
    const coordinats = inputString.split(' ').map(Number);
    // console.log(coordinats)
    return coordinats.sort((a, b) => a - b);
}


// Main function
function findTheLength (coordinats, nailsCount){

    if(nailsCount === 0 || coordinats.length === 0) return 0;

    const dp = Array(nailsCount);
    dp.fill(0);
    dp[1] = coordinats[1] - coordinats[0];

    if (nailsCount > 2) {
        dp[2] = coordinats[2] - coordinats[0];

        for (let i = 3; i <= nailsCount; i++) {
            dp[i] = Math.min(dp[i - 2], dp[i - 1]) + coordinats[i] - coordinats[i - 1]
        }

    }

    return dp[nailsCount - 1]
}


// Test data (no used input from keyboard)
/*const test = {
    count: '6',
    string: '3 13 12 4 14 6',
}

nailsCount = Number(test.count);
coordinats = stringToCoordinats(test.string);

console.log(findTheLength(coordinats, nailsCount));*/
