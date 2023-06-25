const parser = require("./modules/pr-192");

const test1 = {
    type: 'band',
    name: 'Бритый гриб',
    friends: [],
    genres: [
        { type: 'genre',
            name: 'Нерок',
            bands: [ [Circular] ],
            subgenres: [],
            parent: null
        },
        {
            type: 'genre',
            name: 'Полурок',
            bands: [[Circular]],
            subgenres: [],
            parent: {
                type: 'genre',
                name: 'Рок',
                bands: [],
                subgenres: null
            }
        }
    ]
}

console.log(parser(test1));
