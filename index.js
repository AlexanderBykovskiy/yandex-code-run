const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calculateOperations(N) {
    let operations = 0;
    const sequence = [];

    let calc = N;

    while (calc > 1) {

        sequence.push(calc);

        if (calc % 3 === 0) {
            console.log(calc, "/ 3 = ", calc/3);
            calc /= 3;
        } else if (calc % 2 === 0) {
            console.log(calc, "/ 2 = ", calc/2);
            calc /= 2;
        } else {
            console.log(calc, "- 1 = ", calc - 1);
            calc -= 1;
        }

        operations++;
    }

    if (N !== 0) sequence.push(1);
    sequence.reverse();

    return {
        operations: operations,
        sequence: sequence
    };
}

rl.question('', (N) => {
    const result = calculateOperations(parseInt(N));

    // console.log(result.operations);
    // console.log(result.sequence.join(' '));

    process.stdout.write(result.operations.toString() + '\n');
    process.stdout.write(result.sequence.join(' '));

    rl.close();
});
