const robot = require('./modules/pr-179');

/*const test1 = [
    {
        id: '#1',
        created: 1536077100,
        files: ['.gitignore', 'README.md']
    },
    {
        id: '#2',
        created: 1536077700,
        files: ['index.js', 'package-lock.json', 'package.json']
    },
    {
        id: '#3',
        created: 1536077800,
        files: ['.pnp.js', 'package-lock.json', 'yarn.lock']
    },
    {
        id: '#4',
        created: 1536077900,
        files: ['index.spec.js', 'index.spec.ts', 'index.ts']
    }
]

console.log(robot(test1), [
    "#1",
    "#2",
    "#4"
]);*/

const test2 = [
    {
        "id": "1",
        "created": 1538179200,
        "files": [ "a", "b", "c", "d" ]
    },
    {
        "id": "2",
        "created": 1538189200,
        "files": [ "a", "x" ]
    },
    {
        "id": "3",
        "created": 1538199200,
        "files": [ "b", "g" ]
    },
    {
        "id": "4",
        "created": 1538209200,
        "files": [ "c",  "f" ]
    },
    {
        "id": "5",
        "created": 1538219200,
        "files": [ "d", "w" ]
    }
]

console.log(robot(test2), ['2', '3', '4', '5']);
