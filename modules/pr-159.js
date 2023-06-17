module.exports = (str) => {

    const header = /^= (.+)/i;
    const listItem = /^\* (.+)/i;
    const link = /\({2}(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)) (.+)\){2}/i;

    let result = "";
    let strings = str.split("\n");

    let list = "";
    let isClosedUl = true;

    if (strings.length === 0) return "";

    let i = 0;
    while (i < strings.length) {
        const clearString = strings[i].replace(/\s+/gm,' ').replace(/'/gm,'"');
        console.log(clearString);

        // Find list
        const findListItem = clearString.match(listItem);
        if (findListItem) {
            if (isClosedUl) {
                result += "<ul>";
                isClosedUl = false;
            }
            list += "<li>" + findListItem[1] + "</li>";
            i++;
            continue;
        } else if (!isClosedUl && list.length) {
            result += list + "</ul>";
            list = "";
            isClosedUl = true;
        }

        // Find header
        const findHeader = clearString.match(header);
        if (findHeader) {
            result += "<h1>" + findHeader[1] + "</h1>";
            i++;
            continue;
        }

        // Find paragraph
        if (clearString) {
            result += "<p>" + clearString.replace(link, '<a href="$1">$4</a>') + "</p>";
            i++;
            continue;
        }

        i++;
    }

    if (!isClosedUl && list.length) result += list + "</ul>";

    return result;
};
