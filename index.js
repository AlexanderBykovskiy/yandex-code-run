const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calculateOperations(n) {

    const operations = [];

    console.log('*',Infinity + 1)

    const dp = new Array(n + 1).fill(Infinity);
    const result = new Array(n + 1).fill([]);

    dp[1] = 0;

    for (let i = 1; i <= n; i++) {

        dp[i] = Math.min(dp[i], dp[i - 1] + 1);
        console.log(i, 'x2')

        if (i * 2 <= n) {
            dp[i * 2] = Math.min(dp[i * 2], dp[i] + 1);
            console.log(i, 'x2')
        }

        if (i * 3 <= n) {
            dp[i * 3] = Math.min(dp[i * 3], dp[i] + 1);
            console.log(i, 'x3')
        }

        console.log('i ', i, 'dp', dp)
    }
    return dp[n];

}

rl.question('', (N) => {

    console.log('')

    const minOperations = calculateOperations(parseInt(N));

    console.log('')

    process.stdout.write(minOperations.toString() + '\n');
    // process.stdout.write(result.sequence.join(' '));

    rl.close();
});
