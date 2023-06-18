module.exports = function (str) {

    const validSequences = ["7", "1111", "711"];

    if (!(typeof str === 'string' || str instanceof String || Object.prototype.toString.call(str) === '[object String]') || str.length > 3e10 || str.length < 1) return false;

    str.replace(/^0+/, '').trim();

    const checkSubsequence = (str, startIndex) => {
        if (startIndex === str.length) {
            return true; // Вся строка была обработана
        }

        for (const sequence of validSequences) {
            if (str.startsWith(sequence, startIndex)) {
                const newStartIndex = startIndex + sequence.length;
                if (checkSubsequence(str, newStartIndex)) {
                    return true; // Строка можно составить из последовательностей
                }
            }
        }

        return false; // Невозможно составить строку из последовательностей
    };

    return checkSubsequence(str, 0);
}
