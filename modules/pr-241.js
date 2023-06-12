module.exports = function (n = 0) {
    return () => {
        if (Number.isInteger(n) && n>0) {
            return n--;
        } else {
            return 0;
        }
    }
}
