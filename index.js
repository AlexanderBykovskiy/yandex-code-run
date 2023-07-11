const readline = require('readline');

// Init variables
let n,m;
const board = [];

// Input data from keyboard
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function readMatrix(n, m) {

    function readBoardLine() {
        rl.question(`Введите строку чисел из ${m} (через пробел): `, (line) => {
            const numbers = line.split(' ').map(Number);
            if (numbers.length === m) {
                board.push(numbers);
            } else {
                console.log('Некорректные данные');
            }

            if (board.length < n) {
                readBoardLine();
            } else {
                rl.close();

                console.log('Вы ввели следующую матрицу:');
                console.log(board);
            }
        });
    }

    readBoardLine();
}


function readNM() {

    function readNMLine() {
        rl.question('Введите N количество строк и M - столбцов (через пробел): ', (input) => {
            [n, m] = input.split(' ').map(Number);
            if (0 < n && n <= 20 && 0 < m && m <= 20) {
                rl.close();
                readMatrix(n, m);
            } else {
                console.log('Некорректные данные');
                readNMLine();
            }
        });
    }

    readNMLine();
}

readNM();

