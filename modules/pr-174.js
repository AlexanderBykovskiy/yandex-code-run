module.exports = function solution(field, moves) {
    const numRows = field.length;
    const numCols = field[0].length;

    const swipe = (direction) => {
        const newField = JSON.parse(JSON.stringify(field));

        if (direction === "U") {
            for (let col = 0; col < numCols; col++) {
                for (let row = 1; row < numRows; row++) {
                    let rowIndex = row;

                    while (rowIndex > 0) {
                        if (newField[rowIndex][col] !== 0 && newField[rowIndex - 1][col] === 0) {
                            newField[rowIndex - 1][col] = newField[rowIndex][col];
                            newField[rowIndex][col] = 0;
                            rowIndex--;
                        } else if (newField[rowIndex][col] === newField[rowIndex - 1][col]) {
                            newField[rowIndex - 1][col] *= 2;
                            newField[rowIndex][col] = 0;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        } else if (direction === "D") {
            for (let col = 0; col < numCols; col++) {
                for (let row = numRows - 2; row >= 0; row--) {
                    let rowIndex = row;

                    while (rowIndex < numRows - 1) {
                        if (newField[rowIndex][col] !== 0 && newField[rowIndex + 1][col] === 0) {
                            newField[rowIndex + 1][col] = newField[rowIndex][col];
                            newField[rowIndex][col] = 0;
                            rowIndex++;
                        } else if (newField[rowIndex][col] === newField[rowIndex + 1][col]) {
                            newField[rowIndex + 1][col] *= 2;
                            newField[rowIndex][col] = 0;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        } else if (direction === "L") {
            for (let row = 0; row < numRows; row++) {
                for (let col = 1; col < numCols; col++) {
                    let colIndex = col;

                    while (colIndex > 0) {
                        if (newField[row][colIndex] !== 0 && newField[row][colIndex - 1] === 0) {
                            newField[row][colIndex - 1] = newField[row][colIndex];
                            newField[row][colIndex] = 0;
                            colIndex--;
                        } else if (newField[row][colIndex] === newField[row][colIndex - 1]) {
                            newField[row][colIndex - 1] *= 2;
                            newField[row][colIndex] = 0;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        } else if (direction === "R") {
            for (let row = 0; row < numRows; row++) {
                for (let col = numCols - 2; col >= 0; col--) {
                    let colIndex = col;

                    while (colIndex < numCols - 1) {
                        if (newField[row][colIndex] !== 0 && newField[row][colIndex + 1] === 0) {
                            newField[row][colIndex + 1] = newField[row][colIndex];
                            newField[row][colIndex] = 0;
                            colIndex++;
                        } else if (newField[row][colIndex] === newField[row][colIndex + 1]) {
                            newField[row][colIndex + 1] *= 2;
                            newField[row][colIndex] = 0;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        }

        return newField;
    };

    moves.split(" ").forEach((move) => {
        field = swipe(move);
    });

    return field;
};
