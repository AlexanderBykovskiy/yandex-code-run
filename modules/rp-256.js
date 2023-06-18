module.exports = function(content /* текст тестового файла */) {

    const pattern = /it(?:\.skip)?\([\s\S]+?}\);/gmi;

    const matches = content.match(pattern);

    const result = [];
    matches.forEach(item => {
        const string ="// Some imports and comments\nconst component = require('./component');\n\ndescribe('suite', function () {\n    " + item + "\n});\n";
        console.log(string);
        result.push(string)
    });

    return result;
}
