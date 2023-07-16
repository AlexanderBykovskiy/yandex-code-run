const readline = require('readline');

// Init variables
let n,m;
const board = [];

// Input data from keyboard
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    if (!n || !m) {
        const inputArr = input.split(' ').map(Number);
        if (inputArr[0] && inputArr[1] && inputArr[0] <= 20 && inputArr[1] <= 20) {
            n = inputArr[ 0 ];
            m = inputArr[1];
        } else {
            console.log('Wrong N or M');
        }
    } else {
        if (board.length < n) {
            const numbers = input.split(' ').map(Number);
            if (numbers.length === m) {
                board.push( numbers );
                if (board.length === n) {
                    rl.close();
                    findBestRoad();
                }
            }
        }
    }

});

function findBestRoad() {
    console.log('result');
    console.log(board);
    console.log('FINISH');
}
