module.exports = function (str) {

    const available = ["1111", "711", "7"];

    if (!(typeof str === 'string' || str instanceof String || Object.prototype.toString.call(str) === '[object String]') || str.length > 3e10 || str.length < 1) return false;

    if (!(/^[71]+$/.test(str))) return false;
    const check = (pos, str) => {

        if (pos === str.length) return true;

        for (const item of available) {
            if (str.startsWith(item, pos)) {
                const newPos = pos + item.length;
                if (check(newPos, str)) return true;
            }
        }

        return false;

    }

    return check(0, str);
}
