const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calculateOperations(N) {

    let a = new Array(N + 1);
    a[1] = 0;

    let min;
    for (let i = 2; i < N + 1; i++) {
        min = a[i - 1] + 1;
        if (i % 2 === 0) min = Math.min(min, a[i / 2] + 1);
        if (i % 3 === 0) min = Math.min(min, a[i / 3] + 1);

        a[i] = min;
    }

    let ret = "";
    let sum = [];

    let i = N;
    while (i > 1) {
        if (a[i] === a[i - 1] + 1) {
            ret = "+ 1 " + ret;
            sum.unshift(1)
            i--;
            continue;
        }

        if (i % 2 === 0 && a[i] === a[i / 2] + 1) {
            ret = "x 2 " + ret;
            sum.unshift(2)
            i /= 2;
            continue;
        }

        ret = "x 3 " + ret;
        sum.unshift(3)
        i /= 3;
    }

    // console.log(a[N]);
    // console.log("1 " + ret);
    let num = 1;
    let str = '1';
    sum.forEach((item) => {
        if (item === 1) {
            num++;
        } else if (item === 2) {
            num*=2;
        } else if (item === 3) {
            num*=3;
        }
        str = str + ' ' + num;
    })
    //console.log(str);
    return {count: a[N], str: str};
}

rl.question('', (N) => {

    const minOperations = calculateOperations(parseInt(N));

    process.stdout.write(minOperations.count.toString() + '\n');
    process.stdout.write(minOperations.str);

    rl.close();
});
