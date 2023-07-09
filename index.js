const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let nailsCount;
let coordinats = [];

rl.on('line', count => {
    rl.on('line', line => {
        nailsCount = Number(count);
        coordinats = stringToCoordinats(line)
        console.log(nailsCount, coordinats)
        //process.stdout.write(nailsCount, coordinats);
        rl.close();
    })
})


function stringToCoordinats (inputString) {
    const inputArray = inputString.split(' ').map(Number);
    const coordinats = [];
    for (let i = 0; i < inputArray.length; i+=2) {
        if (i + 1 < inputArray.length) {
            coordinats.push({x: inputArray[i], y: inputArray[i + 1]})
        }
    }
    // console.log(coordinats)
    return coordinats;
}


// function calculateMinimumLength(points, n) {
//     //const n = points.length;
//
//     // Расчет расстояния между двумя точками
//     function distance(p1, p2) {
//         const dx = p2.x - p1.x;
//         const dy = p2.y - p1.y;
//         return Math.sqrt(dx * dx + dy * dy);
//     }
//
//     // Создание матрицы расстояний между всеми парами точек
//     const distances = [];
//     for (let i = 0; i < n; i++) {
//         distances[i] = [];
//         for (let j = 0; j < n; j++) {
//             distances[i][j] = distance(points[i], points[j]);
//         }
//     }
//
//     // Инициализация массива минимальных длин отрезков
//     const dp = [];
//     for (let i = 0; i < (1 << n); i++) {
//         dp[i] = new Array(n).fill(Number.POSITIVE_INFINITY);
//     }
//     dp[1][0] = 0;
//
//     // Вычисление минимальной суммарной длины отрезков
//     for (let mask = 1; mask < (1 << n); mask++) {
//         for (let last = 0; last < n; last++) {
//             if ((mask & (1 << last)) !== 0) {
//                 for (let curr = 0; curr < n; curr++) {
//                     if (last !== curr && (mask & (1 << curr)) !== 0) {
//                         const prevMask = mask ^ (1 << last);
//                         dp[mask][curr] = Math.min(dp[mask][curr], dp[prevMask][last] + distances[last][curr]);
//                     }
//                 }
//             }
//         }
//     }
//
//     // Поиск минимальной суммарной длины отрезков
//     let minLength = Number.POSITIVE_INFINITY;
//     for (let i = 1; i < n; i++) {
//         minLength = Math.min(minLength, dp[(1 << n) - 1][i] + distances[i][0]);
//     }
//
//     return minLength;
// }


const test = {
    count: '6',
    string: '3 13 12 4 14 6',
}

nailsCount = Number(test.count);
coordinats = stringToCoordinats(test.string);

console.log();
