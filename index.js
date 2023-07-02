const robot = require('./modules/pr-179');

const test1 = [
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
console.log(robot(test1));
