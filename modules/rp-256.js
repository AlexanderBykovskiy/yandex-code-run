module.exports = function(content /* текст тестового файла */) {

    const pattern = /it(?:\.skip)?\([\s\S]+?}\);/gmi;

    const matches = content.match(pattern);

    const result = [];
    matches.forEach(item => {
        const string = `// Some imports and comments
const component = require('./component');

describe('suite', function () {
    ${item}
});
`;
        //console.log(string);
        result.push(string)
    });

    return result;
}
