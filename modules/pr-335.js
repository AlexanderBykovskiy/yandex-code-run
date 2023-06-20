module.exports = function (str) {
    const available = ["1111", "711", "7"];
    const n = str.length;

    if (!(typeof str === 'string' || str instanceof String || Object.prototype.toString.call(str) === '[object String]') || str.length > 3e10 || str.length < 1) return false;

    if (!(/^[71]+$/.test(str))) return false;

    const dp = new Array(n + 1).fill(false);
    dp[0] = true;

    for (let i = 1; i <= n; i++) {
        for (const item of available) {
            if (item.length <= i && str.slice(i - item.length, i) === item) {
                dp[i] = dp[i] || dp[i - item.length];
            }
        }
    }

    return dp[n];
};
