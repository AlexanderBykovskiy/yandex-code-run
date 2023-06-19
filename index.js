const parser = require("./modules/rp-256");


const test1 = `// Some imports and comments
const component = require('./component');

describe('suite', function () {
    it('test1', function () {
        function () {
            console.log("super");
        };
    });
    
    it('test2', function () {
        // Some test 2
    });
    
    it.skip('test3', function () {
        // Some test 3
        const lol = () => {
            console.log('lalalal')
        };
        arr.map((i,j) => {
            return i;
        });
        });
    });
});

`

const test2 =  "describe('suite', function () {\n" +
    "    it('test1', function () {\n" +
    "        cy.dataset({ method: 'user_token', kwargs: { role: 'admin' } }, 'user').log('Создаём админа');\n" +
    "        cy.get('@user').then((user) => {\n" +
    "            cy.visit(user.url).log(`Авторизация`);\n" +
    "            cy.get(`[data-test=\"root\"]`).log(`Авторизация пройдена.`);\n" +
    "            cy.visit(`/stores/incorrectstoreid`).log(`Загружаем страницу c неправильным id склада`);\n" +
    "            cy.url().should(`contain`, `/error`).log('Произошел редирект на страницу с ошибкой');\n" +
    "            cy.get(`[data-test=\"error status\"]`).contains(`403`);\n" +
    "            cy.get(`[data-test=\"error code\"]`).contains(`Страница недоступна`);\n" +
    "            cy.get(`[data-test=\"error text\"]`).contains(`У вас нет прав доступа к данной странице`);\n" +
    "            cy.get(`[data-test=\"go home button\"]`);\n" +
    "        });\n" +
    "    });\n" +
    "});\n"


const test3 = `// Some imports and comments
const component = require('./component');

describe('suite', function () {
    it('test1', function () {
        // Some test 1
        cy.dataset({ method: 'user_token', kwargs: { role: 'admin' } }, 'user').log('Создаём админа');
        cy.dataset({ method: 'user_token', kwargs: { role: 'admin' } }, 'user').log('Создаём админа');
        cy.get('@user').then((user) => {
                    cy.visit(user.url).log(\`Авторизация\`);
                    cy.get(\`[data-test=\\"root\\"]\`).log(\`Авторизация пройдена.\`);
                    cy.visit(\`/stores/incorrectstoreid\`).log(\`Загружаем страницу c неправильным id склада\`);
                    cy.url().should(\`contain\`, \`/error\`).log('Произошел редирект на страницу с ошибкой');
                    cy.get(\`[data-test=\\"error status\\"]\`).contains(\`403\`);
                    cy.get(\`[data-test=\\"error code\\"]\`).contains(\`Страница недоступна\`);
                    cy.get(\`[data-test=\\"error text\\"]\`).contains(\`У вас нет прав доступа к данной странице\`);
                    cy.get(\`[data-test=\\"go home button\\"]\`);
        });
    }
    );
    it('test2', function () {
        // Some test 2
    });
    it.skip('test3', function () {
        // Some test 3
    });
});
`

const test4 = "describe('suite', function () {\n    it('test1', function () {\n        cy.dataset({ method: 'user_token', kwargs: { role: 'admin' } }, 'user').log('Создаём админа');\n        cy.get('@user').then((user) => {\n            cy.visit(user.url).log(Авторизация);\n            cy.get([data-test=\"root\"]).log(Авторизация пройдена.);\n            cy.visit(/stores/incorrectstoreid).log(Загружаем страницу c неправильным id склада);\n            cy.url().should(contain, /error).log('Произошел редирект на страницу с ошибкой');\n            cy.get([data-test=\"error status\"]).contains(403);\n            cy.get([data-test=\"error code\"]).contains(Страница недоступна);\n            cy.get([data-test=\"error text\"]).contains(У вас нет прав доступа к данной странице);\n            cy.get([data-test=\"go home button\"]);\n        });\n    });\n    it('test2', function () {\n        cy.dataset({ method: 'user_token', kwargs: { role: 'admin' } }, 'user').log('Создаём админа');\n        cy.get('@user').then((user) => {\n            cy.visit(user.url).log(Авторизация);\n            cy.get([data-test=\"root\"]).log(Авторизация пройдена.);\n            cy.visit(/stores/incorrectstoreid).log(Загружаем страницу c неправильным id склада);\n            cy.url().should(contain, /error).log('Произошел редирект на страницу с ошибкой');\n            cy.get([data-test=\"error status\"]).contains(403);\n            cy.get([data-test=\"error code\"]).contains(Страница недоступна);\n            cy.get([data-test=\"error text\"]).contains(У вас нет прав доступа к данной странице);\n            cy.get([data-test=\"go home button\"]);\n        });\n    });\n});\n";

console.log("Test 4:", parser(test4));



