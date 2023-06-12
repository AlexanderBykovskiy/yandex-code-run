const converter = require("./modules/pr-236");

const test1 = {
    "participants": ["Mary", "Kate"],
    "sports": ["football", "hockey"]
}
console.log(converter(test1.participants, test1.sports));
