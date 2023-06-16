/**
 *
 * @typedef Replace
 *
 * @property {string} from
 * @property {string} to
 */

/**
 *
 * @param {string} message
 * @param {Replace[]} replaces
 * @returns {string}
 */

function decode(message, replaces) {

    let decoded = ""

    while (message.length) {

        let findFlag = false;

        for (let i = replaces.length - 1; i >= 0; i--) {

            const code = replaces[i];

            if (message.slice(0, code.from.length) === code.from) {
                findFlag = true;
                decoded += code.to;
                message = message.substring(code.from.length);
                break;
            }
        }

        if (!findFlag) {
            decoded += message.slice(0, 1);
            message = message.substring(1);
        }

    }
    return decoded
}

module.exports = { decode };
