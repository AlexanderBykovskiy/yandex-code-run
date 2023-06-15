module.exports = function (inputStr) {

    if (inputStr.length < 5) return '';

    const lib = ["-----", ".----", "..---", "...--", "....-", ".....", "-....", "--...", "---..", "----."];

    inputStr = inputStr.trim() + " ";
    outputStr = "";
    const len = inputStr.length;

    let word = "";

    for (let i = 0; i < len; i++ ) {
        if (inputStr[i] === ' ') {

            if (word[0] === "T") word = word.slice(1, 6).split('').reverse().join('');

            if (word[0] === "R") word = word.slice(1, 10).split('').filter((_, index) => index % 2 === 0).join('');

            const findIndex = lib.findIndex(item => item === word);
            if (findIndex >= 0)
                outputStr+=findIndex

            if (inputStr.slice(i, i + 3) === "   ") {
                outputStr += " ";
                i+=2;
            }

            word = "";
        } else {
            word+=inputStr[i];
        }
    }

    return outputStr;
}
