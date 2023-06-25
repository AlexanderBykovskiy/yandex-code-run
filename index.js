const {getLastCommonCommitMessage} = require("./modules/pr-186");


console.log("add layout -", getLastCommonCommitMessage([
    {
        id: '1',
        message: 'initial commit',
        timestamp: 1624010073113,
    },
    {
        id: '2',
        parents: ['1'],
        message: 'add layout',
        timestamp: 1624010082219,
    },
    {
        id: '3',
        parents: ['2'],
        message: 'fix bugs',
        timestamp: 1624010109039,
        branches: ['master', 'bugfix']
    },
    {
        id: '4',
        parents: ['2'],
        message: 'add link',
        timestamp: 1624010179662,
        branches: ['feature/link']
    }
], ['bugfix', 'feature/link']));


console.log("initial commit -", getLastCommonCommitMessage([
    {
        id:"0",
        timestamp:1625055166428,
        message:"initial commit",
        branches:["master"]
    }
], ["master", "master"]));


console.log("No common commit -", getLastCommonCommitMessage([], ["a", "b"]));
